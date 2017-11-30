// This component handles the App template used on every page.
import React from "react";
import Header from "./common/Header";
import { connect as reduxConnect } from "react-redux";
import Main from "./common/Main";
import { Provider } from "react-redux";
import { withRouter } from "react-router-dom";

const App = props => (
    <Provider store={props.store}>
        <div className="container-fluid">
            <Header
                loading={props.loading}
                courses={props.courses}
                authors={props.authors}
            />
            <Main />
        </div>
    </Provider>
);

// REDUX
function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0,
        courses: state.courses,
        authors: state.authors,
    };
}

// React Router HOC & REDUX connect state
export default withRouter(reduxConnect(mapStateToProps)(App));
