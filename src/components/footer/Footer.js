import React, {Component} from 'react';
import '../../css/Footer.css';
import {ReactComponent as FooterLogo} from "../../components/images/logo/footer_logo.svg";
import {ReactComponent as ApplePBlk} from "../../components/images/payment_methods/apple_pay_white.svg";
import {ReactComponent as GoogleP} from "../../components/images/payment_methods/google_p.svg";
import {ReactComponent as GoP} from "../../components/images/payment_methods/gopay.svg";
import {ReactComponent as Maestro} from "../../components/images/payment_methods/maestro.svg";
import {ReactComponent as Master} from "../../components/images/payment_methods/master.svg";
import {ReactComponent as PayU} from "../../components/images/payment_methods/payu.svg";
import {ReactComponent as Visa} from "../../components/images/payment_methods/visa.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookSquare, faInstagram} from '@fortawesome/free-brands-svg-icons'
import update from "react-addons-update";
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";


class Footer extends Component {
    constructor(props) {
        super(props)
    }

    redirectToPath = (path) => {
        this.props.history.push(path);
    };

    state = {
        isContactAddressShown: true,
        isAccountContainerShown: true,
        isInformationContainerShown: true,
        isItMobileDevice: false,
    };

    componentDidMount() {
        this.handleResizeEvent();
        window.addEventListener("resize", this.handleResizeEvent);
    }

    componentWillUnmount(): void {
        window.removeEventListener("resize", this.handleResizeEvent);
    }

    handleResizeEvent = () => {
        if (window.innerWidth < 1000) {
            this.setState({
                isContactAddressShown: false,
                isAccountContainerShown: false,
                isInformationContainerShown: false,
                isItMobileDevice: true,
            })
        } else {
            this.setState({
                isContactAddressShown: true,
                isAccountContainerShown: true,
                isInformationContainerShown: true,
                isItMobileDevice: false,

            })
        }
    };

    handleProductFieldChanges = (index, paramName) => (event) => {
        let newState = update(this.state, {
            products: {
                [index]: {
                    [paramName]: {$set: event.target.value}
                }
            }
        });
        this.setState(newState);
    };

    changeState = (value) => {
        if (this.state.isItMobileDevice) {
            this.setState({
                [value]: !this.state[value]
            })
        }
    };

    render() {
        return (
            <div className="footer-container">

                <div className="contact-address-container">
                    <div>
                        <p
                            className="contact-address-title"
                            onClick={() => this.changeState("isContactAddressShown")}
                        >
                            Contact Address
                        </p>
                        {
                            this.state.isContactAddressShown ?
                                <span>
                                <li>GABANNA s.r.o.</li>
                                <li>Farské pole 16</li>
                                <li>Nesvady 946 51</li>
                                <li>Slovakia</li>
                                <li></li>
                                <li>
                                    <a href="mailto:info@gabannabutterfly.eu" className="contact-email">info@gabannabutterfly.eu</a>
                                </li>
                            </span>
                                :
                                null
                        }
                    </div>
                </div>

                <div className='my-account-container'>
                    <div className='my-account'>
                        <p
                            className="my-account-title"
                            onClick={() => this.changeState("isAccountContainerShown")}
                        >
                            My account
                        </p>
                        {
                            this.state.isAccountContainerShown ?
                                this.props.isLoggedIn ?
                                    <span>
                                        <li onClick={() => this.redirectToPath('/profile')}>My account</li>
                                        <li onClick={() => this.redirectToPath('/cart')}>Cart</li>
                                    </span>
                                    :
                                    <span>
                                        <li onClick={() => this.redirectToPath('/cart')}>Cart</li>
                                    </span>
                                :
                                null
                        }
                    </div>
                </div>


                <div className='information-container'>
                    <div className='information'>
                        <p
                            className="information-title"
                            onClick={() => this.changeState("isInformationContainerShown")}
                        >
                            Information
                        </p>
                        {
                            this.state.isInformationContainerShown ?
                                <span>
                                    <li>Delivery Information</li>
                                    <li>About Us</li>
                                    <li>Privacy</li>
                                    <li>Returns Policy</li>
                                    <li>Contact Us</li>
                                </span>
                                :
                                null
                        }
                    </div>
                </div>


                <div className='find-us-on-container'>
                    <div className='find-us-on'>
                        <p>
                            {
                                this.state.isItMobileDevice ?
                                    null

                                    :
                                    <span className="find-us-on-line">
                                        Find Us On
                                    </span>

                            }
                            <span className="footer-icon-facebook">
                                <FontAwesomeIcon icon={faFacebookSquare}/>
                            </span>
                            <span className="footer-icon-instagram">
                                <FontAwesomeIcon icon={faInstagram}/>
                            </span>

                        </p>

                        <p className="we-accept">
                            {
                                this.state.isItMobileDevice ?
                                    null

                                    :
                                    <span>
                                        We accept
                                    </span>
                            }
                        </p>
                        <div className="payment-method-icons">
                            {/*<ApplePBlk*/}
                            {/*    style={{*/}
                            {/*        backgroundColor: '#111111'*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<GoogleP/>*/}
                            {/*<GoP*/}
                            {/*    style={{*/}
                            {/*        backgroundColor: '#111111'*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<Maestro/>*/}
                            {/*<Master/>*/}
                            <PayU/>
                            {/*<Visa/>*/}
                        </div>
                    </div>
                </div>

                <div className='footer-logo-container'>
                    <div className='footer-logo'>
                        <FooterLogo
                            style={{
                                // width: '100%',
                                // height: '100%',
                                opacity: '0.1',
                                margin: '1em 3rem'
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        isLoggedIn: state.isLoggedIn,
    }
}

export default withRouter(connect(mapStateToProps, null)(Footer));
