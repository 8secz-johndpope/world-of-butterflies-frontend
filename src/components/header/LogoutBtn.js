import React, {Component} from 'react';
import {connect} from 'react-redux';
import {doLogout} from "../../service/fetchService/fetchService";
import {FormattedMessage} from "react-intl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";

class LogoutBtn extends Component {

    doLogoutAndClearLocalStorage = () => {
        doLogout();
        this.props.setUserEmail("");
        this.props.setLoggedIn(false);
        this.props.clearShoppingCart();
        this.props.clearTakenFramesList();
        this.props.setSubtotal(0);
        this.props.setShippingCost(0);
        this.props.setPaymentCost(0);
        this.props.setChosenShippingAddress("");
        this.props.setChosenBillingAddress("");

    };

    render() {
        return (
            <React.Fragment>
                <button
                    title="Log Out"
                    onClick={this.doLogoutAndClearLocalStorage}
                    className="header-modal-btn"
                >
                    <FontAwesomeIcon icon={faPowerOff}
                                     style={{fontSize: '12px'}}/>
                </button>

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
        clearShoppingCart: function () {
            const action = {type: "clearShoppingCart"};
            dispatch(action);
        },
        clearTakenFramesList: function () {
            const action = {type: "clearTakenFramesList"};
            dispatch(action);
        },
        setSubtotal: function (subtotal) {
            const action = {type: "setSubtotal", subtotal};
            dispatch(action);
        },
        setChosenShippingAddress: function (chosenShippingAddress) {
            const action = {type: "setChosenShippingAddress", chosenShippingAddress};
            dispatch(action);
        },
        setChosenBillingAddress: function (chosenBillingAddress) {
            const action = {type: "setChosenBillingAddress", chosenBillingAddress};
            dispatch(action);
        },
        setShippingCost: function (newShippingCost) {
            const action = {type: "setShippingCost", newShippingCost};
            dispatch(action);
        },
        setPaymentCost: function (newShippingCost) {
            const action = {type: "setPaymentCost", newShippingCost};
            dispatch(action);
        },
    }
};

export default connect(null, mapDispatchToProps)(LogoutBtn);
