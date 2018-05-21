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

export type SectionData = {
  id: number,
  text?: string,
  toclevel?: number,
  line?: string,
  anchor?: string
};

export type PageData = {
  lead: {
    displaytitle: string,
    description: string,
    image: {
      file: string,
      urls: {
        '320': string,
        '640': string,
        '800': string,
        '1024': string
      }
    },
    sections: Array<SectionData>
  },
  remaining: {
    sections: Array<SectionData>
  }
};

export const wikiPage = (path: string): Promise<PageData> => {
  const restTitle = encodeURIComponent(
    path.replace(/^\/wiki\//, '').replace('_', ' ')
  );
  const restUrl = `https://en.wikivoyage.org/api/rest_v1/page/mobile-sections/${restTitle}`;

  const cachedData = localStorage.getItem(restUrl);

  if (cachedData) {
    console.log('Page cache hit');
    return Promise.resolve(JSON.parse(cachedData));
  }

  console.log('Page API hit');

  return fetch(restUrl, fetchOptions)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
      localStorage.setItem(restUrl, JSON.stringify(json));
      return json;
    });
};
