import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    updateShippingAddressById,
    saveNewShippingAddress,
    deleteShippingAddressById
} from "../../../service/fetchService/fetchService";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class BillingDetails extends Component {
    state = {
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
        isChange: false
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

    chooseAddress = (id) => {
        if (id !== "new") {
            let addressToFill = this.props.billingAddressList.filter(address => address.id === id);
            console.log(addressToFill);
            this.setState({
                addressToFill: addressToFill[0],
            })
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

    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
        console.log(
            this.state.addressToFill.phoneNumber,
            this.state.addressToFill.country,
            this.state.addressToFill.lastName,
            this.state.addressToFill.firstName,
        )
    }

    saveModifiedChanges = () => {
        if (this.state.addressToFill.id !== "new") {
            updateShippingAddressById(this.state.addressToFill, this.state.addressToFill.id, this.props.email)
                .then(resp =>
                    this.props.setBillingAddressList(resp)
                );
        } else {
            saveNewShippingAddress(this.state.addressToFill, this.props.email)
                .then(resp =>
                    this.props.setBillingAddressList(resp)
                );
        }
        this.setState({
            isChange: false
        });
    };

    deleteAddressById = (id) => {
        deleteShippingAddressById(id, this.props.email)
            .then(resp =>
                this.props.setBillingAddressList(resp)
            );
    };

    render() {
        return (
            <React.Fragment>
                {
                    this.props.billingAddressList ?
                        <React.Fragment>
                            <div className="billing-address-container">
                                {
                                    this.state.isChange ?
                                        <div>
                                            <button onClick={this.saveModifiedChanges}>
                                                Save Changes
                                            </button>
                                        </div>
                                        :
                                        null
                                }
                                <div className="billing-address">
                                    <h3 onClick={() => this.chooseAddress("new")}>Add New...</h3>
                                </div>
                                {
                                    this.props.billingAddressList.map(address =>
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
                            </div>
                            <div className="billing-form-container">
                                <form className="billing-form">
                                    <label>
                                        <p>Nickname:</p>
                                        <input type="text"
                                               name="nickName"
                                               value={this.state.addressToFill.nickName}
                                               onChange={this.handleChange}/>
                                    </label>
                                    <label>
                                        <p>First Name:</p>
                                        <input type="text"
                                               name="firstName"
                                               value={this.state.addressToFill.firstName}
                                               onChange={this.handleChange}/>
                                    </label>
                                    <label>
                                        <p>Last Name:</p>
                                        <input type="text"
                                               name="lastName"
                                               value={this.state.addressToFill.lastName}
                                               onChange={this.handleChange}/>
                                    </label>
                                    <label>
                                        <p>Company:</p>
                                        <input type="text"
                                               name="company"
                                               value={this.state.addressToFill.company ? this.state.addressToFill.company : ''}
                                               onChange={this.handleChange}/>
                                    </label>
                                    <label>
                                        <p>Address Line One:</p>
                                        <input type="text"
                                               name="addressLineOne"
                                               value={this.state.addressToFill.addressLineOne}
                                               onChange={this.handleChange}/>
                                    </label>
                                    <label>
                                        <p>Address Line Two:</p>
                                        <input type="text"
                                               name="addressLineTwo"
                                               value={this.state.addressToFill.addressLineTwo ? this.state.addressToFill.addressLineTwo : ''}
                                               onChange={this.handleChange}/>
                                    </label>
                                    <label>
                                        <p>City:</p>
                                        <input type="text"
                                               name="city"
                                               value={this.state.addressToFill.city}
                                               onChange={this.handleChange}/>
                                    </label>
                                    <label>
                                        <p>State:</p>
                                        <input type="text"
                                               name="state"
                                               value={this.state.addressToFill.state}
                                               onChange={this.handleChange}/>
                                    </label>
                                    <label>
                                        <p>ZIP Code:</p>
                                        <input type="text"
                                               name="zipCode"
                                               value={this.state.addressToFill.zipCode}
                                               onChange={this.handleChange}/>
                                    </label>
                                    <label>
                                        <p>Country:</p>
                                        <input type="text"
                                               name="country"
                                               value={this.state.addressToFill.country}
                                               onChange={this.handleChange}/>
                                    </label>
                                    <label>
                                        <p>Phone Number:</p>
                                        <input type="text"
                                               name="phoneNumber"
                                               value={this.state.addressToFill.phoneNumber ? this.state.addressToFill.phoneNumber : ''}
                                               onChange={this.handleChange}/>
                                    </label>
                                </form>
                            </div>
                        </React.Fragment>
                        : null
                }
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.email,
        billingAddressList: state.billingAddressList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSubtotal: function (subtotal) {
            const action = {type: "setSubtotal", subtotal};
            dispatch(action);
        },
        setBillingAddressList: function (billingAddressList) {
            const action = {type: "setBillingAddressList", billingAddressList};
            dispatch(action);
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BillingDetails);
