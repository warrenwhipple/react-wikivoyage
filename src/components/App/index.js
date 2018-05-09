import React from 'react';
import './index.css';
import WikiFetchCache from '../../wiki-fetch-cache';
import Header from '../Header';
import WikiPage from '../WikiPage';

class App extends React.Component {
  state = {
    pageId: null
  };

  wiki = new WikiFetchCache('https://en.wikivoyage.org/w/api.php');

  onPageSelected = pageId => {
    this.setState({ pageId: pageId });
  };

  render() {
    const { pageId } = this.state;

    return (
      <div className="App">
        <Header wiki={this.wiki} onPageSelected={this.onPageSelected} />
        <WikiPage wiki={this.wiki} pageId={pageId} />
      </div>
    );
  }
}

export default App;
