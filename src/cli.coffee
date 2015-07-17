httpSync = require("./index").httpSync

# Command line interfae

program = require "commander"


logger = require("knodeo-logger").Logger

pkg = require "./package.json" 

# Version
program
.version(pkg.version, "-v, --version")


# Simple simulation of curl statement
.option('-u, --url [url]', 'Open a URL')






result = program.parse(process.argv)


if program.url?
  console.log httpSync.get program.url
