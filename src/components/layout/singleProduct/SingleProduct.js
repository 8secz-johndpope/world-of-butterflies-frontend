import React, {Component} from 'react';
import {getProductById} from "../../../service/fetchService/fetchService";

class SingleProduct extends Component {
    componentDidMount() {
        getProductById(this.props.match.params.id).then(
            response => console.log(response)
        )
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default SingleProduct;
