const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');
var fs = require('fs');


describe('clarity:service', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/service'))
      .withArguments(['test']);
  });

  it('generates a service project', () => {
    assert.file(['service-test/package.json']);
  });
});
