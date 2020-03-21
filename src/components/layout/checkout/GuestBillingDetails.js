import React, {Component} from 'react';
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";


class GuestBillingDetails extends Component {
    state = {
        shippingAddress: {
            firstName: "",
            lastName: "",
            company: "",
            addressLineOne: "",
            addressLineTwo: "",
            city: "",
            zipCode: "",
            country: "",
            phoneNumber: "",
            ico: "",
            dic: "",
        },
        billingAddress: {
            firstName: "",
            lastName: "",
            company: "",
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
        isBillingAddressDifferent: false,
        isBillingAddressChanged: false,
        isShippingAddressInputsDisabled: false,
        isBillingAddressInputsDisabled: false,
        isCheckboxDisabled: false,
    };

    handleShippingAddressChange = (e) => {
        this.setState({
                shippingAddress: {
                    ...this.state.shippingAddress,
                    [e.target.name]: e.target.value,
                },
            },
            () => this.props.setChosenShippingAddress(this.state.shippingAddress));

    };
    handleBillingAddressChange = (e) => {
        this.setState({
                billingAddress: {
                    ...this.state.billingAddress,
                    [e.target.name]: e.target.value,
                },
            },
            () => this.props.setChosenBillingAddress(this.state.billingAddress));

    };

    handleCheckbox = () => {
        this.setState({
            isBillingAddressDifferent: !this.state.isBillingAddressDifferent,
        })
    };

    makeEditable = () => {
        this.setState({
            isCheckboxDisabled: false,
            isShippingAddressInputsDisabled: false,
            isBillingAddressInputsDisabled: false,
        });
    };

    saveAddresses = () => {
            this.setState({
                isCheckboxDisabled: true,
                isShippingAddressInputsDisabled: true,
                isBillingAddressInputsDisabled: true,
            });
    };

    render() {
        return (
            <div>

                <div className="billing-form-container">
                    <form className="billing-form">
                        <span className="billing-half-style">
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.first-name"/>
                                </p>
                                <input type="text"
                                       name="firstName"
                                       value={this.state.shippingAddress.firstName}
                                       onChange={this.handleShippingAddressChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.last-name"/>
                                </p>
                                <input type="text"
                                       name="lastName"
                                       value={this.state.shippingAddress.lastName}
                                       onChange={this.handleShippingAddressChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                        </span>
                        <span className="billing-half-style">
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.addr-line-one"/>
                                </p>
                                <input type="text"
                                       name="addressLineOne"
                                       value={this.state.shippingAddress.addressLineOne}
                                       onChange={this.handleShippingAddressChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.city"/>
                                </p>
                                <input type="text"
                                       name="city"
                                       value={this.state.shippingAddress.city}
                                       onChange={this.handleShippingAddressChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                        </span>
                        <span className="billing-half-style">
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.zip"/>
                                </p>
                                <input type="text"
                                       name="zipCode"
                                       value={this.state.shippingAddress.zipCode}
                                       onChange={this.handleShippingAddressChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.country"/>
                                </p>
                                <input type="text"
                                       name="country"
                                       value={this.state.shippingAddress.country}
                                       onChange={this.handleShippingAddressChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                        </span>
                        <label>
                            <p>
                                <FormattedMessage id="app.checkout.form.phone-number"/>
                            </p>
                            <input type="text"
                                   name="phoneNumber"
                                   value={this.state.shippingAddress.phoneNumber ? this.state.shippingAddress.phoneNumber : ''}
                                   onChange={this.handleShippingAddressChange}
                                   disabled={this.state.isShippingAddressInputsDisabled}
                                   className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}/>
                        </label>
                        <label>
                            <p>
                                <FormattedMessage id="app.checkout.form.company"/>
                            </p>
                            <input type="text"
                                   name="company"
                                   value={this.state.shippingAddress.company ? this.state.shippingAddress.company : ''}
                                   onChange={this.handleShippingAddressChange}
                                   disabled={this.state.isShippingAddressInputsDisabled}
                                   className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}/>
                        </label>
                        <span className="billing-half-style">
                            <label>
                                <p>
                                    IČO:
                                </p>
                                <input type="text"
                                       name="ico"
                                       value={this.state.shippingAddress.ico ? this.state.shippingAddress.ico : ''}
                                       onChange={this.handleShippingAddressChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                            <label>
                                <p>
                                    DIČ:
                                </p>
                                <input type="text"
                                       name="dic"
                                       value={this.state.shippingAddress.dic ? this.state.shippingAddress.dic : ''}
                                       onChange={this.handleShippingAddressChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                        </span>
                    </form>
                    <label className="different-address-checkbox">
                        <input type="checkbox"
                               onChange={this.handleCheckbox}
                               disabled={this.state.isCheckboxDisabled}
                               className={this.state.isCheckboxDisabled ? 'disabled different-add-check' : 'different-address-checkbox-input different-add-check'}
                        />
                        <p className={this.state.isCheckboxDisabled ? 'disabled-paragraph' : 'different-address-checkbox-p'}>
                            <FormattedMessage id="app.checkout.ship-different-addr"/>
                        </p>
                    </label>
                </div>

                {this.state.isBillingAddressDifferent ?
                    <div className="additional-shipping-address">
                        <form className="billing-form">
                            <span className="billing-half-style">
                                <label>
                                    <p>
                                        <FormattedMessage id="app.checkout.form.first-name"/>
                                    </p>
                                    <input type="text"
                                           name="firstName"
                                           value={this.state.billingAddress.firstName}
                                           onChange={this.handleBillingAddressChange}
                                           disabled={this.state.isBillingAddressInputsDisabled}
                                           className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}/>
                                </label>
                                <label>
                                    <p>
                                        <FormattedMessage id="app.checkout.form.last-name"/>
                                    </p>
                                    <input type="text"
                                           name="lastName"
                                           value={this.state.billingAddress.lastName}
                                           onChange={this.handleBillingAddressChange}
                                           disabled={this.state.isBillingAddressInputsDisabled}
                                           className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}/>
                                </label>
                            </span>
                            <span className="billing-half-style">
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.addr-line-one"/>
                                </p>
                                <input type="text"
                                       name="addressLineOne"
                                       value={this.state.billingAddress.addressLineOne}
                                       onChange={this.handleBillingAddressChange}
                                       disabled={this.state.isBillingAddressInputsDisabled}
                                       className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.city"/>
                                </p>
                                <input type="text"
                                       name="city"
                                       value={this.state.billingAddress.city}
                                       onChange={this.handleBillingAddressChange}
                                       disabled={this.state.isBillingAddressInputsDisabled}
                                       className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                        </span>
                            <span className="billing-half-style">
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.zip"/>
                                </p>
                                <input type="text"
                                       name="zipCode"
                                       value={this.state.billingAddress.zipCode}
                                       onChange={this.handleBillingAddressChange}
                                       disabled={this.state.isBillingAddressInputsDisabled}
                                       className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.country"/>
                                </p>
                                <input type="text"
                                       name="country"
                                       value={this.state.billingAddress.country}
                                       onChange={this.handleBillingAddressChange}
                                       disabled={this.state.isBillingAddressInputsDisabled}
                                       className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                        </span>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.phone-number"/>
                                </p>
                                <input type="text"
                                       name="phoneNumber"
                                       value={this.state.billingAddress.phoneNumber ? this.state.billingAddress.phoneNumber : ''}
                                       onChange={this.handleBillingAddressChange}
                                       disabled={this.state.isBillingAddressInputsDisabled}
                                       className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.company"/>
                                </p>
                                <input type="text"
                                       name="company"
                                       value={this.state.billingAddress.company ? this.state.billingAddress.company : ''}
                                       onChange={this.handleBillingAddressChange}
                                       disabled={this.state.isBillingAddressInputsDisabled}
                                       className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                            <span className="billing-half-style">
                            <label>
                                <p>
                                    IČO:
                                </p>
                                <input type="text"
                                       name="ico"
                                       value={this.state.billingAddress.ico ? this.state.billingAddress.ico : ''}
                                       onChange={this.handleBillingAddressChange}
                                       disabled={this.state.isBillingAddressInputsDisabled}
                                       className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                            <label>
                                <p>
                                    DIČ:
                                </p>
                                <input type="text"
                                       name="dic"
                                       value={this.state.billingAddress.dic ? this.state.billingAddress.dic : ''}
                                       onChange={this.handleBillingAddressChange}
                                       disabled={this.state.isBillingAddressInputsDisabled}
                                       className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>
                        </span>
                        </form>
                    </div>
                    :
                    null
                }
                <div className="save-edit-button-container">
                    {this.state.isCheckboxDisabled ?
                        <div className="address-changes-holder">
                            <button onClick={this.makeEditable}
                                    className="address-changes-btn">Edit
                            </button>
                        </div>
                        :
                        <div className="address-changes-holder">
                            <button onClick={this.saveAddresses}
                                    className={
                                        this.state.shippingAddress.firstName === '' ||
                                        this.state.shippingAddress.lastName === '' ||
                                        this.state.shippingAddress.addressLineOne === '' ||
                                        this.state.shippingAddress.city === '' ||
                                        this.state.shippingAddress.zipCode === '' ||
                                        this.state.shippingAddress.country === '' ||
                                        this.state.shippingAddress.phoneNumber === ''
                                            ? 'address-changes-btn disabled-paragraph ' : 'address-changes-btn pointer'}
                            >Save
                            </button>
                        </div>
                    }
                </div>
            </div>
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
