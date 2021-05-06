import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { band, title, country, city, from, to, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">{band}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
        {!to ? "Current" : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>Position:</strong>
        {title}
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

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
