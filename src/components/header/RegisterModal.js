import React, {Component} from 'react';
import Rodal from 'rodal'
import 'rodal/lib/rodal.css';
import {doRegister, doLogin, getUserEmail} from "../../service/fetchService/fetchService";
import {connect} from 'react-redux';

class RegisterModal extends Component {

    state = {
        registerModalVisible: false,
        email: '',
        password: '',
        confPass: '',
        errorMessage: false,
    };

    showRegisterModal = () => {
        this.setState(
            {
                registerModalVisible: true
            }
        );
    };

    hideRegisterModal = () => {
        this.setState(
            {
                registerModalVisible: false
            }
        );
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
                        this.setState({
                            registerModalVisible: false,
                        });
                        doLogin(this.state.email, this.state.password)
                            .then(res => {
                                if (res === true) {
                                    console.log("resp was true");
                                    getUserEmail()
                                        .then(
                                            resp => this.props.setUserEmail(resp.email),
                                            this.props.setLoggedIn(true),
                                        )
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
                <button onClick={this.showRegisterModal}
                        className="header-modal-btn"
                >
                    Register
                </button>

                <Rodal visible={this.state.registerModalVisible}
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
                            <h2 align="center">Hi Stranger, Register!</h2>
                            <label className='header-modal-label'>
                                <p className="header-label-txt">ENTER YOUR USERNAME</p>
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
                                <p className="header-label-txt">ENTER YOUR PASSWORD</p>
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
                                <p className="header-label-txt">CONFIRM YOUR PASSWORD</p>
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

                            {
                                this.state.errorMessage ?
                                    <div className="header-error-message">Your email address is already
                                        registered!</div>
                                    :
                                    null

                            }

                            <button
                                type="submit"
                                className="header-modal-submit-btn"
                            >Register!
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
        }
    }
};

export default connect(null, mapDispatchToProps)(RegisterModal);
