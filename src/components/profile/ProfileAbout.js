import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    instruments,
    user: { name },
    bio,
  },
}) => {
  return (
    <div class="profile-about bg-light p-2">
      {bio && (
        <>
          {/* display only first name */}
          <h2 class="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
          <p>{bio}</p>
          <div class="line"></div>
          <h2 class="text-primary">
            <i class="fa fa-guitar"></i> Instruments
          </h2>
        </>
      )}

      <div class="skills">
        {instruments.map((instrument, index) => {
          return (
            <div key={index} className="p-1">
              <i className="fas fa-check"></i> {instrument}
            </div>
          );
        })}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
