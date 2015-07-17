#!/usr/bin/env node
var httpSync, logger, pkg, program, result;

httpSync = require("./index").httpSync;

program = require("commander");

logger = require("knodeo-logger").Logger;

pkg = require("./package.json");

program.version(pkg.version, "-v, --version").option('-u, --url [url]', 'Open a URL');

result = program.parse(process.argv);

if (program.url != null) {
  console.log(httpSync.get(program.url));
}
