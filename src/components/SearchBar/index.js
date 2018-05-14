import React from 'react';
import './index.css';
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { wikiPath } from '../../wiki-fetch-cache';

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
    value: ''
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
    const {
      suggestions,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested
    } = this.props;

    const { value } = this.state;

    const inputProps = {
      placeholder: 'Search Wikivoyage',
      value,
      onChange: this.onChange
    };

    return (
      <div className="SearchBar">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
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
