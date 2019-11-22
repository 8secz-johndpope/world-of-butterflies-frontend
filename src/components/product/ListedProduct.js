import React, {Component} from 'react';
import Draggable from 'react-draggable'

// import {DraggableCore} from "react-draggable";

class ListedProduct extends Component {
    state = {
        id: 0,
        x: 0,
        y: 0
    };

    handleDrag = (e, ui) => {
        // console.log(ui);
        this.setState({
            id: this.props.id,
            x: ui.x,
            y: ui.y
        });
    };


    handleStop = (e, ui) => {
        console.log(e.pageX);
        console.log(e.pageY);
        console.log(e);
        console.log("Stopped");
    };

    eventLogger = (e: MouseEvent, data: Object) => {
        console.log('Event: ', e);
        console.log('Data: ', data);
    };

    render() {
        // const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const dragHandlers = this.props.dragHandlers;

        return (
            <React.Fragment>
                {/*{this.props.id}*/}
                {/*{this.props.name}*/}
                {/*{this.props.description}*/}
                {/*{this.props.price}*/}
                {/*{this.props.availableQuantity}*/}
                {/*<Draggable*/}
                {/*    bounds='parent'*/}
                {/*    onDrag={this.eventLogger}*/}
                {/*    onStop={this.handleStop}*/}
                {/*    {...dragHandlers}*/}
                {/*>*/}
                    {/*<div>*/}
                    {/*<div className="box">*/}
                    <img src={serverURL + this.props.url}
                         draggable="false"
                         className="listed-product-images"
                         onClick={()=>this.props.addProductToSpawnIn(this.props)}/>
                    {/*<div>*/}
                    {/*    <p>{this.state.id}</p>*/}
                    {/*    <p>{this.state.x}</p>*/}
                    {/*    <p>{this.state.y}</p>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                {/*</Draggable>*/}
            </React.Fragment>
        );
    }
}

const serverURL = "http://localhost:8080";

export default ListedProduct;
