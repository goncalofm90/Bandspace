import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { Link } from "react-router-dom";
import { Spinner } from "../layout/Spinner";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> </i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button className="btn btn-primary" onClick={deleteAccount}>
              <i className="fas fa-user-minus"></i> Delete Account
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>
            You don't have a profile yet! Create one by clicking the button
            below:
          </h3>{" "}
          <br />
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
