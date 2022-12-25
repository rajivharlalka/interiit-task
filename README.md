## Inter-IIT Task for a fast search engine

- All configs to be stored in `./src/config/default.ts`
- Docker files for dev and prod available

## Thought process

![Untitled-2022-12-25-1212](https://user-images.githubusercontent.com/68731551/209462004-ad39dbc3-ef23-494f-b6f1-f136325d809f.svg)

- Though the above backend does not use the following serverless architechture, it has a similar workflow.

## Run Locally

- Install Packages

```sh
yarn
```

- Add .env
```sh
cp .env.template .env
```
- Add DB_URL to .env

- Run Meiliserch (using docker:why, it's better :) )

```sh
docker run -it -d --rm -p 7700:7700 -e MEILI_MASTER_KEY='MASTER_KEY' -v $(pwd)/meili_data:/meili_data getmeili/meilisearch:v0.30
```

- Start Server

```sh
yarn dev
```
