<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(title="My API", version="1.0")
 */

abstract class Controller
{
    //MESSAGES
    public const SUCCESS_MESSAGE = 'Request processed successfully';
    public const FAILED_MESSAGE = 'Unable to process the request. Please try again!';
    public const EXCEPTION_MESSAGE = "Exception occured. Please try again!";
    public const INVALID_CREDENTIALS = 'Unable to process the Login Request due to invalid credentials';
    public const USER_NOT_FOUND = 'User request not found';
    public const USER_LOGGED_OUT = 'User logged out successfully';
    public const DELETED_SUCCESS = 'Deleted successfully';
    public const DELETED_FAILED = 'Unable to delete. Please try again';

    public const PRODUCT_NOT_FOUND = 'Product not found';
    public const CART_NOT_FOUND = 'Cart not found';
    public const ORDER_NOT_FOUND = 'Order not found';
    public const ADDRESS_NOT_FOUND = 'Address not found';
    public const CATEGORY_NOT_FOUND = 'Category not found';
    public const SUBCATEGORY_NOT_FOUND = 'Subcategory not found';
    public const BRAND_NOT_FOUND = 'Brand not found';
    public const COUPON_NOT_FOUND = 'Coupon not found';
    public const WISHLIST_NOT_FOUND = 'Wishlist not found';
    public const REVIEW_NOT_FOUND = 'Review not found';
    public const INVALID_OTP = 'The provided OTP is invalid';
    public const OTP_EXPIRED = 'The provided OTP has expired';
    public const OTP_SENT = 'OTP sent successfully';

    public const VALIDATION_ERROR_MESSAGE = 'The given data was invalid.';
    public const UNAUTHORIZED_MESSAGE = 'You are not authorized to access this resource';
    public const FORBIDDEN_MESSAGE = 'You do not have permission to access this resource';
    public const NOT_FOUND_MESSAGE = 'The requested resource was not found';
    public const METHOD_NOT_ALLOWED_MESSAGE = 'The specified request method is not allowed';
    public const TOO_MANY_REQUESTS_MESSAGE = 'Too many requests. Please try again later.';
    public const SERVER_ERROR_MESSAGE = 'The server encountered an error. Please try again later.';
    public const SERVICE_UNAVAILABLE_MESSAGE = 'The service is currently unavailable. Please try again later.';
    public const EXTERNAL_SERVICE_ERROR_MESSAGE = 'An error occurred while communicating with an external service. Please try again later.';
    public const RESOURCE_CREATED = 'Resource created successfully';
    public const RESOURCE_UPDATED = 'Resource updated successfully';
    public const RESOURCE_DELETED = 'Resource deleted successfully';
    public const NO_CONTENT = 'No content available';
    public const UNPROCESSABLE_ENTITY = 'The request was well-formed but was unable to be followed due to semantic errors';
    public const CONFLICT = 'The request could not be completed due to a conflict with the current state of the resource';
    public const PRECONDITION_FAILED = 'One or more conditions given in the request header fields evaluated to false';
    public const REQUEST_TIMEOUT = 'The server timed out waiting for the request';
    public const GONE = 'The requested resource is no longer available at the server and no forwarding address is known';
    public const LENGTH_REQUIRED = 'The request did not specify the length of its content, which is required by the requested resource';
    public const PAYLOAD_TOO_LARGE = 'The request is larger than the server is willing or able to process';
    public const URI_TOO_LONG = 'The URI provided was too long for the server to process';
    public const UNSUPPORTED_MEDIA_TYPE = 'The request entity has a media type which the server or resource does not support';
    public const RANGE_NOT_SATISFIABLE = 'The client has asked for a portion of the file, but the server cannot supply that portion';
    public const EXPECTATION_FAILED = 'The server cannot meet the requirements of the Expect request-header field';
    

    //  STATUS KEYWORD
    public const SUCCESS_STATUS = 'success';
    public const ERROR_STATUS = 'error';

    // STATUS CODE 
    public const SUCCESS = 200;
    public const CREATED = 201;
    public const ERROR = 500;
    public const VALIDATION_ERROR = 422;
}
