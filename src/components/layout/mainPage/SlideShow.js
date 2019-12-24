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
                        }} src={serverURL + '/images/slideshow/Slideshow1.jpg'}/>
                        <p className="main-page-buy-now-btn">
                            <FormattedMessage id="app.slide-show.shop-now"/>
                        </p>
                    </div>
                    <div>
                        <img src={serverURL + '/images/slideshow/Slideshow2.jpg'}/>
                        <p className="main-page-buy-now-btn">
                            <FormattedMessage id="app.slide-show.shop-now"/>
                        </p>
                    </div>
                    <div>
                        <img src={serverURL + '/images/slideshow/Slideshow3.jpg'}/>
                        <p className="main-page-buy-now-btn">
                            <FormattedMessage id="app.slide-show.shop-now"/>
                        </p>
                    </div>
                    {/*<div>*/}
                    {/*    <img src={serverURL + '/images/slideshow/Slideshow10.jpg'}/>*/}
                    {/*    <p className="main-page-buy-now-btn">*/}
                    {/*        <FormattedMessage id="app.slide-show.shop-now"/>*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <img src={serverURL + '/images/slideshow/Slideshow5.jpg'}/>*/}
                    {/*    <p className="main-page-buy-now-btn">*/}
                    {/*        <FormattedMessage id="app.slide-show.shop-now"/>*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                    <div>
                        <img src={serverURL + '/images/slideshow/Slideshow6.jpg'}/>
                        <p className="main-page-buy-now-btn">
                            <FormattedMessage id="app.slide-show.shop-now"/>
                        </p>
                    </div>
                    <div>
                        <img src={serverURL + '/images/slideshow/Slideshow7.jpg'}/>
                        <p className="main-page-buy-now-btn">
                            <FormattedMessage id="app.slide-show.shop-now"/>
                        </p>
                    </div>
                    <div>
                        <img src={serverURL + '/images/slideshow/Slideshow8.jpg'}/>
                        <p className="main-page-buy-now-btn">
                            <FormattedMessage id="app.slide-show.shop-now"/>
                        </p>
                    </div>
                    <div>
                        <img src={serverURL + '/images/slideshow/Slideshow9.jpg'}/>
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
