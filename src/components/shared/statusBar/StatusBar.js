import React, {Component} from 'react';
import './StatusBar.css';
import {withRouter} from 'react-router-dom'
import {FormattedMessage} from "react-intl";

class StatusBar extends Component {
    constructor(props) {
        super(props)
    }

    redirect = (position, url) => {
        if (position < this.props.position) {
            this.props.history.push(url);
        }
    };

    render() {
        return (
            <div>
                <p className="status-bar">
                    <span style={{
                        fontWeight: `${1 === this.props.position ? 'bold' : 'normal'}`,
                        cursor: `${1 <= this.props.position ? 'pointer' : 'not-allowed'}`
                    }}
                          onClick={() => this.redirect(1, '/cart')}
                    >
                        <FormattedMessage id="app.status-bar.cart"/>
                    </span>

                    <span className="slash-between">
                                /
                    </span>

                    <span style={{
                        fontWeight: `${2 === this.props.position ? 'bold' : 'normal'}`,
                        cursor: `${2 <= this.props.position ? 'pointer' : 'not-allowed'}`
                    }}
                          onClick={() => this.redirect(2, '/checkout')}
                    >
                        <FormattedMessage id="app.status-bar.checkout-details"/>
                        </span>

                    <span className="slash-between">
                                /
                    </span>

                    <span style={{
                        fontWeight: `${3 === this.props.position ? 'bold' : 'normal'}`,
                        cursor: `${3 <= this.props.position ? 'pointer' : 'not-allowed'}`
                    }}
                          onClick={() => this.redirect(3, '/shipping-and-payment-methods')}
                    >
                        <FormattedMessage id="app.status-bar.shipping-and-payment"/>
                        </span>

                    <span className="slash-between">
                                /
                    </span>

                    <span style={{
                        fontWeight: `${4 === this.props.position ? 'bold' : 'normal'}`,
                        cursor: `${4 <= this.props.position ? 'pointer' : 'not-allowed'}`
                    }}
                          onClick={() => this.redirect(4, '/order-complete')}
                    >
                        <FormattedMessage id="app.status-bar.order-complete"/>
                    </span>
                </p>
            </div>
        );
    }
}

export default withRouter(StatusBar);
