import React, {Component} from 'react';
import {connect} from 'react-redux';


class Email extends Component {
    render() {
        return (
            <React.Fragment>
                <p
                    className="header-email-address"
                    style={{
                        fontSize:`${this.props.fontSize}`
                    }}
                >{this.props.email}</p>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.email,
    }
}

export default connect(mapStateToProps, null)(Email);
