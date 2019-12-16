import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SlideShow from "./SlideShow";
import CategoryMapper from "./CategoryMapper";
import FeaturedProductMapper from "./FeaturedProductMapper";
import OneLineText from "./OneLineText";
import {FormattedMessage} from "react-intl";

class MainPage extends Component {

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
                <FeaturedProductMapper/>
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
