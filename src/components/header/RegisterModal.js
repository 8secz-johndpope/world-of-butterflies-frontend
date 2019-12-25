import React, {Component} from 'react';
import Rodal from 'rodal'
import 'rodal/lib/rodal.css';
import {doRegister, doLogin} from "../../service/fetchService/fetchService";
import {connect} from 'react-redux';
import {FormattedMessage} from "react-intl";

class RegisterModal extends Component {

    state = {
        email: '',
        password: '',
        confPass: '',
        errorMessage: false,
    };

    showRegisterModal = () => {
        this.props.alterRegisterModal(true);
    };

    hideRegisterModal = () => {
        this.props.alterRegisterModal(false);
    };

    switchModals = () => {
        this.props.alterLoginModal(true);
        this.props.alterRegisterModal(false);
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

    handleSubmit = (e) => {

        e.preventDefault();
        if (this.state.password === this.state.confPass) {
            doRegister(this.state.email, this.state.password)
                .then(res => {
                    if (res.success === true) {
                        this.props.alterRegisterModal(false);
                        doLogin(this.state.email, this.state.password)
                            .then(res => {
                                if (res === true) {
                                    this.props.setUserEmail(this.state.email);
                                    this.props.setLoggedIn(true);
                                }
                            })
                    } else {
                        this.setState({
                            errorMessage: true
                        })
                    }
                })
        }
    };

    render() {
        return (
            <React.Fragment>
                {/*<button onClick={this.showRegisterModal}*/}
                {/*        className="header-modal-btn"*/}
                {/*        style={{*/}
                {/*            fontSize: `${this.props.fontSize}`*/}
                {/*        }}*/}
                {/*>*/}
                {/*    <FormattedMessage id="app.header.register.register-btn"/>*/}
                {/*</button>*/}

                <Rodal visible={this.props.isRegisterModalVisible}
                       onClose={this.hideRegisterModal}
                       animation='fade'
                       width='50'
                       height='55'
                       measure="%"
                >
                    <div>
                        <form
                            className="header-modal-form"
                            onSubmit={this.handleSubmit}
                        >
                            <h2 align="center">
                                <FormattedMessage id="app.header.register.registration-title"/>
                            </h2>
                            <label className='header-modal-label'>
                                <p className="header-label-txt">
                                    <FormattedMessage id="app.header.register.email"/>
                                </p>
                                <input required type="email"
                                       name='email'
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
                                    <FormattedMessage id="app.header.register.password"/>
                                </p>
                                <input required type="password"
                                       name='password'
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
                                    <FormattedMessage id="app.header.register.confirm"/>
                                </p>
                                <input required type="password"
                                       name='confPass'
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
                                Már be vagy regisztrálva?
                                <button
                                    onClick={this.switchModals}
                                >Jelentkezz be!</button>
                            </p>

                            {
                                this.state.errorMessage ?
                                    <div className="header-error-message">
                                        <FormattedMessage id="app.header.register.error-message"/>
                                    </div>
                                    :
                                    null

                            }

                            <button
                                type="submit"
                                className="header-modal-submit-btn"
                            >
                                <FormattedMessage id="app.header.register.register-btn"/>
                            </button>
                        </form>
                    </div>
                </Rodal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
