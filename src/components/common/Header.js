import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading, courses, authors}) => {
    let courseLink,
        authorLink,
        numCourses = courses.length + 0,
        numAuthors = authors.length + 0;

    // can't do a goddamn IF inside JSX? fuck you!
    if (numCourses > 0) {
        // for sure this is totally obnoxious...
        courseLink = <Link to="/courses" activeClassName="active">Courses ({numCourses})</Link>;
        // i can't fucking include this in the link above because there can only be one top level element lulz
    } else {
        // add an "Add Course" button in its place
        courseLink = <Link to="/course" activeClassName="active">Add Course</Link>;
    }

    // can't do a goddamn IF inside JSX? fuck you!
    if (numAuthors > 0) {
        // for sure this is totally obnoxious...
        authorLink = <Link to="/authors" activeClassName="active">Authors ({numAuthors})</Link>;
        // i can't fucking include this in the link above because there can only be one top level element lulz
    } else {
        // add an "Add Course" button in its place
        authorLink = <Link to="/author" activeClassName="active">Add Author</Link>;
    }

    return (
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            {courseLink}
            {" | "}
            {authorLink}
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
            {loading && <LoadingDots interval={100} dots={20} />}
        </nav>
    );
};

Header.propTypes  = {
    loading: PropTypes.bool.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired
};

export default Header;
