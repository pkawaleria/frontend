# OpenApiDefinition.ImageControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addImages**](ImageControllerApi.md#addImages) | **POST** /auction-service/auctions/{auctionId}/images | 
[**deleteImage**](ImageControllerApi.md#deleteImage) | **DELETE** /auction-service/auctions/{auctionId}/images/{imageId} | 
[**getImage**](ImageControllerApi.md#getImage) | **GET** /auction-service/auctions/{auctionId}/images/{imageId} | 
[**getImages**](ImageControllerApi.md#getImages) | **GET** /auction-service/auctions/{auctionId}/images | 



## addImages

> [ImageDetailedResponse] addImages(auctionId, files)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.ImageControllerApi();
let auctionId = "auctionId_example"; // String | 
let files = ["null"]; // [File] | 
apiInstance.addImages(auctionId, files, (error, data, response) => {
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
 **files** | **[File]**|  | 

### Return type

[**[ImageDetailedResponse]**](ImageDetailedResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*


## deleteImage

> Object deleteImage(auctionId, imageId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.ImageControllerApi();
let auctionId = "auctionId_example"; // String | 
let imageId = "imageId_example"; // String | 
apiInstance.deleteImage(auctionId, imageId, (error, data, response) => {
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
 **imageId** | **String**|  | 

### Return type

**Object**

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getImage

> Blob getImage(auctionId, imageId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.ImageControllerApi();
let auctionId = "auctionId_example"; // String | 
let imageId = "imageId_example"; // String | 
apiInstance.getImage(auctionId, imageId, (error, data, response) => {
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
 **imageId** | **String**|  | 

### Return type

**Blob**

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getImages

> AuctionImagesResponse getImages(auctionId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.ImageControllerApi();
let auctionId = "auctionId_example"; // String | 
apiInstance.getImages(auctionId, (error, data, response) => {
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

[**AuctionImagesResponse**](AuctionImagesResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

