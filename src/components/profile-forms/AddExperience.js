import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    band: "",
    country: "",
    city: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, setToDateDisabled] = useState(false);

  const {
    title,
    band,
    country,
    city,
    from,
    to,
    current,
    description,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
    setTimeout(() => {
      history.push("/dashboard");
    }, 2000);
  };

  return (
    <>
      <h1 className="large text-primary">Add Experience</h1>
      <p className="lead">
        <i className="fas fa-podcast"></i> Add any music/teaching positions that
        you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Position"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Band"
            name="band"
            value={band}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Country"
            name="country"
            value={country}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* City"
            name="city"
            value={city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={handleChange} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                setToDateDisabled(!toDateDisabled);
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={handleChange}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
