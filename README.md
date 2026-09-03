<!-- This file is built by build-readme.js. Do not edit it directly; edit README.md.template instead. -->
# eslint-plugin-mediawiki
MediaWiki-specific linting rules, for use in MediaWiki core and extensions.

## 🛠️ Usage

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

There are two shared configs: `vue` which contains all Vue-related rules, and `common` which includes all other rules. They self-declare the `mediawiki` plugin, so extending them is sufficient on its own.

```json
{
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

## 📖 Rules

* [`mediawiki/class-doc`](docs/rules/class-doc.md) `common`
* [`mediawiki/msg-doc`](docs/rules/msg-doc.md) `common`
* [`mediawiki/no-cookie`](docs/rules/no-cookie.md) `common`
* [`mediawiki/no-extended-unicode-identifiers`](docs/rules/no-extended-unicode-identifiers.md) `common`
* [`mediawiki/no-nodelist-unsupported-methods`](docs/rules/no-nodelist-unsupported-methods.md) `common`
* [`mediawiki/no-storage`](docs/rules/no-storage.md) `common`
* [`mediawiki/no-unlabeled-buttonwidget`](docs/rules/no-unlabeled-buttonwidget.md) `common`
* [`mediawiki/no-vue-dynamic-i18n`](docs/rules/no-vue-dynamic-i18n.md) `vue`
* [`mediawiki/storage-expiry`](docs/rules/storage-expiry.md) `common`
* [`mediawiki/title-case-file-name`](docs/rules/title-case-file-name.md)
* [`mediawiki/valid-package-file-require`](docs/rules/valid-package-file-require.md) 🔧 `common`
* [`mediawiki/vue-exports-component-directive`](docs/rules/vue-exports-component-directive.md) 🔧 `vue`

## 🤖 Development

```sh
npm install
npm test
```

## ⚖️ License

Distributed under the MIT license. See LICENSE for details.
