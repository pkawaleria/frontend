/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.OpenApiDefinition);
  }
}(this, function(expect, OpenApiDefinition) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new OpenApiDefinition.CreateAuctionRequest();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('CreateAuctionRequest', function() {
    it('should create an instance of CreateAuctionRequest', function() {
      // uncomment below and update the code to test CreateAuctionRequest
      //var instance = new OpenApiDefinition.CreateAuctionRequest();
      //expect(instance).to.be.a(OpenApiDefinition.CreateAuctionRequest);
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instance = new OpenApiDefinition.CreateAuctionRequest();
      //expect(instance).to.be();
    });

    it('should have the property description (base name: "description")', function() {
      // uncomment below and update the code to test the property description
      //var instance = new OpenApiDefinition.CreateAuctionRequest();
      //expect(instance).to.be();
    });

    it('should have the property price (base name: "price")', function() {
      // uncomment below and update the code to test the property price
      //var instance = new OpenApiDefinition.CreateAuctionRequest();
      //expect(instance).to.be();
    });

    it('should have the property categoryId (base name: "categoryId")', function() {
      // uncomment below and update the code to test the property categoryId
      //var instance = new OpenApiDefinition.CreateAuctionRequest();
      //expect(instance).to.be();
    });

    it('should have the property productCondition (base name: "productCondition")', function() {
      // uncomment below and update the code to test the property productCondition
      //var instance = new OpenApiDefinition.CreateAuctionRequest();
      //expect(instance).to.be();
    });

    it('should have the property cityId (base name: "cityId")', function() {
      // uncomment below and update the code to test the property cityId
      //var instance = new OpenApiDefinition.CreateAuctionRequest();
      //expect(instance).to.be();
    });

    it('should have the property cityName (base name: "cityName")', function() {
      // uncomment below and update the code to test the property cityName
      //var instance = new OpenApiDefinition.CreateAuctionRequest();
      //expect(instance).to.be();
    });

    it('should have the property location (base name: "location")', function() {
      // uncomment below and update the code to test the property location
      //var instance = new OpenApiDefinition.CreateAuctionRequest();
      //expect(instance).to.be();
    });

  });

}));
