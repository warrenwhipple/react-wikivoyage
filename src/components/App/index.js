import React from 'react';
import './index.css';
import Header from '../Header';
import WikiPage from '../WikiPage';

class App extends React.Component {
  state = {
    currentPageId: null
  };

  onPageSelected = pageId => {
    this.setState({ currentPageId: pageId });
  };

  render() {
    const { currentPageId } = this.state;

    return (
      <div className="App">
        <Header onPageSelected={this.onPageSelected} />
        <WikiPage pageId={currentPageId} />
      </div>
    );
  }
}

export default App;
