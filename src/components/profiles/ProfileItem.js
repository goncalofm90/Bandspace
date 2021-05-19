import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name },
    avatar,
    status,
    band,
    country,
    city,
    instruments,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar} alt="avatar" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {band && <span>at {band}</span>}
        </p>
        <p className="my-1">{country && <span>{country}</span>}</p>
        <p className="my-1">{city && <span>{city}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {instruments.slice(0, 4).map((instrument, index) => {
          return (
            <li key={index} className="text-primary">
              <i className="fas fa-guitar"></i> {instrument}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
