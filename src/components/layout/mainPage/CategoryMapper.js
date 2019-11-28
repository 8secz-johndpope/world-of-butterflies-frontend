import React, {Component} from 'react';
import {getCategories} from "../../../service/fetchService/fetchService";
import Category from "./Category";

class CategoryMapper extends Component {
    state = {
        categories: [],
    };

    componentDidMount() {
        getCategories().then(categories =>
            this.setState({
                categories: categories,
            })
        )
    }

    render() {
        return (
            <div className="main-page-category-container">
                {this.state.categories.map((category, index) =>
                    <Category
                        name={category.name}
                        url={category.url}
                        index={index}

                        key={index}
                    />
                )}
            </div>
        );
    }
}

export default CategoryMapper;
