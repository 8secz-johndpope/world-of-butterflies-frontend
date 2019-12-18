import React, {Component} from 'react';
import '../../css/Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <div className='my-account'>
                    <h3>My account</h3>
                    <p>My account</p>
                    <p>Order history</p>
                    <p>Cart</p>
                </div>
                <div className='information'>
                    <h3>Information</h3>
                    <p>Delivery Information</p>
                    <p>About Us</p>
                    <p>Privacy</p>
                    <p>Returns Policy</p>
                    <p>Contact Us</p>
                </div>
                <div className='find-us-on'>
                    <h3>Find Us On</h3>


                </div>
            </div>
        );
    }
}

export default Footer;
