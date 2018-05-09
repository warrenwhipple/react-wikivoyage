import React from 'react';
import './index.css';
import ReactHtmlParser from 'react-html-parser';

class WikiPage extends React.Component {
  state = {
    page: null
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { wiki, pageId } = this.props;
    if (pageId === prevProps.pageId) return;
    wiki.page(pageId).then(page => {
      this.setState({ page: page });
    });
  }

  render() {
    const { page } = this.state;
    return (
      <div className="WikiPage">
        <h1 className="WikiPage--title">
          {page && page.title ? page.title : 'No Page Title'}
        </h1>
        <div className="WikiPage--content">
          {page && page.text ? ReactHtmlParser(page.text) : 'No page text.'}
        </div>
      </div>
    );
  }
}

export default WikiPage;
