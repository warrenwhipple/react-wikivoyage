import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import WikiFetchCache from '../../wiki-fetch-cache';
import Header from '../Header';
import LandingPage from '../LandingPage';
import WikiPage from '../WikiPage';
import './index.css';

const wiki = new WikiFetchCache('https://en.wikivoyage.org/w/api.php');

class App extends React.Component {
  state = {
    page: {},
    suggestions: []
  };

  componentDidMount() {
    if (this.props.location.pathname !== '/') {
      wiki.page(this.props.location.pathname).then(page => {
        this.setState({ page: page });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      wiki.page(this.props.location.pathname).then(page => {
        this.setState({ page: page });
      });
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    wiki.search(value).then(suggestions => {
      this.setState({
        suggestions: suggestions
      });
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { page } = this.state;
    return (
      <div className="App">
        <Header
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            path="/wiki/:urlTitle"
            render={props => (
              <WikiPage title={page && page.title} html={page && page.text} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
