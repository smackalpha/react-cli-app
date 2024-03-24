import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log(chalk.blue('Creating React app...'));

  try {
    const appname = process.argv[2];
    if (!appname) {
      throw new Error('App name is required. Usage: node cli.js <app-name>');
    }
    await createReactApp(appname);
    console.log(chalk.green('React app created successfully!'));
  } catch (error) {
    console.error(chalk.red('Error creating React app:', error.message));
  }
}

async function createReactApp(appname) {
  // Define your custom template structure here
  const template = {
    'src': {
      'components': {},
      'pages': {},
      'App.js': `import React from 'react';\n\nfunction App() {\n  return (\n    <div className="App">\n      <header className="App-header">\n        <p>\n          Edit <code>src/App.js</code> and save to reload.\n        </p>\n        <a\n          className="App-link"\n          href="https://reactjs.org"\n          target="_blank"\n          rel="noopener noreferrer"\n        >\n          Learn React\n        </a>\n      </header>\n    </div>\n  );\n}\n\nexport default App;`,
      'index.js': `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport './index.css';\nimport App from './App';\nimport reportWebVitals from './reportWebVitals';\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById('root')\n);\n\nreportWebVitals();`,
      'index.css': `body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;\n}`,
      'reportWebVitals.js': `export default function reportWebVitals(onPerfEntry) {\n  if (onPerfEntry && onPerfEntry instanceof Function) {\n    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {\n      getCLS(onPerfEntry);\n      getFID(onPerfEntry);\n      getFCP(onPerfEntry);\n      getLCP(onPerfEntry);\n      getTTFB(onPerfEntry);\n    });\n  }\n}`
    },
    'public': {
      'index.html': fs.readFileSync(`${__dirname}/templates/index.html`, 'utf8'),
      'favicon.ico': fs.readFileSync(`${__dirname}/templates/favicon.ico`)
    },
    'package.json': `{\n  "name": "${appname}",\n  "version": "0.1.0",\n  "private": true,\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "react-scripts": "5.0.1",\n    "web-vitals": "^2.1.4"\n },\n  "scripts": {\n    "start": "react-scripts start",\n    "build": "react-scripts build",\n    "test": "react-scripts test",\n    "eject": "react-scripts eject"\n  },\n  "eslintConfig": {\n    "extends": [\n      "react-app",\n      "react-app/jest"\n    ]\n  },\n  "browserslist": {\n    "production": [\n      ">0.2%",\n      "not dead",\n      "not op_mini all"\n    ],\n    "development": [\n      "last 1 chrome version",\n      "last 1 firefox version",\n      "last 1 safari version"\n    ]\n  }\n}`
  };

  // Create app directory and files
  fs.mkdirSync(appname);
  process.chdir(appname);

  createFiles(template);
}


function createFiles(template) {
  for (const [key, value] of Object.entries(template)) {
    if (typeof value === 'object' && Object.keys(value).length > 0) {
      fs.mkdirSync(key, { recursive: true });
      process.chdir(key);
      createFiles(value);
      process.chdir('..');
    } else if (typeof value === 'string') {
      fs.writeFileSync(key, value);
    }
  }
}


main();
