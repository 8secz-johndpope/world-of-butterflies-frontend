import React, {Component} from 'react';
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";


class GuestBillingDetails extends Component {
    state = {
        addressToFill: {
            firstName: "",
            lastName: "",
            company: "",
            addressLineOne: "",
            addressLineTwo: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            phoneNumber: ""
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
            phoneNumber2: ""
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
                        <label>
                            <p>
                                <FormattedMessage id="app.checkout.form.company"/>
                            </p>
                            <input type="text"
                                   name="company"
                                   value={this.state.addressToFill.company ? this.state.addressToFill.company : ''}
                                   onChange={this.handleChange}/>
                        </label>
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
                                <FormattedMessage id="app.checkout.form.addr-line-two"/>
                            </p>
                            <input type="text"
                                   name="addressLineTwo"
                                   value={this.state.addressToFill.addressLineTwo ? this.state.addressToFill.addressLineTwo : ''}
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
                        <label>
                            <p>
                                <FormattedMessage id="app.checkout.form.state"/>
                            </p>
                            <input type="text"
                                   name="state"
                                   value={this.state.addressToFill.state}
                                   onChange={this.handleChange}/>
                        </label>
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
                        <label>
                            <p>
                                <FormattedMessage id="app.checkout.form.phone-number"/>
                            </p>
                            <input type="text"
                                   name="phoneNumber"
                                   value={this.state.addressToFill.phoneNumber ? this.state.addressToFill.phoneNumber : ''}
                                   onChange={this.handleChange}/>
                        </label>
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
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.first-name"/>
                                </p>
                                <input type="text"
                                       name="firstName2"
                                       value={this.state.additionalShippingAddress.firstName2}
                                       onChange={this.handleAdditionalChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.last-name"/>
                                </p>
                                <input type="text"
                                       name="lastName2"
                                       value={this.state.additionalShippingAddress.lastName2}
                                       onChange={this.handleAdditionalChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.company"/>
                                </p>
                                <input type="text"
                                       name="company2"
                                       value={this.state.additionalShippingAddress.company2}
                                       onChange={this.handleAdditionalChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.addr-line-one"/>
                                </p>
                                <input type="text"
                                       name="addressLineOne2"
                                       value={this.state.additionalShippingAddress.addressLineOne2}
                                       onChange={this.handleAdditionalChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.addr-line-two"/>
                                </p>
                                <input type="text"
                                       name="addressLineTwo2"
                                       value={this.state.additionalShippingAddress.addressLineTwo2}
                                       onChange={this.handleAdditionalChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.city"/>
                                </p>
                                <input type="text"
                                       name="city2"
                                       value={this.state.additionalShippingAddress.city2}
                                       onChange={this.handleAdditionalChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.state"/>
                                </p>
                                <input type="text"
                                       name="state2"
                                       value={this.state.additionalShippingAddress.state2}
                                       onChange={this.handleAdditionalChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.zip"/>
                                </p>
                                <input type="text"
                                       name="zipCode2"
                                       value={this.state.additionalShippingAddress.zipCode2}
                                       onChange={this.handleAdditionalChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.country"/>
                                </p>
                                <input type="text"
                                       name="country2"
                                       value={this.state.additionalShippingAddress.country2}
                                       onChange={this.handleAdditionalChange}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.phone-number"/>
                                </p>
                                <input type="text"
                                       name="phoneNumber2"
                                       value={this.state.additionalShippingAddress.phoneNumber2}
                                       onChange={this.handleAdditionalChange}/>
                            </label>
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
