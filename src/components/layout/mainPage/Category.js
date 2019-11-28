import React, {Component} from 'react';


class Category extends Component {
    render() {
        return (
            <div className="main-page-category">
                <img src={serverURL + this.props.url}/>
            </div>
        );
    }
}

const serverURL = "http://localhost:8080";
export default Category;
