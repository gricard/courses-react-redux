import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import {browserHistory} from 'react-router';

class AuthorsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    }

    authorRow(author, index) {
        return <div key={index}>{author.firstName} {author.lastName}</div>;
    }

    redirectToAddAuthorPage() {
        browserHistory.push('/author');
    }

    render() {
        // destructuring
        // could also do authors = this.props.authors
        const {authors} = this.props;

        return (
            <div>
                <h1>Authors</h1>
                <input type="submit"
                    value="Add Author"
                    className="btn btn-primary"
                    onClick={this.redirectToAddAuthorPage}
                    />
                <AuthorList authors={authors} />
            </div>
        );
    }
}

AuthorsPage.propTypes = {
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// connect data from state to properties for components
function mapStateToProps(state, ownProps) {
    return {
        authors: state.authors // connected to label in root reducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
//        createAuthor: (author) => dispatch(authorActions.createAuthor(author))
//        createAuthor: bindActionCreators(authorActions.createAuthor, dispatch)
        actions: bindActionCreators(authorActions, dispatch)
    };
}

// more verbose wau
//const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
//export default connectedStateAndProps(AuthorsPage);

// ignore dispatch for now and use default
export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
