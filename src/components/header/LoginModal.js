import React, {Component} from 'react';
import Rodal from 'rodal'
import 'rodal/lib/rodal.css';
import {doLogin, getShoppingCartContent} from "../../service/fetchService/fetchService";
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
        doLogin(this.state.email.split(' ').join('').toLowerCase(), this.state.password)
            .then(res => {
                if (res.success === true) {
                    this.props.alterLoginModal(false);
                    this.props.setUserEmail(this.state.email);
                    this.props.setLoggedIn(true);
                    this.props.setPreferredLanguage(res.preferredLanguage.toLowerCase());
                }
            })
            .then(this.fetchCart);

    };

    fetchCart = () => {
        if (this.props.productsInShoppingCart.length === 0) {
            let productsInShoppingCart = [];
            let takenFrames = [];
            getShoppingCartContent()
                .then(resp => {
                    if (resp.id != null) {
                        resp.wrappedOrderEntities.map(wrappedEntity => {

                            let uniqueId = Date.now() + Math.floor(Math.random() * Math.floor(9999999));
                            let newWrappedProduct = {
                                uniqueId: uniqueId,
                                product: wrappedEntity.product,
                                chosenFrame: wrappedEntity.frame,
                            };

                            let customFrameObject = {
                                uniqueId: uniqueId,
                                frame: wrappedEntity.frame,
                            };

                            productsInShoppingCart.push(newWrappedProduct);
                            takenFrames.push(customFrameObject);
                        })
                    }
                }).then(() => {
                    this.props.setShoppingCart(productsInShoppingCart);
                    this.props.setFrames(takenFrames);
                });
        }
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
                    <FontAwesomeIcon icon={faUser}/>
                    {
                        this.props.isTitleVisible ?
                            <span> <FormattedMessage id="app.header.login.login-btn"/> </span>
                            :
                            null
                    }
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
                                            <FormattedMessage id="app.header.login.register-new-account"/>
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
        productsInShoppingCart: state.productsInShoppingCart,
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
        setShoppingCart: function (productsInShoppingCart) {
            const action = {type: "setShoppingC", productsInShoppingCart};
            dispatch(action);
        },
        setFrames: function (takeFrames) {
            const action = {type: "setFrames", takeFrames};
            dispatch(action);
        },
        setPreferredLanguage: function (preferredLanguage) {
            const action = {type: "setPreferredLanguage", preferredLanguage};
            dispatch(action);
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
