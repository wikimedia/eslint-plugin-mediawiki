# eslint-plugin-mediawiki release history

## v0.8.0
* [BREAKING CHANGE] Drop support for Node 18 (Ed Sanders)
* Rule fix: `no-unlabeled-buttonwidget`: Handle `node.callee` with no `property` (Ed Sanders)

## v0.7.1
* New rule: `no-unlabeled-buttonwidget` (Ed Sanders)
* Rule fix: `class-doc`: Encourage in example usage that users specify it's for CSS classes (James D. Forrester)

## v0.7.0
* [BREAKING CHANGE] Drop claimed Node 16 support (James D. Forrester)
* Rule fix: `vue-exports-component-directive`: Prefer `defineComponent()` (Roan Kattouw)
* Rule fix: `vue-exports-component-directive`: Make fixable (Roan Kattouw)

## v0.6.0
* [BREAKING CHANGE] Drop support for Node 14 (James D. Forrester)
* Update eslint-plugin-vue to 9.23.0 (Roan Kattouw)

—
* build: Upgrade eslint-config-wikimedia to 0.26.0 (Roan Kattouw)
* build: Upgrade mocha from ^9.2.0 to ^10.3.0) (James D. Forrester)
* build: Add CI for Node 18 and 20; drop 14 (James D. Forrester)

## v0.5.0
* [BREAKING CHANGE] Drop support for Node 12 (James D. Forrester)
* Create `common` and `vue` shared configs (Ed Sanders)
* Rule fix: `msg-doc`: Disallow `$i18n` calls with dynamic arguments without documentation (Florent)
* Rule fix: `msg-doc`: Support `new msg.Message()` (Florent)
* Rule fix: `vue-exports-component-directive`: Recognize `defineComponent()` (Roan Kattouw)
* build: Upgrade eslint-docgen from ^0.7.0 to ^0.7.1 (James D. Forrester)
* build: Upgrade eslint-config-wikimedia from ^0.22.1 to ^0.24.0 (James D. Forrester)

## v0.4.0
* New rule: `no-nodelist-unsupported-methods` (Ed Sanders)
* New rule: `no-extended-unicode-identifiers` (Roan Kattouw)
* Rule fix: `msg-doc`: Fix short URL to rule help page (Sam Wilson)
* Rule fix: `class-doc`: Fix linting of classList.toggle (Ed Sanders)
* Build: Update eslint-plugin-vue from ^7.20.0 to ^8.7.1 (Ed Sanders)

## v0.3.0
* Breaking change: Drop Node 10 support (Ed Sanders)
* New rule: `vue-exports-component-directive` (DannyS712)
* Rule fix: `valid-package-file-require`: also support vue (DannyS712)
* Rule fix: `class-doc`: Support eslint-plugin-json-es parser (Ed Sanders)
* Docs: Update eslint-docgen to 0.6.1 (Ed Sanders)
* Build: Update dependencies (Ed Sanders)

## v0.2.7
* Upgrade eslint-plugin-vue to ^7.7.0 to match eslint-config-wikimedia (James D. Forrester)
* build: Upgrade eslint-config-wikimedia from 0.17.0 to 0.18.1 (James D. Forrester)
* build: Upgrade codecov from ^3.7.2 to ^3.8.1 (James D. Forrester)
* build: Upgrade outdent from ^0.7.1 to ^0.8.0 (James D. Forrester)

## v0.2.6
* Rule fix: `msg-doc`/`class-doc`: Fix behavior in var statements (Roan Kattouw)
* Build: Update devDependencies (Ed Sanders)
* Build: Add codecov reporting (Ed Sanders)

## v0.2.5
* Rule fix: `valid-package-file-require`: Deal with backslashes in Windows paths (Roan Kattouw)
* Code: Use upath for Windows path normalization, add Windows to tests (Ed Sanders)
* Docs: Move docs to docs/rules (Ed Sanders)
* Docs: Documentation cleanup (Ed Sanders)
* Docs: Use eslint-docgen (Ed Sanders)
* Tests: Move test rules to tests/rules (Ed Sanders)
* Tests: Simplify error message string assertions (Ed Sanders)
* Tests: Use outdent for multi-line test cases (Ed Sanders)
* Build: Introduce eslint-plugin-eslint-plugin (Ed Sanders)
* Build: Update devDependencies and remove explicit eslint dependency (Ed Sanders)
* Build: Update ESLint to 7.0.0 (Ed Sanders)
* Build: Increase ESLint peerDependency from 2.3.0 to 5.0.0 (Ed Sanders)

## v0.2.4
* Rule fix: `valid-package-file-require`: Allow ./ prefix when going up the dir tree (Jakob Warkotsch)
* Rule fix: `valid-package-file-require`: Check if require() arg looks like a path (Roan Kattouw)
* Rule fix: `valid-package-file-require`: Make fixable (Roan Kattouw)
* Rule fix: `valid-package-file-require`: Report correct file path in error message (Roan Kattouw)
* Rule fix: Link to documentation for `class-doc` & `msg-doc` rules (Ed Sanders)
* Build: Add code coverage report and set threshold to 100% (Ed Sanders)
* Build: Update devDependencies (Ed Sanders)
* Code: Add rule types (Ed Sanders)
* Code: Move rules and index.js to src (Ed Sanders)

## v0.2.3
* New rule: `no-vue-dynamic-i18n` (Roan Kattouw)

## v0.2.2
* New rule: `class-doc` (Ed Sanders)
* Rule fix: Support passing arrays of literals to addClass (Ed Sanders)
* Rule fix: `class-doc` – Catch OOUI classes (Ed Sanders)
* Rule fix: `class-doc`: Also match DOM class changes (Ed Sanders)
* README: Direct users to eslint-config-wikimedia (Ed Sanders)
* Release: Update devDependencies (Ed Sanders)

## v0.2.1
* Fix `valid-package-file-require` file path in index.js (Jakob Warkotsch)

## v0.2.0
* New rule: `valid-package-file-require` (Jakob Warkotsch)

## v0.1.0
* Initial release.
* New rule: `msg-doc` (Ed Sanders)
