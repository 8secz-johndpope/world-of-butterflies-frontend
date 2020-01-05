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


class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <div className='my-account-container'>
                    <div className='my-account'>
                        <p>My account</p>
                        <li>My account</li>
                        <li>Order history</li>
                        <li>Cart</li>
                    </div>
                </div>
                <div className='information-container'>
                    <div className='information'>
                        <p>Information</p>
                        <li>Delivery Information</li>
                        <li>About Us</li>
                        <li>Privacy</li>
                        <li>Returns Policy</li>
                        <li>Contact Us</li>
                    </div>
                </div>
                <div className='find-us-on-container'>
                    <div className='find-us-on'>
                        <p>
                            Find Us On
                            <span className="footer-icon-facebook">
                        <FontAwesomeIcon icon={faFacebookSquare}/>
                        </span>
                            <span className="footer-icon-instagram">
                        <FontAwesomeIcon icon={faInstagram}/>
                        </span>
                        </p>

                        <p id="special-p">
                            We accept
                        </p>
                        <div className="payment-method-icons">
                            <ApplePBlk
                                style={{
                                    backgroundColor: '#111111'
                                }}
                            />
                            <GoogleP/>
                            <GoP
                                style={{
                                    backgroundColor: '#111111'
                                }}
                            />
                            <Maestro
                            />
                            <Master
                            />
                            <PayU/>
                            <Visa/>
                        </div>
                    </div>
                </div>
                <div className='footer-logo-container'>
                    <div className='footer-logo'>
                        <FooterLogo
                            style={{
                                width: '100%',
                                height: '100%',
                                opacity: '0.1',
                                margin: '1em 0'
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
