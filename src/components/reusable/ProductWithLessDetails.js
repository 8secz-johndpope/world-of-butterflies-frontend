import React, {Component} from 'react';

class ProductWithLessDetails extends Component {
    state = {
        frameNumber: "2",
        smallPercentage: 0.3,
        mediumPercentage: 0.5,
        largePercentage: 0.75,
        largeRes: 1450,
        mediumRes: 1450,
        smallRes: 640,
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


    mouseEnterCapture = (number) => {
        this.setState({
            frameNumber: number
        })
    };

    mouseLeaveCapture = () => {
        // this.setState({
        //     frameNumber: "1"
        // })
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
                    <div className="small-frame-icons">
                        <span onMouseEnter={() => this.mouseEnterCapture(1)}
                              onMouseLeave={this.mouseLeaveCapture}
                              style={{
                                  backgroundImage: `url(${serverURL}/images/frames/color-options/1.png)`
                              }}
                        />
                        <span onMouseEnter={() => this.mouseEnterCapture(2)}
                              onMouseLeave={this.mouseLeaveCapture}
                              style={{
                                  backgroundImage: `url(${serverURL}/images/frames/color-options/2.png)`
                              }}
                        />
                        <span onMouseEnter={() => this.mouseEnterCapture(3)}
                              onMouseLeave={this.mouseLeaveCapture}
                              style={{
                                  backgroundImage: `url(${serverURL}/images/frames/color-options/3.png)`
                              }}
                        />
                    </div>
                    {/*<span className="helper"></span>*/}
                    <div className="frame-around-butterfly"
                         style={{
                             border: `${this.state.borderThickness}cm solid black`,
                             borderImage: `url(${serverURL}/images/frames/frame${this.state.frameNumber}.png) 50 / ${this.state.borderThickness}cm stretch `
                             // borderImageSource: `url(http://192.168.0.95:8080/images/frames/frame${this.state.frameNumber}.png)`,
                         }}>
                        <img src={serverURL + this.props.url}
                             style={{
                                 width: `${this.state.width}cm`,
                                 height: `${this.state.height}cm`,
                             }}/>
                    </div>
                    <span className="main-page-informational-text">
                        <p>{this.props.name}</p>
                        <p>{this.props.price}</p>
                    </span>
                </div>
            </React.Fragment>
        );
    }
}


const serverURL = "http://localhost:8080";

export default ProductWithLessDetails;
