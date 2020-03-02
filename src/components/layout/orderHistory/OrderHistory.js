import React, {Component} from 'react';
import {getOrderHistory} from "../../../service/fetchService/fetchService";
import {FormattedMessage} from "react-intl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle, faPlusCircle} from "@fortawesome/free-solid-svg-icons";

class OrderHistory extends Component {
    state = {
        response: []
    };

    componentDidMount(): void {
        getOrderHistory()
            .then(resp => {
                this.setState({
                    response: resp,
                })
            })
    }

    handleCheckboxChange = (checkBoxId) => {
        if (this.state[checkBoxId] === undefined || this.state[checkBoxId] === false) {
            this.setState({
                [checkBoxId]: true
            })
        } else {
            this.setState({
                [checkBoxId]: false
            })
        }
    };

    render() {
        return (
            <div>
                <table className="order-history-table">
                    <thead>
                    <tr>
                        <th className="th-order-history-purchase-date">
                            {/*<FormattedMessage id="app.shopping.cart.product"/>*/}

                        </th>
                        <th className="th-order-history-purchase-subtotal">
                            {/*<FormattedMessage id="app.shopping.cart.price"/>*/}
                            <p>subtotal</p>
                        </th>
                        <th className="th-order-history-purchase-order-id">
                            {/*<FormattedMessage id="app.shopping.cart.price"/>*/}
                            <p>order id</p>
                        </th>
                    </tr>
                    </thead>

                    {
                        this.state.response.map((resp, index) =>

                            <tr>
                                <td className='td-order-history-purchase-date' align="left">
                                    <input type="checkbox" id={'order-history-check' + index}
                                           onChange={() => this.handleCheckboxChange('orderHistoryCheck' + index)}/>
                                    <label htmlFor={'order-history-check' + index}
                                           style={{textTransform: "capitalize"}}>
                                        {resp.checkoutDate.year + "-" + resp.checkoutDate.monthValue + "-" + resp.checkoutDate.dayOfMonth}
                                    </label>

                                    <span
                                        className={this.state['orderHistoryCheck' + index] ? 'display-detailed-order-view' : 'hide-detailed-order-view'}>
                                        {resp.wrappedOrderIds.map(wrappedOrderId =>

                                            wrappedOrderId.frame.colour === invisibleFrame ?
                                                <div className='detailed-product-history-view'>
                                                    <img className="non-framed-product-in-order-history-img"
                                                         src={serverURL + wrappedOrderId.product.url}/>
                                                    <p>{wrappedOrderId.product.name}</p>
                                                    <p>{wrappedOrderId.product.price}€</p>
                                                </div>

                                                :

                                                <span>
                                                    <div className="detailed-product-history-view">
                                                        <div
                                                            className="framed-product-in-order-history-border"
                                                            style={{
                                                                border: '10px solid black',
                                                                borderImage: `url(${serverURL}/images/frames/${wrappedOrderId.frame.colour}.png) 50 / 0.3cm stretch`,
                                                                borderImageSource: `url(${serverURL}/images/frames/${wrappedOrderId.frame.colour}.png)`
                                                            }}>
                                                            {
                                                                <img src={serverURL + wrappedOrderId.product.url}
                                                                     className="framed-product-in-order-history-img"
                                                                />
                                                            }
                                                        </div>
                                                        <p>{wrappedOrderId.product.name}</p>
                                                        <p>{wrappedOrderId.product.price}€</p>
                                                    </div>
                                                </span>
                                        )}
                                    </span>
                                </td>
                                <td className='td-order-history-purchase-subtotal'>
                                    <p>123€</p>
                                </td>
                                <td className='td-order-history-purchase-order-id'>
                                    {/*<p>{resp.id}</p>*/}
                                </td>
                            </tr>
                        )
                    }
                </table>
                {/*<table className="shopping-cart-table">*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <th colSpan="2">*/}
                {/*            <FormattedMessage id="app.shopping.cart.product"/>*/}
                {/*        </th>*/}
                {/*        <th>*/}
                {/*            <FormattedMessage id="app.shopping.cart.price"/>*/}
                {/*        </th>*/}
                {/*        <th>*/}
                {/*            <FormattedMessage id="app.shopping.cart.qty"/>*/}
                {/*        </th>*/}
                {/*        <th>*/}
                {/*            <FormattedMessage id="app.shopping.cart.total"/>*/}
                {/*        </th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    {this.state.response.map((res) =>*/}

                {/*        <tr>*/}
                {/*            <td>*/}
                {/*                {*/}
                {/*                    <img src={serverURL + res.product.url}*/}
                {/*                         style={{*/}
                {/*                             width: '100%',*/}
                {/*                         }}*/}
                {/*                    />*/}
                {/*                }*/}
                {/*            </td>*/}
                {/*            <td>{res.product.name}</td>*/}
                {/*            <td>{res.product.price}</td>*/}
                {/*            <td>*/}
                {/*                <FontAwesomeIcon*/}
                {/*                    className="shopping-cart-fa-icons"*/}
                {/*                    icon={faMinusCircle}*/}
                {/*                    onClick={() => this.removeOneProductFromShoppingCart(res)}*/}
                {/*                />*/}
                {/*                {this.countQtyByIdAndFrameColour(res.product.id, res.chosenFrame.colour)}*/}
                {/*                <FontAwesomeIcon*/}
                {/*                    className="shopping-cart-fa-icons"*/}
                {/*                    icon={faPlusCircle}*/}
                {/*                    onClick={() => this.addOneProductToShoppingCart(res.product, res.chosenFrame)}*/}
                {/*                />*/}
                {/*            </td>*/}
                {/*            <td>{this.calculatePricePerCategory(res.product.price, this.countQtyByIdAndFrameColour(res.product.id, res.frameColour))}</td>*/}
                {/*        </tr>*/}
                {/*    )}*/}
                {/*    </tbody>*/}
                {/*</table>*/}
            </div>
        );
    }
}

const serverURL = process.env.REACT_APP_API_URL;
const invisibleFrame = process.env.REACT_APP_INVISIBLE_FRAME;
export default OrderHistory;
