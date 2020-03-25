import React, {Component} from 'react';
import './StatusBar.css';
import {withRouter} from 'react-router-dom'

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
                    SHOPPING CART
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
                        CHECKOUT DETAILS
                        </span>

                    <span className="slash-between">
                                /
                    </span>

                    <span style={{
                        fontWeight: `${3 === this.props.position ? 'bold' : 'normal'}`,
                        cursor: `${3 <= this.props.position ? 'pointer' : 'not-allowed'}`
                    }}
                          onClick={() => this.redirect(3, '/')}
                    >
                        SHIPPING AND PAYMENT
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
                    ORDER COMPLETE
                    </span>
                </p>
            </div>
        );
    }
}

export default withRouter(StatusBar);
