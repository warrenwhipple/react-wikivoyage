// @flow
import React from 'react';
import DOMPurify from 'dompurify';
import { wikiPage } from '../../wiki-fetch-cache';
import type { PageData } from '../../wiki-fetch-cache';
import { withRouter } from 'react-router-dom';
import type { Location, RouterHistory } from 'react-router-dom';
import './index.css';

type Props = {
  location: Location,
  history: RouterHistory
};

type State = {
  pageData: ?PageData
};

class WikiPage extends React.Component<Props, State> {
  state: State = {
    pageData: null
  };

  loadPageData = () => {
    const { location } = this.props;
    if (location.pathname === '/') {
      this.setState({
        pageData: null
      });
    } else {
      wikiPage(location.pathname).then(pageData => {
        this.setState({
          pageData: pageData
        });
      });
    }
  };

  handleClick = (event: MouseEvent) => {
    const target = event.target;
    if (
      target instanceof HTMLAnchorElement &&
      target.hostname === window.location.hostname &&
      event.button === 0 &&
      target.getAttribute('target') !== '_blank' &&
      !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
    ) {
      event.preventDefault();
      this.props.history.push(target.pathname);
    }
  };

  componentDidMount() {
    this.loadPageData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) this.loadPageData();
    if (this.state.pageData !== prevState.pageData) window.scrollTo(0, 0);
  }

  render() {
    const { pageData } = this.state;
    if (!pageData) return null;
    console.log(pageData);
    return (
      <div className="WikiPage">
      <h1>{pageData.parse.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(pageData.parse.text)
          }}
        />
      </div>
    );
  }
}

export default withRouter(WikiPage);
