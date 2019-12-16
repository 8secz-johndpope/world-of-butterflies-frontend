import React, {Component} from 'react';
import Rodal from 'rodal'
import 'rodal/lib/rodal.css';
import {doLogin, getShippingAddresses} from "../../service/fetchService/fetchService";
import {connect} from 'react-redux';
import {FormattedMessage} from "react-intl";

class LoginModal extends Component {

    state = {
        loginModalVisible: false,
        email: '',
        password: '',
    };

    showLoginModal = () => {
        this.setState(
            {
                loginModalVisible: true
            }
        );
    };

    hideLoginModal = () => {
        this.setState(
            {
                loginModalVisible: false
            }
        );
    };

    handleSubmit = (e) => {
        e.preventDefault();
        doLogin(this.state.email, this.state.password)
            .then(res => {
                if (res === true) {
                    this.setState({
                        loginModalVisible: false,
                    });
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


    render() {
        return (
            <React.Fragment>
                <button onClick={this.showLoginModal}
                        className="header-modal-btn"
                        style={{
                            fontSize: `${this.props.fontSize}`
                        }}
                >
                    <FormattedMessage id="app.header.login.login-btn"/>
                </button>

                <Rodal visible={this.state.loginModalVisible}
                       onClose={this.hideLoginModal}
                       animation='fade'
                       width='50'
                       height='50'
                       measure="%"
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

                            <button
                                type="submit"
                                className="header-modal-submit-btn"
                            >
                                <FormattedMessage id="app.header.login.login-btn"/>
                            </button>
                        </form>
                    </div>
                </Rodal>
            </React.Fragment>
        );
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
    }
};

export default connect(null, mapDispatchToProps)(LoginModal);
