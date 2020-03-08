import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    updateShippingAddressById,
    saveNewShippingAddress,
    deleteShippingAddressById, getShippingAddresses
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
            phoneNumber: ""
        },
        isChange: false,
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
            });
            // this.setChosenShippingAddress(addressToFill[0]);
        } else {
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
            })
        }
    };

    saveModifiedChanges = () => {
        if (this.state.addressToFill.id !== "new") {
            updateShippingAddressById(this.state.addressToFill, this.state.addressToFill.id, this.props.email)
                .then(resp =>
                    this.setState({
                        billingAddressList: resp,
                    })
                );
        } else {
            saveNewShippingAddress(this.state.addressToFill, this.props.email)
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

    deleteAddressById = (id) => {
        deleteShippingAddressById(id, this.props.email)
            .then(resp =>
                this.setState({
                    billingAddressList: resp,
                })
            );
    };

    handleAdditionalChange = (e) => {
        this.setState({
            additionalShippingAddress: {
                ...this.state.additionalShippingAddress,
                [e.target.name]: e.target.value,
            },
        });

    };

    render() {
        return (
            <React.Fragment>

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
                                   onChange={this.handleChange}/>
                        </label>
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

function mapStateToProps(state) {
    return {
        email: state.email,
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
