import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Education = ({ education }) => {
  const educations = education.map((edu) => {
    return (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td className="hide-sm">{edu.country}</td>
        <td className="hide-sm">{edu.city}</td>
        <td className="hide-sm">
          {edu.description.length === 0
            ? "none"
            : edu.description.length > 20
            ? `${edu.description.slice(0, 11)}...`
            : edu.description}
        </td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Current"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button className="btn btn-primary">Delete</button>
        </td>
      </tr>
    );
  });
  return (
    <>
      <h2 className="my-2">Education</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Country</th>
            <th className="hide-sm">City</th>
            <th className="hide-sm">Description</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;