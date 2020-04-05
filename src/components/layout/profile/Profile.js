import React, {Component} from 'react';
import './../../../css/Profile.css';
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {
    getAllCountries,
    getOrderHistory,
    getShippingAddresses, saveNewShippingAddress, updateShippingAddressById
} from "../../../service/fetchService/fetchService";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DeleteAccountModal from "../deleteAccount/DeleteAccountModal";

class Profile extends Component {

    state = {
        //tab1
        isTabOneActive: true,
        orders: [],
        addressList: [],
        countries: [],

        //tab2
        address: {
            id: "new",
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
        isChange: false,
    };

    componentDidMount(): void {
        this.getAllTheShippingAddresses();
        this.getTheOrderHistory();
        this.getAllOfTheCountries();
    }

    getAllTheShippingAddresses = () => {
        getShippingAddresses()
            .then(resp => {
                    this.setState({
                        addressList: resp,
                    })
                }
            )
    };

    getTheOrderHistory = () => {
        getOrderHistory()
            .then(resp => {
                this.setState({
                    orders: resp,
                })
            })
    };

    getAllOfTheCountries = () => {
        getAllCountries()
            .then(resp => {
                this.setState({
                    countries: resp
                });
            })
    };


    changeActiveTab = (booleanChoice) => {
        this.setState({
            isTabOneActive: booleanChoice
        })
    };

    openOrCloseDetailView = (id) => {
        if (this.state[id] === undefined || this.state[id] === false) {
            this.setState({
                [id]: true
            })
        } else {
            this.setState({
                [id]: false
            })
        }
    };

    countQtyByIdAndFrameColour = (id, frameColour, indexOfOrder) => {
        const countTypes = this.state.orders[indexOfOrder].wrappedOrderEntities.filter(
            wrappedEntity => wrappedEntity.product.id === id &&
                wrappedEntity.frame.colour === frameColour
        );
        return countTypes.length;
    };

    calculatePricePerCategory = (price, qty) => {
        let total = (price * qty);
        return total.toFixed(2);
    };

    chooseAddress = (id) => {
        if (!this.state.isCheckboxDisabled) {
            if (id !== "new") {
                let address = this.state.addressList
                    .filter(address => address.id === id);
                this.setState({
                    address: address[0],
                });
                // this.setChosenShippingAddress(address[0]);
            } else {
                this.clearAddressToFil();
            }
        }
    };


    clearAddressToFil = () => {
        this.setState({
            address: {
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
                country: {
                    id: 1,
                    name: "",
                    location: "",
                },
                phoneNumber: ""
            },
        })
    };

    handleChange = (e) => {
        this.setState({
            address: {
                ...this.state.address,
                [e.target.name]: e.target.value,
            },
            isChange: true
        });
    };

    handleShippingAddressDropdownChange = (e) => {
        this.setState({
            address: {
                ...this.state.address,
                country: this.state.countries[e.target.value],
            },
            isChange: true
        });
    };

    saveModifiedChanges = () => {
        if (this.state.address.id !== "new") {
            updateShippingAddressById(this.state.address, this.state.address.id)
                .then(resp =>
                    this.setState({
                        addressList: resp,
                    })
                );
        } else {
            saveNewShippingAddress(this.state.address)
                .then(resp =>
                    this.setState({
                        address: resp,
                    }, () => this.saveAddresses())
                );
        }
        this.setState({
            isChange: false
        });
    };

    saveAddresses = () => {
        if (this.state.isChange) {
            this.saveModifiedChanges();
        }
    };

    render() {
        return (
            <div className="profile-container">
                <div className="p-header-container">
                    <div className="p-email">
                        {this.props.email}
                    </div>
                </div>

                <div className="p-tab-container">
                    <div
                        className={this.state.isTabOneActive ? "p-orders black-border-bottom" : "p-orders light-border-bottom"}
                        onClick={() => this.changeActiveTab(true)}>
                        <FormattedMessage id="app.profile.my-orders"/>
                    </div>
                    <div
                        className={this.state.isTabOneActive ? "p-addresses light-border-bottom" : "p-addresses black-border-bottom"}
                        onClick={() => this.changeActiveTab(false)}>
                        <FormattedMessage id="app.profile.addresses"/>
                    </div>
                    <div className="p-empty"></div>
                </div>

                <div className="p-content-container">
                    {this.state.isTabOneActive ?
                        <div className="p-order-mapper-container">
                            {this.state.orders.map((order, index) =>
                                <div className="p-mapped-order">
                                    <div className="p-o-id"
                                         onClick={() => this.openOrCloseDetailView('orderHistory' + index)}
                                    >
                                        {this.state['orderHistory' + index] ?
                                            <FontAwesomeIcon icon={faCaretUp}/>
                                            :
                                            <FontAwesomeIcon icon={faCaretDown}/>
                                        }
                                        {order.id}
                                    </div>
                                    <div className="p-o-date">
                                        {order.checkoutDate.year}.{order.checkoutDate.monthValue}.{order.checkoutDate.dayOfMonth}
                                    </div>
                                    <div className="p-o-total-price">
                                        {order.priceTotal.toFixed(2)}€
                                    </div>
                                    <div className="p-o-is-payed">
                                        {
                                            order.isPayed ?
                                                <FormattedMessage id="app.profile.payed"/>
                                                :
                                                <FormattedMessage id="app.profile.not-payed"/>
                                        }
                                    </div>
                                    <div className="p-o-is-shipped">
                                        {order.isShipped ?
                                            <FormattedMessage id="app.profile.shipped"/>
                                            :
                                            <FormattedMessage id="app.profile.not-shipped"/>
                                        }
                                    </div>
                                    <div className={this.state['orderHistory' + index] ?
                                        'p-o-details-container p-o-display'
                                        :
                                        'p-o-details-container p-o-hide'}>
                                        {order.wrappedOrderEntities.filter((wrappedOrderEntity, index) =>
                                            index === order.wrappedOrderEntities.findIndex(
                                            elem => elem.product.id === wrappedOrderEntity.product.id &&
                                                elem?.frame?.colour === wrappedOrderEntity?.frame?.colour
                                            )).map(woe =>
                                            <div className="p-o-mapped-details">
                                                <div className="p-o-img">
                                                    <div
                                                        className={woe.product.isInFrame ? 'wrapped-product-in-frame' : 'wrapped-product-not-in-frame'}
                                                        style={{
                                                            borderImageSource: `${woe.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/${woe.frame.colour}.png)`}`,
                                                        }}>
                                                        {
                                                            <img src={serverURL + woe.product.url}
                                                                 className="image-in-order-overview-cart"
                                                                 style={{
                                                                     border: `${woe.product.isInFrame ? '1px solid #D3D3D3' : 'none'}`,
                                                                 }}

                                                            />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="p-o-name">
                                                    {woe.product.name}
                                                </div>
                                                <div className="p-o-price">
                                                    {woe.product.price.toFixed(2)}€
                                                </div>
                                                <div className="p-o-qty">
                                                    {this.countQtyByIdAndFrameColour(woe.product.id, woe.frame.colour, index)}
                                                </div>
                                                <div className="p-o-subtotal">
                                                    {this.calculatePricePerCategory(woe.product.price, this.countQtyByIdAndFrameColour(woe.product.id, woe.frame.colour, index))}€
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={this.state['orderHistory' + index] ?
                                        'p-o-product-total-price p-o-display'
                                        :
                                        'p-o-product-total-price p-o-hide'}>
                                        <div className="p-o-empty"></div>
                                        <div className="p-o-products-total-no-shipping">
                                            {order.subTotal.toFixed(2)}€
                                        </div>
                                    </div>
                                    <div className={this.state['orderHistory' + index] ?
                                        'p-o-address-container p-o-display'
                                        :
                                        'p-o-address-container p-o-hide'}>
                                        <div className="p-shipping-address p-address">
                                            <div className="p-sh-title">
                                                <FormattedMessage id="app.profile.shipping-address"/>
                                            </div>
                                            <div className="half-style-view">
                                                <div className="a-first-name">
                                                    {order?.chosenShippingAddress?.firstName}
                                                </div>
                                                <div className="a-last-name">
                                                    {order?.chosenShippingAddress?.lastName}
                                                </div>
                                            </div>
                                            <div className="half-style-view">
                                                <div className="a-addr-line-one">
                                                    {order?.chosenShippingAddress?.addressLineOne}
                                                </div>
                                                <div className="a-city">
                                                    {order?.chosenShippingAddress?.city}
                                                </div>
                                            </div>
                                            <div className="half-style-view">
                                                <div className="a-zip">
                                                    {order?.chosenShippingAddress?.zipCode}
                                                </div>
                                                <div className="a-country">
                                                    {order?.chosenShippingAddress?.country?.name}
                                                </div>
                                            </div>
                                            <div className="half-style-view">
                                                <div className="a-phone">
                                                    {order?.chosenShippingAddress?.phoneNumber}
                                                </div>
                                                <div className="a-company">
                                                    {order?.chosenShippingAddress?.company}
                                                </div>
                                            </div>
                                            <div className="half-style-view">
                                                <div className="a-ico">
                                                    {order?.chosenShippingAddress?.ico}
                                                </div>
                                                <div className="a-dic">
                                                    {order?.chosenShippingAddress?.dic}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-billing-address p-address">
                                            <div className="p-sh-title">
                                                <FormattedMessage id="app.profile.billing-address"/>
                                            </div>
                                            <div className="half-style-view">
                                                <div className="a-first-name">
                                                    {order?.chosenBillingAddress?.firstName}
                                                </div>
                                                <div className="a-last-name">
                                                    {order?.chosenBillingAddress?.lastName}
                                                </div>
                                            </div>
                                            <div className="half-style-view">
                                                <div className="a-addr-line-one">
                                                    {order?.chosenBillingAddress?.addressLineOne}
                                                </div>
                                                <div className="a-city">
                                                    {order?.chosenBillingAddress?.city}
                                                </div>
                                            </div>
                                            <div className="half-style-view">
                                                <div className="a-zip">
                                                    {order?.chosenBillingAddress?.zipCode}
                                                </div>
                                                <div className="a-country">
                                                    {order?.chosenBillingAddress?.country?.name}
                                                </div>
                                            </div>
                                            <div className="half-style-view">
                                                <div className="a-phone">
                                                    {order?.chosenBillingAddress?.phoneNumber}
                                                </div>
                                                <div className="a-company">
                                                    {order?.chosenBillingAddress?.company}
                                                </div>
                                            </div>
                                            <div className="half-style-view">
                                                <div className="a-ico">
                                                    {order?.chosenBillingAddress?.ico}
                                                </div>
                                                <div className="a-dic">
                                                    {order?.chosenBillingAddress?.dic}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={this.state['orderHistory' + index] ?
                                        'sh-p-method-container p-o-display'
                                        :
                                        'sh-p-method-container p-o-hide'}>
                                        <div className="method">
                                            <div className="method-img">
                                                <img src={serverURL + order.shippingCost.imageUrl}
                                                     alt="payment-method"
                                                     className="m-img"/>
                                            </div>
                                            <div className="method-name">
                                                {order.shippingCost['name' + this.props.preferredLanguage.toUpperCase()]}
                                            </div>
                                            <div className="method-price">
                                                {order.shippingCost.price.toFixed(2)} €
                                            </div>
                                        </div>
                                        <div className="method">
                                            <div className="method-img">
                                                <img src={serverURL + order.paymentMethod.imageUrl}
                                                     alt="payment-method"
                                                     className="m-img"/>
                                            </div>
                                            <div className="method-name">
                                                {order.paymentMethod['name' + this.props.preferredLanguage.toUpperCase()]}
                                            </div>
                                            <div className="method-price">
                                                {order.paymentMethod.price.toFixed(2)} €
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        :
                        null
                    }

                    {this.state.isTabOneActive ?
                        null
                        :
                        <div className="billing-selector-and-input-field-container">
                            <div className="billing-address-container">
                                <div className="billing-address">
                                    <h3 onClick={() => this.chooseAddress("new")}
                                        className={this.state.isCheckboxDisabled ? 'disabled-paragraph ' : 'billing-address-title'}
                                    >
                                        <FormattedMessage id="app.checkout.add-new-address"/>
                                    </h3>
                                </div>
                                {
                                    this.state.addressList ?
                                        <React.Fragment>
                                            {
                                                this.state.addressList.map(address =>
                                                    <div className="billing-address">
                                                        <h3 onClick={() => this.chooseAddress(address.id)}
                                                            className={this.state.isCheckboxDisabled ? 'disabled-paragraph ' : 'billing-address-title'}
                                                        >
                                                            {address.nickName}</h3>
                                                    </div>
                                                )}
                                        </React.Fragment>
                                        :
                                        null
                                }
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
                                <div className="delete-account-btn-holder">
                                    <div className="delete-account-btn"
                                         onClick={() => this.props.alterDeleteModal(true)}>
                                        <FormattedMessage id="app.delete.acc"/>
                                    </div>
                                    <DeleteAccountModal/>
                                </div>
                            </div>
                            <div className="billing-form-container">
                                <form className="billing-form">
                                    <label>
                                        <p>
                                            <FormattedMessage id="app.checkout.form.nickname"/>
                                        </p>
                                        <input type="text"
                                               name="nickName"
                                               value={this.state.address.nickName}
                                               onChange={this.handleChange}
                                        />
                                    </label>
                                    <span className="billing-half-style">
                                        <label>
                                            <p>
                                                <FormattedMessage id="app.checkout.form.first-name"/>
                                            </p>
                                            <input type="text"
                                                   name="firstName"
                                                   value={this.state.address.firstName}
                                                   onChange={this.handleChange}
                                            />
                                        </label>
                                        <label>
                                            <p>
                                                <FormattedMessage id="app.checkout.form.last-name"/>
                                            </p>
                                            <input type="text"
                                                   name="lastName"
                                                   value={this.state.address.lastName}
                                                   onChange={this.handleChange}
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
                                                   value={this.state.address.addressLineOne}
                                                   onChange={this.handleChange}
                                            />
                                        </label>
                                        <label>
                                            <p>
                                                <FormattedMessage id="app.checkout.form.city"/>
                                            </p>
                                            <input type="text"
                                                   name="city"
                                                   value={this.state.address.city}
                                                   onChange={this.handleChange}
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
                                                   value={this.state.address.zipCode}
                                                   onChange={this.handleChange}
                                            />
                                        </label>
                                        <label>
                                            <p>
                                                <FormattedMessage id="app.checkout.form.country"/>
                                            </p>
                                                <select value={this.state.address.country.name}
                                                        onChange={this.handleShippingAddressDropdownChange}
                                                        className='dropdown-selection'>
                                                     <option
                                                         name='chosen-country'>{this.state.address.country.name}</option>
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
                                               value={this.state.address.phoneNumber ? this.state.address.phoneNumber : ''}
                                               onChange={this.handleChange}
                                        />
                                    </label>
                                    <label>
                                        <p>
                                            <FormattedMessage id="app.checkout.form.company"/>
                                        </p>
                                        <input type="text"
                                               name="company"
                                               value={this.state.address.company ? this.state.address.company : ''}
                                               onChange={this.handleChange}
                                        />
                                    </label>

                                    <span className="billing-half-style">
                                        <label>
                                            <p>
                                                IČO:
                                            </p>
                                            <input type="text"
                                                   name="ico"
                                                   value={this.state.address.ico ? this.state.address.ico : ''}
                                                   onChange={this.handleChange}
                                            />
                                        </label>
                                        <label>
                                            <p>
                                                DIČ:
                                            </p>
                                            <input type="text"
                                                   name="dic"
                                                   value={this.state.address.dic ? this.state.address.dic : ''}
                                                   onChange={this.handleChange}
                                            />
                                        </label>
                                    </span>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.email,
        preferredLanguage: state.preferredLanguage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        alterDeleteModal: function (boolean) {
            const action = {type: "alterDeleteModal", boolean};
            dispatch(action);
        },
    }
};

const serverURL = process.env.REACT_APP_API_URL;
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
