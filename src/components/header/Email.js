import React, {Component} from 'react';
import {connect} from 'react-redux';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class Email extends Component {
    render() {
        return (
            <React.Fragment>
                <button
                    className="header-modal-btn"
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

export default connect(mapStateToProps, null)(Email);
