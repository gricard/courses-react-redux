// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect as reduxConnect} from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header
                    loading={this.props.loading}
                    courses={this.props.courses}
                    authors={this.props.authors}
                />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired
};


// REDUX
function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0,
        courses: state.courses,
        authors: state.authors
    };
}

// REDUX connect state
export default reduxConnect(mapStateToProps)(App);
