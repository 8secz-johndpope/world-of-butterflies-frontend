import React, {Component} from 'react';
import './SuccessfulPurchasePopUp.css';
import {FormattedMessage} from "react-intl";

class SuccessfulPurchasePopUp extends Component {
    render() {
        return (
            <div className="succ-purch-pop-up-container" style={{'height':document.body.scrollHeight + 'px'}}>
                <div className="succ-purch-pop-up-body-container">

                    <div className="success-checkmark">
                        <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                        </div>
                    </div>
                    <div className="pop-up-message">
                        <span className="message-title">
                            <FormattedMessage id="app.pop-up-thanks"/>
                        </span>
                        <span className="message-body">
                            <FormattedMessage id="app.pop-up-email-sent"/>
                        </span>
                        <span className="message-email">{this.props.email}</span>
                    </div>
                    <div className="pop-up-btn-container">
                        <button className="btn1" onClick={this.props.closePopUp}>
                            <FormattedMessage id="app.close"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SuccessfulPurchasePopUp;
