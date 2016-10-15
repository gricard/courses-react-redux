import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading, courses}) => {
    let courseLink,
        numCourses = courses.length + 0;

    // can't do a goddamn IF inside JSX? fuck you!
    if (numCourses > 0) {
        // for sure this is totally obnoxious...
        courseLink = <Link to="/courses" activeClassName="active">Courses ({numCourses})</Link>;
        // i can't fucking include this in the link above because there can only be one top level element lulz
    } else {
        // add an "Add Course" button in its place
        courseLink = <Link to="/course" activeClassName="active">Add Course</Link>;
    }

    return (
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            {courseLink}
            {" | "}
            <Link to="/authors" activeClassName="active">Authors</Link>
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
            {loading && <LoadingDots interval={100} dots={20} />}
        </nav>
    );
};

Header.propTypes  = {
    loading: PropTypes.bool.isRequired,
    courses: PropTypes.array.isRequired
};

export default Header;
