import React, {Component} from 'react';
import {connect} from "react-redux";

class LanguageChanger extends Component {
    render() {
        return (
            <li className="languages-dropdown">
                <span className="languages-drop-btn">{this.props.preferredLanguage.toUpperCase()}</span>
                <ul className="languages-dropdown-content">
                    <li
                        onClick={() => this.props.setPreferredLanguage('en')}
                    >EN
                    </li>
                    <li
                        onClick={() => this.props.setPreferredLanguage('hu')}
                    >HU
                    </li>
                    <li
                        onClick={() => this.props.setPreferredLanguage('sk')}
                    >SK
                    </li>
                </ul>
            </li>
        );
    }
}

function mapStateToProps(state) {
    return {
        preferredLanguage: state.preferredLanguage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPreferredLanguage: function (preferredLanguage) {
            const action = {type: "setPreferredLanguage", preferredLanguage};
            dispatch(action);
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageChanger);
