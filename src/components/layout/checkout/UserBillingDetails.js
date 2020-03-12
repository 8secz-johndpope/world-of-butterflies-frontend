import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    updateShippingAddressById,
    saveNewShippingAddress,
    deleteShippingAddressById,
    getShippingAddresses,
    setAddressesForShoppingCart
} from "../../../service/fetchService/fetchService";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FormattedMessage} from "react-intl";


class UserBillingDetails extends Component {
    state = {
        billingAddressList: [],
        addressToFill: {
            id: "new",
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
        billingAddress: {
            id: "new",
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
        isChange: false,
        isBillingAddressChanged: false,
        isShippingAddressDifferent: false,
        isShippingAddressInputsDisabled: false,
        isBillingAddressInputsDisabled: false,
        isCheckboxDisabled: false,
    };

    componentDidMount(): void {
        getShippingAddresses()
            .then(resp => {
                    this.setState({
                        billingAddressList: resp,
                    })
                }
            )
    }

    handleChange = (e) => {
        this.setState({
            addressToFill: {
                ...this.state.addressToFill,
                [e.target.name]: e.target.value,
            },
            isChange: true
        });
    };

    handleBillingAddressChange = (e) => {
        this.setState({
            billingAddress: {
                ...this.state.billingAddress,
                [e.target.name]: e.target.value,
            },
            isBillingAddressChanged: true
        });
    };


    handleCheckbox = () => {
        this.setState({
            isShippingAddressDifferent: !this.state.isShippingAddressDifferent,
        })
    };

    chooseAddress = (id) => {
        if (id !== "new") {
            let addressToFill = this.state.billingAddressList.filter(address => address.id === id);
            this.setState({
                addressToFill: addressToFill[0],
            }, () => this.changeAccessibility());
            // this.setChosenShippingAddress(addressToFill[0]);
        } else {
            this.clearAddressToFil();
        }
    };

    chooseBillingAddress = (id) => {
        if (id !== "new") {
            let billingAddressToFill = this.state.billingAddressList.filter(address => address.id === id);
            this.setState({
                billingAddress: billingAddressToFill[0],
            }, () => this.changeAccessibility());
            // this.setChosenShippingAddress(addressToFill[0]);
        } else {
            this.clearBillingAddressToFil();
        }
    };


    clearAddressToFil = () => {
        this.setState({
            addressToFill: {
                id: "new",
                nickName: "",
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
        }, () => this.changeAccessibility())
    };

    clearBillingAddressToFil = () => {
        this.setState({
            billingAddress: {
                id: "new",
                nickName: "",
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
        }, () => this.changeAccessibility())
    };

    saveModifiedChanges = () => {
        if (this.state.addressToFill.id !== "new") {
            updateShippingAddressById(this.state.addressToFill, this.state.addressToFill.id)
                .then(resp =>
                    this.setState({
                        billingAddressList: resp,
                    })
                );
        } else {
            saveNewShippingAddress(this.state.addressToFill)
                .then(resp =>
                    this.setState({
                        billingAddressList: resp,
                    })
                );
        }
        this.setState({
            isChange: false
        });
        // this.props.setChosenShippingAddress(this.state.addressToFill);
    };

    saveModifiedBillingChanges = () => {
        if (this.state.billingAddress.id !== "new") {
            updateShippingAddressById(this.state.billingAddress, this.state.billingAddress.id)
                .then(resp =>
                    this.setState({
                        billingAddressList: resp,
                    })
                );
        } else {
            saveNewShippingAddress(this.state.billingAddress)
                .then(resp =>
                    this.setState({
                        billingAddressList: resp,
                    })
                );
        }
        this.setState({
            isBillingAddressChanged: false
        });
        // this.props.setChosenShippingAddress(this.state.addressToFill);
    };

    deleteAddressById = (id) => {
        deleteShippingAddressById(id)
            .then(resp =>
                this.setState({
                    billingAddressList: resp,
                }, () => this.clearAddressToFil())
            );
    };

    setChosenAddressesInParentComponent = () => {
        this.props.setChosenAddresses()
    };

    sendChosenAddressesToTheSever = () => {
        if (this.state.isShippingAddressDifferent) {

        }
    };

    changeAccessibility = () => {
        if (this.state.billingAddress.id === this.state.addressToFill.id) {
            if (!this.state.isBillingAddressInputsDisabled)
                this.setState({
                    isBillingAddressInputsDisabled: true,
                })
        } else {
            if (this.state.isBillingAddressInputsDisabled) {
                this.setState({
                    isBillingAddressInputsDisabled: false,
                })
            }
        }
    };

    saveAddresses = () => {
        this.setState({
            isCheckboxDisabled: true,
            isShippingAddressInputsDisabled: true,
            isBillingAddressInputsDisabled: true,
        });
        setAddressesForShoppingCart(this.state.addressToFill.id, this.state.billingAddress.id);
    };

    makeEditable = () => {
        this.setState({
            isCheckboxDisabled: false,
            isShippingAddressInputsDisabled: false,
            isBillingAddressInputsDisabled: false,
        });
    };

    render() {
        return (
            <div className="user-billing-detail-container">
                <div className="billing-selector-and-input-field-container">
                    <div className="billing-address-container">
                        {
                            this.state.isChange ?
                                <div>
                                    <button
                                        className="action-btn-sm"
                                        onClick={this.saveModifiedChanges}>
                                        <FormattedMessage id="app.checkout.save-changes"/>
                                    </button>
                                </div>
                                :
                                null
                        }
                        <div className="billing-address">
                            <h3 onClick={() => this.chooseAddress("new")}>
                                <FormattedMessage id="app.checkout.add-new-address"/>
                            </h3>
                        </div>
                        {
                            this.state.billingAddressList ?
                                <React.Fragment>
                                    {
                                        this.state.billingAddressList.map(address =>
                                            <div className="billing-address">
                                                <h3 onClick={() => this.chooseAddress(address.id)}>
                                                    <FontAwesomeIcon
                                                        icon={faTrashAlt}
                                                        className="delete-btn"
                                                        onClick={() => this.deleteAddressById(address.id)}
                                                    />
                                                    {address.nickName}</h3>
                                            </div>
                                        )}
                                </React.Fragment>
                                :
                                null
                        }
                    </div>
                    <div className="billing-form-container">
                        <form className="billing-form">
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.nickname"/>
                                </p>
                                <input type="text"
                                       name="nickName"
                                       value={this.state.addressToFill.nickName}
                                       onChange={this.handleChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled? 'disabled' : null}
                                />
                            </label>
                            <span className="billing-half-style">
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.first-name"/>
                                </p>
                                <input type="text"
                                       name="firstName"
                                       value={this.state.addressToFill.firstName}
                                       onChange={this.handleChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled? 'disabled' : null}
                                />
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.last-name"/>
                                </p>
                                <input type="text"
                                       name="lastName"
                                       value={this.state.addressToFill.lastName}
                                       onChange={this.handleChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled? 'disabled' : null}
                                />
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
                                       onChange={this.handleChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled? 'disabled' : null}
                                />
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.city"/>
                                </p>
                                <input type="text"
                                       name="city"
                                       value={this.state.addressToFill.city}
                                       onChange={this.handleChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled? 'disabled' : null}
                                />
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
                                       onChange={this.handleChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled? 'disabled' : null}
                                />
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.country"/>
                                </p>
                                <input type="text"
                                       name="country"
                                       value={this.state.addressToFill.country}
                                       onChange={this.handleChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled? 'disabled' : null}
                                />
                            </label>
                        </span>

                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.phone-number"/>
                                </p>
                                <input type="text"
                                       name="phoneNumber"
                                       value={this.state.addressToFill.phoneNumber ? this.state.addressToFill.phoneNumber : ''}
                                       onChange={this.handleChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled? 'disabled' : null}
                                />
                            </label>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.company"/>
                                </p>
                                <input type="text"
                                       name="company"
                                       value={this.state.addressToFill.company ? this.state.addressToFill.company : ''}
                                       onChange={this.handleChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled? 'disabled' : null}
                                />
                            </label>

                            <span className="billing-half-style">
                            <label>
                                <p>
                                    IČO:
                                </p>
                                <input type="text"
                                       name="ico"
                                       value={this.state.addressToFill.ico ? this.state.addressToFill.ico : ''}
                                       onChange={this.handleChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled? 'disabled' : null}
                                />
                            </label>
                            <label>
                                <p>
                                    DIČ:
                                </p>
                                <input type="text"
                                       name="dic"
                                       value={this.state.addressToFill.dic ? this.state.addressToFill.dic : ''}
                                       onChange={this.handleChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled? 'disabled' : null}
                                />
                            </label>
                        </span>
                        </form>


                        <label className="different-address-checkbox">
                            <input type="checkbox"
                                   onChange={this.handleCheckbox}
                                   disabled={this.state.isCheckboxDisabled}
                                   className={this.state.isCheckboxDisabled? 'disabled different-add-check' : 'different-address-checkbox-input different-add-check'}
                            />
                            <p className={this.state.isCheckboxDisabled? 'disabled-paragraph' : 'different-address-checkbox-p'}>
                                <FormattedMessage id="app.checkout.ship-different-addr"/>
                            </p>
                        </label>

                    </div>

                </div>
                {this.state.isShippingAddressDifferent ?
                    <div className="billing-selector-and-input-field-container">
                        <div className="billing-address-container">
                            {
                                this.state.isBillingAddressChanged ?
                                    <div>
                                        <button
                                            className="action-btn-sm"
                                            onClick={this.saveModifiedBillingChanges}>
                                            <FormattedMessage id="app.checkout.save-changes"/>
                                        </button>
                                    </div>
                                    :
                                    null
                            }
                            <div className="billing-address">
                                <h3 onClick={() => this.chooseBillingAddress("new")}>
                                    <FormattedMessage id="app.checkout.add-new-address"/>
                                </h3>
                            </div>
                            {
                                this.state.billingAddressList ?
                                    <React.Fragment>
                                        {
                                            this.state.billingAddressList.map(address =>
                                                <div className="billing-address">
                                                    <h3 onClick={() => this.chooseBillingAddress(address.id)}>
                                                        <FontAwesomeIcon
                                                            icon={faTrashAlt}
                                                            className="delete-btn"
                                                            onClick={() => this.deleteAddressById(address.id)}
                                                        />
                                                        {address.nickName}</h3>
                                                </div>
                                            )}
                                    </React.Fragment>
                                    :
                                    null
                            }
                        </div>
                        <div>

                            <div className="additional-shipping-address-in-billing-form">

                                <form className="billing-form">
                                    <label>
                                        <p>
                                            <FormattedMessage id="app.checkout.form.nickname"/>
                                        </p>
                                        <input type="text"
                                               name="nickName"
                                               value={this.state.billingAddress.nickName}
                                               onChange={this.handleBillingAddressChange}
                                               disabled={this.state.isBillingAddressInputsDisabled}
                                               className={this.state.isBillingAddressInputsDisabled? 'disabled' : null}
                                        />
                                    </label>
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
                                                   className={this.state.isBillingAddressInputsDisabled? 'disabled' : null}
                                            />
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
                                                   className={this.state.isBillingAddressInputsDisabled? 'disabled' : null}
                                            />
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
                                                   className={this.state.isBillingAddressInputsDisabled? 'disabled' : null}
                                            />
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
                                                   className={this.state.isBillingAddressInputsDisabled? 'disabled' : null}
                                            />
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
                                                   className={this.state.isBillingAddressInputsDisabled? 'disabled' : null}
                                            />
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
                                                   className={this.state.isBillingAddressInputsDisabled? 'disabled' : null}
                                            />
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
                                               className={this.state.isBillingAddressInputsDisabled? 'disabled' : null}
                                        />
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
                                               className={this.state.isBillingAddressInputsDisabled? 'disabled' : null}
                                        />
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
                                                   className={this.state.isBillingAddressInputsDisabled? 'disabled' : null}
                                            />
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
                                                   className={this.state.isBillingAddressInputsDisabled? 'disabled' : null}
                                            />
                                        </label>
                                    </span>
                                </form>
                            </div>

                        </div>
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
                                    className="address-changes-btn">Save
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
        setSubtotal: function (subtotal) {
            const action = {type: "setSubtotal", subtotal};
            dispatch(action);
        },
    }
};

export default connect(null, mapDispatchToProps)(UserBillingDetails);
