import React, {Component} from 'react';
import './css/App.css';
import Header from "./components/header/Header";
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import MainPage from "./components/layout/MainPage";
import ProductMapper from "./components/product/ProductMapper";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route exact path="/about" component={ProductMapper}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
