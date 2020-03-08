import React, {Component} from 'react';
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";


class GuestBillingDetails extends Component {
    state = {
        addressToFill: {
            firstName: "",
            lastName: "",
            addressLineOne: "",
            addressLineTwo: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            phoneNumber: "",
            ico: "",
            dic: "",
        },
        additionalShippingAddress: {
            firstName2: "",
            lastName2: "",
            company2: "",
            addressLineOne2: "",
            addressLineTwo2: "",
            city2: "",
            state2: "",
            zipCode2: "",
            country2: "",
            phoneNumber2: "",
            ico2: "",
            dic2: "",
        },
        isShippingAddressDifferent: false,
    };

    handleChange = (e) => {
        this.setState({
                addressToFill: {
                    ...this.state.addressToFill,
                    [e.target.name]: e.target.value,
                },
            },
            () => this.props.setChosenShippingAddress(this.state.addressToFill));

    };
    handleAdditionalChange = (e) => {
        this.setState({
                additionalShippingAddress: {
                    ...this.state.additionalShippingAddress,
                    [e.target.name]: e.target.value,
                },
            },
            () => this.props.setChosenBillingAddress(this.state.additionalShippingAddress));

    };

    handleCheckbox = () => {
        this.setState({
            isShippingAddressDifferent: !this.state.isShippingAddressDifferent,
        })
    };


    render() {
        return (
            <React.Fragment>

                <div className="billing-form-container">
                    <form className="billing-form">
                        <span className="billing-half-style">
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.first-name"/>
                                </p>
                                <input type="text"
                                       name="firstName"
                                       value={this.state.addressToFill.firstName}
                                       onChange={this.handleChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.last-name"/>
                                </p>
                                <input type="text"
                                       name="lastName"
                                       value={this.state.addressToFill.lastName}
                                       onChange={this.handleChange}/>
                            </label>
                        </span>
                        <span className="billing-half-style">
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.addr-line-one"/>
                                </p>
                                <input type="text"
                                       name="addressLineOne"
                                       value={this.state.addressToFill.addressLineOne}
                                       onChange={this.handleChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.city"/>
                                </p>
                                <input type="text"
                                       name="city"
                                       value={this.state.addressToFill.city}
                                       onChange={this.handleChange}/>
                            </label>
                        </span>
                        <span className="billing-half-style">
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.zip"/>
                                </p>
                                <input type="text"
                                       name="zipCode"
                                       value={this.state.addressToFill.zipCode}
                                       onChange={this.handleChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.country"/>
                                </p>
                                <input type="text"
                                       name="country"
                                       value={this.state.addressToFill.country}
                                       onChange={this.handleChange}/>
                            </label>
                        </span>
                        <label>
                            <p>
                                <FormattedMessage id="app.checkout.form.phone-number"/>
                            </p>
                            <input type="text"
                                   name="phoneNumber"
                                   value={this.state.addressToFill.phoneNumber ? this.state.addressToFill.phoneNumber : ''}
                                   onChange={this.handleChange}/>
                        </label>
                        <label>
                            <p>
                                <FormattedMessage id="app.checkout.form.company"/>
                            </p>
                            <input type="text"
                                   name="company"
                                   value={this.state.addressToFill.company ? this.state.addressToFill.company : ''}
                                   onChange={this.handleChange}/>
                        </label>
                        <span className="billing-half-style">
                            <label>
                                <p>
                                    IČO:
                                </p>
                                <input type="text"
                                       name="ico"
                                       value={this.state.addressToFill.ico ? this.state.addressToFill.ico : ''}
                                       onChange={this.handleChange}/>
                            </label>
                            <label>
                                <p>
                                    DIČ:
                                </p>
                                <input type="text"
                                       name="dic"
                                       value={this.state.addressToFill.dic ? this.state.addressToFill.dic : ''}
                                       onChange={this.handleChange}/>
                            </label>
                        </span>
                    </form>
                    <label className="different-address-checkbox">
                        <input type="checkbox"
                               onChange={this.handleCheckbox}
                        />
                        <p>
                            <FormattedMessage id="app.checkout.ship-different-addr"/>
                        </p>
                    </label>
                </div>

                {this.state.isShippingAddressDifferent ?
                    <div className="additional-shipping-address">
                        <form className="billing-form">
                            <span className="billing-half-style">
                                <label>
                                    <p>
                                        <FormattedMessage id="app.checkout.form.first-name"/>
                                    </p>
                                    <input type="text"
                                           name="firstName2"
                                           value={this.state.addressToFill.firstName2}
                                           onChange={this.handleChange}/>
                                </label>
                                <label>
                                    <p>
                                        <FormattedMessage id="app.checkout.form.last-name"/>
                                    </p>
                                    <input type="text"
                                           name="lastName2"
                                           value={this.state.addressToFill.lastName2}
                                           onChange={this.handleChange}/>
                                </label>
                            </span>
                            <span className="billing-half-style">
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.addr-line-one"/>
                                </p>
                                <input type="text"
                                       name="addressLineOne2"
                                       value={this.state.addressToFill.addressLineOne2}
                                       onChange={this.handleChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.city"/>
                                </p>
                                <input type="text"
                                       name="city2"
                                       value={this.state.addressToFill.city2}
                                       onChange={this.handleChange}/>
                            </label>
                        </span>
                            <span className="billing-half-style">
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.zip"/>
                                </p>
                                <input type="text"
                                       name="zipCode2"
                                       value={this.state.addressToFill.zipCode2}
                                       onChange={this.handleChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.country"/>
                                </p>
                                <input type="text"
                                       name="country2"
                                       value={this.state.addressToFill.country2}
                                       onChange={this.handleChange}/>
                            </label>
                        </span>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.phone-number"/>
                                </p>
                                <input type="text"
                                       name="phoneNumber2"
                                       value={this.state.addressToFill.phoneNumber2 ? this.state.addressToFill.phoneNumber2 : ''}
                                       onChange={this.handleChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.company"/>
                                </p>
                                <input type="text"
                                       name="company2"
                                       value={this.state.addressToFill.company2 ? this.state.addressToFill.company2 : ''}
                                       onChange={this.handleChange}/>
                            </label>
                            <span className="billing-half-style">
                            <label>
                                <p>
                                    IČO:
                                </p>
                                <input type="text"
                                       name="ico2"
                                       value={this.state.addressToFill.ico2 ? this.state.addressToFill.ico2 : ''}
                                       onChange={this.handleChange}/>
                            </label>
                            <label>
                                <p>
                                    DIČ:
                                </p>
                                <input type="text"
                                       name="dic2"
                                       value={this.state.addressToFill.dic2 ? this.state.addressToFill.dic2 : ''}
                                       onChange={this.handleChange}/>
                            </label>
                        </span>
                        </form>
                    </div>
                    :
                    null
                }

            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setChosenShippingAddress: function (chosenShippingAddress) {
            const action = {type: "setChosenShippingAddress", chosenShippingAddress};
            dispatch(action);
        },
        setChosenBillingAddress: function (chosenBillingAddress) {
            const action = {type: "setChosenBillingAddress", chosenBillingAddress};
            dispatch(action);
        },
    }
};
export default connect(null, mapDispatchToProps)(GuestBillingDetails);
