import React, {Component} from 'react';
import Rodal from 'rodal'
import 'rodal/lib/rodal.css';
import {doLogin} from "../../service/fetchService/fetchService";

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
            .then(res=>res.json)
            .then(res=>console.log(res));

                // {
                //     if (res === true) {
                //         this.setState({
                //             loginModalVisible: false,
                //         })
                //     }
                // }
            // )


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
                >Login
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

                            <h2 align="center">Welcome back, Login!</h2>

                            <label className='header-modal-label'>
                                <p className="header-label-txt">ENTER YOUR EMAIL ADDRESS</p>
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
                                <p className="header-label-txt">ENTER YOUR PASSWORD</p>
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
                            >Login!
                            </button>
                        </form>
                    </div>
                </Rodal>
            </React.Fragment>
        );
    }
}

export default LoginModal;
