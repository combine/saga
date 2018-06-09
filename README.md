# Saga

Next-generation ecommerce framework built with React and GraphQL.

## Features

- GraphQL server backed by apollo-server-express, Objection.js, and PostgreSQL
- Full support for server-side rendering
- Code splitting with [dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) and [react-loadable](https://github.com/thejameskyle/react-loadable)
- Sane [webpack configurations](webpack/)
- JS hot reloading with [react-hot-loader (@next)](https://github.com/gaearon/react-hot-loader) and [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- CSS, SASS and [css-modules](https://github.com/css-modules/css-modules) support with hot reloading and no [flash of unstyled content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) ([css-hot-loader](https://github.com/shepherdwind/css-hot-loader))
- Routing with [react-router-v4](https://github.com/ReactTraining/react-router)
- Full production builds that do not rely on `babel-node`.
- Pre-configured testing tools with `jest` and `enzyme` to work with css modules, static files, and aliased module paths.


## Development Mode

Copy environment variables and edit them if necessary:

```
cp .env.example .env
```

Then:

```
npm install
npm start
```

Direct your browser to `http://localhost:3000`.

## Production Builds

Add environment variables the way you normally would on your production system.

```
npm run prod:build
npm run serve
```

Or simply:

```
npm run prod
```

If using Heroku, simply add a `Procfile` in the root directory. The
[postinstall](postinstall.js) script will do the rest.

```
web: npm run serve
```

## Path Aliases

In `package.json`, there is a property named `_moduleAliases`. This object
defines the require() aliases used by both webpack and node.

Aliased paths are prefixed with one of two symbols, which denote different
things:

`@` - aliased paths, e.g. `@admin, @app, @middleware`

`$` - server paths that are built by babel, e.g. `server/api`

Aliases are nice to use for convenience, and lets us avoid using relative paths
in our components:

```
// This sucks
import SomeComponent from '../../../components/SomeComponent';

// This is way better
import SomeComponent from '@shared/components/SomeComponent';
```

You can add additional aliases in `package.json` to your own liking.

## Environment Variables

In development mode, environment variables are loaded by `dotenv` off the `.env`
file in your root directory. In production, you'll have to manage these
yourself.

An example with Heroku:

```
heroku config:set FOO=bar
```

## CSS Modules

This project uses [CSS Modules](https://github.com/css-modules/css-modules).
Class names should be in `camelCase`. Simply import the .scss file into your
component, for example:

```
├── components
│   ├── Header.js
│   ├── Header.scss
```

```
// Header.scss
.headerContainer {
  height: 100px;
  width: 100%;
}
```

```
// Header.js
import css from './Header.scss';

const Header = (props) => {
  return (
    <div className={css.headerContainer}>
      {...}
    </div>
  );
}

```

## Server-side Rendering (SSR)

This project fully supports server side rendering. See Apollo's documentation
on [server-sider rendering](https://www.apollographql.com/docs/react/features/server-side-rendering.html).

## Async / Await

This project uses `async/await`, available by default in Node.js v8.x.x or
higher. If you experience errors, please upgrade your version of Node.js.

## Testing

The default testing framework is Jest, though you can use whatever you want.

Tests and their corresponding files such as Jest snapshots, should be co-located
alongside the modules they are testing, in a `spec/` folder. For example:

```
├── components
│   ├── todos
│   │   ├── TodoForm
│   │   │   ├── spec
│   │   │   │   ├── TodoForm.test.js
│   │   │   ├── index.js
│   │   │   ├── index.scss
```

Tests can be written with ES2015, since it passes through `babel-register`.

## Running Tests

To run a single test:

```
npm test /path/to/single.test.js

// Or, to watch for changes
npm run test:watch /path/to/single.test.js
```

To run all tests:

```
npm run test:all

// Or, to watch for changes
npm run test:all:watch
```

## Running ESLint

```
npm run lint
```

Check the `.eslintignore` file for directories excluded from linting.

## Changing the public asset path

By default, assets are built into `dist/public`. This path is then served by
express under the path `assets`. This is the public asset path. In a production
scenario, you may want your assets to be hosted on a CDN. To do so, just change
the `PUBLIC_ASSET_PATH` environment variant.

Example using Heroku, if serving via CDN:

```
heroku config:set PUBLIC_ASSET_PATH=https://my.cdn.com
```
