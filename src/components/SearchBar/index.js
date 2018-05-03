import React from 'react';
import "./index.css";
import Autosuggest from 'react-autosuggest';
import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
import classNames from 'classnames';


const fetchOptions = {
  method: 'GET',
  // https://www.mediawiki.org/wiki/API:Main_page#Identifying_your_client
  headers: { 'User-Agent': 'Warren Whipple <modalrealist@gmail.com>' }
};

const wikiBaseUrl = 'https://en.wikivoyage.org/w/api.php';

const getSuggestionValue = suggestion => suggestion.title;

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const suggestionClass = classNames({
    'SearchBar__Suggestion': true,
    'SearchBar__Suggestion--highlighted': isHighlighted
  });
  return <div className={suggestionClass}>{suggestion.title}</div>;
}

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      apiRequestCount: 0,
    };

    this.lastRequestId = null;
  }

  incrementApiRequestCount = () => {
    this.setState((prevState, props) => ({
      apiRequestCount: prevState.apiRequestCount + 1
    }));
  }

  loadSuggestions = (value) => {
    const wikiParameters = {
      // https://www.mediawiki.org/wiki/API:Cross-site_requests
      origin: '*',
      // https://www.mediawiki.org/wiki/API:JSON_version_2
      format: 'json',
      formatversion: 2,
      // https://www.mediawiki.org/wiki/API:Search
      action: 'query',
      list: 'search',
      srsearch: value,
    };

    const wikiQueryUrl = `${wikiBaseUrl}?${querystring.stringify(wikiParameters)}`;

    const cachedSuggestions = localStorage.getItem(wikiQueryUrl);

    if (cachedSuggestions) {
      this.setState({ suggestions: cachedSuggestions && JSON.parse(cachedSuggestions) });
    } else {
      this.incrementApiRequestCount();
      fetch(wikiQueryUrl, fetchOptions)
        .then(response => response.json())
        .then(response => {
          const suggestions = response.query.search;
          localStorage.setItem(wikiQueryUrl, JSON.stringify(suggestions));
          this.setState({ suggestions: suggestions });
        });
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.loadSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Anywhere",
      value,
      onChange: this.onChange
    };

    return (
      <div className="SearchBar">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
        />
      </div>
    );
  }
}

export default SearchBar;