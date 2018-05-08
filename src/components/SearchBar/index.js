import React from 'react';
import "./index.css";
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import WikiFetchCache from '../../wiki-fetch-cache';

const getSuggestionValue = (suggestion) => suggestion.title;

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const suggestionClass = classNames({
    'SearchBar__Suggestion': true,
    'SearchBar__Suggestion--highlighted': isHighlighted
  });
  return <div className={suggestionClass}>{suggestion.title}</div>;
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };

    this.wiki = new WikiFetchCache('https://en.wikivoyage.org/w/api.php');
  }

  loadSuggestions = (value) => {
    this.wiki.search(value)
      .then(suggestions => {
        this.setState({
          suggestions: suggestions
        });
      });
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

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.onPageSelected(suggestion.pageid);
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Search Wikivoyage",
      value,
      onChange: this.onChange
    };

    return (
      <div className="SearchBar">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
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