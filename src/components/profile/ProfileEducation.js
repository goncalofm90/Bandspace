import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: {
    school,
    country,
    city,
    degree,
    fieldofstudy,
    current,
    from,
    to,
    description,
  },
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
        {!to ? "Current" : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>Degree:</strong>
        {degree}
      </p>
      <p>
        <strong>Course:</strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Country:</strong>
        {country}
      </p>
      <p>
        <strong>City:</strong>
        {city}
      </p>
      <p>
        <strong>Description:</strong>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
