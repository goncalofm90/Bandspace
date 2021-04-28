import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => {
    return (
      <tr key={exp._id}>
        <td>{exp.band}</td>
        <td className="hide-sm">{exp.title}</td>
        <td className="hide-sm">{exp.country}</td>
        <td className="hide-sm">{exp.city}</td>
        <td className="hide-sm">
          {exp.description.length === 0
            ? "none"
            : exp.description.length > 20
            ? `${exp.description.slice(0, 11)}...`
            : exp.description}
        </td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Current"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => deleteExperience(exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <>
      <h2 className="my-2">Experience</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Band</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Country</th>
            <th className="hide-sm">City</th>
            <th className="hide-sm">Description</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
