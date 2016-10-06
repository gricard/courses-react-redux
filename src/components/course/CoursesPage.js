import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    redirectToAddCoursePage() {
        browserHistory.push('/course');
    }

    render() {
        // destructuring
        // could also do courses = this.props.courses
        const {courses} = this.props;

        return (
            <div>
                <h1>Courses</h1>
                <input type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage}
                    />
                {courses.length > 0 && <CourseList courses={courses} />}
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// connect data from state to properties for components
function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses // connected to label in root reducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
//        createCourse: (course) => dispatch(courseActions.createCourse(course))
//        createCourse: bindActionCreators(courseActions.createCourse, dispatch)
        actions: bindActionCreators(courseActions, dispatch)
    };
}

// more verbose wau
//const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
//export default connectedStateAndProps(CoursesPage);

// ignore dispatch for now and use default
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
