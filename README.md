# eslint-plugin-mediawiki
MediaWiki-specific linting rules, for use in MediaWiki core and extensions.

## Usage

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

## Development

```sh
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
