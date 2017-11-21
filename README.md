parity-parser [![Build Status](https://travis-ci.org/kevinhughes27/parity-parser.svg)](https://travis-ci.org/kevinhughes27/parity-server)
=============

Deprecated. I am migrating out of google docs into a full application [here](https://github.com/kevinhughes27/parity-parser)

`events => stats` parser for parity league stats.

The parser is a standalone javascript module that can be used in any js environment (browser, AppScript, or node). The Parser takes an array of `events` as input and produces an `object` containing the stats for each player. Each event in the array can be either a tab (`\t`) separate string or an array (aka the string but already split). The best way to understand how it works is to read through the `parser_test.js` file.


Development Setup
-----------------
  Dependencies:
    * node / npm

  Then run `npm install` to get the required modules.


Testing
-------
  run `npm test`


Deploying
---------
  This script is currently deployed as a Google AppsScript library.

  run `npm run deploy`

  If you get errors try removing the `.credentials/credentials.json`

  After pushing the new code you need to save a new version of the script in AppScript and then update the version in any projects using the library.
