import React, {Component} from 'react';
import {Link} from "react-router-dom";

class SearchBarFoundProduct extends Component {
    render() {
        return (
            <Link to={"/products/" + this.props.id}
                  className="search-bar-link"
                    onClick={this.props.clearSearchBar}
            >
                <div className="search-bar-result">
                    <img src={serverURL + this.props.url}/>
                    <span className="main-page-informational-text">
                        <p>{this.props.name}</p>
                        <p>{this.props.price}</p>
                    </span>
                </div>
            </Link>
        );
    }
}

const serverURL = process.env.REACT_APP_API_URL;
export default SearchBarFoundProduct;
