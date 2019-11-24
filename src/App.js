import React, {Component} from 'react';
import './css/App.css';
import Header from "./components/header/Header";
import ProductMapper from "./components/product/ProductMapper";

import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
// import Test from "./Test";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    {/*<div className="faszom" style={{paddingTop: '20px'}}>*/}
                    {/*    <img src={'http://192.168.0.94:8080/images/butterflies/1.png'}*/}
                    {/*         alt="LOGO"*/}
                    {/*         className="logo-header"*/}
                    {/*    />*/}
                    {/*    <img src={'http://192.168.0.94:8080/images/butterflies/2.png'}*/}
                    {/*         alt="LOGO"*/}
                    {/*         className="logo-header"*/}
                    {/*    />*/}
                    {/*    <img src={'http://192.168.0.94:8080/images/butterflies/3.png'}*/}
                    {/*         alt="LOGO"*/}
                    {/*         className="logo-header"*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<Switch>*/}
                    {/*    <Route exact path="/butterfly" component={Test}/>*/}
                    {/*</Switch>*/}
                </div>
            </Router>
        );
    }
}

export default App;
