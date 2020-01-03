import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Category extends Component {
    render() {
        return (
            <div className="main-page-category">
                <Link to={"/sub-categories/" + this.props.name.toLowerCase()} className="main-page-category-link">
                    <div className="category-name-img-container">
                        <img src={serverURL + this.props.url}/>
                        <p className="category-name">{this.props.name}</p>
                    </div>
                </Link>
            </div>
        );
    }
}

const serverURL = process.env.REACT_APP_API_URL;
export default Category;
