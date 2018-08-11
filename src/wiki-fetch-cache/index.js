// @flow
import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

export const wikiPath = (title: string): string =>
  `/wiki/${title.replace(' ', '_')}`;

export const wikiTitle = (path: string): string =>
  path.replace(/^\/wiki\//, '').replace('_', ' ');

const fetchOptions = {
  method: 'GET',
  // https://www.mediawiki.org/wiki/API:Main_page#Identifying_your_client
  headers: { 'User-Agent': 'Warren Whipple <modalrealist@gmail.com>' }
};

const wikiQueryUrl = apiSpecialParameters => {
  const apiUrl = 'https://en.wikivoyage.org/w/api.php';
  const apiCommonParameters = {
    // https://www.mediawiki.org/wiki/API:Cross-site_requests
    origin: '*',
    // https://www.mediawiki.org/wiki/API:JSON_version_2
    format: 'json',
    formatversion: 2
  };
  const apiParameters = { ...apiCommonParameters, ...apiSpecialParameters };
  return `${apiUrl}?${querystring.stringify(apiParameters)}`;
};

export type SuggestionData = {
  title: string
};

export const wikiSearch = (
  searchString: string
): Promise<Array<SuggestionData>> => {
  const apiSpecialParameters = {
    // https://www.mediawiki.org/wiki/API:Search
    action: 'query',
    list: 'prefixsearch',
    pssearch: searchString
  };

  const queryUrl = wikiQueryUrl(apiSpecialParameters);

  const cachedSuggestions = localStorage.getItem(queryUrl);

  if (cachedSuggestions) {
    console.log('Search cache hit');
    return Promise.resolve(JSON.parse(cachedSuggestions));
  }

  console.log('Search API hit');
  return fetch(queryUrl, fetchOptions)
    .then(response => response.json())
    .then(json => {
      const suggestions = json.query.prefixsearch;
      localStorage.setItem(queryUrl, JSON.stringify(suggestions));
      return suggestions;
    });
};

export type PageData = {
  parse: {
    pageid: Number,
    text: string,
    title: string
  }
};

export const wikiPage = (path: string): Promise<PageData> => {
  // const restTitle = encodeURIComponent(
  //   path.replace(/^\/wiki\//, '').replace('_', ' ')
  // );
  // const restUrl = `https://en.wikivoyage.org/api/rest_v1/page/html/${restTitle}`;

  const apiSpecialParameters = {
    // https://www.mediawiki.org/wiki/API:Parsing_wikitext
    action: 'parse',
    page: wikiTitle(path),
    prop: 'text'
  };

  const queryUrl = wikiQueryUrl(apiSpecialParameters);

  const cachedData = localStorage.getItem(queryUrl);

  if (cachedData) {
    console.log('Page cache hit');
    return Promise.resolve(JSON.parse(cachedData));
  }

  console.log('Page API hit');

  return fetch(queryUrl, fetchOptions)
    .then(response => {
      return response.json();
    })
    .then(json => {
      localStorage.setItem(queryUrl, JSON.stringify(json));
      return json;
    });
};
