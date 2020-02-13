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
    getProductBySlideshow,
    updateSlideshowById,
    deleteSlideshowById,
    addNewSlideshow,
    getAllCategories,
    addNewCategory,
    updateCategoryById,
    deleteCategoryById,

} from "../../../service/fetchService/fetchService";
import update from "react-addons-update";
import {ProductObject} from "../../objects/ProductObject";
import {ColourObject} from "../../objects/ColourObject";
import {FrameObject} from "../../objects/FrameObject";
import {SlideshowObject} from "../../objects/SlideshowObject";
import {CategoryObject} from "../../objects/CategoryObject";

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
        // showReadOnlyStuff: false,
        showMainProductTypes: false,
        showSubProductTypes: false,
        showOrigins: false,
        showColours: false,
        showFrames: false,
        showSlideshow: false,
        showCategories: false,
    };

    modifyShowStatus = (param) => {
        this.setState({
            [param]: !this.state[param],
        })
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
                    }, () => console.log(this.state.products))
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


    handleCheckboxChanges = (index, paramName, value) => {
        let newState = update(this.state, {
            products: {
                [index]: {
                    [paramName]: {$set: value}
                }
            }
        });
        this.setState(newState, () => console.log(this.state.products[index]));
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
            productFromState.url);
        console.log(productToUpdate);
        updateProductById(productFromState.id, productToUpdate)
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
            productFromState.url);
        console.log(productToUpdate);
        addNewProduct(productToUpdate)
    };

    handleNewProductFieldChanges = (paramName) => (event) => {
        let newState = update(this.state, {
            newProduct: {
                [paramName]: {$set: event.target.value}
            }
        }, () => console.log(this.state.newProduct));
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
        }, () => console.log(this.state.newColour));
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
        }, () => console.log(this.state.newFrame));
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

    render() {
        return (
            <div className="admin-page-container">

                <div className="product-types-origins">

                    <div className="main-types">
                        <button onClick={() => this.modifyShowStatus('showMainProductTypes')}> Show / Hide</button>
                        <h2 style={{
                            fontWeight: "bold",
                            backgroundColor: '#A9A9A9'
                        }}>Main Product Types</h2>
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
                        <h2 style={{
                            fontWeight: "bold",
                            backgroundColor: '#A9A9A9'
                        }}>Sub Product Types</h2>
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
                        <h2 style={{
                            fontWeight: "bold",
                            backgroundColor: '#A9A9A9'
                        }}>Origins</h2>
                        <span className={this.state.showOrigins ? '' : 'hide-content'}>
                        {
                            this.state.origins.map(origin =>
                                <p>{origin}</p>
                            )
                        }
                        </span>
                    </div>
                    <div className="colours-table-container">
                        <button onClick={() => this.modifyShowStatus('showColours')}> Show / Hide</button>
                        <h2 style={{backgroundColor: '#A9A9A9'}}>Colours</h2>
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
                                <h2 style={{backgroundColor: '#A9A9A9'}}> Add New Colour</h2>
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
                </div>

                <div className="admin-page-product-container">
                    <button onClick={() => this.modifyShowStatus('showProducts')}> Show / Hide</button>
                    <h2 style={{backgroundColor: '#A9A9A9'}}>Products</h2>
                    <span className={this.state.showProducts ? '' : 'hide-content'}>
                        <div className="products">
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
                                                <p>{product.id}</p>
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
                                                {console.log()}
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
                                                <input className="main-type" type="text"
                                                       value={this.state.products[index].mainType}
                                                       onChange={this.handleProductFieldChanges(index, 'mainType')}
                                                />
                                            </td>
                                            <td>
                                                <input className="sub-type" type="text"
                                                       value={this.state.products[index].subType}
                                                       onChange={this.handleProductFieldChanges(index, 'subType')}
                                                />
                                            </td>
                                            <td>
                                                <input type="text" value={this.state.products[index].URL}
                                                       onChange={this.handleProductFieldChanges(index, 'URL')}
                                                />
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
                                    )
                                }
                            </table>
                        </div>

                        <div className="add-new-product">
                        <h2 style={{backgroundColor: '#A9A9A9'}}>Add New Product</h2>
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
                                    <p>Update</p>
                                </th>
                                <th>
                                    <p>Clear</p>
                                </th>
                            </tr>
                            </thead>
                            <tr className="admin-page-product-value-container">
                                {console.log(this.state.products[0])}
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
                                    <input className="main-type" type="text"
                                           value={this.state.newProduct.mainType}
                                           onChange={this.handleNewProductFieldChanges('mainType')}
                                    />
                                </td>
                                <td>
                                    <input className="sub-type" type="text"
                                           value={this.state.newProduct.subType}
                                           onChange={this.handleNewProductFieldChanges('subType')}
                                    />
                                </td>
                                <td>
                                    <input type="text" value={this.state.newProduct.URL}
                                           onChange={this.handleNewProductFieldChanges('URL')}
                                    />
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

                <div className="frame-container">
                    <button onClick={()=>this.modifyShowStatus('showFrames')}> Show / Hide</button>
                        <h2 style={{backgroundColor: '#A9A9A9'}}>Frames</h2>
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
                        <h2 style={{backgroundColor: '#A9A9A9'}}>Add New Frame</h2>
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
                    <button onClick={()=>this.modifyShowStatus('showSlideshow')}> Show / Hide</button>
                    <h2 style={{backgroundColor: '#A9A9A9'}}>Slideshow</h2>
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
                                                <p>{slide.id}</p>
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
                                                <button onClick={() => this.deleteASlideshowById(slide.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </table>
                        </div>

                        <div className="add-new-slideshow">
                            <h2 style={{backgroundColor: '#A9A9A9'}}>Add New Slideshow</h2>
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
                    <button onClick={() => this.modifyShowStatus('showCategories')}> Show / Hide</button>
                    <h2 style={{backgroundColor: '#A9A9A9'}}>Categories</h2>
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
                        <h2 style={{backgroundColor: '#A9A9A9'}}>Add New Category</h2>
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

            </div>
        );
    }
}

export default AdminPage;
