import React, {Component} from 'react';
import Rodal from 'rodal'
import 'rodal/lib/rodal.css';

class RegisterModal extends Component {

    state = {
        registerModalVisible: false,
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
                                <input required type="text"
                                       className="header-modal-input"
                                       onFocus={this.captureFocusIn}
                                       onBlur={this.captureFocusOut}
                                />
                                <div className="line-box">
                                    <div className="line"></div>
                                </div>
                            </label>

                            <label className='header-modal-label'>
                                <p className="header-label-txt">ENTER YOUR PASSWORD</p>
                                <input required type="password"
                                       className="header-modal-input"
                                       onFocus={this.captureFocusIn}
                                       onBlur={this.captureFocusOut}
                                />
                                <div className="line-box">
                                    <div className="line"></div>
                                </div>
                            </label>

                            <label className='header-modal-label'>
                                <p className="header-label-txt">CONFIRM YOUR PASSWORD</p>
                                <input required type="password"
                                       className="header-modal-input"
                                       onFocus={this.captureFocusIn}
                                       onBlur={this.captureFocusOut}
                                />
                                <div className="line-box">
                                    <div className="line"></div>
                                </div>
                            </label>

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

export default RegisterModal;
