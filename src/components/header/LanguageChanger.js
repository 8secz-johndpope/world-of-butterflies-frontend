import React, {Component} from 'react';
import {connect} from "react-redux";

class LanguageChanger extends Component {
    render() {
        return (
            <div>
                <button
                    onClick={() => this.props.setPreferredLanguage('en')}
                >ENG
                </button>
                <button
                    onClick={() => this.props.setPreferredLanguage('hu')}
                >HU
                </button>
                <button
                    onClick={() => this.props.setPreferredLanguage('sk')}
                >SK
                </button>
            </div>
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
