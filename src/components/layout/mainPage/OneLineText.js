import React, {Component} from 'react';

class OneLineText extends Component {
    render() {
        return (
            <div className="one-line-text-container"
                 // style={{
                 //     paddingTop:`${this.props.paddingTop}`,
                 //     paddingBottom:`${this.props.paddingBottom}`
                 // }}
    >
                <p className="one-line-text dotted-spaced-bottom">{this.props.text}</p>
                <br/>
            </div>
        );
    }
}

export default OneLineText;
