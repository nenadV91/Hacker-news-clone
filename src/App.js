import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from 'components/navbar';
import Home from 'pages/home';
import Item from 'pages/item';
import User from 'pages/user';

const NotFound = () => <div>Page not found</div>

class App extends Component {
  render() {
    return (
      <div className="app container">
        <Navbar />
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/item/:id" component={Item} />
          <Route path="/user/:id" component={User} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;