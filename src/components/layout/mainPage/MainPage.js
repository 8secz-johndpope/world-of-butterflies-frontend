import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SlideShow from "./SlideShow";
import CategoryMapper from "./CategoryMapper";
import FeaturedProductMapper from "./FeaturedProductMapper";
import OneLineText from "./OneLineText";
import {FormattedMessage} from "react-intl";
import {
    getNRandomFramedProducts,
    getNRandomNonFramedProducts
} from "../../../service/fetchService/fetchService";

class MainPage extends Component {
    state = {
        framedProducts: [],
        nonFramedProducts: [],
    };

    componentDidMount() {
        getNRandomFramedProducts(8).then(resp =>
            this.setState({
                framedProducts: resp.content
            })
        );
        getNRandomNonFramedProducts(6).then(resp =>
            this.setState({
                nonFramedProducts: resp.content
            })
        )
    }

    render() {
        return (
            <React.Fragment>
                <SlideShow/>
                <CategoryMapper/>
                <OneLineText
                    text={<FormattedMessage id="app.main-page.bestsellers"/>}
                    paddingTop='0'
                    paddingBottom='40px'
                />
                <FeaturedProductMapper
                    products={this.state.framedProducts}
                />
                <FeaturedProductMapper
                    products={this.state.nonFramedProducts}
                />
                <OneLineText
                    text={<FormattedMessage id="app.main-page.news"/>}
                    paddingTop='40px'
                    paddingBottom='60px'
                />
            </React.Fragment>
        );
    }
}

export default MainPage;
