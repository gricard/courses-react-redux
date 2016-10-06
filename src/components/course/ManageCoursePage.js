import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import { authorsFormattedForDropdown } from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.course),
            errors: {},
            saving: false,
            deleting: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // only override the course when we're loading a new one
        if (this.props.course.id != nextProps.course.id) {
            // populate form when course is loaded directly
            this.setState({course: Object.assign({}, nextProps.course)}); // make a copy of the course
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

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

    saveCourse(event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        this.setState({saving: true});
        this.props.actions.saveCourse(this.state.course)
            .then(() => this.redirectSave())
            .catch(error => {
                this.setState({saving: false});
                toastr.error(error);
            });
    }

    deleteCourse(event) {
        //console.log('onDelete event', event);
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        this.setState({deleting: true});
        this.props.actions.deleteCourse(this.state.course)
            .then(() => {
                //console.log('after deleteCourse action');
                this.redirectDelete();
                //console.log('redirected');
            })
            .catch(error => {
                //console.log('caught error in delete hndler', error);
                this.setState({deleting: false});
                toastr.error(error);
            });
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
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                onDelete={this.deleteCourse}
                course={this.state.course}
                errors={this.state.errors}
                saving={this.state.saving}
                deleting={this.state.deleting}
            />
        );
    }
}

ManageCoursePage.propTypes =  {
    course: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired
};

// pull in react router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
    router: PropTypes.object // not required in order to avoid linting error from upcoming usage
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id === id);
    if (course.length) return course[0]; // filtering returns an array
    return null;
}

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

function mapDispatchToProps(dispatch) {
    //console.log('mapDispatchToProps', dispatch);
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
