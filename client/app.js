'use strict'
import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom'
import Header from './components/header.js';
import Footer from './components/footer.js';
//
class App extends Component {
    render(){
        return(
            <div>
                <Header/>
                    { this.props.routes }
                <Footer/>
            </div>);
    }
}
export default App;