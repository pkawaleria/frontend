# OpenApiDefinition.AuctionCrudControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addAuction**](AuctionCrudControllerApi.md#addAuction) | **POST** /auction-service/auctions | 
[**changeCategory**](AuctionCrudControllerApi.md#changeCategory) | **PUT** /auction-service/auctions/{auctionId}/categories/{categoryId} | 
[**deleteAuction**](AuctionCrudControllerApi.md#deleteAuction) | **DELETE** /auction-service/auctions/{auctionId} | 
[**getAuction**](AuctionCrudControllerApi.md#getAuction) | **GET** /auction-service/auctions/{auctionId} | 
[**getAuctions**](AuctionCrudControllerApi.md#getAuctions) | **GET** /auction-service/users/{userId}/auctions | 
[**searchAuctions**](AuctionCrudControllerApi.md#searchAuctions) | **GET** /auction-service/auctions/search | 
[**updateAuction**](AuctionCrudControllerApi.md#updateAuction) | **PUT** /auction-service/auctions/{auctionId} | 



## addAuction

> AuctionDetailedResponse addAuction(createAuctionRequest)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.AuctionCrudControllerApi();
let createAuctionRequest = new OpenApiDefinition.CreateAuctionRequest(); // CreateAuctionRequest | 
apiInstance.addAuction(createAuctionRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createAuctionRequest** | [**CreateAuctionRequest**](CreateAuctionRequest.md)|  | 

### Return type

[**AuctionDetailedResponse**](AuctionDetailedResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## changeCategory

> AuctionDetailedResponse changeCategory(auctionId, categoryId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.AuctionCrudControllerApi();
let auctionId = "auctionId_example"; // String | 
let categoryId = "categoryId_example"; // String | 
apiInstance.changeCategory(auctionId, categoryId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **auctionId** | **String**|  | 
 **categoryId** | **String**|  | 

### Return type

[**AuctionDetailedResponse**](AuctionDetailedResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## deleteAuction

> Object deleteAuction(auctionId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.AuctionCrudControllerApi();
let auctionId = "auctionId_example"; // String | 
apiInstance.deleteAuction(auctionId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **auctionId** | **String**|  | 

### Return type

**Object**

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getAuction

> AuctionDetailedResponse getAuction(auctionId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.AuctionCrudControllerApi();
let auctionId = "auctionId_example"; // String | 
apiInstance.getAuction(auctionId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **auctionId** | **String**|  | 

### Return type

[**AuctionDetailedResponse**](AuctionDetailedResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getAuctions

> [AuctionSimplifiedResponse] getAuctions(userId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.AuctionCrudControllerApi();
let userId = "userId_example"; // String | 
apiInstance.getAuctions(userId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**|  | 

### Return type

[**[AuctionSimplifiedResponse]**](AuctionSimplifiedResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## searchAuctions

> PagedAuctions searchAuctions(opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.AuctionCrudControllerApi();
let opts = {
  'page': 0, // Number | 
  'pageSize': 10, // Number | 
  'searchPhrase': "searchPhrase_example", // String | 
  'category': "category_example", // String | 
  'cityId': "cityId_example", // String | 
  'radius': 3.4 // Number | 
};
apiInstance.searchAuctions(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] [default to 0]
 **pageSize** | **Number**|  | [optional] [default to 10]
 **searchPhrase** | **String**|  | [optional] 
 **category** | **String**|  | [optional] 
 **cityId** | **String**|  | [optional] 
 **radius** | **Number**|  | [optional] 

### Return type

[**PagedAuctions**](PagedAuctions.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## updateAuction

> AuctionDetailedResponse updateAuction(auctionId, updateAuctionRequest)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.AuctionCrudControllerApi();
let auctionId = "auctionId_example"; // String | 
let updateAuctionRequest = new OpenApiDefinition.UpdateAuctionRequest(); // UpdateAuctionRequest | 
apiInstance.updateAuction(auctionId, updateAuctionRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **auctionId** | **String**|  | 
 **updateAuctionRequest** | [**UpdateAuctionRequest**](UpdateAuctionRequest.md)|  | 

### Return type

[**AuctionDetailedResponse**](AuctionDetailedResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

