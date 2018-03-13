import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';

const { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY } = process.env;

export const performSearch = (indexName, params = {}) => {
  const { query = '', hitsPerPage = 15, ...rest } = params;
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
  const helper = algoliasearchHelper(client, indexName);
  const searchParams = { query, hitsPerPage, ...rest };

  if (!query) return;

  return helper.searchOnce(searchParams);
};
