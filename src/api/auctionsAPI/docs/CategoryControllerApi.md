# OpenApiDefinition.CategoryControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**callDelete**](CategoryControllerApi.md#callDelete) | **DELETE** /auction-service/categories/{categoryId} | 
[**create**](CategoryControllerApi.md#create) | **POST** /auction-service/categories | 
[**get**](CategoryControllerApi.md#get) | **GET** /auction-service/categories/{categoryId} | 
[**getLowLevelCategories**](CategoryControllerApi.md#getLowLevelCategories) | **GET** /auction-service/categories/endpoints | Retrieves the categories that are allowed to be assigned to auctions (some categories are to general to be assigned to auction)
[**getPath**](CategoryControllerApi.md#getPath) | **GET** /auction-service/categories/{categoryId}/path | 
[**getTopLevelCategories**](CategoryControllerApi.md#getTopLevelCategories) | **GET** /auction-service/categories/entrypoints | Retrieves top level categories which are roots (does not have parents)
[**search**](CategoryControllerApi.md#search) | **GET** /auction-service/categories/search | 



## callDelete

> Object callDelete(categoryId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.CategoryControllerApi();
let categoryId = "categoryId_example"; // String | 
apiInstance.callDelete(categoryId, (error, data, response) => {
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
 **categoryId** | **String**|  | 

### Return type

**Object**

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## create

> CategoryResponse create(categoryCreateRequest)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.CategoryControllerApi();
let categoryCreateRequest = new OpenApiDefinition.CategoryCreateRequest(); // CategoryCreateRequest | 
apiInstance.create(categoryCreateRequest, (error, data, response) => {
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
 **categoryCreateRequest** | [**CategoryCreateRequest**](CategoryCreateRequest.md)|  | 

### Return type

[**CategoryResponse**](CategoryResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## get

> CategoryResponse get(categoryId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.CategoryControllerApi();
let categoryId = "categoryId_example"; // String | 
apiInstance.get(categoryId, (error, data, response) => {
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
 **categoryId** | **String**|  | 

### Return type

[**CategoryResponse**](CategoryResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getLowLevelCategories

> [CategoryResponse] getLowLevelCategories()

Retrieves the categories that are allowed to be assigned to auctions (some categories are to general to be assigned to auction)

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.CategoryControllerApi();
apiInstance.getLowLevelCategories((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[CategoryResponse]**](CategoryResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getPath

> CategoryPathResponse getPath(categoryId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.CategoryControllerApi();
let categoryId = "categoryId_example"; // String | 
apiInstance.getPath(categoryId, (error, data, response) => {
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
 **categoryId** | **String**|  | 

### Return type

[**CategoryPathResponse**](CategoryPathResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getTopLevelCategories

> [CategoryResponse] getTopLevelCategories()

Retrieves top level categories which are roots (does not have parents)

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.CategoryControllerApi();
apiInstance.getTopLevelCategories((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[CategoryResponse]**](CategoryResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## search

> [CategorySearchResponse] search(phraseInName)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.CategoryControllerApi();
let phraseInName = "phraseInName_example"; // String | 
apiInstance.search(phraseInName, (error, data, response) => {
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
 **phraseInName** | **String**|  | 

### Return type

[**[CategorySearchResponse]**](CategorySearchResponse.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

