import React from 'react';
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { wikiPath, wikiSearch } from '../../wiki-fetch-cache';
import './index.css';

const getSuggestionValue = suggestion => suggestion.title;

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const suggestionClass = classNames({
    SearchBar__Suggestion: true,
    'SearchBar__Suggestion--highlighted': isHighlighted
  });
  return <div className={suggestionClass}>{suggestion.title}</div>;
};

class SearchBar extends React.Component {
  state = {
    value: '',
    suggestions: []
  };

  onSuggestionsFetchRequested = ({ value }) => {
    wikiSearch(value).then(suggestions => {
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

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.history.push(wikiPath(suggestion.title));
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Search Wikivoyage',
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

export default withRouter(SearchBar);
