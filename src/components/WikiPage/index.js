// @flow
import React from 'react';
import DOMPurify from 'dompurify';
import { wikiPage } from '../../wiki-fetch-cache';
import type { PageData, SectionData } from '../../wiki-fetch-cache';
import { withRouter } from 'react-router-dom';
import type { Location, RouterHistory } from 'react-router-dom';
import WikiSection from '../WikiSection';
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) this.loadPageData();
    if (this.state.pageData !== prevState.pageData) window.scrollTo(0, 0);
  }

  render() {
    const { pageData } = this.state;
    if (!pageData) return null;
    const sectionComponent = (sectionData: SectionData) => (
      <WikiSection key={sectionData.id.toString()} sectionData={sectionData} />
    );
    return (
      <div className="WikiPage" onClick={this.handleClick}>
        <h1>{pageData.lead.displaytitle}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(pageData.lead.sections[0].text)
          }}
        />
        {pageData.remaining.sections.map(sectionComponent)}
      </div>
    );
  }
}

export default withRouter(WikiPage);
