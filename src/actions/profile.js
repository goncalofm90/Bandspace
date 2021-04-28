import axios from "axios";
import { setAlert } from "./alert";
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
} from "./constants";

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

//Create or update a profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);
    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(
      setAlert(edit ? "Profile updated." : "Profile created.", "danger")
    );
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

//Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Experience added.", "danger"));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

//Add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Education added.", "danger"));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed.", "danger"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
      },
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Removed.", "danger"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
      },
    });
  }
};

// Delete Account & Profile
export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This is permanent and you won't be able to recover your profile."
    )
  ) {
    try {
      await axios.delete(`/api/profile`);
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });

      dispatch(
        setAlert("Your account has been permanently deleted.", "danger")
      );
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.data.msg,
          status: error.response.status,
        },
      });
    }
  }
};
