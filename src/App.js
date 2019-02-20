import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from 'components/navbar';
import Home from 'pages/home';
import Item from 'pages/item';

const NotFound = () => <div>Page not found</div>

class App extends Component {
  render() {
    return (
      <div className="app container">
        <Navbar />
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/item" component={Item} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;