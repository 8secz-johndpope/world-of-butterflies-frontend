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

class Checkout extends Component {
    state = {
        isUser: true,
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
                <div className="billing-information-and-subtotal-container">
                    <div className="billing-information-container">
                        <div className="tab-options">
                            <h3
                                className={this.state.isUser ? 'active-checkout-tab-option' : 'non-active-checkout-tab-option'}
                                onClick={() => this.setOption(true)}
                            >
                                <FormattedMessage id="app.checkout.user"/>
                            </h3>
                            {
                                this.props.isLoggedIn ?
                                    null
                                    :
                                    <h3
                                        className={this.state.isUser ? 'non-active-checkout-tab-option' : 'active-checkout-tab-option'}
                                        onClick={() => this.setOption(false)}
                                    >
                                        <FormattedMessage id="app.checkout.guest"/>
                                    </h3>
                            }
                        </div>
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


                    <div className="subtotal-container">
                        <h1>Cart Totals</h1>
                        <p>
                            <FormattedMessage id="app.shopping.cart.shipping"/>
                            bla bla</p>
                        <p>
                            <FormattedMessage id="app.shopping.cart.sub-total"/>
                        </p>
                        <h1>{this.props.subtotal.toFixed(2)}</h1>
                        <Link to="/order-complete"
                              className="action-btn-lg"
                              onClick={this.toOverviewClickHandler}
                              style={{
                                  textDecoration: 'none',
                              }}
                        >
                            <FormattedMessage id="app.shopping.cart.to-order-overview"/>
                        </Link>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSubtotal: function (subtotal) {
            const action = {type: "setSubtotal", subtotal};
            dispatch(action);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
