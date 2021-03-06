var chai   = require('chai'),
    fs     = require('fs'),
    expect = chai.expect;

var parser = require('../lib/parser');

describe("Parser", function() {

  it("parses stat: Pulls", function() {
    input = ["Pull\tJill", "Direction\t>>>>>>"];
    output = parser(input);
    expect(output['Jill']['Pulls']).to.equal(1);
  });

  it("parses stat: Pick-Ups", function() {
    input = ["Direction\t>>>>>>\tPOINT\tJill\tPass\tBob",];
    output = parser(input);
    expect(output['Bob']['Pick-Ups']).to.equal(1);
  });

  it("parses stat: Goals", function() {
    input = ["Direction\t>>>>>>\tPOINT\tJill"];
    output = parser(input);
    expect(output['Jill']['Goals']).to.equal(1);
  });

  it("parses stat: Assists", function() {
    input = ["Direction\t>>>>>>\tPOINT\tJill\tPass\tBob"];
    output = parser(input);
    expect(output['Bob']['Assists']).to.equal(1);
  });

  it("parses stat: 2nd Assists", function() {
    input = ["Direction\t>>>>>>\tPOINT\tJill\tPass\tBob\tPass\tJim"];
    output = parser(input);
    expect(output['Jim']['2nd Assist']).to.equal(1);
  });

  it("parses stat: 3rd Assists", function() {
    input = ["Direction\t>>>>>>\tPOINT\tJill\tPass\tBob\tPass\tJim\tPass\tBob"];
    output = parser(input);
    expect(output['Bob']['3rd Assist']).to.equal(1);
  });

  it("parses stat: 4th Assists", function() {
    input = ["Direction\t>>>>>>\tPOINT\tJill\tPass\tBob\tPass\tJim\tPass\tBob\tPass\tJim"];
    output = parser(input);
    expect(output['Jim']['4th Assist']).to.equal(1);
  });

  it("parses stat: 5th Assists", function() {
    input = ["Direction\t>>>>>>\tPOINT\tJill\tPass\tBob\tPass\tJim\tPass\tBob\tPass\tJim\tPass\tBob"];
    output = parser(input);
    expect(output['Bob']['5th Assist']).to.equal(1);
  });

  it("parses stat: D-Blocks", function() {
    input = ["D\tJill"];
    output = parser(input);
    expect(output['Jill']['D-Blocks']).to.equal(1);
  });

  it("parses stat: Completions 1", function() {
    input = ["Direction\t>>>>>>\tPOINT\tJill\tPass\tBob"];
    output = parser(input);
    expect(output['Bob']['Completions']).to.equal(1);
  });

  it("parses stat: Completions 2", function() {
    input = ["Direction\t>>>>>>\tPOINT\tJill\tPass\tBob\tPass\tJim\tPass\tBob\tPass\tJim"];
    output = parser(input);
    expect(output['Bob']['Completions']).to.equal(2);
  });

  it("parses stat: Completions (jagged array)", function() {
    input = [
      "Direction\t>>>>>>\tPOINT\tJill\tPass\tBob",
      "Direction\t>>>>>>\tPOINT\tJill\tPass\tBob\tPass\tJim\tPass\tBob\tPass\tJim"
    ];

    output = parser(input);
    expect(output['Bob']['Completions']).to.equal(3);
  });

  it("parses stat: Catches 1", function() {
    input = ["Direction\t>>>>>>\tPOINT\tJill\tPass\tBob"];
    output = parser(input);
    expect(output['Jill']['Catches']).to.equal(1);
  });

  it("parses stat: Catches 2", function() {
    input = ["Direction\t>>>>>>\tPOINT\tJill\tPass\tBob\tPass\tJill\tPass\tBob"];
    output = parser(input);
    expect(output['Jill']['Catches']).to.equal(2);
  });

  it("parses stat: Throwaways", function() {
    input = ["Direction\t>>>>>>\tThrow Away\tJill\tPass\tBob"];
    output = parser(input);
    expect(output['Jill']['Throwaways']).to.equal(1);
  });

  it("parses stat: ThrewDrop & Drop", function() {
    input = ["Direction\t>>>>>>\tDrop\tJill\tPass\tBob"];
    output = parser(input);
    expect(output['Bob']['ThrewDrop']).to.equal(1);
    expect(output['Jill']['Drops']).to.equal(1);
  });

  it("parses stat: Callahan", function() {
    input = ["Direction\t>>>>>>\tPOINT\tJill"];
    output = parser(input);
    expect(output['Jill']['Goals']).to.equal(1);
    expect(output['Jill']['Calihan']).to.equal(1);
  });

  it("parses stat: OPointsFor", function() {
    input = ["Direction\t<<<<<<\tPOINT\tJill", "O+\tJill\tD-\tJane"];
    output = parser(input);
    expect(output['Jill']['OPointsFor']).to.equal(1);
  });

  it("parses stat: DPointsAgainst", function() {
    input = ["Direction\t<<<<<<\tPOINT\tJill", "O+\tJill\tD-\tJane"];
    output = parser(input);
    expect(output['Jane']['DPointsAgainst']).to.equal(1);
  });

  it("parses stat: OPointsAgainst", function() {
    input = [
      "Direction\t<<<<<<\tDrop\tJill\tPass\tBob",
      "Direction\t>>>>>>\tPOINT\tMike\tPass\tJane",
      "O-\tJill\tD+\tMike",
      "O-\tBob\tD+\tJane"
    ];

    output = parser(input);
    expect(output['Bob']['OPointsAgainst']).to.equal(1);
    expect(output['Jill']['OPointsAgainst']).to.equal(1);
  });

  it("parses stat: DPointsFor", function() {
    input = [
      "Direction\t<<<<<<\tDrop\tJill\tPass\tBob",
      "Direction\t>>>>>>\tPOINT\tMike\tPass\tJane",
      "O-\tJill\tD+\tMike",
      "O-\tBob\tD+\tJane"
    ];

    output = parser(input);
    expect(output['Jane']['DPointsFor']).to.equal(1);
    expect(output['Mike']['DPointsFor']).to.equal(1);
  });

  it("parses test game A", function() {
    input = [
      "Pull\tMike",
      "Direction\t<<<<<<\tDrop\tJill\tPass\tBob",
      "Direction\t>>>>>>\tPOINT\tMike\tPass\tJane",
      "O-\tJill\tD+\tMike",
      "O-\tBob\tD+\tJane",
      "Direction\t<<<<<<\tPOINT\tJill\tPass\tBob\tJill",
      "O+\tJill\tD-\tMike",
      "O+\tBob\tD-\tJane",
      "Direction\t>>>>>>\tThrow Away\tJane"
    ];

    output = parser(input);

    expect(output['Jane']['DPointsFor']).to.equal(1);
    expect(output['Mike']['DPointsFor']).to.equal(1);
    expect(output['Jane']['DPointsAgainst']).to.equal(1);
    expect(output['Mike']['DPointsAgainst']).to.equal(1);

    expect(output['Bob']['OPointsAgainst']).to.equal(1);
    expect(output['Jill']['OPointsAgainst']).to.equal(1);
    expect(output['Bob']['OPointsFor']).to.equal(1);
    expect(output['Jill']['OPointsFor']).to.equal(1);

    expect(output['Mike']['Goals']).to.equal(1);
    expect(output['Jill']['Goals']).to.equal(1);

    expect(output['Jane']['Assists']).to.equal(1);
    expect(output['Bob']['Assists']).to.equal(1);

    expect(output['Jane']['Throwaways']).to.equal(1);
    expect(output['Mike']['Pulls']).to.equal(1);
    expect(output['Jill']['Drops']).to.equal(1);
  });

  it("extra spaces are ignored", function() {
    input = ["    Direction\t>>>>>>\tPOINT\tJill"];
    output = parser(input);
    expect(output['Jill']['Goals']).to.equal(1);
  });
});
