// import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

const fetchOptions = {
  method: 'GET',
  // https://www.mediawiki.org/wiki/API:Main_page#Identifying_your_client
  headers: { 'User-Agent': 'Warren Whipple <modalrealist@gmail.com>' }
};

const apiSharedParameters = {
  // https://www.mediawiki.org/wiki/API:Cross-site_requests
  origin: '*',
  // https://www.mediawiki.org/wiki/API:JSON_version_2
  format: 'json',
  formatversion: 2,
};

class WikiFetchCache {
  constructor(apiUrl = 'https://en.wikipedia.org/w/api.php') {
    this.apiUrl = apiUrl;
    this.apiRequestCount = 0;
  }

  search = value => {
    const apiParameters = {
      ...apiSharedParameters,
      // https://www.mediawiki.org/wiki/API:Search
      action: 'query',
      list: 'search',
      srsearch: value,
    };

    const queryUrl = `${this.apiUrl}?${querystring.stringify(apiParameters)}`;

    const cachedSuggestions = localStorage.getItem(queryUrl);

    if (cachedSuggestions)
      return Promise.resolve(JSON.parse(cachedSuggestions));

    this.apiRequestCount++;
    console.log("Wikie API requests: " + this.apiRequestCount);

    return fetch(queryUrl, fetchOptions)
      .then(response => response.json())
      .then(json => {
        const suggestions = json.query.search;
        localStorage.setItem(queryUrl, JSON.stringify(suggestions));
        return suggestions;
      });

  }
}

export default WikiFetchCache;