import React, {Component} from 'react';
import {Carousel} from "react-responsive-carousel";
import {FormattedMessage} from "react-intl";

class SlideShow extends Component {
    render() {
        return (
            <div className="slide-show">
                <Carousel infiniteLoop
                          useKeyboardArrows
                          autoPlay
                          stopOnHover={true}
                          showThumbs={false}>
                    <div>
                        <img style={{
                            width: '100%',
                            height: 'auto',
                        }} src={serverURL + '/images/slideshow/1.png'}/>
                        <p className="main-page-buy-now-btn">
                            <FormattedMessage id="app.slide-show.shop-now"/>
                        </p>
                    </div>
                    <div>
                        <img src={serverURL + '/images/slideshow/2.png'}/>
                        <p className="main-page-buy-now-btn">
                            <FormattedMessage id="app.slide-show.shop-now"/>
                        </p>
                    </div>
                    <div>
                        <img src={serverURL + '/images/slideshow/3.png'}/>
                        <p className="main-page-buy-now-btn">
                            <FormattedMessage id="app.slide-show.shop-now"/>
                        </p>
                    </div>
                </Carousel>
            </div>
        );
    }
}

const serverURL = process.env.REACT_APP_API_URL;
export default SlideShow;
