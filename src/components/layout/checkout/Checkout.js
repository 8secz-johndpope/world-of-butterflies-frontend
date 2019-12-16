import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import LoginModal from "../../header/LoginModal";
import RegisterModal from "../../header/RegisterModal";
import UserBillingDetails from "./UserBillingDetails";
import GuestBillingDetails from "./GuestBillingDetails";

class Checkout extends Component {
    state = {
        isUser: true,
    };

    setOption = (boolean) => {
        this.setState({
            isUser: boolean,
        })
    };

    payClickHandler = () => {
        // this.props.chosenShippingAddress
        // this.props.chosenBillingAddress

    };

    render() {
        return (
            <div className="billing-information-and-subtotal-container">
                <div className="billing-information-container">
                    <div className="tab-options">
                        <h1
                            className={this.state.isUser ? 'active-checkout-tab-option' : 'non-active-checkout-tab-option'}
                            onClick={() => this.setOption(true)}
                        >
                            User
                        </h1>
                        {
                            this.props.isLoggedIn ?
                                null
                                :
                                <h1
                                    className={this.state.isUser ? 'non-active-checkout-tab-option' : 'active-checkout-tab-option'}
                                    onClick={() => this.setOption(false)}
                                >
                                    Guest
                                </h1>
                        }
                    </div>
                    <div
                        id='tab1'
                        className={this.state.isUser ? 'active-checkout-tab-content' : 'non-active-checkout-tab-content'}>
                        {
                            this.props.isLoggedIn ?
                                <div className="billing-info-container">
                                    <UserBillingDetails/>
                                </div>
                                :
                                <div>
                                    <RegisterModal
                                        fontSize={'30px'}/>
                                    <LoginModal
                                        fontSize={'30px'}/>
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
                    <p>Shipping bla bla</p>
                    <p>Total:</p>
                    <h1>{this.props.subtotal.toFixed(2)}</h1>
                    <Link to="/pay"
                          className="action-btn-lg"
                          onClick={this.payClickHandler}
                          style={{
                              textDecoration: 'none',
                          }}
                    >Pay
                    </Link>
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
        chosenShippingAddress: state.chosenShippingAddress,
        chosenBillingAddress: state.chosenBillingAddress,
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
