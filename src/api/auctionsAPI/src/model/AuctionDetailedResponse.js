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

import ApiClient from '../ApiClient';
import Category from './Category';
import GeoJsonPoint from './GeoJsonPoint';

/**
 * The AuctionDetailedResponse model module.
 * @module model/AuctionDetailedResponse
 * @version v0
 */
class AuctionDetailedResponse {
    /**
     * Constructs a new <code>AuctionDetailedResponse</code>.
     * @alias module:model/AuctionDetailedResponse
     * @param id {String} 
     * @param name {String} 
     * @param description {String} 
     * @param price {Number} 
     * @param auctioneerId {String} 
     * @param thumbnail {Blob} 
     * @param category {module:model/Category} 
     * @param productCondition {module:model/AuctionDetailedResponse.ProductConditionEnum} 
     * @param cityId {String} 
     * @param cityName {String} 
     * @param location {module:model/GeoJsonPoint} 
     */
    constructor(id, name, description, price, auctioneerId, thumbnail, category, productCondition, cityId, cityName, location) { 
        
        AuctionDetailedResponse.initialize(this, id, name, description, price, auctioneerId, thumbnail, category, productCondition, cityId, cityName, location);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, name, description, price, auctioneerId, thumbnail, category, productCondition, cityId, cityName, location) { 
        obj['id'] = id;
        obj['name'] = name;
        obj['description'] = description;
        obj['price'] = price;
        obj['auctioneerId'] = auctioneerId;
        obj['thumbnail'] = thumbnail;
        obj['category'] = category;
        obj['productCondition'] = productCondition;
        obj['cityId'] = cityId;
        obj['cityName'] = cityName;
        obj['location'] = location;
    }

    /**
     * Constructs a <code>AuctionDetailedResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AuctionDetailedResponse} obj Optional instance to populate.
     * @return {module:model/AuctionDetailedResponse} The populated <code>AuctionDetailedResponse</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AuctionDetailedResponse();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('price')) {
                obj['price'] = ApiClient.convertToType(data['price'], 'Number');
            }
            if (data.hasOwnProperty('auctioneerId')) {
                obj['auctioneerId'] = ApiClient.convertToType(data['auctioneerId'], 'String');
            }
            if (data.hasOwnProperty('thumbnail')) {
                obj['thumbnail'] = ApiClient.convertToType(data['thumbnail'], 'Blob');
            }
            if (data.hasOwnProperty('category')) {
                obj['category'] = Category.constructFromObject(data['category']);
            }
            if (data.hasOwnProperty('productCondition')) {
                obj['productCondition'] = ApiClient.convertToType(data['productCondition'], 'String');
            }
            if (data.hasOwnProperty('cityId')) {
                obj['cityId'] = ApiClient.convertToType(data['cityId'], 'String');
            }
            if (data.hasOwnProperty('cityName')) {
                obj['cityName'] = ApiClient.convertToType(data['cityName'], 'String');
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = GeoJsonPoint.constructFromObject(data['location']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AuctionDetailedResponse</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuctionDetailedResponse</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of AuctionDetailedResponse.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is a string
        if (data['auctioneerId'] && !(typeof data['auctioneerId'] === 'string' || data['auctioneerId'] instanceof String)) {
            throw new Error("Expected the field `auctioneerId` to be a primitive type in the JSON string but got " + data['auctioneerId']);
        }
        // validate the optional field `category`
        if (data['category']) { // data not null
          Category.validateJSON(data['category']);
        }
        // ensure the json data is a string
        if (data['productCondition'] && !(typeof data['productCondition'] === 'string' || data['productCondition'] instanceof String)) {
            throw new Error("Expected the field `productCondition` to be a primitive type in the JSON string but got " + data['productCondition']);
        }
        // ensure the json data is a string
        if (data['cityId'] && !(typeof data['cityId'] === 'string' || data['cityId'] instanceof String)) {
            throw new Error("Expected the field `cityId` to be a primitive type in the JSON string but got " + data['cityId']);
        }
        // ensure the json data is a string
        if (data['cityName'] && !(typeof data['cityName'] === 'string' || data['cityName'] instanceof String)) {
            throw new Error("Expected the field `cityName` to be a primitive type in the JSON string but got " + data['cityName']);
        }
        // validate the optional field `location`
        if (data['location']) { // data not null
          GeoJsonPoint.validateJSON(data['location']);
        }

        return true;
    }


}

AuctionDetailedResponse.RequiredProperties = ["id", "name", "description", "price", "auctioneerId", "thumbnail", "category", "productCondition", "cityId", "cityName", "location"];

/**
 * @member {String} id
 */
AuctionDetailedResponse.prototype['id'] = undefined;

/**
 * @member {String} name
 */
AuctionDetailedResponse.prototype['name'] = undefined;

/**
 * @member {String} description
 */
AuctionDetailedResponse.prototype['description'] = undefined;

/**
 * @member {Number} price
 */
AuctionDetailedResponse.prototype['price'] = undefined;

/**
 * @member {String} auctioneerId
 */
AuctionDetailedResponse.prototype['auctioneerId'] = undefined;

/**
 * @member {Blob} thumbnail
 */
AuctionDetailedResponse.prototype['thumbnail'] = undefined;

/**
 * @member {module:model/Category} category
 */
AuctionDetailedResponse.prototype['category'] = undefined;

/**
 * @member {module:model/AuctionDetailedResponse.ProductConditionEnum} productCondition
 */
AuctionDetailedResponse.prototype['productCondition'] = undefined;

/**
 * @member {String} cityId
 */
AuctionDetailedResponse.prototype['cityId'] = undefined;

/**
 * @member {String} cityName
 */
AuctionDetailedResponse.prototype['cityName'] = undefined;

/**
 * @member {module:model/GeoJsonPoint} location
 */
AuctionDetailedResponse.prototype['location'] = undefined;





/**
 * Allowed values for the <code>productCondition</code> property.
 * @enum {String}
 * @readonly
 */
AuctionDetailedResponse['ProductConditionEnum'] = {

    /**
     * value: "NEW"
     * @const
     */
    "NEW": "NEW",

    /**
     * value: "NOT_APPLICABLE"
     * @const
     */
    "NOT_APPLICABLE": "NOT_APPLICABLE",

    /**
     * value: "USED"
     * @const
     */
    "USED": "USED"
};



export default AuctionDetailedResponse;

