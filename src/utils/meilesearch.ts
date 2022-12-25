import MeiliSearch from "meilisearch";
import config from "config";

const client = new MeiliSearch({
  host: config.get("meilisearch.host"),
  apiKey: config.get("meilisearch.master_key"),
}).index(config.get("meilisearch.index_name"));

export default client;
