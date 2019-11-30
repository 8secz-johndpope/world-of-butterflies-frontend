import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Category extends Component {
    render() {
        return (
            <div className="main-page-category">
                <Link to="/blalala" className="main-page-category-link">
                    <div className="category-name-img-container">
                        <img src={serverURL + this.props.url}/>
                        <p className="category-name">{this.props.name}</p>
                    </div>
                </Link>
            </div>
        );
    }
}

const serverURL = "http://localhost:8080";
export default Category;
