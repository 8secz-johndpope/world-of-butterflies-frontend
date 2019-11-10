import React, {Component} from 'react';
import './App.css';
import ProductMapper from "./components/product/ProductMapper";

class App extends Component {

    render() {
        return (
            <div className="App">
                <ProductMapper/>
            </div>
        );
    }
}

export default App;
