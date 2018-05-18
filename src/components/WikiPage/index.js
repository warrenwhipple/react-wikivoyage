// @flow
import React from 'react';
import DOMPurify from 'dompurify';
import { wikiPage } from '../../wiki-fetch-cache';
import { withRouter } from 'react-router-dom';
import type { Location, RouterHistory } from 'react-router-dom';
import './index.css';

type Props = {
  location: Location,
  history: RouterHistory
};

type State = {
  title: string,
  html: string
};

class WikiPage extends React.Component<Props, State> {
  state = {
    title: '',
    html: ''
  };

  loadPageData = () => {
    const { location } = this.props;
    if (location.pathname === '/') {
      this.setState({
        title: 'No Title',
        html: 'No text.'
      });
    } else {
      wikiPage(location.pathname).then(page => {
        this.setState({
          title: page.title,
          html: page.text
        });
      });
    }
  };

  handleClick = (event: Event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      if (target.hostname === window.location.hostname) {
        event.preventDefault();
        this.props.history.push(target.pathname);
      }
    }
  };

  componentDidMount() {
    this.loadPageData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.loadPageData();
    }
  }

  render() {
    const { title, html } = this.state;
    return (
      <div className="WikiPage" onClick={this.handleClick}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
      </div>
    );
  }
}
export default withRouter(WikiPage);
