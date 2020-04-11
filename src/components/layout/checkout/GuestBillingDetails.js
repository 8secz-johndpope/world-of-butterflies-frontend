import React, {Component} from 'react';
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {getAllCountries, updateGuestShoppingCart} from "../../../service/fetchService/fetchService";
import {withRouter} from "react-router-dom";


class GuestBillingDetails extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        countries: [],
        shippingAddress: {
            email: "",
            firstName: "",
            lastName: "",
            company: "",
            addressLineOne: "",
            addressLineTwo: "",
            city: "",
            zipCode: "",
            country: {
                id: 1,
                name: "",
                location: "",
            },
            phoneNumber: "",
            ico: "",
            dic: "",
        },
        billingAddress: {
            email: "",
            firstName: "",
            lastName: "",
            company: "",
            addressLineOne: "",
            addressLineTwo: "",
            city: "",
            state: "",
            zipCode: "",
            country: {
                id: 1,
                name: "",
                location: "",
            },
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

    componentDidMount(): void {
        this.getAllOfTheCountries();
        this.loadAddressFromSessionStorageIfExists();
    }

    loadAddressFromSessionStorageIfExists = () => {
        if (window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY) !== null) {
            let sessionStorage = JSON.parse(window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY));
            this.setState({
                shippingAddress: sessionStorage.chosenShippingAddress,
                billingAddress: sessionStorage.chosenBillingAddress
            });
            this.clearSessionStorage();

        }
    };

    clearSessionStorage = () => {
        window.sessionStorage.removeItem(process.env.REACT_APP_SESSION_STORAGE_KEY)
    };


    getAllOfTheCountries = () => {
        getAllCountries()
            .then(resp => {
                this.setState({
                    countries: resp
                })
            })
    };

    isAddressCorrectlyFilled = () => {
        if (this.state.isBillingAddressDifferent) {
            return this.state.shippingAddress.firstName === '' ||
                this.state.shippingAddress.lastName === '' ||
                this.state.shippingAddress.addressLineOne === '' ||
                this.state.shippingAddress.city === '' ||
                this.state.shippingAddress.zipCode === '' ||
                this.state.shippingAddress.country === '' ||
                this.state.shippingAddress.phoneNumber === '' ||
                this.state.billingAddress.lastName === '' ||
                this.state.billingAddress.addressLineOne === '' ||
                this.state.billingAddress.city === '' ||
                this.state.billingAddress.zipCode === '' ||
                this.state.billingAddress.country === '' ||
                this.state.billingAddress.phoneNumber === '';
        } else {
            return this.state.shippingAddress.firstName === '' ||
                this.state.shippingAddress.lastName === '' ||
                this.state.shippingAddress.addressLineOne === '' ||
                this.state.shippingAddress.city === '' ||
                this.state.shippingAddress.zipCode === '' ||
                this.state.shippingAddress.country === '' ||
                this.state.shippingAddress.phoneNumber === '';
        }
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

    countQtyByIdAndFrameColour = (id, frameColour) => {
        const countTypes = this.props.productsInShoppingCart.filter(
            wrappedProduct => wrappedProduct.product.id === id &&
                wrappedProduct?.chosenFrame?.colour === frameColour
        );
        return countTypes.length;
    };

    saveAddresses = () => {
        this.setState({
            isCheckboxDisabled: true,
            isShippingAddressInputsDisabled: true,
            isBillingAddressInputsDisabled: true,
        });
        this.updateGuestCartAndAddress();
    };

    updateGuestCartAndAddress = () => {
        let entityIds = [];
        let shippingAddressList = [];
        let productsInShoppingCart = [];
        let takenFrames = [];
        this.props.productsInShoppingCart.filter((wrappedProduct, index) =>
            index === this.props.productsInShoppingCart.findIndex(
            elem => elem.product.id === wrappedProduct.product.id &&
                elem?.chosenFrame?.colour === wrappedProduct?.chosenFrame?.colour
            )).map((wrappedProduct) => {

                let productId = wrappedProduct.product.id;
                let frameId = wrappedProduct?.chosenFrame?.id;
                let qty = this.countQtyByIdAndFrameColour(wrappedProduct.product.id, wrappedProduct?.chosenFrame?.colour);
                entityIds.push({productId, frameId, qty})
            }
        );


        let outgoingCurrentCart = {
            'id': this.getIdFromSessionStorage(),
            'entityIds': entityIds
        };

        let convertedShippingAddress = {
            email: this.state.shippingAddress.email,
            nickName: this.state.shippingAddress.nickName,
            firstName: this.state.shippingAddress.firstName,
            lastName: this.state.shippingAddress.lastName,
            company: this.state.shippingAddress.company,
            addressLineOne: this.state.shippingAddress.addressLineOne,
            addressLineTwo: this.state.shippingAddress.addressLineTwo,
            city: this.state.shippingAddress.city,
            state: this.state.shippingAddress.state,
            zipCode: this.state.shippingAddress.zipCode,
            countryId: this.state.shippingAddress.country.id,
            phoneNumber: this.state.shippingAddress.phoneNumber,
            ico: this.state.shippingAddress.ico,
            dic: this.state.shippingAddress.dic
        };
        shippingAddressList.push(convertedShippingAddress);
        if (this.state.isBillingAddressDifferent) {
            let convertedBillingAddress = {
                email: this.state.shippingAddress.email,
                nickName: this.state.billingAddress.nickName,
                firstName: this.state.billingAddress.firstName,
                lastName: this.state.billingAddress.lastName,
                company: this.state.billingAddress.company,
                addressLineOne: this.state.billingAddress.addressLineOne,
                addressLineTwo: this.state.billingAddress.addressLineTwo,
                city: this.state.billingAddress.city,
                state: this.state.billingAddress.state,
                zipCode: this.state.billingAddress.zipCode,
                countryId: this.state.billingAddress.country.id,
                phoneNumber: this.state.billingAddress.phoneNumber,
                ico: this.state.billingAddress.ico,
                dic: this.state.billingAddress.dic
            };
            shippingAddressList.push(convertedBillingAddress)
        }

        let outgoingCartAndAddress = {
            'incomingCurrentCart': outgoingCurrentCart,
            'incomingAddressList': shippingAddressList,
        };


        updateGuestShoppingCart(outgoingCartAndAddress)
            .then(resp => {
                window.sessionStorage.setItem(process.env.REACT_APP_SESSION_STORAGE_KEY, JSON.stringify(resp));
                if (resp.id != null) {
                    this.props.setOutOfQtyList(resp.outOfQtyList);
                    this.props.setSubtotal(resp.subtotal);

                    resp.wrappedOrderEntities.map(wrappedEntity => {

                        let uniqueId = Date.now() + Math.floor(Math.random() * Math.floor(9999999));
                        let newWrappedProduct = {
                            uniqueId: uniqueId,
                            product: wrappedEntity.product,
                            chosenFrame: wrappedEntity.frame,
                        };

                        let customFrameObject = {
                            uniqueId: uniqueId,
                            frame: wrappedEntity.frame,
                        };

                        productsInShoppingCart.push(newWrappedProduct);
                        takenFrames.push(customFrameObject);
                    })


                }
            }).then(() => {
            this.props.setShoppingCart(productsInShoppingCart);
            this.props.setFrames(takenFrames);
            this.props.history.push('/shipping-and-payment-methods');
        });
    };

    getIdFromSessionStorage = () => {
        if (window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY) !== null) {
            let sessionStorage = JSON.parse(window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY));
            return sessionStorage.id !== null ? sessionStorage.id : null;
        }
        return null;

    };

    handleShippingAddressDropdownChange = (e) => {
        this.setState({
            shippingAddress: {
                ...this.state.shippingAddress,
                country: this.state.countries[e.target.value],
            },
            isChange: true
        });
    };

    handleBillingAddressDropdownChange = (e) => {
        this.setState({
            billingAddress: {
                ...this.state.billingAddress,
                country: this.state.countries[e.target.value],
            },
            isBillingAddressChanged: true
        });
    };

    redirectToShippingAndPayment = () => {
        this.props.history.push("/shipping-and-payment-methods")
    };

    render() {
        return (
            <div>

                <div className="billing-form-container">
                    <form className="billing-form">
                        <span>
                            <label>
                                <p>
                                    <FormattedMessage id="app.checkout.form.email"/>
                                </p>
                                <input type="text"
                                       name="email"
                                       value={this.state.shippingAddress.email}
                                       onChange={this.handleShippingAddressChange}
                                       disabled={this.state.isShippingAddressInputsDisabled}
                                       className={this.state.isShippingAddressInputsDisabled ? 'disabled' : null}/>
                            </label>

                        </span>
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
                                <select value={this.state.shippingAddress.country.name}
                                        onChange={this.handleShippingAddressDropdownChange}
                                        disabled={this.state.isShippingAddressInputsDisabled}
                                        className={this.state.isShippingAddressInputsDisabled ? 'disabled dropdown-selection' : 'dropdown-selection'}>
                                         <option
                                             name='chosen-country'>{this.state.shippingAddress.country.name}</option>
                                    {this.state.countries.map((country, index) =>
                                        <option name={'country' + index} value={index}>
                                            {country.name}
                                        </option>
                                    )}
                                    </select>
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
                                <select value={this.state.billingAddress.country.name}
                                        onChange={this.handleBillingAddressDropdownChange}
                                        disabled={this.state.isShippingAddressInputsDisabled}
                                        className={this.state.isShippingAddressInputsDisabled ? 'disabled dropdown-selection' : 'dropdown-selection'}>
                                         <option name='chosen-country'>{this.state.billingAddress.country.name}</option>
                                    {this.state.countries.map((country, index) =>
                                        <option name={'country' + index} value={index}>
                                            {country.name}
                                        </option>
                                    )}
                                    </select>
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
                    <div className="address-changes-holder">
                        <button onClick={this.saveAddresses}
                                className='custom-next-btn'>
                            <FormattedMessage id="app.next"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        productsInShoppingCart: state.productsInShoppingCart,
        subtotal: state.subtotal,
        takenFrames: state.takenFrames,
        shippingCost: state.shippingCost,
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
        setShoppingCart: function (productsInShoppingCart) {
            const action = {type: "setShoppingC", productsInShoppingCart};
            dispatch(action);
        },
        setFrames: function (takeFrames) {
            const action = {type: "setFrames", takeFrames};
            dispatch(action);
        },
        setOutOfQtyList: function (outOfQtyList) {
            const action = {type: "setOutOfQtyList", outOfQtyList};
            dispatch(action);
        },
        setSubtotal: function (subtotal) {
            const action = {type: "setSubtotal", subtotal};
            dispatch(action);
        },
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GuestBillingDetails));
