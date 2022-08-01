# eslint-plugin-mediawiki
MediaWiki-specific linting rules, for use in MediaWiki core and extensions.

## Usage

__If you are developing in MediaWiki you should be using [eslint-config-wikimedia](https://github.com/wikimedia/eslint-config-wikimedia) which includes this plugin.__

Add `mediawiki` to the plugins section of your `.eslintrc` configuration file, then enable the required rules.

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

There are two shared configs: `vue` which contains all Vue-related rules, and `common` which includes all other rules.

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
