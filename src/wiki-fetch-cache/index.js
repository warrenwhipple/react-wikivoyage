import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

const fetchOptions = {
  method: 'GET',
  // https://www.mediawiki.org/wiki/API:Main_page#Identifying_your_client
  headers: { 'User-Agent': 'Warren Whipple <modalrealist@gmail.com>' }
};

const apiCommonParameters = {
  // https://www.mediawiki.org/wiki/API:Cross-site_requests
  origin: '*',
  // https://www.mediawiki.org/wiki/API:JSON_version_2
  format: 'json',
  formatversion: 2
};

const wikiQueryUrl = (apiUrl, apiSpecialParameters) => {
  const apiParameters = { ...apiCommonParameters, ...apiSpecialParameters };
  return `${apiUrl}?${querystring.stringify(apiParameters)}`;
};

class WikiFetchCache {
  constructor(apiUrl = 'https://en.wikipedia.org/w/api.php') {
    this.apiUrl = apiUrl;
  }

  search = searchString => {
    const apiSpecialParameters = {
      // https://www.mediawiki.org/wiki/API:Search
      action: 'query',
      list: 'search',
      srsearch: searchString
    };

    const queryUrl = wikiQueryUrl(this.apiUrl, apiSpecialParameters);

    const cachedSuggestions = localStorage.getItem(queryUrl);

    if (cachedSuggestions) {
      console.log('Search cache hit');
      return Promise.resolve(JSON.parse(cachedSuggestions));
    }

    console.log('Search API hit');
    return fetch(queryUrl, fetchOptions)
      .then(response => response.json())
      .then(json => {
        const suggestions = json.query.search;
        localStorage.setItem(queryUrl, JSON.stringify(suggestions));
        return suggestions;
      });
  };

  page = pageId => {
    const apiSpecialParameters = {
      // https://www.mediawiki.org/wiki/API:Query
      action: 'parse',
      pageid: pageId,
      prop: 'text'
    };

    const queryUrl = wikiQueryUrl(this.apiUrl, apiSpecialParameters);

    const cachedPage = localStorage.getItem(queryUrl);

    if (cachedPage) {
      console.log('Page cache hit');
      return Promise.resolve(JSON.parse(cachedPage));
    }

    console.log('Page API hit');

    return fetch(queryUrl, fetchOptions)
      .then(response => response.json())
      .then(json => {
        const page = json.parse;
        localStorage.setItem(queryUrl, JSON.stringify(page));
        return page;
      });
  };
}

export default WikiFetchCache;
