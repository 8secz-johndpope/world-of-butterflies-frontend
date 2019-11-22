import React, {Component} from 'react';
import Draggable from 'react-draggable'

class DraggableProduct extends Component {
    state = {
        id: 0,
        x: 0,
        y: 0
    };

    handleDrag = (e, ui) => {
        // console.log(e);
        // console.log(ui);
        this.setState({
            id: this.props.id,
            x: ui.x,
            y: ui.y
        });
    };


    handleStop = (e, ui) => {
        console.log(e.target);
        console.log(ui);
        console.log("Stopped");
    };
    // eventLogger = (e: MouseEvent, data: Object) => {
    // console.log('Event: ', e);
    // console.log('Data: ', data);
    // };

    render() {
        return (
            <React.Fragment>
                <Draggable
                    bounds="parent"
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}
                >
                    <img src={serverURL + this.props.url}
                         draggable="false"
                         className="draggable-product-images"
                    />
                </Draggable>
            </React.Fragment>
        );
    }
}

const serverURL = "http://localhost:8080";

export default DraggableProduct;
