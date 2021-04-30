import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "../layout/Spinner";
import ProfileItem from "../profiles/ProfileItem";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Musicians</h1>
          <p className="lead">
            <i class="far fa-handshake"></i> Browse and connect with other
            professionals of the music industry.
          </p>
          <div className="profiles">
            {profiles.length ? (
              profiles.map((profile) => {
                return <ProfileItem key={profile._id} profile={profile} />;
              })
            ) : (
              <h4>No profiles found.</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
