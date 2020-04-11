import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import LoginModal from "../../header/LoginModal";
import RegisterModal from "../../header/RegisterModal";
import UserBillingDetails from "./UserBillingDetails";
import GuestBillingDetails from "./GuestBillingDetails";
import {FormattedMessage} from "react-intl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import StatusBar from "../../shared/statusBar/StatusBar";
import {withRouter} from 'react-router-dom'

class Checkout extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        isUser: true,
    };

    componentDidMount(): void {
        this.clearShippingAndPaymentCost();
        this.redirectBackIfCartIsEmpty()
    }

    redirectBackIfCartIsEmpty = () => {
        if (this.props.productsInShoppingCart.length === 0) {
            this.props.history.push('/cart')
        }
    };

    clearShippingAndPaymentCost = () => {
        this.props.setShippingCost(0);
        this.props.setPaymentCost(0);
    };

    setOption = (boolean) => {
        this.setState({
            isUser: boolean,
        })
    };

    toOverviewClickHandler = () => {
        // this.props.chosenShippingAddress
        // this.props.chosenBillingAddress

    };

    render() {
        return (
            <div className="vertical-container">
                <StatusBar
                    position={2}>
                </StatusBar>
                <div className="billing-information-container">
                    {
                        this.props.isLoggedIn ?
                            null
                            :
                            <div className="tab-options">
                                <h3
                                    className={this.state.isUser ? 'active-checkout-tab-option' : 'non-active-checkout-tab-option'}
                                    onClick={() => this.setOption(true)}
                                >
                                    <FormattedMessage id="app.checkout.user"/>
                                </h3>

                                <h3
                                    className={this.state.isUser ? 'non-active-checkout-tab-option' : 'active-checkout-tab-option'}
                                    onClick={() => this.setOption(false)}
                                >
                                    <FormattedMessage id="app.checkout.guest"/>
                                </h3>

                            </div>
                    }
                    <div
                        id='tab1'
                        className={this.state.isUser ? 'active-checkout-tab-content' : 'non-active-checkout-tab-content'}>
                        {
                            this.props.isLoggedIn ?
                                <div className="billing-info-container">
                                    <UserBillingDetails
                                    />
                                </div>
                                :
                                <div className="user-register-login-container">
                                    <div>
                                        <LoginModal
                                            fontSize={'20px'}
                                            isTitleVisible={true}/>
                                    </div>
                                </div>
                        }
                    </div>
                    <div
                        id='tab2'
                        className={this.state.isUser ? 'non-active-checkout-tab-content' : 'active-checkout-tab-content'}>
                        <GuestBillingDetails/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        subtotal: state.subtotal,
        isLoggedIn: state.isLoggedIn,
        email: state.email,
        productsInShoppingCart: state.productsInShoppingCart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSubtotal: function (subtotal) {
            const action = {type: "setSubtotal", subtotal};
            dispatch(action);
        },
        setShippingCost: function (newShippingCost) {
            const action = {type: "setShippingCost", newShippingCost};
            dispatch(action);
        },
        setPaymentCost: function (newPaymentCost) {
            const action = {type: "setPaymentCost", newPaymentCost};
            dispatch(action);
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
