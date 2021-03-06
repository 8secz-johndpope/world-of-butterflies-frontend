import React, {Component} from 'react';
import {connect} from "react-redux";
import Flag from 'react-country-flags';
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {setPreferredLanguage} from "../../service/fetchService/fetchService";

class LanguageChanger extends Component {
    state = {
        areLanguagesDisplayed: false,
    };

    openOrCloseLanguageChangerDropdown = () => {
        this.setState({
            areLanguagesDisplayed: !this.state.areLanguagesDisplayed,
        })
    };

    handleFlagClick = (language) => {
        this.openOrCloseLanguageChangerDropdown();
        this.props.setPreferredLanguage(language);
        if (this.props.isLoggedIn) {
            setPreferredLanguage(language);
        }
    };

    render() {
        return (
            <React.Fragment>

                <li className="languages-dropdown">
                    <div className="main-language-and-arrow-icon"
                         onClick={this.openOrCloseLanguageChangerDropdown}>
                        <span className="main-flag">
                            <Flag
                                country={this.props.preferredLanguage.toLowerCase() === 'en' ? 'us' : this.props.preferredLanguage.toLowerCase()}
                                asSquare={true}/>
                        </span>
                        <span className="arrow-down">
                            <FontAwesomeIcon icon={faCaretDown}/>
                        </span>
                    </div>
                    {
                        this.state.areLanguagesDisplayed ?
                            <ul className="languages-dropdown-content">
                                <li
                                    onClick={() => this.handleFlagClick('en')}
                                >
                                    <Flag country="us" asSquare={true}/>
                                </li>
                                <li
                                    onClick={() => this.handleFlagClick('hu')}
                                >
                                    <Flag country="hu" asSquare={true}/>
                                </li>
                                <li
                                    onClick={() => this.handleFlagClick('sk')}
                                >
                                    <Flag country="sk" asSquare={true}/>
                                </li>
                            </ul>
                            :
                            null
                    }
                </li>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        preferredLanguage: state.preferredLanguage,
        isLoggedIn: state.isLoggedIn,
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
