import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SlideShow from "./SlideShow";
import CategoryMapper from "./CategoryMapper";
import FeaturedProductMapper from "./FeaturedProductMapper";

class MainPage extends Component {

    render() {
        return (
            <React.Fragment>
                <SlideShow/>
                <CategoryMapper/>
                <FeaturedProductMapper/>
            </React.Fragment>
        );
    }
}

export default MainPage;
