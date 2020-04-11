import React, {Component} from 'react';
import './../../../css/AdminPage.css';
import {
    getAllProductsPaginated,
    getMainProductTypes,
    getSubProductTypes,
    updateProductById,
    deleteProductById,
    getAllProductOrigins,
    getAllColours,
    updateColourById,
    deleteColourById,
    addNewColour,
    addNewProduct,
    getAllFrames,
    updateFrameById,
    addNewFrame,
    deleteFrameById,
    getAllSlideshow,
    updateSlideshowById,
    deleteSlideshowById,
    addNewSlideshow,
    getAllCategories,
    addNewCategory,
    updateCategoryById,
    deleteCategoryById,
    getAdditionalProductImagesByProdId,
    updateAdditionalProductImageById,
    addNewAdditImg,
    deleteAdditionalProductImageById,
    getProductBySlideshow,
    getNotShippedOrPayedOrders,
    updateNotShippedOrPayedOrderById,
    getOrdersInBetween,
    getNotShippedOrPayedOrderById
} from "../../../service/fetchService/fetchService";
import update from "react-addons-update";
import {ProductObject} from "../../objects/ProductObject";
import {ColourObject} from "../../objects/ColourObject";
import {FrameObject} from "../../objects/FrameObject";
import {SlideshowObject} from "../../objects/SlideshowObject";
import {CategoryObject} from "../../objects/CategoryObject";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AdditionalProductImageObject} from "../../objects/AdditionalProductImageObject";

class AdminPage extends Component {
    state = {
        products: [],
        mainProductTypes: [],
        subProductTypes: [],
        origins: [],
        colours: [],
        frames: [],
        slideshow: [],
        categories: [],
        newColour: {
            colourName: '',
            colourNameHU: '',
            colourNameENG: '',
            colourNameSK: '',
            colourNameDE: '',
            colourNameRU: '',
            colourNamePlusOne: ''
        },
        newProduct: {
            name: '',
            price: 0,
            availableQuantity: 0,
            URL: '',
            width: '',
            height: '',
            isInFrame: false,
            isBestSeller: false,
            origin: '',
            colourString: '',
            mainType: '',
            subType: ''
        },
        newFrame: {
            quantity: 0,
            colour: '',
            width: 0,
            height: 0
        },
        newSlideshow: {
            url: '',
            productId: 0,
        },
        newCategory: {
            mainProductType: '',
            subProductType: '',
            url: '',
        },
        showProducts: false,
        showMainProductTypes: false,
        showSubProductTypes: false,
        showOrigins: false,
        showColours: false,
        showFrames: false,
        showSlideshow: false,
        showCategories: false,
        showAdditImages: false,
        showOrders: false,
        showOrdersInBetween: false,
        additionalImages: [],
        newAdditionalImage: {
            productId: 0,
            url: '',
        },
        selectedProductId: 0,
        productBySlideshow: {
            name: '',
            price: 0,
            availableQuantity: 0,
            URL: '',
            width: '',
            height: '',
            isInFrame: false,
            isBestSeller: false,
            origin: '',
            colourString: '',
            mainType: '',
            subType: ''
        },
        orderList: [],
        orderListInBetween: [],
        fromDate: '',
        toDate: '',
    };

    modifyShowStatus = (param) => {
        this.setState({
            [param]: !this.state[param],
        });
        if (param === "showOrders" && this.state.orderList.length === 0) {
            this.getNotPayNotShippedProducts();
        }
    };

    modifyShowStatusAndFetch = (param, orderId) => {
        if (this.state[param] === false || this.state[param] === undefined){
            getNotShippedOrPayedOrderById(orderId)
                .then(resp => {
                    console.log(resp)
                    this.setState({
                        ['order'+orderId]:resp
                    })
                })
        }
        this.setState({
            [param]: !this.state[param],
        });

    };

    componentDidMount(): void {
        this.getAllProductsPaginatedFromServer(0, 33);
        this.getProductTypes();
        this.getTheProductOrigins();
        this.getTheProductColours();
        this.getAllTheFrames();
        this.getAllSlideshows();
        this.getAllTheCategories();
    }


    getAllOrdersInBetween = () => {
        if (this.state.fromDate !== '' && this.state.toDate !== '') {
            getOrdersInBetween(this.state.fromDate, this.state.toDate)
                .then(resp => {
                    this.setState({
                        orderListInBetween: resp
                    })
                })
        }
    };

    getNotPayNotShippedProducts = () => {
        getNotShippedOrPayedOrders()
            .then(resp => {
                this.setState({
                    orderList: resp
                })
            })
    };

    getAllTheCategories = () => {
        getAllCategories()
            .then(resp => {
                this.setState({
                    categories: resp,
                })
            });
    };

    getAllSlideshows = () => {
        getAllSlideshow()
            .then(resp => {
                this.setState({
                    slideshow: resp,
                })
            });
    };

    getAllTheFrames = () => {
        getAllFrames()
            .then(resp => {
                this.setState({
                    frames: resp,
                })
            });
    };

    getTheProductColours = () => {
        getAllColours()
            .then(resp => {
                this.setState({
                    colours: resp,
                })
            });

    };

    getTheProductOrigins = () => {
        getAllProductOrigins()
            .then(resp => {
                this.setState({
                    origins: resp,
                })
            });
        getAllColours()
            .then(resp => {
                this.setState({
                    colours: resp,
                })
            });

    };

    getProductTypes = () => {
        getMainProductTypes()
            .then(resp => {
                this.setState({
                    mainProductTypes: resp,
                })
            });
        getSubProductTypes()
            .then(resp => {
                this.setState({
                    subProductTypes: resp,
                })
            });
    };

    getAllProductsPaginatedFromServer(page, limit) {
        getAllProductsPaginated(page, limit)
            .then(resp => {
                if (this.state.products.length === 0) {
                    this.setState({
                        products: resp
                    })
                } else {
                    this.setState({
                        products: [...this.state.products, ...resp]
                    })
                }
            });

    }

    handleProductFieldChanges = (index, paramName) => (event) => {
        let newState = update(this.state, {
            products: {
                [index]: {
                    [paramName]: {$set: event.target.value}
                }
            }
        });
        this.setState(newState);
    };

    handleMainProductTypeFieldDropdownChanges = (index) => (event) => {
        let newState = update(this.state, {
            products: {
                [index]: {
                    mainType: {$set: this.state.mainProductTypes[event.target.value]}
                }
            }
        });
        this.setState(newState);
    };

    handleSubProductTypeFieldDropdownChanges = (index) => (event) => {
        let newState = update(this.state, {
            products: {
                [index]: {
                    subType: {$set: this.state.subProductTypes[event.target.value]}
                }
            }
        });
        this.setState(newState);
    };

    //handleShippingAddressDropdownChange = (e) => {
    //         this.setState({
    //             shippingAddress: {
    //                 ...this.state.shippingAddress,
    //                 country: this.state.countries[e.target.value],
    //             },
    //             isChange: true
    //         });
    //     };


    handleCheckboxChanges = (index, paramName, value) => {
        let newState = update(this.state, {
            products: {
                [index]: {
                    [paramName]: {$set: value}
                }
            }
        });
        this.setState(newState);
    };

    handleOrderCheckboxChanges = (index, paramName, value) => {
        let newState = update(this.state, {
            orderList: {
                [index]: {
                    [paramName]: {$set: value}
                }
            }
        });
        this.setState(newState);
    };

    handleNewProductCheckboxChanges = (paramName, value) => {
        let newState = update(this.state, {
            newProduct: {
                [paramName]: {$set: value}
            }
        });
        this.setState(newState);
    };


    saveModifiedProduct = (index) => {
        let productFromState = this.state.products[index];
        let productToUpdate = new ProductObject(
            productFromState.name,
            productFromState.price,
            productFromState.availableQuantity,
            productFromState.width,
            productFromState.height,
            productFromState.isInFrame,
            productFromState.isBestSeller,
            productFromState.origin,
            productFromState.colourString,
            productFromState.mainType,
            productFromState.subType,
            productFromState.URL);
        updateProductById(productFromState.id, productToUpdate)
    };

    saveModifiedOrder = (index) => {
        let orderFromState = this.state.orderList[index];
        let booleanObjectToUpdateOrder = {
            isShipped: orderFromState.isShipped,
            isPayed: orderFromState.isPayed
        };
        updateNotShippedOrPayedOrderById(orderFromState.id, booleanObjectToUpdateOrder);
    };

    saveNewProduct = () => {
        let productFromState = this.state.newProduct;
        let productToUpdate = new ProductObject(
            productFromState.name,
            productFromState.price,
            productFromState.availableQuantity,
            productFromState.width,
            productFromState.height,
            productFromState.isInFrame,
            productFromState.isBestSeller,
            productFromState.origin,
            productFromState.colourString,
            productFromState.mainType,
            productFromState.subType,
            productFromState.URL);
        addNewProduct(productToUpdate)
    };

    handleNewProductFieldChanges = (paramName) => (event) => {
        let newState = update(this.state, {
            newProduct: {
                [paramName]: {$set: event.target.value}
            }
        });
        this.setState(newState);
    };

    handleNewProductFieldMainTypeDropdown = (event) => {
        let newState = update(this.state, {
            newProduct: {
                mainType: {$set: this.state.mainProductTypes[event.target.value]}
            }
        });
        this.setState(newState);
    };

    handleNewProductFieldSubTypeDropdown = (event) => {
        let newState = update(this.state, {
            newProduct: {
                subType: {$set: this.state.subProductTypes[event.target.value]}
            }
        });
        this.setState(newState);
    };


    clearNewProductField = () => {
        this.setState({
            newProduct: {
                name: '',
                price: 0,
                availableQuantity: 0,
                URL: '',
                width: '',
                height: '',
                isInFrame: false,
                isBestSeller: false,
                origin: '',
                colourString: '',
                mainType: '',
                subType: ''
            }
        })
    };

    deleteProductById = (productId) => {
        deleteProductById(productId)
    };

    handleColourFieldChanges = (index, paramName) => (event) => {
        let newState = update(this.state, {
            colours: {
                [index]: {
                    [paramName]: {$set: event.target.value}
                }
            }
        });
        this.setState(newState);
    };

    handleNewColourFieldChanges = (paramName) => (event) => {
        let newState = update(this.state, {
            newColour: {
                [paramName]: {$set: event.target.value}
            }
        });
        this.setState(newState);
    };

    saveNewlyCreatedColour = () => {
        let colourFromState = this.state.newColour;
        let colourToUpdate = new ColourObject(
            colourFromState.colourNameHU,
            colourFromState.colourNameENG,
            colourFromState.colourNameSK,
            colourFromState.colourNameDE,
            colourFromState.colourNameRU,
            colourFromState.colourNamePlusOne
        );
        addNewColour(colourToUpdate);
    };

    clearNewColourFields = () => {
        this.setState({
            newColour: {
                colourName: '',
                colourNameHU: '',
                colourNameENG: '',
                colourNameSK: '',
                colourNameDE: '',
                colourNameRU: '',
                colourNamePlusOne: ''
            }
        })
    };

    saveModifiedColour = (index) => {
        let colourFromState = this.state.colours[index];
        let colourToUpdate = new ColourObject(
            colourFromState.colourNameHU,
            colourFromState.colourNameENG,
            colourFromState.colourNameSK,
            colourFromState.colourNameDE,
            colourFromState.colourNameRU,
            colourFromState.colourNamePlusOne
        );
        updateColourById(colourFromState.id, colourToUpdate);
    };

    deleteAColourById = (colourId) => {
        deleteColourById(colourId)
    };

    handleFrameFieldChanges = (index, paramName) => (event) => {
        let newState = update(this.state, {
            frames: {
                [index]: {
                    [paramName]: {$set: event.target.value}
                }
            }
        });
        this.setState(newState);
    };


    saveModifiedFrame = (index) => {
        let frameFromState = this.state.frames[index];
        let frameToUpdate = new FrameObject(
            frameFromState.quantity,
            frameFromState.colour,
            frameFromState.width,
            frameFromState.height,
        );
        updateFrameById(frameFromState.id, frameToUpdate);
    };

    deleteAFrameById = (frameId) => {
        deleteFrameById(frameId)
    };


    handleNewFrameFieldChanges = (paramName) => (event) => {
        let newState = update(this.state, {
            newFrame: {
                [paramName]: {$set: event.target.value}
            }
        });
        this.setState(newState);
    };

    saveNewFrame = () => {
        let frameFromState = this.state.newFrame;
        let frameToUpdate = new FrameObject(
            frameFromState.quantity,
            frameFromState.colour,
            frameFromState.width,
            frameFromState.height,
        );
        addNewFrame(frameToUpdate);
    };

    clearNewFrameFields = () => {
        this.setState({
            newFrame: {
                quantity: 0,
                colour: '',
                width: 0,
                height: 0
            }
        })
    };

    handleSlideshowFieldChanges = (index, paramName) => (event) => {
        let newState = update(this.state, {
            slideshow: {
                [index]: {
                    [paramName]: {$set: event.target.value}
                }
            }
        });
        this.setState(newState);
    };

    saveModifiedSlideshow = (index) => {
        let slideshowFromState = this.state.slideshow[index];
        let slideshowToUpdate = new SlideshowObject(
            slideshowFromState.id,
            slideshowFromState.url,
        );
        updateSlideshowById(slideshowFromState.id, slideshowToUpdate);
    };

    deleteASlideshowById = (slideshowId) => {
        deleteSlideshowById(slideshowId);
    };

    handleNewSlideshowFieldChanges = (paramName) => (event) => {
        let newState = update(this.state, {
            newSlideshow: {
                [paramName]: {$set: event.target.value}
            }
        });
        this.setState(newState);
    };

    saveNewSlideshow = () => {
        let slideshowFromState = this.state.newSlideshow;
        let slideshowToUpdate = new SlideshowObject(
            slideshowFromState.id,
            slideshowFromState.url,
        );
        addNewSlideshow(slideshowToUpdate);
    };

    clearNewSlideshowFields = () => {
        this.setState({
            newSlideshow: {
                url: '',
                productId: 0,
            }
        })
    };

    handleCategoryFieldChanges = (index, paramName) => (event) => {
        let newState = update(this.state, {
            categories: {
                [index]: {
                    [paramName]: {$set: event.target.value}
                }
            }
        });
        this.setState(newState);
    };

    saveModifiedCategory = (index) => {
        let categoryFromState = this.state.categories[index];
        let categoryToUpdate = new CategoryObject(
            categoryFromState.subProductType,
            categoryFromState.mainProductType,
            categoryFromState.url,
        );
        updateCategoryById(categoryFromState.id, categoryToUpdate);
    };

    deleteACategoryById = (categoryId) => {
        deleteCategoryById(categoryId);
    };


    handleNewCategoryFieldChanges = (paramName) => (event) => {
        let newState = update(this.state, {
            newCategory: {
                [paramName]: {$set: event.target.value}
            }
        });
        this.setState(newState);
    };

    saveNewCategory = () => {
        let categoryFromState = this.state.newCategory;
        let categoryToUpdate = new CategoryObject(
            categoryFromState.subProductType,
            categoryFromState.mainProductType,
            categoryFromState.url,
        );
        addNewCategory(categoryToUpdate);
    };

    clearNewCategoryFields = () => {
        this.setState({
            newCategory: {
                mainProductType: '',
                subProductType: '',
                url: '',
            }
        })
    };

    getAdditionalImagesByProdId = (prodId) => {
        getAdditionalProductImagesByProdId(prodId)
            .then(resp => {
                this.setState({
                    additionalImages: resp,
                    selectedProductId: prodId,
                })
            })
    };

    handleAdditImageFieldChanges = (index, paramName) => (event) => {
        let newState = update(this.state, {
            additionalImages: {
                [index]: {
                    [paramName]: {$set: event.target.value}
                }
            }
        });
        this.setState(newState);
    };

    saveModifiedAdditImage = (index) => {
        let additImgFromState = this.state.additionalImages[index];
        let objectToUpdate = new AdditionalProductImageObject(
            additImgFromState.productId,
            additImgFromState.url);
        updateAdditionalProductImageById(additImgFromState.id, objectToUpdate)
    };

    saveNewAdditImage = () => {
        let additImgFromState = this.state.newAdditionalImage;
        let objectToUpdate = new AdditionalProductImageObject(
            additImgFromState.productId,
            additImgFromState.url);
        addNewAdditImg(objectToUpdate);
    };

    handleNewAdditImageFieldChanges = (paramName) => (event) => {
        let newState = update(this.state, {
            newAdditionalImage: {
                [paramName]: {$set: event.target.value}
            }
        });
        this.setState(newState);
    };


    clearNewAdditImageFields = () => {
        this.setState({
            newAdditionalImage: {
                productId: 0,
                url: '',
            },
        })
    };

    deleteAnAdditImageById = (additImageId) => {
        deleteAdditionalProductImageById(additImageId);
    };


    getAssociatedProduct = (prodId) => {
        getProductBySlideshow(prodId)
            .then(resp => {
                this.setState({
                    productBySlideshow: resp,
                })
            })
    };


    handleExtraProductFieldChanges = (paramName) => (event) => {
        let newState = update(this.state, {
            productBySlideshow: {
                [paramName]: {$set: event.target.value}
            }
        });
        this.setState(newState);
    };


    clearExtraProduct = () => {
        this.setState({
            productBySlideshow: {
                name: '',
                price: 0,
                availableQuantity: 0,
                URL: '',
                width: '',
                height: '',
                isInFrame: false,
                isBestSeller: false,
                origin: '',
                colourString: '',
                mainType: '',
                subType: ''
            },
        })
    };

    saveExtraModifiedProduct = () => {
        let productFromState = this.state.productBySlideshow;
        let productToUpdate = new ProductObject(
            productFromState.name,
            productFromState.price,
            productFromState.availableQuantity,
            productFromState.width,
            productFromState.height,
            productFromState.isInFrame,
            productFromState.isBestSeller,
            productFromState.origin,
            productFromState.colourString,
            productFromState.mainType,
            productFromState.subType,
            productFromState.url);
        updateProductById(productFromState.id, productToUpdate)
    };


    changeDate = (paramName) => (event) => {
        let newState = update(this.state, {
            [paramName]: {$set: event.target.value}
        });
        this.setState(newState);
    };

    countQtyByIdAndFrameColour = (id, frameColour) => {
        const countTypes = this.state.orderListInBetween.filter(
            wrappedEntity => wrappedEntity.product.id === id &&
                wrappedEntity.frame.colour === frameColour
        );
        return countTypes.length;
    };

    getNotShippedOrPayedOrderById = (orderId) => {
        getNotShippedOrPayedOrderById(orderId)
    };


    render() {
        return (
            <div className="admin-page-container">

                <div className="product-types-origins">

                    <div className="main-types">
                        <button onClick={() => this.modifyShowStatus('showMainProductTypes')}> Show / Hide</button>
                        <h2 className="read-only-boards">Main Product Types</h2>
                        <span className={this.state.showMainProductTypes ? '' : 'hide-content'}>
                        {
                            this.state.mainProductTypes.map(type =>
                                <p>{type}</p>
                            )
                        }
                        </span>
                    </div>

                    <div className="sub-types">
                        <button onClick={() => this.modifyShowStatus('showSubProductTypes')}> Show / Hide</button>
                        <h2 className="read-only-boards">Sub Product Types</h2>
                        <span className={this.state.showSubProductTypes ? '' : 'hide-content'}>
                        {
                            this.state.subProductTypes.map(type =>
                                <p>{type}</p>
                            )
                        }
                        </span>
                    </div>

                    <div className="origins">
                        <button onClick={() => this.modifyShowStatus('showOrigins')}> Show / Hide</button>
                        <h2 className="read-only-boards">Origins</h2>
                        <span className={this.state.showOrigins ? '' : 'hide-content'}>
                        {
                            this.state.origins.map(origin =>
                                <p>{origin}</p>
                            )
                        }
                        </span>
                    </div>
                </div>

                <div className="admin-page-product-container">
                    <h2 className="getter-boards">
                        <button onClick={() => this.modifyShowStatus('showProducts')}> Show / Hide</button>
                        Products
                    </h2>
                    <span className={this.state.showProducts ? '' : 'hide-content'}>
                        <div>
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        <p>id</p>
                                    </th>
                                    <th>
                                        <p>name</p>
                                    </th>
                                    <th>
                                        <p>price</p>
                                    </th>
                                    <th>
                                        <p>Qty</p>
                                    </th>
                                    <th>
                                        <p>width</p>
                                    </th>
                                    <th>
                                        <p>height</p>
                                    </th>
                                    <th>
                                        <p>frame</p>
                                    </th>
                                    <th>
                                        <p>bestSeller</p>
                                    </th>
                                    <th>
                                        <p>origin</p>
                                    </th>
                                    <th>
                                        <p>colour</p>
                                    </th>
                                    <th>
                                        <p>mainType</p>
                                    </th>
                                    <th>
                                        <p>subType</p>
                                    </th>
                                    <th>
                                        <p>url</p>
                                    </th>
                                    <th>
                                    </th>
                                    <th>
                                        <p></p>
                                    </th>
                                    <th>
                                        <p></p>
                                    </th>
                                </tr>
                                </thead>
                                {/*//TODO fix origin/text*/}

                                {
                                    this.state.products.map((product, index) =>
                                        <tr className="admin-page-product-value-container">
                                            <td>
                                                <p>{product.id}
                                                    <span className='addit-product-dropdown'>
                                                    <FontAwesomeIcon icon={faArrowDown}
                                                                     onClick={() => this.getAdditionalImagesByProdId(product.id)}
                                                    />
                                                </span>
                                                </p>
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.products[index].name}
                                                       onChange={this.handleProductFieldChanges(index, 'name')}
                                                />
                                            </td>

                                            <td>
                                                <input type="number" value={this.state.products[index].price}
                                                       step="0.01"
                                                       onChange={this.handleProductFieldChanges(index, 'price')}
                                                />
                                            </td>
                                            <td>
                                                <input type="number"
                                                       value={this.state.products[index].availableQuantity}
                                                       step="1"
                                                       onChange={this.handleProductFieldChanges(index, 'availableQuantity')}/>
                                            </td>
                                            <td>
                                                <input type="number" value={this.state.products[index].width} step="1"
                                                       onChange={this.handleProductFieldChanges(index, 'width')}
                                                />
                                            </td>
                                            <td>
                                                <input type="number" value={this.state.products[index].height} step="1"
                                                       onChange={this.handleProductFieldChanges(index, 'height')}
                                                />
                                            </td>
                                            <td>
                                                <input type="checkbox"
                                                       value={this.state.products[index].isInFrame ? true : false}
                                                       defaultChecked={this.state.products[index].isInFrame}
                                                       onChange={() => this.handleCheckboxChanges(index, 'isInFrame', !this.state.products[index].isInFrame)}
                                                />
                                            </td>
                                            <td>
                                                <input type="checkbox" value={this.state.products[index].isBestSeller}
                                                       defaultChecked={this.state.products[index].isBestSeller}
                                                       onChange={() => this.handleCheckboxChanges(index, 'isBestSeller', !this.state.products[index].isBestSeller)}
                                                />
                                            </td>
                                            <td>
                                                <input className="origin" value={this.state.products[index].origin}
                                                       onChange={this.handleProductFieldChanges(index, 'origin')}
                                                />
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.products[index].colourString}
                                                       onChange={this.handleProductFieldChanges(index, 'colourString')}
                                                />
                                            </td>
                                            <td>
                                                <select value={this.state.products[index].mainType}
                                                        onChange={this.handleMainProductTypeFieldDropdownChanges(index)}>
                                                    <option
                                                        name='chosen-main-type'>{this.state.products[index].mainType}
                                                    </option>
                                                    {this.state.mainProductTypes.map((mainType, index) =>
                                                        <option name={'mainType' + index} value={index}>
                                                            {mainType}
                                                        </option>
                                                    )}
                                                </select>
                                            </td>
                                            <td>
                                                <select value={this.state.products[index].subType}
                                                        onChange={this.handleSubProductTypeFieldDropdownChanges(index)}>
                                                    <option
                                                        name='chosen-sub-type'>{this.state.products[index].subType}
                                                    </option>
                                                    {this.state.subProductTypes.map((mainType, index) =>
                                                        <option name={'subType' + index} value={index}>
                                                            {mainType}
                                                        </option>
                                                    )}
                                                </select>
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.products[index].URL}
                                                       onChange={this.handleProductFieldChanges(index, 'URL')}
                                                />
                                            </td>
                                            <td>
                                                <img src={serverURL + this.state.products[index].URL} alt="img"/>
                                            </td>
                                            <td>
                                                <button onClick={() => this.saveModifiedProduct(index)}>Save.Changes
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => this.deleteProductById(product.id)}>Delete
                                                </button>
                                            </td>

                                        </tr>
                                    )}
                            </table>
                        </div>

                        <div className="add-new-product">
                        <h2 className='add-entities'>Add New Product</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    <p>id</p>
                                </th>
                                <th>
                                    <p>name</p>
                                </th>
                                <th>
                                    <p>price</p>
                                </th>
                                <th>
                                    <p>Qty</p>
                                </th>
                                <th>
                                    <p>width</p>
                                </th>
                                <th>
                                    <p>height</p>
                                </th>
                                <th>
                                    <p>frame</p>
                                </th>
                                <th>
                                    <p>bestSeller</p>
                                </th>
                                <th>
                                    <p>origin</p>
                                </th>
                                <th>
                                    <p>colour</p>
                                </th>
                                <th>
                                    <p>mainType</p>
                                </th>
                                <th>
                                    <p>subType</p>
                                </th>
                                <th>
                                    <p>url</p>
                                </th>
                                <th>

                                </th>
                                <th>
                                    <p>Update</p>
                                </th>
                                <th>
                                    <p>Clear</p>
                                </th>
                            </tr>
                            </thead>
                            <tr className="admin-page-product-value-container">
                                <td>
                                    <p>ID</p>
                                </td>
                                <td>
                                    <input type="text" value={this.state.newProduct.name}
                                           onChange={this.handleNewProductFieldChanges('name')}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.newProduct.price} step="0.01"
                                           onChange={this.handleNewProductFieldChanges('price')}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.newProduct.availableQuantity}
                                           step="1"
                                           onChange={this.handleNewProductFieldChanges('availableQuantity')}/>
                                </td>
                                <td>
                                    <input type="number" value={this.state.newProduct.width} step="1"
                                           onChange={this.handleNewProductFieldChanges('width')}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.newProduct.height} step="1"
                                           onChange={this.handleNewProductFieldChanges('height')}
                                    />
                                </td>
                                <td>
                                    <input type="checkbox"
                                           value={this.state.newProduct.isInFrame}
                                           defaultChecked={this.state.newProduct.isInFrame}
                                           onChange={() => this.handleNewProductCheckboxChanges('isInFrame', !this.state.newProduct.isInFrame)}
                                    />
                                </td>
                                <td>
                                    <input type="checkbox" value={this.state.newProduct.isBestSeller}
                                           defaultChecked={this.state.newProduct.isBestSeller}
                                           onChange={() => this.handleNewProductCheckboxChanges('isBestSeller', !this.state.newProduct.isBestSeller)}
                                    />
                                </td>
                                <td>
                                    <input className="origin" value={this.state.newProduct.origin}
                                           onChange={this.handleNewProductFieldChanges('origin')}
                                    />
                                </td>
                                <td>
                                    <input type="text" value={this.state.newProduct.colourString}
                                           onChange={this.handleNewProductFieldChanges('colourString')}
                                    />
                                </td>
                                <td>
                                    <select value={this.state.newProduct.mainType}
                                            onChange={this.handleNewProductFieldMainTypeDropdown}>
                                        <option
                                            name='chosen-main-type'>{this.state.newProduct.mainType}
                                        </option>
                                        {this.state.mainProductTypes.map((mainType, index) =>
                                            <option name={'mainType' + index} value={index}>
                                                {mainType}
                                            </option>
                                        )}
                                    </select>
                                </td>
                                <td>
                                    <select value={this.state.newProduct.subType}
                                            onChange={this.handleNewProductFieldSubTypeDropdown}>
                                        <option
                                            name='chosen-sub-type'>{this.state.newProduct.subType}
                                        </option>
                                        {this.state.subProductTypes.map((mainType, index) =>
                                            <option name={'subType' + index} value={index}>
                                                {mainType}
                                            </option>
                                        )}
                                    </select>
                                </td>
                                <td>
                                    <input type="text" value={this.state.newProduct.URL}
                                           onChange={this.handleNewProductFieldChanges('URL')}
                                    />
                                </td>
                                <td>
                                    <img src={serverURL + this.state.newProduct.URL} alt="img"/>
                                </td>
                                <td>
                                    <button onClick={() => this.saveNewProduct()}>Save.Changes
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => this.clearNewProductField()}>Clear.Fields</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    </span>
                </div>

                <div className="colours-table-container">
                    <h2 className="getter-boards">
                        <button onClick={() => this.modifyShowStatus('showColours')}> Show / Hide</button>
                        Colours
                    </h2>
                    <span className={this.state.showColours ? '' : 'hide-content'}>
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        <p>ID</p>
                                    </th>
                                    <th>
                                        <p>colourName (//TODO)</p>
                                    </th>
                                    <th>
                                        <p>HU</p>
                                    </th>
                                    <th>
                                        <p>ENG</p>
                                    </th>
                                    <th>
                                        <p>SK</p>
                                    </th>
                                    <th>
                                        <p>DE</p>
                                    </th>
                                    <th>
                                        <p>RU</p>
                                    </th>
                                    <th>
                                        <p>oneExtraLanguage</p>
                                    </th>
                                    <th>
                                        <p>Updating</p>
                                    </th>
                                    <th>
                                        <p>Deleting</p>
                                    </th>
                                </tr>
                                </thead>
                                {
                                    this.state.colours.map((colour, index) =>
                                        <tr>
                                            <td>
                                                <p>{colour.id}</p>
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.colours[index].colourName}
                                                       onChange={this.handleColourFieldChanges(index, 'colourName')}
                                                />
                                            </td>

                                            <td>
                                                <input type="text" value={this.state.colours[index].colourNameHU}
                                                       onChange={this.handleColourFieldChanges(index, 'colourNameHU')}
                                                />
                                            </td>

                                            <td>
                                                <input type="text" value={this.state.colours[index].colourNameENG}
                                                       onChange={this.handleColourFieldChanges(index, 'colourNameENG')}
                                                />
                                            </td>

                                            <td>
                                                <input type="text" value={this.state.colours[index].colourNameSK}
                                                       onChange={this.handleColourFieldChanges(index, 'colourNameSK')}
                                                />
                                            </td>

                                            <td>
                                                <input type="text" value={this.state.colours[index].colourNameDE}
                                                       onChange={this.handleColourFieldChanges(index, 'colourNameDE')}
                                                />
                                            </td>

                                            <td>
                                                <input type="text" value={this.state.colours[index].colourNameRU}
                                                       onChange={this.handleColourFieldChanges(index, 'colourNameRU')}
                                                />
                                            </td>

                                            <td>
                                                <input type="text" value={this.state.colours[index].colourNamePlusOne}
                                                       onChange={this.handleColourFieldChanges(index, 'colourNamePlusOne')}
                                                />
                                            </td>

                                            <td>
                                                <button onClick={() => this.saveModifiedColour(index)}>Save.Changes
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => this.deleteAColourById(colour.id)}>Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </table>

                            <div className="add-new-colour">
                                <h2 className='add-entities'> Add New Colour</h2>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>
                                            <p>ID</p>
                                        </th>
                                        <th>
                                            <p>colourName (//TODO)</p>
                                        </th>
                                        <th>
                                            <p>HU</p>
                                        </th>
                                        <th>
                                            <p>ENG</p>
                                        </th>
                                        <th>
                                            <p>SK</p>
                                        </th>
                                        <th>
                                            <p>DE</p>
                                        </th>
                                        <th>
                                            <p>RU</p>
                                        </th>
                                        <th>
                                            <p>oneExtraLanguage</p>
                                        </th>
                                        <th>
                                            <p>Updating</p>
                                        </th>
                                        <th>
                                            <p>Clearing fields</p>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tr>
                                        <td>
                                            <p>ID</p>
                                        </td>
                                        <td>
                                            <input type="text" value={this.state.newColour.colourName}
                                                   onChange={this.handleNewColourFieldChanges('colourName')}
                                            />
                                        </td>

                                        <td>
                                            <input type="text" value={this.state.newColour.colourNameHU}
                                                   onChange={this.handleNewColourFieldChanges('colourNameHU')}
                                            />
                                        </td>

                                        <td>
                                            <input type="text" value={this.state.newColour.colourNameENG}
                                                   onChange={this.handleNewColourFieldChanges('colourNameENG')}
                                            />
                                        </td>

                                        <td>
                                            <input type="text" value={this.state.newColour.colourNameSK}
                                                   onChange={this.handleNewColourFieldChanges('colourNameSK')}
                                            />
                                        </td>

                                        <td>
                                            <input type="text" value={this.state.newColour.colourNameDE}
                                                   onChange={this.handleNewColourFieldChanges('colourNameDE')}
                                            />
                                        </td>

                                        <td>
                                            <input type="text" value={this.state.newColour.colourNameRU}
                                                   onChange={this.handleNewColourFieldChanges('colourNameRU')}
                                            />
                                        </td>

                                        <td>
                                            <input type="text" value={this.state.newColour.colourNamePlusOne}
                                                   onChange={this.handleNewColourFieldChanges('colourNamePlusOne')}
                                            />
                                        </td>

                                        <td>
                                            <button onClick={() => this.saveNewlyCreatedColour()}>Save.Changes</button>
                                        </td>
                                        <td>
                                            <button onClick={() => this.clearNewColourFields()}>Clear.fields</button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </span>
                </div>
                <div className='addit-image-container'>
                    <h2 className="getter-boards">
                        <button onClick={() => this.modifyShowStatus('showAdditImages')}> Show / Hide</button>
                        Extra Images
                    </h2>
                    <span className={this.state.showAdditImages ? '' : 'hide-content'}>
                        <div className="mapped-addit-images">
                            <table>

                                {this.state.additionalImages.map((image, index) =>
                                    <tr>
                                        <td>
                                            <p>{image.id}</p>
                                        </td>

                                        <td>
                                            <input type="text" value={this.state.additionalImages[index].productId}
                                                   onChange={this.handleAdditImageFieldChanges(index, 'productId')}
                                            />
                                        </td>
                                        <td>
                                            <input type="text" value={this.state.additionalImages[index].url}
                                                   onChange={this.handleAdditImageFieldChanges(index, 'url')}
                                            />
                                        </td>
                                        <td>
                                            <img src={serverURL + image.url}/>
                                        </td>
                                        <td>
                                            <button onClick={() => this.saveModifiedAdditImage(index)}>Save.Changes
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => this.deleteAnAdditImageById(image.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </table>
                        </div>

                        {/*<span className={this.state.showProducts ? '' : 'hide-content'}>*/}
                        <h2 className='add-entities'> Add New Extra Image To The Product</h2>
                    <div className="add-new-addit-image">
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    <p>ID</p>
                                </th>
                                <th>
                                    <p>product id</p>
                                </th>
                                <th>
                                    <p>url</p>
                                </th>
                                <th>

                                </th>
                                <th>
                                    <p>Updating</p>
                                </th>
                                <th>
                                    <p>Clearing fields</p>
                                </th>
                            </tr>
                            </thead>
                            <tr>
                                <td>
                                    <p>ID</p>
                                </td>
                                <td>
                                    <input type="number" value={this.state.newAdditionalImage.productId}
                                           onChange={this.handleNewAdditImageFieldChanges('productId')}
                                    />
                                </td>

                                <td>
                                    <input type="text" value={this.state.newAdditionalImage.url}
                                           onChange={this.handleNewAdditImageFieldChanges('url')}
                                    />
                                </td>

                                <td>
                                    <img src={serverURL + this.state.newAdditionalImage.url} alt="add meg az URLt"/>
                                </td>

                                <td>
                                    <button onClick={() => this.saveNewAdditImage()}>Save.Changes</button>
                                </td>
                                <td>
                                    <button onClick={() => this.clearNewAdditImageFields()}>Clear.fields</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                        {/*</span>*/}
                </span>
                </div>
                <div className="frame-container">
                    <h2 className="getter-boards">
                        <button onClick={() => this.modifyShowStatus('showFrames')}> Show / Hide</button>
                        Frames
                    </h2>
                    <span className={this.state.showFrames ? '' : 'hide-content'}>
                        <div className="mapped-frames">
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        <p>id</p>
                                    </th>
                                    <th>
                                        <p>quantity</p>
                                    </th>
                                    <th>
                                        <p>colour</p>
                                    </th>
                                    <th>
                                        <p>width</p>
                                    </th>
                                    <th>
                                        <p>height</p>
                                    </th>
                                    <th>
                                        <p></p>
                                    </th>
                                    <th>
                                        <p></p>
                                    </th>
                                </tr>
                                </thead>

                                {
                                    this.state.frames.map((frame, index) =>
                                        <tr>
                                            <td>
                                                <p>{frame.id}</p>
                                            </td>
                                            <td>
                                                <input type="number" value={this.state.frames[index].quantity}
                                                       onChange={this.handleFrameFieldChanges(index, 'quantity')}
                                                />
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.frames[index].colour}
                                                       onChange={this.handleFrameFieldChanges(index, 'colour')}
                                                />
                                            </td>
                                            <td>
                                                <input type="number" value={this.state.frames[index].width}
                                                       onChange={this.handleFrameFieldChanges(index, 'width')}
                                                />
                                            </td>
                                            <td>
                                                <input type="number" value={this.state.frames[index].height}
                                                       onChange={this.handleFrameFieldChanges(index, 'height')}
                                                />
                                            </td>

                                            <td>
                                                <button onClick={() => this.saveModifiedFrame(index)}>Save.Changes
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => this.deleteAFrameById(frame.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </table>
                        </div>
                        <div className="add-new-frame">
                        <h2 className='add-entities'>Add New Frame</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    <p>id</p>
                                </th>
                                <th>
                                    <p>quantity</p>
                                </th>
                                <th>
                                    <p>colour</p>
                                </th>
                                <th>
                                    <p>width</p>
                                </th>
                                <th>
                                    <p>height</p>
                                </th>
                                <th>
                                    <p>Save</p>
                                </th>
                                <th>
                                    <p>Clear</p>
                                </th>
                            </tr>
                            </thead>
                            <tr>
                                <td>
                                    <p>ID</p>
                                </td>
                                <td>
                                    <input type="number" value={this.state.newFrame.quantity}
                                           onChange={this.handleNewFrameFieldChanges('quantity')}
                                    />
                                </td>
                                <td>
                                    <input type="text" value={this.state.newFrame.colour}
                                           onChange={this.handleNewFrameFieldChanges('colour')}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.newFrame.width}
                                           onChange={this.handleNewFrameFieldChanges('width')}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.newFrame.height}
                                           onChange={this.handleNewFrameFieldChanges('height')}
                                    />
                                </td>

                                <td>
                                    <button onClick={() => this.saveNewFrame()}>Save
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => this.clearNewFrameFields()}>Clear</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    </span>
                </div>
                <div className="slideshow-container">
                    <h2 className="getter-boards">
                        <button onClick={() => this.modifyShowStatus('showSlideshow')}> Show / Hide</button>
                        Slideshow
                    </h2>
                    <span className={this.state.showSlideshow ? '' : 'hide-content'}>
                        <div className="mapped-slideshow">
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        <p>id</p>
                                    </th>
                                    <th>
                                        <p>url</p>
                                    </th>
                                    <th>
                                        <p>productId</p>
                                    </th>
                                    <th>
                                        <p>Update</p>
                                    </th>
                                    <th>
                                        <p>Delete</p>
                                    </th>
                                </tr>
                                </thead>

                                {
                                    this.state.slideshow.map((slide, index) =>
                                        <tr>
                                            <td>
                                                <p>{slide.id}
                                                    <FontAwesomeIcon icon={faArrowDown}
                                                                     onClick={() => this.getAssociatedProduct(slide.productId)}
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.slideshow[index].url}
                                                       onChange={this.handleSlideshowFieldChanges(index, 'url')}
                                                />
                                            </td>
                                            <td>
                                                <input type="number" value={this.state.slideshow[index].productId}
                                                       onChange={this.handleSlideshowFieldChanges(index, 'productId')}
                                                />
                                            </td>


                                            <td>
                                                <button onClick={() => this.saveModifiedSlideshow(index)}>Save.Changes
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => this.deleteASlideshowById(slide.id)}>Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </table>
                        </div>

                        <div className="product-by-slideshow">
                            <div>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>
                                            <p>id</p>
                                        </th>
                                        <th>
                                            <p>name</p>
                                        </th>
                                        <th>
                                            <p>price</p>
                                        </th>
                                        <th>
                                            <p>Qty</p>
                                        </th>
                                        <th>
                                            <p>width</p>
                                        </th>
                                        <th>
                                            <p>height</p>
                                        </th>
                                        <th>
                                            <p>frame</p>
                                        </th>
                                        <th>
                                            <p>bestSeller</p>
                                        </th>
                                        <th>
                                            <p>origin</p>
                                        </th>
                                        <th>
                                            <p>colour</p>
                                        </th>
                                        <th>
                                            <p>mainType</p>
                                        </th>
                                        <th>
                                            <p>subType</p>
                                        </th>
                                        <th>
                                            <p>url</p>
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tr className="admin-page-product-value-container">
                                            <td>
                                               <p>{this.state.productBySlideshow.id}</p>
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.productBySlideshow.name}
                                                       onChange={this.handleExtraProductFieldChanges('name')}
                                                />
                                            </td>

                                            <td>
                                                <input type="number" value={this.state.productBySlideshow.price}
                                                       step="0.01"
                                                       onChange={this.handleExtraProductFieldChanges('price')}
                                                />
                                            </td>
                                            <td>
                                                <input type="number"
                                                       value={this.state.productBySlideshow.availableQuantity}
                                                       step="1"
                                                       onChange={this.handleExtraProductFieldChanges('availableQuantity')}/>
                                            </td>
                                            <td>
                                                <input type="number" value={this.state.productBySlideshow.width}
                                                       step="1"
                                                       onChange={this.handleExtraProductFieldChanges('width')}
                                                />
                                            </td>
                                            <td>
                                                <input type="number" value={this.state.productBySlideshow.height}
                                                       step="1"
                                                       onChange={this.handleExtraProductFieldChanges('height')}
                                                />
                                            </td>
                                            <td>
                                                <input type="checkbox"
                                                       value={this.state.productBySlideshow.isInFrame ? true : false}
                                                       defaultChecked={this.state.productBySlideshow.isInFrame}
                                                       onChange={() => this.handleExtraProductFieldChanges('isInFrame', !this.state.productBySlideshow.isInFrame)}
                                                />
                                            </td>
                                            <td>
                                                <input type="checkbox"
                                                       value={this.state.productBySlideshow.isBestSeller}
                                                       defaultChecked={this.state.productBySlideshow.isBestSeller}
                                                       onChange={() => this.handleExtraProductFieldChanges('isBestSeller', !this.state.productBySlideshow.isBestSeller)}
                                                />
                                            </td>
                                            <td>
                                                <input className="origin" value={this.state.productBySlideshow.origin}
                                                       onChange={this.handleExtraProductFieldChanges('origin')}
                                                />
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.productBySlideshow.colourString}
                                                       onChange={this.handleExtraProductFieldChanges('colourString')}
                                                />
                                            </td>
                                            <td>
                                                <input className="main-type" type="text"
                                                       value={this.state.productBySlideshow.mainType}
                                                       onChange={this.handleExtraProductFieldChanges('mainType')}
                                                />
                                            </td>
                                            <td>
                                                <input className="sub-type" type="text"
                                                       value={this.state.productBySlideshow.subType}
                                                       onChange={this.handleExtraProductFieldChanges('subType')}
                                                />
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.productBySlideshow.URL}
                                                       onChange={this.handleExtraProductFieldChanges('URL')}
                                                />
                                            </td>
                                            <td>
                                                <img src={serverURL + this.state.productBySlideshow.URL} alt="img"/>
                                            </td>
                                            <td>
                                                <button onClick={() => this.saveExtraModifiedProduct()}>Save.Changes
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => this.clearExtraProduct()}>Delete
                                                </button>
                                            </td>

                                        </tr>
                                </table>
                            </div>

                    </div>

                        <div className="add-new-slideshow">
                            <h2 className='add-entities'>Add New Slideshow</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        <p>id</p>
                                    </th>
                                    <th>
                                        <p>url</p>
                                    </th>
                                    <th>
                                        <p>productId</p>
                                    </th>
                                    <th>
                                        <p>Update</p>
                                    </th>
                                    <th>
                                        <p>Delete</p>
                                    </th>
                                </tr>
                                </thead>

                                <tr>
                                    <td>
                                        <p>ID</p>
                                    </td>
                                    <td>
                                        <input type="text" value={this.state.newSlideshow.url}
                                               onChange={this.handleNewSlideshowFieldChanges('url')}
                                        />
                                    </td>
                                    <td>
                                        <input type="number" value={this.state.newSlideshow.productId}
                                               onChange={this.handleNewSlideshowFieldChanges('productId')}
                                        />
                                    </td>


                                    <td>
                                        <button onClick={() => this.saveNewSlideshow()}>Save.Changes
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.clearNewSlideshowFields()}>Clear</button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </span>
                </div>
                <div className="categories-container">
                    <h2 className="getter-boards">
                        <button onClick={() => this.modifyShowStatus('showCategories')}> Show / Hide</button>
                        Categories
                    </h2>
                    <span className={this.state.showCategories ? '' : 'hide-content'}>
                        <div className="mapped-categories">
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        <p>id</p>
                                    </th>
                                    <th>
                                        <p>mainProductType</p>
                                    </th>
                                    <th>
                                        <p>subProductType</p>
                                    </th>
                                    <th>
                                        <p>url</p>
                                    </th>
                                    <th>
                                        <p>Update</p>
                                    </th>
                                    <th>
                                        <p>Delete</p>
                                    </th>
                                </tr>
                                </thead>

                                {
                                    this.state.categories.map((category, index) =>
                                        <tr>
                                            <td>
                                                <p>{category.id}</p>
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.categories[index].mainProductType}
                                                       onChange={this.handleCategoryFieldChanges(index, 'mainProductType')}
                                                />
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.categories[index].subProductType}
                                                       onChange={this.handleCategoryFieldChanges(index, 'subProductType')}
                                                />
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.categories[index].url}
                                                       onChange={this.handleCategoryFieldChanges(index, 'url')}
                                                />
                                            </td>


                                            <td>
                                                <button onClick={() => this.saveModifiedCategory(index)}>Save.Changes
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => this.deleteACategoryById(category.id)}>Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </table>
                        </div>

                        <div className="add-new-category">
                        <h2 className='add-entities'>Add New Category</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    <p>id</p>
                                </th>
                                <th>
                                    <p>mainProductType</p>
                                </th>
                                <th>
                                    <p>subProductType</p>
                                </th>
                                <th>
                                    <p>url</p>
                                </th>
                                <th>
                                    <p>Update</p>
                                </th>
                                <th>
                                    <p>Delete</p>
                                </th>
                            </tr>
                            </thead>

                            <tr>
                                <td>
                                    <p>ID</p>
                                </td>
                                <td>
                                    <input type="text" value={this.state.newCategory.mainProductType}
                                           onChange={this.handleNewCategoryFieldChanges('mainProductType')}
                                    />
                                </td>
                                <td>
                                    <input type="text" value={this.state.newCategory.subProductType}
                                           onChange={this.handleNewCategoryFieldChanges('subProductType')}
                                    />
                                </td>
                                <td>
                                    <input type="text" value={this.state.newCategory.url}
                                           onChange={this.handleNewCategoryFieldChanges('url')}
                                    />
                                </td>


                                <td>
                                    <button onClick={() => this.saveNewCategory()}>Save.Changes
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => this.clearNewCategoryFields()}>Clear</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    </span>
                </div>
                <div className="a-orders-container">
                    <h2 className="getter-boards">
                        <button onClick={() => this.modifyShowStatus('showOrders')}> Show / Hide</button>
                        Not Payed/Not Shipped orders
                    </h2>
                    <span className={this.state.showOrders ? '' : 'hide-content'}>
                        <div className="mapped-orders">
                            <table className="orders-table">
                                <thead>
                                <tr>
                                    <th>
                                        <p>Order ID</p>
                                    </th>
                                    <th>
                                        <p>Date</p>
                                    </th>
                                    <th>
                                        <p>Email</p>
                                    </th>
                                    <th>
                                        <p>First Name</p>
                                    </th>
                                    <th>
                                        <p>Last Name</p>
                                    </th>
                                    <th>
                                        <p>Is Payed</p>
                                    </th>
                                    <th>
                                        <p>Is Shipped</p>
                                    </th>
                                    <th>

                                    </th>

                                </tr>
                                </thead>

                                {
                                    this.state.orderList.map((order, index) =>
                                        <tbody>
                                        <tr>
                                            <td onClick={()=>this.modifyShowStatusAndFetch(order.id + "/" + index, order.id)} style={{cursor:"pointer"}}>
                                                <p>{order.id}</p>
                                            </td>
                                            <td>
                                                <p>{order.checkoutDate.year}.{order.checkoutDate.monthValue}.{order.checkoutDate.dayOfMonth}</p>
                                            </td>
                                            <td>
                                                <p>{order?.user?.email}</p>
                                            </td>
                                            <td>
                                                <p>{order?.chosenShippingAddress?.firstName}</p>
                                            </td>
                                            <td>
                                                <p>{order?.chosenShippingAddress?.lastName}</p>
                                            </td>
                                            <td>
                                                <input type="checkbox"
                                                       value={this.state.orderList[index].isPayed ? true : false}
                                                       defaultChecked={this.state.orderList[index].isPayed}
                                                       onChange={() => this.handleOrderCheckboxChanges(index, 'isPayed', !this.state.orderList[index].isPayed)}
                                                />
                                            </td>
                                            <td>
                                                <input type="checkbox"
                                                       value={this.state.orderList[index].isShipped ? true : false}
                                                       defaultChecked={this.state.orderList[index].isShipped}
                                                       onChange={() => this.handleOrderCheckboxChanges(index, 'isShipped', !this.state.orderList[index].isShipped)}
                                                />
                                            </td>
                                            <td>
                                                <button onClick={() => this.saveModifiedOrder(index)}>Save.Changes
                                                </button>
                                            </td>
                                        </tr>
                                        {
                                            this.state[order.id + "/" + index] ?
                                                <tr>
                                                    {console.log(this.state)}
                                                    <td> {this.state['order-'+order.id]?.id}</td>
                                                </tr>
                                                :
                                                null
                                        }

                                        </tbody>
                                    )
                                }
                            </table>
                        </div>
                    </span>
                </div>


                <div className="a-orders-container">
                    <h2 className="getter-boards">
                        <button onClick={() => this.modifyShowStatus('showOrdersInBetween')}> Show / Hide</button>
                        Orders Between DATE DATE
                    </h2>
                    <div className="date-container">
                    </div>
                    <div className={this.state.showOrdersInBetween ? '' : 'hide-content'}>
                        <div className="date-from-to-container">
                            <div>
                                <p className="special-p">
                                    From
                                </p>
                            </div>
                            <div>
                                <p className="special-p">
                                    To
                                </p>
                            </div>
                            <div></div>

                            <div>
                                <p className="special-p">
                                    2020-01-20
                                </p>
                            </div>
                            <div>
                                <p className="special-p">
                                    2020-12-20
                                </p>
                            </div>
                            <div></div>

                            <div className="date-from date">
                                <input type="text" value={this.state.fromDate}
                                       onChange={this.changeDate('fromDate')}
                                />
                            </div>
                            <div className="date-to date">
                                <input type="text" value={this.state.toDate}
                                       onChange={this.changeDate('toDate')}
                                />
                            </div>
                            <div className="btn-container">
                                <button onClick={this.getAllOrdersInBetween}>Get Orders!</button>
                            </div>
                        </div>
                        <div className="mapped-orders">
                            <table className="orders-table">
                                <thead>
                                <tr>
                                    <th>
                                        <p></p>
                                    </th>
                                    <th>
                                        <p>Name</p>
                                    </th>
                                    <th>
                                        <p>Quantity</p>
                                    </th>
                                </tr>
                                </thead>

                                {
                                    this.state.orderListInBetween.filter((wrappedEntity, index) =>
                                        index === this.state.orderListInBetween.findIndex(
                                        elem => elem.product.id === wrappedEntity.product.id &&
                                            elem.frame.colour === wrappedEntity.frame.colour
                                        )).map((wrappedE) =>
                                        <tr>
                                            <td>
                                                <div
                                                    className={wrappedE.product.isInFrame ? 'wrapped-product-in-frame' : 'wrapped-product-not-in-frame'}
                                                    style={{
                                                        borderImageSource: `${wrappedE.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/${wrappedE.frame.colour}.png)`}`,
                                                        float: 'left',
                                                    }}>
                                                    {
                                                        <img src={serverURL + wrappedE.product.url}
                                                             className="image-in-order-overview-cart"
                                                             style={{
                                                                 border: `${wrappedE.product.isInFrame ? '1px solid #D3D3D3' : 'none'}`,
                                                             }}

                                                        />
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                {wrappedE.product.name}
                                            </td>
                                            <td>
                                                {this.countQtyByIdAndFrameColour(wrappedE.product.id, wrappedE.frame.colour)}
                                            </td>

                                        </tr>
                                    )
                                }
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

const serverURL = process.env.REACT_APP_API_URL;
export default AdminPage;

