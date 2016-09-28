import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: { title: '' }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({course: course});
    }

    onClickSave() {
        // most verbose way to dispatch a function
        this.props.actions.createCourse(this.state.course);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    render() {
        return (
            <div>
                <h1>Courses</h1>
                {this.props.courses.map(this.courseRow)}
                <h2>Add Course</h2>
                <input type="text"
                    onChange={this.onTitleChange}
                    value={this.state.course.title} />
                <input type="submit"
                    value="Save"
                    onClick={this.onClickSave} />
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
