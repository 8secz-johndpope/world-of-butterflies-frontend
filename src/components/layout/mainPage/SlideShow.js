import React, {Component} from 'react';
import {Carousel} from "react-responsive-carousel";
import {FormattedMessage} from "react-intl";
import {getSlideshowPictures} from "../../../service/fetchService/fetchService";
import {Link} from "react-router-dom";

class SlideShow extends Component {
    state = {
        slideshowPictures: []
    };

    componentDidMount() {
        getSlideshowPictures()
            .then(resp =>
                this.setState({
                    slideshowPictures: resp,
                })
            );
    }

    render() {
        return (
            <div className="slide-show">
                <Carousel infiniteLoop
                          useKeyboardArrows
                          autoPlay
                          stopOnHover={true}
                          showThumbs={false}>
                    {
                        this.state.slideshowPictures.map(picture =>
                            <div>
                                <img style={{
                                    width: '100%',
                                    height: 'auto',
                                }} src={serverURL + picture.url}/>
                                <Link to={'/products/' + picture.productId}
                                      style={{
                                          textDecoration: 'none',
                                      }}
                                >
                                    <p className="main-page-buy-now-btn">
                                        <FormattedMessage id="app.slide-show.shop-now"/>
                                    </p>
                                </Link>
                            </div>
                        )
                    }
                </Carousel>
            </div>
        );
    }
}

const serverURL = process.env.REACT_APP_API_URL;
export default SlideShow;
