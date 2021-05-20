import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";

// Cloudinary Setup======================================
const CloudinaryPreset = "xmofgph7";
const CloudinaryId = "goncalofm90";

async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", CloudinaryPreset);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CloudinaryId}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );
  const img = await res.json();
  console.log(img);
  return img.secure_url;
}
//=======================================================

const initialState = {
  avatar: "",
  band: "",
  country: "",
  city: "",
  instruments: "",
  bio: "",
  website: "",
  status: "",
  twitter: "",
  youtube: "",
  facebook: "",
  spotify: "",
  instagram: "",
  soundcloud: "",
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  history,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    avatar: "",
    band: "",
    country: "",
    city: "",
    instruments: "",
    bio: "",
    website: "",
    status: "",
    twitter: "",
    youtube: "",
    facebook: "",
    spotify: "",
    instagram: "",
    soundcloud: "",
  });

  const {
    band,
    country,
    city,
    instruments,
    bio,
    website,
    status,
    twitter,
    youtube,
    facebook,
    spotify,
    instagram,
    soundcloud,
  } = formData;

  const [uploadingImg, setUploadingImg] = useState(false);
  const [displaySocial, setDisplaySocial] = useState(false);

  const handleFileChange = async (event) => {
    const [file] = event.target.files;
    if (!file) return;

    setUploadingImg(true);
    const uploadedUrl = await uploadImage(file);
    setFormData({ ...formData, avatar: uploadedUrl });
    setUploadingImg(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uploadingImg) return;
    console.log(formData);
    createProfile(formData, history, profile ? true : false);
  };

  //Load profile state and update the data in it
  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      //since instruments is an array we gotta join the info and then set the data
      if (Array.isArray(profileData.instruments))
        profileData.instruments = profile.instruments.join(", ");
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  return (
    <>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Update some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p>Change Avatar</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploadingImg}
          />
        </div>
        <div className="form-group">
          <select
            name="status"
            value={status}
            onChange={(e) => handleChange(e)}
          >
            <option value="0">
              * Select Most Relevant Professional Status
            </option>
            <option value="Freelancer">Freelancer</option>
            <option value="Roadie">Roadie</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor or Teacher">Instructor or Teacher</option>
            <option value="Resident/Band Member">Resident/Band Member</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Band"
            name="band"
            value={band}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Could be your own band or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Could be your own or a band website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={country}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">Country (eg. Portugal)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={city}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">City (eg. Lisbon)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Instruments"
            name="instruments"
            value={instruments}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg.
            Piano,Bass,Guitar,Vocals,etc.)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="* Bio"
            name="bio"
            value={bio}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => setDisplaySocial(!displaySocial)}
          >
            Add Social Network Links
          </button>
          <span>(Optional)</span>
        </div>

        {/* TOGGLE DISPLAY SOCIAL */}
        {displaySocial && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-spotify fa-2x"></i>
              <input
                type="text"
                placeholder="Spotify URL"
                name="spotify"
                value={spotify}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-soundcloud fa-2x"></i>
              <input
                type="text"
                placeholder="Soundcloud URL"
                name="soundcloud"
                value={soundcloud}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </>
        )}
        <input value="Update" type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
