import React from 'react';
import {render} from 'react-dom';
// import LandingPage from './components/LandingPage.js';
import FinalLandingPage from './components/FinalLandingPage.js';

class App extends React.Component {
  render () {
    // return <LandingPage />;
    return <FinalLandingPage />;
  }
}

render(<App/>, document.getElementById('app'));
