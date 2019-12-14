import React, {Component} from 'react';
import {connect} from 'react-redux';

class LogoutBtn extends Component {

    doLogout = () => {
        this.props.setUserEmail("");
        this.props.setLoggedIn(false);
        this.props.setBillingAddressList("");

    };

    render() {
        return (
            <React.Fragment>
                <button
                    onClick={this.doLogout}
                    className="header-modal-btn"
                >Logout</button>

            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserEmail: function (email) {
            const action = {type: "setUserEmail", email};
            dispatch(action);
        },
        setLoggedIn: function (boolean) {
            const action = {type: "setLoggedIn", boolean};
            dispatch(action);
        },
        setBillingAddressList: function (billingAddressList) {
            const action = {type: "setBillingAddressList", billingAddressList};
            dispatch(action);
        },
    }
};

export default connect(null, mapDispatchToProps)(LogoutBtn);
