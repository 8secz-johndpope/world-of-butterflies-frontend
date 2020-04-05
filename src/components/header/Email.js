import React, {Component} from 'react';
import {connect} from 'react-redux';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withRouter} from 'react-router-dom'

class Email extends Component {
    constructor(props) {
        super(props)
    }

    redirectToProfile = () => {
        this.props.history.push('/profile');
    };

    render() {
        return (
            <React.Fragment>
                <button
                    title={this.props.email}
                    className="header-modal-btn"
                    onClick={this.redirectToProfile}
                >
                    <FontAwesomeIcon icon={faUser}/>
                </button>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.email,
    }
}

export default withRouter(connect(mapStateToProps, null)(Email));
