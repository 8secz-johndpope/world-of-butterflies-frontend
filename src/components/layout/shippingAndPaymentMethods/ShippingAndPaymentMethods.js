import React, {Component} from 'react';
import {getAllPaymentMethods, getAllShippingMethods} from "../../../service/fetchService/fetchService";
import StatusBar from "../../shared/statusBar/StatusBar";
import {connect} from "react-redux";

class ShippingAndPaymentMethods extends Component {
    state = {
        paymentMethods: [],
        shippingMethods: [],
        paymentMethodName: '',
        shippingMethodName: '',
    };

    componentDidMount(): void {
        this.getPaymentAndShippingInfo();
    }

    getPaymentAndShippingInfo = () => {
        getAllPaymentMethods()
            .then(resp => {
                    this.setState({
                        paymentMethods: resp
                    });
                    console.log(resp)
                }
            );
        getAllShippingMethods()
            .then(resp => {
                this.setState({
                    shippingMethods: resp
                })
            })
    };

    onRadioChange = (type, inputName) => {
        if (type === "payment") {
            this.setState({
                paymentMethodName: inputName
            })
        } else if (type === "shipping") {
            this.setState({
                shippingMethodName: inputName
            })
        }

    };

    render() {
        return (
            <div className="shipping-and-payment-container">
                <span className="shipping-and-payment-status-bar">
                    <StatusBar
                        position={3}>
                    </StatusBar>
                </span>
                <div className="payment-method-container">
                    {this.state.paymentMethods.map((paymentMethod) =>
                        <div className="payment-method">
                            <div className="payment-method-radio">
                                <input type="radio"
                                       name={paymentMethod.nameEN}
                                       checked={this.state.paymentMethodName === paymentMethod.nameEN}
                                       onChange={() => this.onRadioChange("payment", paymentMethod.nameEN)}
                                />
                            </div>
                            <div className="payment-method-name">
                                {paymentMethod["name" + this.props.preferredLanguage.toUpperCase()]}
                            </div>
                            <div className="payment-method-image">
                                <img src={serverURL + paymentMethod.imageUrl} alt="payment-method"/>
                            </div>
                        </div>
                    )}
                </div>
                <div className="shipping-method-container">
                    {this.state.shippingMethods.map((shippingMethod) =>
                        <div className="shipping-method">
                            <div className="shipping-method-radio">
                                <input type="radio"
                                       name={shippingMethod.nameEN}
                                       checked={this.state.shippingMethodName === shippingMethod.nameEN}
                                       onChange={() => this.onRadioChange("shipping", shippingMethod.nameEN)}
                                />
                            </div>
                            <div className="shipping-method-name">
                                {shippingMethod["name" + this.props.preferredLanguage.toUpperCase()]}
                            </div>
                            <div className="shipping-method-image">
                                <img src={serverURL + shippingMethod.imageUrl} alt="payment-method"/>
                            </div>
                        </div>
                    )}
                </div>
                <div className="total-price-container">
                    <div className="price">123,45€</div>
                    <div className="continue-btn">Continue </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        preferredLanguage: state.preferredLanguage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
};

const serverURL = process.env.REACT_APP_API_URL;
export default connect(mapStateToProps, mapDispatchToProps)(ShippingAndPaymentMethods);
