import React, {Component} from 'react';
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FormattedMessage} from "react-intl";
import Rodal from "rodal";
import {deleteUser} from "../../../service/fetchService/fetchService";
import {withRouter} from 'react-router-dom'

class DeleteAccountModal extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        email: '',
        password: '',
        windowWidth: 0,
        isErrorMessageVisible: false,
    };

    componentDidMount() {
        this.handleResizeEvent();
        window.addEventListener("resize", this.handleResizeEvent);
    }

    componentWillUnmount(): void {
        window.removeEventListener("resize", this.handleResizeEvent);
    }

    redirectToHome = () => {
        this.props.history.push('/');
    };


    handleResizeEvent = () => {
        let windowWidth = window.innerWidth;
        if (windowWidth !== this.state.windowWidth) {
            this.setState({
                windowWidth: windowWidth,
            })
        }
    };

    hideDeleteModal = () => {
        this.props.alterDeleteModal(false);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        deleteUser(this.state.email.split(' ').join('').toLowerCase(), this.state.password)
            .then(res => {
                if (res === true) {
                    this.props.alterDeleteModal(false);
                    this.clearLocalStorage();
                    this.redirectToHome();
                } else {
                    this.setState({
                        isErrorMessageVisible: true
                    })
                }
            })
    };

    clearLocalStorage = () => {
        this.props.alterDeleteModal(false);
        this.props.setUserEmail("");
        this.props.setLoggedIn(false);
        this.props.clearShoppingCart();
        this.props.setSubtotal(0);
        this.props.setShippingCost(0);
        this.props.setPaymentCost(0);
        this.props.clearTakenFramesList();
        this.props.clearOutOfQtyList();
    };

    captureFocusIn = (e) => {
        e.target.parentNode.firstChild.classList.add('header-label-active');
    };

    captureFocusOut = (e) => {
        e.target.parentNode.firstChild.classList.remove('header-label-active');
    };

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errorMessage: false,
        })
    };

    render() {
        return (
            <div>
                <Rodal
                    visible={this.props.isDeleteModalVisible}
                    onClose={this.hideDeleteModal}
                    animation='fade'
                    width={this.state.windowWidth * 0.8}
                    height='500'
                    measure="px"
                >
                    <div>
                        <form
                            className="header-modal-form"
                            onSubmit={this.handleSubmit}
                        >

                            <h2 align="center"
                                className="delete-mod-title">
                                <FormattedMessage id="app.delete.modal-title"/>
                            </h2>

                            <label className='header-modal-label'>
                                <p className="delete-header-label-txt">
                                    <FormattedMessage id="app.header.login.email"/>
                                </p>
                                <input required type="text"
                                       name="email"
                                       className="header-modal-input"
                                       onFocus={this.captureFocusIn}
                                       onBlur={this.captureFocusOut}
                                       onChange={this.onChangeHandler}
                                />
                                <div className="del-line-box">
                                    <div className="del-mod-line"></div>
                                </div>
                            </label>

                            <label className='header-modal-label'>
                                <p className="delete-header-label-txt">
                                    <FormattedMessage id="app.header.login.password"/>
                                </p>
                                <input required type="password"
                                       name="password"
                                       className="header-modal-input"
                                       onFocus={this.captureFocusIn}
                                       onBlur={this.captureFocusOut}
                                       onChange={this.onChangeHandler}
                                />
                                <div className="del-line-box">
                                    <div className="del-mod-line"></div>
                                </div>
                            </label>

                            <button
                                type="submit"
                                className="delete-account-btn"
                            >
                                <FormattedMessage id="app.delete.acc"/>
                            </button>
                        </form>
                    </div>
                </Rodal>
            </div>
        );
    }
}

///todo revise this
function mapStateToProps(state) {
    return {
        isDeleteModalVisible: state.isDeleteModalVisible,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        alterDeleteModal: function (boolean) {
            const action = {type: "alterDeleteModal", boolean};
            dispatch(action);
        },
        setUserEmail: function (email) {
            const action = {type: "setUserEmail", email};
            dispatch(action);
        },
        setLoggedIn: function (boolean) {
            const action = {type: "setLoggedIn", boolean};
            dispatch(action);
        },
        clearShoppingCart: function () {
            const action = {type: "clearShoppingCart"};
            dispatch(action);
        },
        setSubtotal: function (subtotal) {
            const action = {type: "setSubtotal", subtotal};
            dispatch(action);
        },
        setShippingCost: function (subtotal) {
            const action = {type: "setShippingCost", subtotal};
            dispatch(action);
        },
        setPaymentCost: function (subtotal) {
            const action = {type: "setPaymentCost", subtotal};
            dispatch(action);
        },
        clearTakenFramesList: function () {
            const action = {type: "clearTakenFramesList"};
            dispatch(action);
        },
        clearOutOfQtyList: function () {
            const action = {type: "clearOutOfQtyList"};
            dispatch(action);
        },
        //         this.props.alterDeleteModal(false);
        //         this.props.setUserEmail("");
        //         this.props.setLoggedIn(false);
        //         this.props.clearShoppingCart();
        //         this.props.setSubtotal(0);
        //         this.props.setShippingCost(0);
        //         this.props.setPaymentCost(0);
        //         this.props.clearTakenFramesList();
        //         this.props.clearOutOfQtyList();
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteAccountModal));
