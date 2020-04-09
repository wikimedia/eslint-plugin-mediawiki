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

## Rules
* `mediawiki/class-doc` - Ensures CSS classes are documented when they are constructed.
* `mediawiki/msg-doc` - Ensures message keys are documented when they are constructed.
* `mediawiki/valid-package-file-require`- Ensures `require`d files are in the format that is expected within [ResourceLoader package modules](https://www.mediawiki.org/wiki/ResourceLoader/Package_modules), i.e. contain the file extension and are proper relative paths, e.g. `./foo.js` instead of `./foo` or `foo.js`.

## Development

```sh
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
