# eslint-plugin-mediawiki
MediaWiki-specific linting rules, for use in MediaWiki core and extensions.

## Usage

__If you are developing in MediaWiki you should be using [eslint-config-wikimedia](https://github.com/wikimedia/eslint-config-wikimedia), which includes this plugin.__

Note: ESLint supports two configuration methods: the new flat file configuration (`eslint.config.js`) introduced in ESLint 8.x and required from ESLint 9.x, and the traditional `.eslintrc.json` configuration files. During the migration, we provide examples for both methods. Choose the one that fits your project's setup.

Add `mediawiki` to the plugins section of your `eslint.config.js` configuration file, then enable the required rules.

```js
const pluginMediaWiki = require('eslint-plugin-mediawiki');

module.exports = [
  {
    "plugins": {
      "mediawiki": pluginMediaWiki
    },
    "rules": {
      "mediawiki/msg-doc": "error"
    }
  }
];
```

Alternative, if you are using ESLint 8.x-style `.eslintrc` configuration files, do this:

```json
{
  "plugins": [
    "mediawiki"
  ],
  "rules": {
    "mediawiki/msg-doc": "error"
  }
}
```

There are two shared configs: `vue`, which contains all Vue-related rules, and `common`, which includes all other rules.

```js
const pluginMediaWiki = require('eslint-plugin-mediawiki');

const configMediaWikiCommon = require('eslint-plugin-mediawiki/common');
const configMediaWikiVue = require('eslint-plugin-mediawiki/vue');

module.exports = [
  configMediaWikiCommon,
  {
    "plugins": {
      "mediawiki": pluginMediaWiki
    },
    "rules": {
      "mediawiki/msg-doc": "error"
    },
    "overrides": [
      configMediaWikiVue,
      {
        "files": [ "**/*.vue" ],
      }
    ]
  }
];
```

```json
{
  "plugins": [
    "mediawiki"
  ],
  "extends": [
    "plugin:mediawiki/common"
  ],
  "overrides": [
    {
      "files": [ "**/*.vue" ],
      "extends": [
        "plugin:mediawiki/vue"
      ]
    }
  ]
}
```

## Rules
* [`mediawiki/class-doc`](docs/rules/class-doc.md)
* [`mediawiki/msg-doc`](docs/rules/msg-doc.md)
* [`mediawiki/no-extended-unicode-identifiers`](docs/rules/no-extended-unicode-identifiers.md)
* [`mediawiki/no-nodelist-unsupported-methods`](docs/rules/no-nodelist-unsupported-methods.md)
* [`mediawiki/no-vue-dynamic-i18n`](docs/rules/no-vue-dynamic-i18n.md)
* [`mediawiki/valid-package-file-require`](docs/rules/valid-package-file-require.md)
* [`mediawiki/vue-exports-component-directive`](docs/rules/vue-exports-component-directive.md)

## Development

```sh
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
