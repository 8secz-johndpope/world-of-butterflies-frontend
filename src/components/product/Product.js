import React, {Component} from 'react';

class Product extends Component {

    render() {
        return (
            <div>
                {this.props.id}
                {this.props.name}
                {this.props.description}
                {this.props.price}
                {this.props.availableQuantity}
                <img src={serverURL + this.props.url} alt=""/>

            </div>
        );
    }
}

const serverURL = "http://localhost:8080";

export default Product;
