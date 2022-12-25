export default {
  port: 3000,
  mode: "development",
  database: {
    dialect: "postgresql",
    dev: "Ye mai ni dunga",
  },
  jwt: {
    secret: "thisisajwtsecret",
    access_expiration_minutes: 30,
    refresh_expiration_days: 30,
  },
  meilisearch: {
    host: "http://127.0.0.1:7700",
    master_key: "MASTER_KEY",
    index_name: "bookmarks",
  },
};
