# API Documentation

## Base URL
```
http://localhost:5000/api/v2
```

## Authentication

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "avatar": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "name": "string",
    "email": "string",
    "role": "user",
    "avatar": "string"
  },
  "token": "string"
}
```

### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "name": "string",
    "email": "string",
    "role": "string",
    "avatar": "string"
  },
  "token": "string"
}
```

### Logout User
```http
POST /auth/logout
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Products

### Get All Products
```http
GET /products
```

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `category`: string (optional)
- `search`: string (optional)
- `sort`: string (optional)
- `price`: string (optional)

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": number,
      "category": "string",
      "stock": number,
      "images": ["string"],
      "ratings": number,
      "numOfReviews": number,
      "reviews": [
        {
          "user": "string",
          "name": "string",
          "rating": number,
          "comment": "string"
        }
      ]
    }
  ],
  "productCount": number,
  "resPerPage": number
}
```

### Get Single Product
```http
GET /products/:id
```

**Response:**
```json
{
  "success": true,
  "product": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": number,
    "category": "string",
    "stock": number,
    "images": ["string"],
    "ratings": number,
    "numOfReviews": number,
    "reviews": [
      {
        "user": "string",
        "name": "string",
        "rating": number,
        "comment": "string"
      }
    ]
  }
}
```

### Create Product (Admin Only)
```http
POST /products
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": number,
  "category": "string",
  "stock": number,
  "images": ["string"]
}
```

**Response:**
```json
{
  "success": true,
  "product": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": number,
    "category": "string",
    "stock": number,
    "images": ["string"]
  }
}
```

### Update Product (Admin Only)
```http
PUT /products/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": number,
  "category": "string",
  "stock": number,
  "images": ["string"]
}
```

**Response:**
```json
{
  "success": true,
  "product": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": number,
    "category": "string",
    "stock": number,
    "images": ["string"]
  }
}
```

### Delete Product (Admin Only)
```http
DELETE /products/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

## Orders

### Create Order
```http
POST /orders
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "orderItems": [
    {
      "product": "string",
      "name": "string",
      "price": number,
      "image": "string",
      "quantity": number
    }
  ],
  "shippingInfo": {
    "address": "string",
    "city": "string",
    "phoneNo": "string",
    "postalCode": "string",
    "country": "string"
  },
  "paymentInfo": {
    "id": "string",
    "status": "string",
    "type": "string"
  },
  "itemsPrice": number,
  "taxAmount": number,
  "shippingAmount": number,
  "totalAmount": number
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "string",
    "orderItems": [...],
    "shippingInfo": {...},
    "paymentInfo": {...},
    "itemsPrice": number,
    "taxAmount": number,
    "shippingAmount": number,
    "totalAmount": number,
    "orderStatus": "string",
    "createdAt": "string"
  }
}
```

### Get User Orders
```http
GET /orders/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "id": "string",
      "orderItems": [...],
      "shippingInfo": {...},
      "paymentInfo": {...},
      "itemsPrice": number,
      "taxAmount": number,
      "shippingAmount": number,
      "totalAmount": number,
      "orderStatus": "string",
      "createdAt": "string"
    }
  ]
}
```

### Get Single Order
```http
GET /orders/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "string",
    "orderItems": [...],
    "shippingInfo": {...},
    "paymentInfo": {...},
    "itemsPrice": number,
    "taxAmount": number,
    "shippingAmount": number,
    "totalAmount": number,
    "orderStatus": "string",
    "createdAt": "string"
  }
}
```

### Update Order Status (Admin Only)
```http
PUT /orders/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "orderStatus": "string"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "string",
    "orderStatus": "string"
  }
}
```

## Payment

### Initiate M-Pesa Payment
```http
POST /payment/initiate
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amount": number,
  "phone": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "CheckoutRequestID": "string",
    "MerchantRequestID": "string"
  }
}
```

### M-Pesa Payment Callback
```http
POST /payment/callback
```

**Request Body:**
```json
{
  "Body": {
    "stkCallback": {
      "MerchantRequestID": "string",
      "CheckoutRequestID": "string",
      "ResultCode": number,
      "ResultDesc": "string",
      "CallbackMetadata": {
        "Item": [
          {
            "Name": "string",
            "Value": "string"
          }
        ]
      }
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment processed successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
``` 