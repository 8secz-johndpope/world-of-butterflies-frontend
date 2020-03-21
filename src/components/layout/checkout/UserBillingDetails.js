import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    updateShippingAddressById,
    saveNewShippingAddress,
    deleteShippingAddressById,
    getShippingAddresses,
    setAddressesForShoppingCart, updateShoppingCart
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
        this.getAllTheShippingAddresses();
        this.saveShoppingCartToServer();
    }

    getAllTheShippingAddresses = () => {
        getShippingAddresses()
            .then(resp => {
                    this.setState({
                        billingAddressList: resp,
                    })
                }
            )
    };

    saveShoppingCartToServer = () => {
        if (this.props.productsInShoppingCart.length > 0) {
            let entityIds = [];

            // eslint-disable-next-line array-callback-return
            this.props.productsInShoppingCart.filter((wrappedProduct, index) =>
                index === this.props.productsInShoppingCart.findIndex(
                elem => elem.product.id === wrappedProduct.product.id &&
                    elem.chosenFrame.colour === wrappedProduct.chosenFrame.colour
                )).map((wrappedProduct) => {

                    let productId = wrappedProduct.product.id;
                    let frameId = wrappedProduct.chosenFrame.id;
                    let qty = this.countQtyByIdAndFrameColour(wrappedProduct.product.id, wrappedProduct.chosenFrame.colour);
                    entityIds.push({productId, frameId, qty})
                }
            );

            let object = {'entityIds': entityIds};
            console.log(object);
            updateShoppingCart(object)
                .then(resp => console.log(resp))
        }
    };

    countQtyByIdAndFrameColour = (id, frameColour) => {
        const countTypes = this.props.productsInShoppingCart.filter(
            wrappedProduct => wrappedProduct.product.id === id &&
                wrappedProduct.chosenFrame.colour === frameColour
        );
        return countTypes.length;
    };


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
        if (!this.state.isCheckboxDisabled) {
            if (id !== "new") {
                let addressToFill = this.state.billingAddressList.filter(address => address.id === id);
                this.setState({
                    addressToFill: addressToFill[0],
                }, () => this.changeAccessibility());
                // this.setChosenShippingAddress(addressToFill[0]);
            } else {
                this.clearAddressToFil();
            }
        }
    };

    chooseBillingAddress = (id) => {
        if (!this.state.isCheckboxDisabled) {
            if (id !== "new") {
                let billingAddressToFill = this.state.billingAddressList.filter(address => address.id === id);
                this.setState({
                    billingAddress: billingAddressToFill[0],
                }, () => this.changeAccessibility());
                // this.setChosenShippingAddress(addressToFill[0]);
            } else {
                this.clearBillingAddressToFil();
            }
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
                        addressToFill: resp,
                    }, () => this.getAllTheShippingAddresses())
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
                        billingAddress: resp,
                    }, () => this.getAllTheShippingAddresses())
                );
        }
        this.setState({
            isBillingAddressChanged: false
        });
    };

    deleteAddressById = (id) => {
        if (!this.state.isCheckboxDisabled) {
            deleteShippingAddressById(id)
                .then(resp =>
                    this.setState({
                        billingAddressList: resp,
                    }, () => this.clearAddressToFil())
                );
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
        if (this.state.addressToFill.id !== 'new') {
            this.setState({
                isCheckboxDisabled: true,
                isShippingAddressInputsDisabled: true,
                isBillingAddressInputsDisabled: true,
            });
            this.sendAddressesForTheServer(this.state.addressToFill.id, this.state.billingAddress.id);
        }
    };

    sendAddressesForTheServer = (shippingAddressId, billingAddressId) => {
        if (this.state.addressToFill.id !== 'new' && !this.state.isShippingAddressDifferent) {
            setAddressesForShoppingCart(shippingAddressId, shippingAddressId);
        } else if (this.state.addressToFill.id !== 'new' && this.state.billingAddress.id !== 'new' && this.state.isShippingAddressDifferent) {
            setAddressesForShoppingCart(shippingAddressId, billingAddressId);
        } else if (this.state.addressToFill.id !== 'new' && this.state.billingAddress.id !== 'new' && !this.state.isShippingAddressDifferent) {
            setAddressesForShoppingCart(shippingAddressId, shippingAddressId);
        }


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
                            <h3 onClick={() => this.chooseAddress("new")}
                                className={this.state.isCheckboxDisabled ? 'disabled-paragraph ' : 'billing-address-title'}
                            >
                                <FormattedMessage id="app.checkout.add-new-address"/>
                            </h3>
                        </div>
                        {
                            this.state.billingAddressList ?
                                <React.Fragment>
                                    {
                                        this.state.billingAddressList.map(address =>
                                            <div className="billing-address">
                                                <h3 onClick={() => this.chooseAddress(address.id)}
                                                    className={this.state.isCheckboxDisabled ? 'disabled-paragraph ' : 'billing-address-title'}
                                                >
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
                            <p>{this.state.addressToFill.id}</p>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.nickname"/>
                                </p>
                                <input type="text"
                                       name="nickName"
                                       value={this.state.addressToFill.nickName}
                                       onChange={this.handleChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}
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
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}
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
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}
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
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}
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
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}
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
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}
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
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}
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
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}
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
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}
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
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}
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
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}
                                />
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
                                <h3 onClick={() => this.chooseBillingAddress("new")}
                                    className={this.state.isCheckboxDisabled ? 'disabled-paragraph ' : 'billing-address-title'}
                                >
                                    <FormattedMessage id="app.checkout.add-new-address"/>
                                </h3>
                            </div>
                            {
                                this.state.billingAddressList ?
                                    <React.Fragment>
                                        {
                                            this.state.billingAddressList.map(address =>
                                                <div className="billing-address">
                                                    <h3 onClick={() => this.chooseBillingAddress(address.id)}
                                                        className={this.state.isCheckboxDisabled ? 'disabled-paragraph ' : 'billing-address-title'}
                                                    >
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
                                    <p>{this.state.billingAddress.id}</p>
                                    <label>
                                        <p>
                                            <FormattedMessage id="app.checkout.form.nickname"/>
                                        </p>
                                        <input type="text"
                                               name="nickName"
                                               value={this.state.billingAddress.nickName}
                                               onChange={this.handleBillingAddressChange}
                                               disabled={this.state.isBillingAddressInputsDisabled}
                                               className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}
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
                                                   className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}
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
                                                   className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}
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
                                                   className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}
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
                                                   className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}
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
                                                   className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}
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
                                                   className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}
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
                                               className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}
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
                                               className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}
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
                                                   className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}
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
                                                   className={this.state.isBillingAddressInputsDisabled ? 'disabled' : null}
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
                                    className={this.state.addressToFill.id === 'new' ? 'address-changes-btn disabled-paragraph ' : 'address-changes-btn pointer'}>Save

                            </button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        productsInShoppingCart: state.productsInShoppingCart,
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

export default connect(mapStateToProps, mapDispatchToProps)(UserBillingDetails);
