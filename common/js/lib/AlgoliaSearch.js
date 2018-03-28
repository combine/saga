import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';

const { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY } = process.env;
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

class AlgoliaSearch {
  constructor(opts = {}) {
    const options = { offline: false, ...opts };

    this.offline = options.offline;
  }

  search = (...args) => {
    if (this.offline) {
      return this.offlineSearch(...args);
    }

    const [ indexName, params ] = args;
    const { query = '', hitsPerPage = 15, ...rest } = params;
    const searchParams = { query, hitsPerPage, ...rest };
    const helper = algoliasearchHelper(client, indexName);

    if (!query) return;

    return helper.searchOnce(searchParams);
  };

  offlineSearch = (indexName, params = {}) => {
    const { query = '', hitsPerPage = 15, ...rest } = params;
    const searchParams = {
      query,
      hitsPerPage,
      ...rest
    };

    // TODO: Make a fetch to local database
    // NOTE: In dev, resolve with a fixture (for now)
    const response = {
      content: {
        //...meta parameters
        searchParams,

        // hit data
        hits: [
          { id: 1, name: 'Flame Sword' },
          { id: 2, name: 'Anti-Gravity Laser' },
          { id: 3, name: 'Psionic Blaster' }
        ]
      }
    };

    return Promise.resolve(response);
  };
}

export default AlgoliaSearch;
