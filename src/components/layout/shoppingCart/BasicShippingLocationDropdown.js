import React, {Component} from 'react';
import '../../../css/ShippingLocationDropdowns.css'
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";

class BasicShippingLocationDropdown extends Component {

    // state = {
    //     chosenLocation: {
    //         key: 'app.basic-shipping-locations.slovakia',
    //         value: 1.5
    //     },
    //     areLocationChoicesVisible: false,
    //     isLocationSet: false,
    //     basicLocations: [
    //         {
    //             key: 'app.basic-shipping-locations.slovakia',
    //             value: 1.5
    //         },
    //         {
    //             key: 'app.basic-shipping-locations.europe',
    //             value: 2
    //
    //         },
    //         {
    //             key: 'app.basic-shipping-locations.third-world',
    //             value: 3.5
    //         }
    //     ]
    // };

    // displayLocationChoices = () => {
    //     this.setState({
    //         areLocationChoicesVisible: !this.props.areLocationChoicesVisible
    //     })
    // };

    // calculateShippingCost = () => {
    //     let productWeight = 0;
    //     this.props.productsInShoppingCart.map((productInCart) =>
    //         productWeight += productInCart.product.weight
    //     );
    //     let shippingCost;
    //     shippingCost = productWeight * this.props.chosenLocation.value;
    //     this.props.updateShippingCost(shippingCost);
    // };


    setLocation = (location) => {
        this.setState({
            isLocationSet: true,
            chosenLocation: location,
            areLocationChoicesVisible: false,
        }, () => this.calculateShippingCost())

    };

    render() {
        return (
            <div className="basic-shipping-dropdown-container">
                <div className="basic-shipping-location-title">
                    {/*{*/}
                    {/*    this.props.isLocationSet ?*/}
                            <span className="location-title"
                                  onClick={this.props.displayLocationChoices}
                            >
                                <FormattedMessage
                                    id={this.props.chosenLocation.key}
                                />
                            </span>
                            {/*:*/}
                    {/*        <span className="location-title"*/}
                    {/*              onClick={this.displayLocationChoices}*/}
                    {/*        >*/}
                    {/*            <FormattedMessage*/}
                    {/*                id="app.basic-shipping-locations.choose-location"*/}
                    {/*            />*/}
                    {/*        </span>*/}
                    {/*}*/}

                </div>
                {
                    this.props.areLocationChoicesVisible ?
                        <div className="basic-shipping-dropdown-options">
                            <div>
                                <span className="location-choice"
                                      onClick={() => this.props.setLocation(this.props.basicLocations[0])}
                                >
                                    <FormattedMessage
                                        id={this.props.basicLocations[0].key}/>
                                </span>
                            </div>
                            <div>
                                <span className="location-choice"
                                      onClick={() => this.props.setLocation(this.props.basicLocations[1])}
                                >
                                    <FormattedMessage id={this.props.basicLocations[1].key}/>
                                </span>
                            </div>
                            <div>
                                <span className="location-choice"
                                      onClick={() => this.props.setLocation(this.props.basicLocations[2])}
                                >
                                    <FormattedMessage id={this.props.basicLocations[2].key}/>
                                </span>
                            </div>
                        </div>
                        :
                        null
                }


            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        productsInShoppingCart: state.productsInShoppingCart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateShippingCost: function (newShippingCost) {
            const action = {type: "updateShippingCost", newShippingCost};
            dispatch(action);
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicShippingLocationDropdown);
