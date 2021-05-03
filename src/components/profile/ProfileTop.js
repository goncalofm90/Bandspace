import React from "react";
import PropTypes from "prop-types";

//fix link format
const urlToRender = (link) => {
  if (!link.match(/^[a-zA-Z]+:\/\//)) {
    return "https://" + link;
  }
  return link;
};

const ProfileTop = ({
  profile: {
    status,
    band,
    country,
    city,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div class="profile-top bg-primary p-2">
      <img class="round-img my-1" src={avatar} alt="" />
      <h1 class="large">{name}</h1>
      <p class="lead">
        {status} {band && <span> at {band}</span>}
      </p>
      <p>{country && <span>{country}</span>}</p>
      <p>{city && <span>{city}</span>}</p>
      <div class="icons my-1">
        {website && (
          <a
            href={urlToRender(website)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="profilesocial fas fa-globe fa-2x"></i>
          </a>
        )}
        {social && social.twitter && (
          <a
            href={urlToRender(social.twitter)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="profilesocial fab fa-twitter fa-2x"></i>
          </a>
        )}
        {social && social.facebook && (
          <a
            href={urlToRender(social.facebook)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="profilesocial fab fa-facebook fa-2x"></i>
          </a>
        )}
        {social && social.spotify && (
          <a
            href={urlToRender(social.spotify)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="profilesocial fab fa-spotify fa-2x"></i>
          </a>
        )}
        {social && social.soundcloud && (
          <a
            href={urlToRender(social.soundcloud)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="profilesocial fab fa-soundcloud fa-2x"></i>
          </a>
        )}
        {social && social.youtube && (
          <a
            href={urlToRender(social.youtube)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="profilesocial fab fa-youtube fa-2x"></i>
          </a>
        )}
        {social && social.instagram && (
          <a
            href={urlToRender(social.instagram)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="profilesocial fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
