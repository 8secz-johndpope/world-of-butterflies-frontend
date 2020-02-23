import React, {Component} from 'react';
import Rodal from 'rodal'
import 'rodal/lib/rodal.css';
import {doLogin, getShippingAddresses} from "../../service/fetchService/fetchService";
import {connect} from 'react-redux';
import {FormattedMessage} from "react-intl";
import {faSignInAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class LoginModal extends Component {

    state = {
        email: '',
        password: '',
        windowWidth: 0,
    };

    componentDidMount() {
        this.handleResizeEvent();
        window.addEventListener("resize", this.handleResizeEvent);
    }

    componentWillUnmount(): void {
        window.removeEventListener("resize", this.handleResizeEvent);
    }

    handleResizeEvent = () => {
        let windowWidth = window.innerWidth;
        if (windowWidth !== this.state.windowWidth) {
            this.setState({
                windowWidth: windowWidth,
            })
        }
    };

    showLoginModal = () => {
        this.props.alterLoginModal(true);
    };

    hideLoginModal = () => {
        this.props.alterLoginModal(false);
    };

    handleSubmit = (e) => {

        e.preventDefault();
        doLogin(this.state.email.split(' ').join(''), this.state.password)
            .then(res => {
                if (res === true) {
                    this.props.alterLoginModal(false);
                    this.props.setUserEmail(this.state.email);
                    this.props.setLoggedIn(true);
                    getShippingAddresses(this.state.email)
                        .then(resp =>
                            this.props.setBillingAddressList(resp)
                        )
                }
            })

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

    switchModals = () => {
        this.props.alterLoginModal(false);
        this.props.alterRegisterModal(true);
    };


    render() {
        return (
            <React.Fragment>
                <button onClick={this.showLoginModal}
                        className="header-modal-btn"
                        style={{
                            fontSize: `${this.props.fontSize}`
                        }}
                >
                    {/*<FontAwesomeIcon icon={faUser}/>*/}
                    <FontAwesomeIcon icon={faSignInAlt}
                                     style={{fontSize: '16px'}}/>
                </button>
                <div className="login-modal">
                    <Rodal
                        visible={this.props.isLoginModalVisible}
                        onClose={this.hideLoginModal}
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

                                <h2 align="center">
                                    <FormattedMessage id="app.header.login.title"/>
                                </h2>

                                <label className='header-modal-label'>
                                    <p className="header-label-txt">
                                        <FormattedMessage id="app.header.login.email"/>
                                    </p>
                                    <input required type="text"
                                           name="email"
                                           className="header-modal-input"
                                           onFocus={this.captureFocusIn}
                                           onBlur={this.captureFocusOut}
                                           onChange={this.onChangeHandler}
                                    />
                                    <div className="line-box">
                                        <div className="line"></div>
                                    </div>
                                </label>

                                <label className='header-modal-label'>
                                    <p className="header-label-txt">
                                        <FormattedMessage id="app.header.login.password"/>
                                    </p>
                                    <input required type="password"
                                           name="password"
                                           className="header-modal-input"
                                           onFocus={this.captureFocusIn}
                                           onBlur={this.captureFocusOut}
                                           onChange={this.onChangeHandler}
                                    />
                                    <div className="line-box">
                                        <div className="line"></div>
                                    </div>
                                </label>

                                <p>
                                    <div>
                                        <p onClick={this.switchModals}
                                        className="not-registered-yet-btn">
                                            Regisztrálj!
                                        </p>
                                    </div>
                                </p>

                                <button
                                    type="submit"
                                    className="header-modal-submit-btn"
                                >
                                    <FormattedMessage id="app.header.login.login-btn"/>
                                </button>
                            </form>
                        </div>
                    </Rodal>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoginModalVisible: state.isLoginModalVisible,
        isRegisterModalVisible: state.isRegisterModalVisible,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserEmail: function (email) {
            const action = {type: "setUserEmail", email};
            dispatch(action);
        },
        setLoggedIn: function (boolean) {
            const action = {type: "setLoggedIn", boolean};
            dispatch(action);
        },
        setBillingAddressList: function (billingAddressList) {
            const action = {type: "setBillingAddressList", billingAddressList};
            dispatch(action);
        },
        alterLoginModal: function (boolean) {
            const action = {type: "alterLoginModal", boolean};
            dispatch(action);
        },
        alterRegisterModal: function (boolean) {
            const action = {type: "alterRegisterModal", boolean};
            dispatch(action);
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
