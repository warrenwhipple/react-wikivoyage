import React from 'react';
import './index.css';
import Header from '../Header';
import WikiPage from '../WikiPage'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <WikiPage title="No page selected" />
      </div>
    );
  }
}

export default App;
