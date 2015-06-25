/*jshint -W079 */
var should = require('chai').should();
var expect = require('chai').expect;
var Class = require('./Class');

describe('#Class', function() {
    'use strict';
    it('class exists', function() {
        Class.should.be.exists;
    });
});