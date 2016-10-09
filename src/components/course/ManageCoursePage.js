import React, {PropTypes} from 'react';
import {connect as reduxConnect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import { authorsFormattedForDropdown } from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        // initial component state
        this.state = {
            course: Object.assign({}, props.course),
            errors: {},
            saving: false,
            deleting: false
        };

        // have to bind scope to each of the action functions
        this.handleUpdateCourseState = this.handleUpdateCourseState.bind(this);
        this.handleSaveCourse = this.handleSaveCourse.bind(this);
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // only override the course when we're loading a new one
        if (this.props.course.id != nextProps.course.id) {
            // populate form when course is loaded directly
            this.setState({course: Object.assign({}, nextProps.course)}); // make a copy of the course
        }
    }

    //// Handlers
    // handle events from components
    handleUpdateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    handleSaveCourse(event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        this.setState({saving: true});
        this.props.actions.callSaveCourse(this.state.course)
            .then(() => this.redirectSave())
            .catch(error => {
                this.setState({saving: false});
                toastr.error(error);
            });
    }

    handleDeleteCourse(event) {
        //console.log('onDelete event', event);
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        this.setState({deleting: true});
        this.props.actions.callDeleteCourse(this.state.course)
            .then(() => {
                //console.log('after callDeleteCourse action');
                this.redirectDelete();
                //console.log('redirected');
            })
            .catch(error => {
                //console.log('caught error in delete hndler', error);
                this.setState({deleting: false});
                toastr.error(error);
            });
    }


    //// Helper/utility functions
    courseFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    redirectSave() {
        this.setState({saving: false});
        this.redirect('Course Saved');
    }

    redirectDelete() {
        //console.log('redirect delete');
        this.setState({deleting: false});
        this.redirect('Course Deleted');
    }

    redirect(msg) {
        toastr.success(msg);
        // redirect to courses page after save
        this.context.router.push('/courses');
    }

    render() {
        //console.log('rendering');
        return (
            <CourseForm
                allAuthors={this.props.authors}
                onChange={this.handleUpdateCourseState}
                onSave={this.handleSaveCourse}
                onDelete={this.handleDeleteCourse}
                course={this.state.course}
                errors={this.state.errors}
                saving={this.state.saving}
                deleting={this.state.deleting}
            />
        );
    }
}

// TODO why are these done after it's declared again?
ManageCoursePage.propTypes =  {
    course: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired
};

// pull in react router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
    router: PropTypes.object // not required in order to avoid linting error from upcoming usage
};


// REDUX setup

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id === id);
    if (course.length) return course[0]; // filtering returns an array
    return null;
}

// REDUX copy app state into properties used by components
function mapStateToProps(state, ownProps) {
    //console.log('mapStateToProps', state);
    const courseId = ownProps.params.id; // id in path, e.g. /courses/:id

    let course = null;

    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
        //console.log('getCourseById', course);
    }

    // deleted courses will be null when this is called
    // TODO why is this called when we're trying to redirect, not load this page again?
    if (course === null) {
        course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
        //console.log('new empty course', course);
    } else {
        //console.log('course is not null?', course);
    }

    return {
        course: course,
        authors: authorsFormattedForDropdown(state.authors)
    };
}

// REDUX link action props to store dispatcher
// (when user clicks a button, it dispatches an action to the store)
function mapDispatchToProps(dispatch) {
    //console.log('mapDispatchToProps', dispatch);
    return {
        // attach actions/THUNKS to props
        actions: bindActionCreators(courseActions, dispatch)
    };
}

// REDUX - connect() hooks the component up to redux to give it state and actions
export default reduxConnect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
