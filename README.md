# Start your next React app with best practices and best tools for React

## Why this project ?

As a backend developer, I did not have the opportunity to work on frontend projects at work. Frontend development has always interested me, and now I aspire to master React framework. And the best way to start learning for me is to understand how frontend tools work together under the hood. Rather than using create-react-app, I had better create my own version from scratch. That's why I created this boilerplate, along with the following brief guide that I fed throughout the development of this project.

If you are interested to see how I created this React boilerplate step by step, you can go to [the first section of this guide](https://github.com/lamai6/react-app-starter#initialize-git-repository). If not, read only the [Quick start](https://github.com/lamai6/react-app-starter#quick-start) section.

## Quick start

1. Make sure that you have Node.js v12 and npm v5 or above installed
2. Clone this repo using git clone :
   - if you want to keep my commit history: `git clone git@github.com:lamai6/react-app-starter.git <YOUR_PROJECT_NAME>`
   - if you want to merge all my commits into a single commit: `git clone --depth=1 git@github.com:lamai6/react-app-starter.git <YOUR_PROJECT_NAME>`
3. Move to the appropriate directory: cd <YOUR_PROJECT_NAME>
4. Run `npm install` in order to install dependencies
5. At this point you can run `npm start` to see the React app at http://localhost:8080

## Initialize git repository

- create a new GitHub repository

- initialize the local repository
  ```sh
  echo "New Project" >> README.md
  git init
  git add README.md
  git commit -m "first commit"
  git branch -M main
  git remote add origin git@github.com:username/repo_name.git
  git push -u origin main
  ```

## Install dependencies

- install all the dependencies needed for our React app

  ```sh
  npm init -y
  # React
  npm install --save react react-dom
  # React Refresh plugins
  npm install --save-dev @pmmmwh/react-refresh-webpack-plugin react-refresh
  # webpack
  npm install --save-dev webpack webpack-cli webpack-dev-server cross-env
  # webpack loaders and plugins
  npm install --save-dev babel-loader style-loader css-loader sass-loader node-sass html-webpack-plugin
  # Babel compiler and presets
  npm install --save-dev @babel/core @babel/cli @babel/preset-react @babel/preset-env
  # Testing
  npm install --save-dev jest @testing-library/react @testing-library/jest-dom
  # Linter
  npx install-peerdeps --dev eslint-config-airbnb
  npm install --save-dev @babel/eslint-parser eslint-plugin-jest eslint-import-resolver-webpack
  # Formatter
  npm install --save-dev --save-exact prettier
  ```

- create `.gitignore` file

  ```sh
  touch .gitignore
  ```

- exclude these directories and files from being added to the repository

  ```
  node_modules
  dist
  coverage
  .vscode
  ```

## Structure the project

- create project structure
  ```sh
  mkdir src && touch src/index.jsx
  # Assets
  mkdir src/assets && mkdir src/assets/images && mkdir src/assets/fonts
  # Components
  mkdir src/components && mkdir src/components/App && touch src/components/App/App.jsx && touch src/components/App/App.styles.scss
  # Services
  mkdir src/services
  ```

## Create a demo app

- add SCSS styles in `src/components/App/App.styles.scss`

  ```scss
  $text-color: white;
  $image_url: url("../../assets/images/odaiba-night.jpg");
  $font_url: url("../../assets/fonts/roboto-regular.ttf");

  @font-face {
    font-family: "Roboto";
    src: $font_url format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  body {
    background-image: $image_url;
    font-family: "Roboto", sans-serif;
  }

  #counter {
    color: $text-color;

    h3 {
      text-align: center;
    }

    div {
      display: flex;
      justify-content: center;

      button {
        margin: 0 1em;
      }
    }
  }
  ```

- add a React component in `src/components/App/App.jsx`

  ```jsx
  import { Component } from "react";
  import "./App.styles.scss";

  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0,
      };
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
      this.reset = this.reset.bind(this);
    }

    increment() {
      this.setState((state) => ({
        count: state.count + 1,
      }));
    }

    decrement() {
      this.setState(
        (state) => (state.count > 0 && { count: state.count - 1 }) || state
      );
    }

    reset() {
      this.setState(() => ({ count: 0 }));
    }

    render() {
      const { count } = this.state;
      return (
        <div id="counter">
          <h3>
            <span>Counter: </span>
            {count}
          </h3>
          <div>
            <button type="button" onClick={this.increment}>
              Increment
            </button>
            <button type="button" onClick={this.decrement}>
              Decrement
            </button>
            <button type="button" onClick={this.reset}>
              Reset
            </button>
          </div>
        </div>
      );
    }
  }

  export default App;
  ```

- edit main .js file in `src/index.jsx`

  ```js
  import { render } from "react-dom";
  import App from "./components/App/App";

  render(<App />, document.getElementById("app"));
  ```

## Configure Webpack

### Webpack initial configuration

- create Webpack config file

  ```sh
  touch webpack.config.js
  ```

- add Webpack config to `webpack.config.js`

  ```js
  const path = require("path");
  const isDevelopment = process.env.NODE_ENV !== "production";

  module.exports = {
    mode: isDevelopment ? "development" : "production",
    entry: "./src/app.js",
    output: {
      filename: "app.bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    module: {
      rules: [],
    },
    plugins: [],
  };
  ```

### Handle Javascript files with Babel

#### Outside Webpack (preferred method)

> We could configure Babel inside webpack, but this is not the best option for our app as we'll have other tools that need to use Babel, as Jest (a testing framework). Hence, we can add a configuration file at the root of the project that will be shared by webpack and others.

- create Babel config file

  ```sh
  touch babel.config.js
  ```

- add Babel config to `.babel.config.js`

  ```js
  module.exports = (api) => {
    api.cache.using(() => process.env.NODE_ENV);
    return {
      presets: [
        "@babel/preset-env",
        // For example, JSX transpiles <App /> to React.createElement(...), so we ask runtime to auto import React
        [
          "@babel/preset-react",
          { development: !api.env("production"), runtime: "automatic" },
        ],
      ],
      ...(!(api.env("production") || api.env("test")) && {
        plugins: ["react-refresh/babel"],
      }),
    };
  };
  ```

- add a rule for .js files in `./webpack.config.js` and provide the Babel loader

  ```js
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ];
  }
  ```

- tell webpack to resolve .jsx files with resolve object in `webpack.config.js`

  ```js
  resolve: {
    extensions: [".js", ".jsx"];
  }
  ```

> If you want to compile a .js(x) file outside of Webpack using Babel, use the Babel CLI
>
> ```sh
> ./node_modules/.bin/babel src/components/App/App.jsx -o dist/App.js
> ```

#### Inside Webpack (alternative method)

> If Babel will be used only by webpack, you can configure Babel directly inside Webpack configuration (`./webpack.config.js`) by providing loader options to the .js files' rule, instead of creating a `./babel.config.js` config file.

- add babel loader configuration to the rule in `webpack.config.js`

  ```js
  {
      test: /\.(js|jsx)$/i,
      exclude: /node_modules/,
      use: [
          {
              loader: require.resolve('babel-loader'),
              options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"],
                  plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean)
              }
          }
      ]
  }
  ```

- tell webpack to resolve .jsx files with resolve object in `webpack.config.js`

  ```js
  resolve: {
    extensions: [".js", ".jsx"];
  }
  ```

### Handle (S)CSS files

The sass-loader compiles scss files into css files, css-loader resolves url() method and @import rule and styles-loader inject css into the DOM.

```js
{
    test: /\.s?css$/i,
    use: ['style-loader', 'css-loader', 'sass-loader']
}
```

### Create HTML template

We need an HTML page that will be notably used by React to inject the app. To create it, we will use `html-webpack-plugin` and create a custom template.

#### Preferred method

- add `plugins` object in webpack configuration (`webpack.config.js`)

  ```js
  // put this line with other variable declarations
  const HtmlWebpackPlugin = require("html-webpack-plugin");

  plugins: [
    new HtmlWebpackPlugin({
      title: "React App",
      inject: false,
      templateContent: ({ htmlWebpackPlugin }) => `
              <html>
                  <head>
                      <title>${htmlWebpackPlugin.options.title}</title>
                      ${htmlWebpackPlugin.tags.headTags}
                  </head>
                  <body>
                      <div id='app'></div>
                      ${htmlWebpackPlugin.tags.bodyTags}
                  </body>
              </html>
          `,
    }),
  ];
  ```

#### Alternative method

You can create a template in a separate HTML file in you need webpack to watch for template file changes. For a React app, this is not really useful.

- create the template file in `src/` folder

  ```sh
  touch src/template.html
  ```

- insert HTML template (for webpack) in `src/template.html`

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      <title>React App</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
  </html>
  ```

- add `plugins` object in webpack configuration (`webpack.config.js`)
  ```js
  plugins: [
    new HtmlWebpackPlugin({
      title: "React App",
      template: "src/template.html",
    }),
  ];
  ```

### Handle assets

#### Images

- add an image in the `src/assets/images` folder

- add new rule in webpack module object (`webpack.config.js`)

  ```js
  {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
      generator: {
          filename: 'images/[hash][ext][query]'
      }
  }
  ```

- add, for instance, a background image to body in `styles.scss`

  ```scss
  $image_url: url("assets/images/odaiba-night.jpg");

  body {
    background-image: $image_url;
  }
  ```

> Webpack will move our image in `dist/images` folder and update the background-image property with the new location of the image

#### Fonts

- add a font in the `src/assets/fonts` folder

- add new rule in webpack module object (`webpack.config.js`)

  ```js
  {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
          filename: 'fonts/[hash][ext][query]'
      }
  }
  ```

- add, for instance, Roboto font to body in `styles.scss`

  ```scss
  $font_url: url("assets/fonts/roboto-regular.ttf");

  @font-face {
    font-family: "Roboto";
    src: $font_url format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  body {
    font-family: "Roboto", sans-serif;
  }
  ```

### Create aliases

Facilitate imports in .js(x) and (s)css files by adding aliases to some recurrent directories as `src/assets` or `src/components`

```js
resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components')
    }
}
```

You can now update imports:

- in `src/index.jsx`

  ```js
  import App from "@components/App/App";
  ```

- in `src/components/App/App.styles.scss`

  ```scss
  $image_url: url("@images/odaiba-night.jpg");
  $font_url: url("@fonts/roboto-regular.ttf");
  ```

### Webpack Dev Server & HMR

> Be careful when reading articles about React components hot reloading, as `react-hot-loader` is now [deprecated](https://github.com/gaearon/react-hot-loader#moving-towards-next-step) and has to be replaced by `react-refresh`, developed by the React team. To connect React Fast Refresh with webpack, a [plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) has been developed.

- add `devServer` object in webpack configuration (`webpack.config.js`)

  ```js
  devServer: {
      static: './dist',
      open: true,
      hot: true
  }
  ```

- add react-refresh plugin to Babel loader configuration (`webpack.config.js`)

  ```js
  options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean)
  }
  ```

- connect webpack and react-refresh by adding our connector plugin to plugins object (`webpack.config.js`)

  ```js
  // put this line with other variable declarations
  const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

  // add the connector plugin to the plugins property of webpack config
  plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
          title: 'React App',
          inject: false,
          templateContent: ({htmlWebpackPlugin}) => `
              <html>
                  <head>
                      <title>${htmlWebpackPlugin.options.title}</title>
                      ${htmlWebpackPlugin.tags.headTags}
                  </head>
                  <body>
                      <div id='app'></div>
                      ${htmlWebpackPlugin.tags.bodyTags}
                  </body>
              </html>
          `
      })
  ].filter(Boolean),
  ```

- add 2 scripts in `package.json`: one to run the webpack server, the other to build manually `./dist` folder with all assets and mode of your choice (development / production)

  ```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cross-env NODE_ENV=production webpack",
    "start": "webpack serve"
  }
  ```

- execute the start script with npm, webpack will launch the app on your browser after building assets
  ```sh
  npm run start
  ```

> Furthermore, don't add the `output.clean` option in webpack configuration, it will prevent React components from hot reloading. For more information, take a look at the [issue](https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/595) I opened on the connector plugin repository.

## Testing with Jest

- create Jest file configuration

  ```sh
  touch ./jest.config.js
  ```

- insert this configuration in this file
  ```js
  module.exports = {
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/src/__mocks__/fileMock.js",
      "\\.(scss|css|less)$": "<rootDir>/src/__mocks__/styleMock.js",
    },
    testEnvironment: "jest-environment-jsdom",
  };
  ```

> Jest uses Babel to transpile JSX, but Jest cannot resolve stylesheets or assets imports. This is not a problem as we don't need them to test our React components, hence we have to mock them.

- create 2 mock files, one for stylesheets, the other for assets

  ```sh
  mkdir src/__mocks__ && touch src/__mocks__/fileMock.js && touch src/__mocks__/styleMock.js
  ```

  - in `fileMock.js`, add:

    ```js
    module.exports = "test-file-stub";
    ```

  - in `styleMock.js`, add:
    ```js
    module.exports = {};
    ```

- update test script in `package.json` to call jest library

  ```json
  "scripts": {
    "test": "jest --coverage",
    "build": "cross-env NODE_ENV=production webpack",
    "start": "webpack serve"
  }
  ```

- create a test file for App component

  ```sh
  touch ./src/components/App/App.test.jsx
  ```

- add some tests to this test file

  ```jsx
  import { render, screen, fireEvent } from "@testing-library/react";
  import "@testing-library/jest-dom";
  import App from "./App";

  describe("Count incrementation", () => {
    it("should increment counter when clicking on increment button", () => {
      render(<App />);
      const title = screen.getByRole("heading", { name: /counter/i });
      const incButton = screen.getByRole("button", { name: /increment/i });

      expect(title).toHaveTextContent("Counter: 0");
      fireEvent.click(incButton);
      expect(title).toHaveTextContent("Counter: 1");
    });
  });

  describe("Count decrementation", () => {
    it("should decrement counter when clicking on decrement button", () => {
      render(<App />);
      const title = screen.getByRole("heading", { name: /counter/i });
      const incButton = screen.getByRole("button", { name: /increment/i });
      const decButton = screen.getByRole("button", { name: /decrement/i });

      fireEvent.click(incButton);
      expect(title).toHaveTextContent("Counter: 1");
      fireEvent.click(decButton);
      expect(title).toHaveTextContent("Counter: 0");
    });

    it("should not decrement counter under 0 when clicking on decrement button", () => {
      render(<App />);
      const title = screen.getByRole("heading", { name: /counter/i });
      const decButton = screen.getByRole("button", { name: /decrement/i });

      expect(title).toHaveTextContent("Counter: 0");
      fireEvent.click(decButton);
      expect(title).toHaveTextContent("Counter: 0");
    });
  });

  describe("Count reset", () => {
    it("should reset counter when clicking on reset button", () => {
      render(<App />);
      const title = screen.getByRole("heading", { name: /counter/i });
      const incButton = screen.getByRole("button", { name: /increment/i });
      const resButton = screen.getByRole("button", { name: /reset/i });

      fireEvent.click(incButton);
      fireEvent.click(incButton);
      expect(title).toHaveTextContent("Counter: 2");
      fireEvent.click(resButton);
      expect(title).toHaveTextContent("Counter: 0");
    });
  });
  ```

- run the tests
  ```sh
  npm test
  ```

## Linter (ESLint)

> We choose [Airbnb rules preset](https://github.com/airbnb/javascript) for our project

- create ESLint file configuration

  ```sh
  touch .eslintrc.js
  ```

- insert this configuration in this new file

  ```js
  const jest = require("jest/package.json");

  module.exports = {
    extends: ["airbnb", "plugin:react/jsx-runtime", "plugin:jest/recommended"],
    parser: "@babel/eslint-parser",
    plugins: ["jest"],
    rules: {
      "comma-dangle": [
        "error",
        {
          arrays: "only-multiline",
          objects: "always-multiline",
          imports: "only-multiline",
          exports: "only-multiline",
          functions: "only-multiline",
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
      jest: {
        version: jest.version,
      },
      "import/resolver": "webpack",
    },
    overrides: [
      {
        files: ["**/*.js", "**/*.jsx"],
      },
    ],
    env: {
      browser: true,
      node: true,
    },
    ignorePatterns: [
      "node_modules",
      "dist",
      "coverage",
      ".vscode",
      "/src/assets/",
      "*.md",
    ],
  };
  ```

- add lint script in `package.json` to call ESLint
  ```json
  "scripts": {
    "test": "jest --coverage",
    "build": "cross-env NODE_ENV=production webpack",
    "start": "webpack serve",
    "lint": "eslint src/**/*.js src/**/*.jsx",
    "lint-debug": "npm run lint -- --debug",
  }
  ```

> You can download the ESLint plugin of your favorite IDE [here](https://eslint.org/docs/user-guide/integrations#editors), so that you don't have to run the lint script every time.

## Formatter (Prettier)

### No [integration with ESLint](https://prettier.io/docs/en/integrating-with-linters) wanted. Why ?

While many developers install the [eslint-plugin-prettier plugin](https://github.com/prettier/eslint-plugin-prettier), I decided not to use it. Why ? Because this plugin turns off all ESLint rules related to code formatting (with eslint-config-prettier package) to avoid conflicts between ESLint and Prettier, and adds its own formatting rules to ESLint, which leads us to lose all Airbnb formatting rules.

So, I added Prettier to the project, and configured it myself (`prettier.config.js`) in a way that it adapts to ESLint formatting rules, even if [Prettier's options are a bit limited](https://prettier.io/docs/en/option-philosophy).

### Configuration

- create Prettier file configuration

  ```sh
  touch prettier.config.js
  ```

- add this configuration in this file

  ```js
  module.exports = {
    trailingComma: "es5",
    tabWidth: 2,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    endOfLine: "lf",
    arrowParens: "always",
  };
  ```

- create Prettier ignoring file

  ```sh
  touch .prettierignore
  ```

- add theses patterns to the file

  ```
  node_modules
  dist
  coverage
  .vscode
  /src/assets/
  *.md
  ```

- create `.editorconfig` file to ensure lines end with a line feed (`\n`)

  ```sh
  touch .editorconfig
  ```

- add these rules to the file

  ```ini
  root = true

  [*]
  end_of_line = lf
  ```

- add format script in `package.json` to call Prettier
  ```json
  "scripts": {
    "test": "jest --coverage",
    "build": "cross-env NODE_ENV=production webpack",
    "start": "webpack serve",
    "lint": "eslint src/**/*.js src/**/*.jsx",
    "lint-debug": "npm run lint -- --debug",
    "format": "prettier --write"
  }
  ```

> You can download the Prettier plugin of your favorite IDE [here](https://prettier.io/docs/en/editors.html), so that you can format files on save.

### Visual Studio Code issues on Windows

On VSCode, the linebreaks are carriage returns (CR) followed by a line feed (LF) by default. But our files' linebreaks have to be only a line feed according to this [ESLint rule](https://eslint.org/docs/rules/linebreak-style).

Having `.editorconfig` file and Prettier configuration is not enough to create new files with LF linebreaks by default, due to [a still unsolved issue](https://github.com/microsoft/vscode-eslint/issues/707#issuecomment-509047519).

If you have many files that have CRLF linebreaks, there is currently no way to change the linebreak's type at once, [you have to do it for each file](https://stackoverflow.com/a/48694365/16072226).

Moreover, installing Prettier plugin for VSCode is not enough, you have to make Prettier the default formatter and activate manually the format on save feature (see below).

To fix these issues ourselves:

- open your `settings.json` file (location: `%APPDATA%\Code\User\settings.json`) and add:

  ```json
  {
    // ...
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "files.eol": "\n"
  }
  ```

## Some resources that helped me

- [Creating a React App… From Scratch.](https://medium.com/@JedaiSaboteur/creating-a-react-app-from-scratch-f3c693b84658)
- [Create React App from Scratch like a Pro](https://dev.to/ruppysuppy/create-react-app-from-scratch-like-a-pro-de0)
- [Creating your React project from scratch without create-react-app: The Complete Guide.](https://dev.to/underscorecode/creating-your-react-project-from-scratch-without-create-react-app-the-complete-guide-4kbc)
- [Create a React App from Scratch in 2021](https://javascript.plainenglish.io/create-a-react-app-from-scratch-in-2021-8e9948602e9c)
- [React Setup, Part 1 to 5](https://www.codecademy.com/article/react-setup-i)
- [Webpack Tutorial - Episode 7 - Style loaders (CSS and SCSS)](https://www.youtube.com/watch?v=lqvbgmuhneg)
- [React Refresh Webpack Plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
- [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin#options)
- [Webpack 5 - Asset Modules](https://dev.to/smelukov/webpack-5-asset-modules-2o3h)
- [React Architecture: How to Structure and Organize a React Application](https://www.taniarascia.com/react-architecture-directory-structure)
- [React Folder Structure in 5 Steps [2021]](https://www.robinwieruch.de/react-folder-structure/)
- [Jest Tutorial for Beginners: Getting Started With JavaScript Testing](https://www.valentinog.com/blog/jest/)
- [Using Jest with webpack](https://jestjs.io/docs/webpack)
- [React Testing Library official example](https://github.com/facebook/jest/tree/main/examples/react-testing-library)
- [JavaScript Testing (2 Part Series)](https://dev.to/ohdylan/start-testing-your-javascript-codes-with-jest-2gfm)
- [Better Tests for Text Content with React Testing Library](https://dev.to/alexkmarshall/better-tests-for-text-content-with-react-testing-library-2mc7)
- [About Queries](https://testing-library.com/docs/queries/about)
- [ESLint - Extending Configuration Files](https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files)
- [ESLint Plugin React](https://github.com/yannickcr/eslint-plugin-react)
- [Prevent missing React when using JSX](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md)
- [Utiliser ESLint et Prettier pour un code de qualité](https://jeremiechazelle.dev/utiliser-eslint-et-prettier-sous-visual-studio-code-webstorm-phpstorm-pour-un-code-de-qualite)
- [How to setup ESLint and Prettier for your React apps](https://thomaslombart.com/setup-eslint-prettier-react)
