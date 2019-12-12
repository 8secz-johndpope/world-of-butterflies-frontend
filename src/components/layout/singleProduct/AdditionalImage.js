import React, {Component} from 'react';

class AdditionalImage extends Component {
    render() {
        return (
            <div>
                <img src={serverURL + this.props.url}
                     alt=""
                     onClick={()=>this.props.onClickHandler(this.props.url, false)}
                     className="all-small-images"
                     style={{
                         width: '100%',
                         height: 'auto'
                     }}
                />
            </div>
        );
    }
}

const serverURL = process.env.REACT_APP_API_URL;
export default AdditionalImage;
