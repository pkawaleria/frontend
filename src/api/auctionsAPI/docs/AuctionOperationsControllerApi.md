# OpenApiDefinition.AuctionOperationsControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**accept**](AuctionOperationsControllerApi.md#accept) | **POST** /auction-service/auctions/{auctionId}/operations/accept | 
[**archive**](AuctionOperationsControllerApi.md#archive) | **POST** /auction-service/auctions/{auctionId}/operations/archive | 
[**reject**](AuctionOperationsControllerApi.md#reject) | **POST** /auction-service/auctions/{auctionId}/operations/reject | 



## accept

> Object accept(auctionId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.AuctionOperationsControllerApi();
let auctionId = "auctionId_example"; // String | 
apiInstance.accept(auctionId, (error, data, response) => {
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


## archive

> Object archive(auctionId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.AuctionOperationsControllerApi();
let auctionId = "auctionId_example"; // String | 
apiInstance.archive(auctionId, (error, data, response) => {
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


## reject

> Object reject(auctionId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.AuctionOperationsControllerApi();
let auctionId = "auctionId_example"; // String | 
apiInstance.reject(auctionId, (error, data, response) => {
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

