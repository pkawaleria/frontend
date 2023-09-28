# OpenApiDefinition.LoggedInAuctioneerControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getActiveAuctions**](LoggedInAuctioneerControllerApi.md#getActiveAuctions) | **GET** /auction-service/active-auctioneer/active-auctions | 
[**getArchivedAuctions**](LoggedInAuctioneerControllerApi.md#getArchivedAuctions) | **GET** /auction-service/active-auctioneer/archived-auctions | 
[**getAwaitingAuctions**](LoggedInAuctioneerControllerApi.md#getAwaitingAuctions) | **GET** /auction-service/active-auctioneer/awaiting-auctions | 
[**getExpiredAuctions**](LoggedInAuctioneerControllerApi.md#getExpiredAuctions) | **GET** /auction-service/active-auctioneer/expired-auctions | 
[**getRejectedAuctions**](LoggedInAuctioneerControllerApi.md#getRejectedAuctions) | **GET** /auction-service/active-auctioneer/rejected-auctions | 



## getActiveAuctions

> PagedAuctions getActiveAuctions(opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.LoggedInAuctioneerControllerApi();
let opts = {
  'page': 0, // Number | 
  'pageSize': 10 // Number | 
};
apiInstance.getActiveAuctions(opts, (error, data, response) => {
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

### Return type

[**PagedAuctions**](PagedAuctions.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getArchivedAuctions

> PagedAuctions getArchivedAuctions(opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.LoggedInAuctioneerControllerApi();
let opts = {
  'page': 0, // Number | 
  'pageSize': 10 // Number | 
};
apiInstance.getArchivedAuctions(opts, (error, data, response) => {
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

### Return type

[**PagedAuctions**](PagedAuctions.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getAwaitingAuctions

> PagedAuctions getAwaitingAuctions(opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.LoggedInAuctioneerControllerApi();
let opts = {
  'page': 0, // Number | 
  'pageSize': 10 // Number | 
};
apiInstance.getAwaitingAuctions(opts, (error, data, response) => {
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

### Return type

[**PagedAuctions**](PagedAuctions.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getExpiredAuctions

> PagedAuctions getExpiredAuctions(opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.LoggedInAuctioneerControllerApi();
let opts = {
  'page': 0, // Number | 
  'pageSize': 10 // Number | 
};
apiInstance.getExpiredAuctions(opts, (error, data, response) => {
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

### Return type

[**PagedAuctions**](PagedAuctions.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getRejectedAuctions

> PagedAuctions getRejectedAuctions(opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuthentication
let BearerAuthentication = defaultClient.authentications['BearerAuthentication'];
BearerAuthentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.LoggedInAuctioneerControllerApi();
let opts = {
  'page': 0, // Number | 
  'pageSize': 10 // Number | 
};
apiInstance.getRejectedAuctions(opts, (error, data, response) => {
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

### Return type

[**PagedAuctions**](PagedAuctions.md)

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

