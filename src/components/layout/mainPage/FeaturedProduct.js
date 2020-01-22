import React, {Component} from 'react';
import {Link} from "react-router-dom";

class FeaturedProduct extends Component {
    state = {
        frameColour: "black",

        smallPercentage: 0.3,
        mediumPercentage: 0.3,
        inBetweenPercentage: 0.4,
        largePercentage: 0.5,

        smallRes: 945,
        mediumRes: 1156,
        inBetweenRes: 1550,
        largeRes: 1800,

        width: 0,
        height: 0,
        borderThickness: 0,

    };

    componentDidMount() {
        this.calculateImageSize();
        window.addEventListener("resize", this.handleResizeEvent);
    }

    handleResizeEvent = () => {
        this.calculateImageSize();
    };


    calculateImageSize = () => {
        let width = this.props.width;
        let height = this.props.height;
        let borderThickness = 1.6;
        let windowWidth = window.innerWidth;
        let newWidth = 0;
        let newHeight = 0;
        let newBorderThickness = 0;

        if (windowWidth <= this.state.smallRes) {
            newWidth = width * this.state.smallPercentage;
            newHeight = height * this.state.smallPercentage;
            newBorderThickness = borderThickness * this.state.smallPercentage

        } else if (windowWidth <= this.state.mediumRes) {
            newWidth = width * this.state.mediumPercentage;
            newHeight = height * this.state.mediumPercentage;
            newBorderThickness = borderThickness * this.state.mediumPercentage

        } else if (windowWidth <= this.state.inBetweenRes) {
            newWidth = width * this.state.inBetweenPercentage;
            newHeight = height * this.state.inBetweenPercentage;
            newBorderThickness = borderThickness * this.state.inBetweenPercentage
        } else {
            newWidth = width * this.state.largePercentage;
            newHeight = height * this.state.largePercentage;
            newBorderThickness = borderThickness * this.state.largePercentage
        }
        this.setState({
            width: newWidth,
            height: newHeight,
            borderThickness: newBorderThickness,

        });
    };

    render() {
        return (
            <React.Fragment>
                <div className="main-page-featured-product">
                    <Link to={`/products/${this.props.id}`}
                          style={{
                              textDecoration: 'none',
                              color: 'black',
                          }}
                    >
                        <span className="aligner-span">
                        {
                            this.props.isInFrame ?
                                <img src={serverURL + this.props.url}
                                     style={{
                                         width: `100%`,
                                         height: 'auto',
                                         border: '1px solid #D3D3D3'
                                     }}/>
                                :
                                <div className="frame-around-butterfly additional-margin"
                                     style={{
                                         border: `${this.state.borderThickness}cm solid black`,
                                         borderImage: `url(${serverURL}/images/frames/${this.state.frameColour}.png) 50 / ${this.state.borderThickness}cm stretch `
                                     }}>
                                    <img src={serverURL + this.props.url}
                                         style={{
                                             width: `${this.state.width}cm`,
                                             height: `${this.state.height}cm`,
                                         }}/>
                                </div>
                        }

                            {
                                this.props.isInFrame ?

                                    <span className="main-page-informational-text">
                                    <p className="featured-product-name-framed">{this.props.name}</p>
                                    <p className="featured-product-price-framed">{this.props.price}€</p>
                                </span>
                                    :
                                    <span className="main-page-informational-text-non-framed">
                                    <p className="featured-product-name-non-framed">{this.props.name}</p>
                                    <p className="featured-product-price-non-framed">{this.props.price}€</p>
                                </span>
                            }
                        </span>
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}


const serverURL = process.env.REACT_APP_API_URL;

export default FeaturedProduct;
