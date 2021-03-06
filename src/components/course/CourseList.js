import PropTypes from "prop-types";
import React from "react";
import CourseListRow from "./CourseListRow";

const CourseList = ({ courses, authors }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Length</th>
                </tr>
            </thead>
            <tbody>
                {courses.map(course => (
                    <CourseListRow
                        key={course.id}
                        course={course}
                        authors={authors}
                    />
                ))}
            </tbody>
        </table>
    );
};

CourseList.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
};

export default CourseList;
