# 🛡️ AMAT Admin Dashboard API Documentation

**Base URL:** `/api/admin/`

All admin endpoints (except login & token refresh) require **JWT Authentication** via the `Authorization: Bearer <token>` header and the user must have a role of `admin` or `superadmin`.

---

## 📑 Table of Contents

1. [Authentication](#1-authentication)
2. [Brands](#2-brands)
3. [Categories](#3-categories)
4. [Products](#4-products)
5. [Orders](#5-orders)
6. [Customers](#6-customers)
7. [Reviews](#7-reviews)
8. [Coupons](#8-coupons)
9. [Inventory](#9-inventory)
10. [Analytics / Dashboard](#10-analytics--dashboard)
11. [System Settings](#11-system-settings)
12. [Quick Reference Table](#-endpoint-quick-reference)
13. [Authorization Summary](#-authorization-summary)

---

## 🔐 1. Authentication

---

### `POST /api/admin/auth/login/`

**Permission:** `AllowAny`

Admin login with email & password. Returns JWT access & refresh tokens.

#### Request Body

| Field      | Type   | Required | Constraints                       |
|------------|--------|----------|-----------------------------------|
| `email`    | string | ✅ Yes   | Valid email, auto-lowered & stripped |
| `password` | string | ✅ Yes   | Min 6 characters                  |

#### Success Response `200 OK`

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": "uuid...",
      "email": "admin@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "role": "admin",
      "is_active": true,
      "date_joined": "2025-01-01T00:00:00Z",
      "last_login": "2026-07-29T10:00:00Z"
    },
    "tokens": {
      "access_token": "eyJ...",
      "refresh_token": "eyJ..."
    }
  }
}
```

#### Validation Errors (`400`)

| Error Condition                | Code                        |
|--------------------------------|-----------------------------|
| No admin account found         | `ADMIN_AUTH_VALIDATION_ERROR` |
| Invalid password               | `ADMIN_AUTH_VALIDATION_ERROR` |
| Account deactivated            | `ADMIN_AUTH_VALIDATION_ERROR` |

---

### `GET /api/admin/auth/profile/`

**Permission:** `IsAuthenticated` + Admin role

Returns the profile of the currently authenticated admin user.

#### Response `200 OK`

```json
{
  "success": true,
  "message": "Profile retrieved successfully.",
  "data": {
    "id": "uuid...",
    "email": "admin@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "admin",
    "is_active": true,
    "date_joined": "2025-01-01T00:00:00Z",
    "last_login": "2026-07-29T10:00:00Z"
  }
}
```

#### Error Responses

| Status | Code         | Condition                      |
|--------|--------------|--------------------------------|
| 401    | `UNAUTHORIZED` | Authentication required        |
| 403    | `FORBIDDEN`    | Admin access required          |

---

### `POST /api/admin/auth/refresh/`

**Permission:** `AllowAny`

Refresh expired access token using a valid refresh token.

#### Request Body

| Field            | Type   | Required |
|------------------|--------|----------|
| `refresh_token`  | string | ✅ Yes   |

#### Success Response `200 OK`

```json
{
  "success": true,
  "message": "Token refreshed successfully.",
  "data": {
    "access_token": "eyJ...",
    "refresh_token": "eyJ..."
  }
}
```

#### Error Responses

| Status | Message                              |
|--------|--------------------------------------|
| 400    | Refresh token is required            |
| 401    | Invalid or non-refresh token         |
| 401    | Invalid token payload                |
| 403    | Admin access required                |
| 404    | User not found                       |
| 500    | Internal server error                |

---

## 🏷️ 2. Brands

---

### `GET /api/admin/brands/`

**Permission:** Admin only

List all brands.

#### Query Parameters

| Param    | Type   | Description                              |
|----------|--------|------------------------------------------|
| `search` | string | Filter by name (case-insensitive contains) |

#### Response Fields (per brand)

| Field            | Type       | Notes              |
|------------------|------------|--------------------|
| `id`             | int        |                    |
| `name`           | string     |                    |
| `slug`           | string     | Auto-generated     |
| `description`    | string     |                    |
| `website`        | URL        |                    |
| `products_count` | int        | Computed           |
| `created_at`     | datetime   |                    |
| `updated_at`     | datetime   |                    |

---

### `POST /api/admin/brands/`

**Permission:** Admin only

Create a new brand.

#### Request Body

| Field         | Type   | Required |
|---------------|--------|----------|
| `name`        | string | ✅ Yes   |
| `description` | string | ❌ No    |
| `website`     | URL    | ❌ No    |

#### Response `201 Created`

```json
{
  "success": true,
  "message": "Brand created successfully.",
  "data": { "id": 1, "name": "Nestlé", "slug": "nestle", "description": "", "website": "", "products_count": 0, "created_at": "...", "updated_at": "..." }
}
```

---

### `GET /api/admin/brands/<int:pk>/`

**Permission:** Admin only

Retrieve a single brand by ID.

---

### `PATCH /api/admin/brands/<int:pk>/`

**Permission:** Admin only

Partially update a brand.

---

### `DELETE /api/admin/brands/<int:pk>/`

**Permission:** Admin only

Delete a brand.

#### Response `200 OK`

```json
{
  "success": true,
  "message": "Brand deleted successfully."
}
```

---

## 📂 3. Categories

---

### `GET /api/admin/categories/`

**Permission:** Admin only

List all categories.

#### Query Parameters

| Param    | Type   | Description                              |
|----------|--------|------------------------------------------|
| `search` | string | Filter by name (case-insensitive contains) |

#### Response Fields

| Field            | Type         | Notes          |
|------------------|--------------|----------------|
| `id`             | int          |                |
| `documentId`     | string       | Unique ID      |
| `name`           | string       |                |
| `slug`           | string       | Auto-generated |
| `description`    | string       |                |
| `parent`         | int / null   | Parent ID      |
| `parent_name`    | string / null| Computed       |
| `image`          | URL / null   |                |
| `image_alt`      | string       |                |
| `products_count` | int          | Computed       |
| `createdAt`      | datetime     |                |
| `updatedAt`      | datetime     |                |

---

### `POST /api/admin/categories/`

**Permission:** Admin only

Create a new category.

#### Request Body

| Field         | Type   | Required | Constraints         |
|---------------|--------|----------|---------------------|
| `name`        | string | ✅ Yes   | Min 2, max 100 chars |
| `description` | string | ❌ No    |                     |
| `parent`      | int    | ❌ No    | Parent category ID  |
| `image`       | URL    | ❌ No    |                     |
| `image_alt`   | string | ❌ No    |                     |
| `colore`      | string | ❌ No    | Color code          |

---

### `GET /api/admin/categories/<int:pk>/`

**Permission:** Admin only

Retrieve a single category.

---

### `PATCH /api/admin/categories/<int:pk>/`

**Permission:** Admin only

Partially update a category.

---

### `DELETE /api/admin/categories/<int:pk>/`

**Permission:** Admin only

Delete a category.

---

## 📦 4. Products

---

### `GET /api/admin/products/`

**Permission:** Admin only

List all products (including inactive, draft, and archived).

#### Query Parameters

| Param         | Type   | Description                           |
|---------------|--------|---------------------------------------|
| `search`      | string | Filter by name or SKU (case-insensitive) |
| `category_id` | int    | Filter by category ID                 |
| `brand_id`    | int    | Filter by brand ID                    |
| `status`      | string | `active`, `draft`, or `archived`      |
| `is_featured` | bool   | `true` only                           |
| `low_stock`   | bool   | `true` → stock ≤ 10                   |

#### Response Fields (list view)

| Field              | Type          | Notes              |
|--------------------|---------------|--------------------|
| `id`               | int           |                    |
| `name`             | string        |                    |
| `slug`             | string        |                    |
| `mrp`              | decimal       |                    |
| `sellingPice`       | decimal       |                    |
| `discount_price`   | decimal / null|                    |
| `stock`            | int           |                    |
| `sku`              | string / null |                    |
| `ItemQuantityType` | string        | e.g., kg, piece    |
| `image`            | URL / null    |                    |
| `category_names`   | string[]      | Computed           |
| `brand_name`       | string / null | Computed           |
| `brand`            | int / null    | Brand ID           |
| `is_featured`      | bool          |                    |
| `status`           | string        | `active`, `draft`, `archived` |
| `is_active`        | bool          |                    |
| `createdAt`        | datetime      |                    |
| `updatedAt`        | datetime      |                    |

---

### `POST /api/admin/products/`

**Permission:** Admin only

Create a new product.

#### Request Body

| Field               | Type     | Required | Constraints             |
|---------------------|----------|----------|-------------------------|
| `name`              | string   | ✅ Yes   | Min 2, max 200 chars    |
| `description`       | string   | ❌ No    |                         |
| `short_description` | string   | ❌ No    | Max 500 chars           |
| `mrp`               | decimal  | ✅ Yes   |                         |
| `sellingPice`       | decimal  | ✅ Yes   | Must be > 0             |
| `discount_price`    | decimal  | ❌ No    |                         |
| `stock`             | int      | ❌ No    | Default 0, cannot be negative |
| `sku`               | string   | ❌ No    | Must be unique if provided |
| `ItemQuantityType`  | string   | ✅ Yes   |                         |
| `image`             | URL      | ❌ No    |                         |
| `image_alt`         | string   | ❌ No    |                         |
| `tags`              | string[] | ❌ No    | Array of strings        |
| `category_ids`      | int[]    | ❌ No    | List of category IDs    |
| `brand`             | int      | ❌ No    | Brand ID                |
| `is_featured`       | bool     | ❌ No    |                         |
| `status`            | string   | ❌ No    | `active`, `draft`, `archived` |
| `is_active`         | bool     | ❌ No    |                         |

---

### `GET /api/admin/products/<int:pk>/`

**Permission:** Admin only

Retrieve a single product with full detail.

#### Additional response fields

| Field        | Type          | Notes                      |
|--------------|---------------|----------------------------|
| `categories` | object[]      | `[{id, name}]`             |
| `brand`      | int / null    | Brand ID                   |

---

### `PATCH /api/admin/products/<int:pk>/`

**Permission:** Admin only

Partially update a product. Supports updating `category_ids` to change category associations.

---

### `DELETE /api/admin/products/<int:pk>/`

**Permission:** Admin only

Delete a product.

---

### `POST /api/admin/products/<int:pk>/duplicate/`

**Permission:** Admin only

Duplicate a product with modified fields:

- Name → `"{original} (Copy)"`
- Slug → new random slug
- SKU → cleared (`null`)
- Stock → `0`
- Status → `draft`
- Categories & brand preserved

#### Response `201 Created`

```json
{
  "success": true,
  "message": "Product duplicated successfully.",
  "data": { "...product data..." }
}
```

---

## 🛒 5. Orders

---

### `GET /api/admin/orders/`

**Permission:** Admin only

List all orders, ordered by `-created_at`.

#### Query Parameters

| Param       | Type   | Description                                |
|-------------|--------|--------------------------------------------|
| `status`    | string | Filter by status                           |
| `search`    | string | Search by `order_id`, email, first/last name |
| `date_from` | date   | `created_at >= date_from` (ISO format)      |
| `date_to`   | date   | `created_at <= date_to` (ISO format)        |

#### Response Fields

| Field            | Type       | Notes              |
|------------------|------------|--------------------|
| `id`             | int        |                    |
| `order_id`       | UUID       |                    |
| `customer_name`  | string     | Computed           |
| `customer_email` | string     |                    |
| `total_amount`   | decimal    |                    |
| `delivery_charge`| decimal    |                    |
| `status`         | string     | See statuses below |
| `items_count`    | int        | Computed           |
| `created_at`     | datetime   |                    |

#### Available Order Statuses

| Status       | Description |
|--------------|-------------|
| `pending`    | Pending     |
| `processing` | Processing  |
| `shipped`    | Shipped     |
| `delivered`  | Delivered   |
| `cancelled`  | Cancelled   |
| `refunded`   | Refunded    |

---

### `GET /api/admin/orders/<int:pk>/`

**Permission:** Admin only

Full order detail including items and customer info.

#### Additional Response Fields

| Field          | Type            | Notes                          |
|----------------|-----------------|--------------------------------|
| `items`        | object[]        | `[{id, product, product_name, product_image, product_price, quantity}]` |
| `customer`     | object          | `{id, email, name}`            |
| `address`      | string          |                                |
| `order_notes`  | string / null   |                                |
| `updated_at`   | datetime        |                                |

---

### `PATCH /api/admin/orders/<int:pk>/status/`

**Permission:** Admin only

Update order status.

#### Request Body

| Field    | Type   | Required | Allowed Values                                                   |
|----------|--------|----------|------------------------------------------------------------------|
| `status` | string | ✅ Yes   | `pending`, `processing`, `shipped`, `delivered`, `cancelled`, `refunded` |

#### Response `200 OK`

```json
{
  "success": true,
  "message": "Order status updated to 'Delivered'.",
  "data": {
    "id": 1,
    "status": "delivered"
  }
}
```

---

## 👥 6. Customers

---

### `GET /api/admin/customers/`

**Permission:** Admin only

List all customers (users with `role='user'`), ordered by `-date_joined`.

#### Query Parameters

| Param       | Type   | Description                              |
|-------------|--------|------------------------------------------|
| `search`    | string | Search by email, first_name, last_name   |
| `is_active` | bool   | `true` or `false`                        |

#### Response Fields

| Field           | Type       | Notes                                          |
|-----------------|------------|------------------------------------------------|
| `id`            | UUID       |                                                |
| `email`         | string     |                                                |
| `first_name`    | string     |                                                |
| `last_name`     | string     |                                                |
| `is_active`     | bool       |                                                |
| `is_verified`   | bool       |                                                |
| `total_orders`  | int        | Computed                                       |
| `total_spent`   | decimal    | Computed from delivered/shipped/processing orders |
| `date_joined`   | datetime   |                                                |
| `last_login`    | datetime   |                                                |

---

### `GET /api/admin/customers/<uuid:pk>/`

**Permission:** Admin only

Customer detail including recent orders.

#### Additional Response Fields

| Field           | Type       | Notes                        |
|-----------------|------------|------------------------------|
| `recent_orders` | object[]   | Last 5 orders `{id, total_amount, status, created_at}` |
| `role`          | string     |                              |

---

### `DELETE /api/admin/customers/<uuid:pk>/`

**Permission:** Admin only

Delete a customer (only if `role='user'`).

---

### `POST /api/admin/customers/<uuid:pk>/block/`

**Permission:** Admin only

Block a customer by setting `is_active = False`.

#### Responses

| Status | Message                          |
|--------|----------------------------------|
| 200    | Customer blocked successfully    |
| 200    | Customer is already blocked      |

---

### `POST /api/admin/customers/<uuid:pk>/unblock/`

**Permission:** Admin only

Unblock a customer by setting `is_active = True`.

#### Responses

| Status | Message                          |
|--------|----------------------------------|
| 200    | Customer unblocked successfully  |
| 200    | Customer is already active       |

---

## ⭐ 7. Reviews

---

### `GET /api/admin/reviews/`

**Permission:** Admin only

List all product reviews, ordered by `-created_at`.

#### Query Parameters

| Param        | Type   | Description                            |
|--------------|--------|----------------------------------------|
| `status`     | string | `pending`, `approved`, or `rejected`   |
| `product_id` | int    | Filter by product                      |
| `search`     | string | Search by comment or user email        |

#### Response Fields

| Field            | Type       | Notes                    |
|------------------|------------|--------------------------|
| `id`             | int        |                          |
| `product`        | int        | Product ID               |
| `product_name`   | string     |                          |
| `customer_email` | string     |                          |
| `customer_name`  | string     | Computed                 |
| `rating`         | int        | 1–5                      |
| `comment`        | string     |                          |
| `status`         | string     | `pending`, `approved`, `rejected` |
| `created_at`     | datetime   |                          |

---

### `POST /api/admin/reviews/<int:pk>/approve/`

**Permission:** Admin only

Approve a review by setting its status to `approved`.

#### Response `200 OK`

```json
{
  "success": true,
  "message": "Review approved successfully."
}
```

---

### `POST /api/admin/reviews/<int:pk>/reject/`

**Permission:** Admin only

Reject a review by setting its status to `rejected`.

```json
{
  "success": true,
  "message": "Review rejected successfully."
}
```

---

### `DELETE /api/admin/reviews/<int:pk>/`

**Permission:** Admin only

Permanently delete a review.

```json
{
  "success": true,
  "message": "Review deleted successfully."
}
```

---

## 🎫 8. Coupons

---

### `GET /api/admin/coupons/`

**Permission:** Admin only

List all coupons, ordered by `-created_at`.

#### Query Parameters

| Param       | Type   | Description                |
|-------------|--------|----------------------------|
| `search`    | string | Filter by code             |
| `is_active` | bool   | `true` or `false`          |

#### Response Fields

| Field              | Type       | Notes                        |
|--------------------|------------|------------------------------|
| `id`               | int        |                              |
| `code`             | string     | Auto-uppercased              |
| `discount_type`    | string     | `percentage` or `fixed`      |
| `discount_value`   | decimal    | Must be > 0                  |
| `min_order_amount` | decimal    | Default 0                    |
| `max_uses`         | int        | Default 100                  |
| `current_uses`     | int        | Read-only, auto-incremented  |
| `is_active`        | bool       |                              |
| `start_date`       | datetime   |                              |
| `expiry_date`      | datetime   |                              |
| `created_at`       | datetime   |                              |
| `updated_at`       | datetime   |                              |

---

### `POST /api/admin/coupons/`

**Permission:** Admin only

Create a new coupon.

#### Request Body

| Field              | Type     | Required | Constraints                         |
|--------------------|----------|----------|-------------------------------------|
| `code`             | string   | ✅ Yes   | Min 3, max 20 chars; auto-uppercased |
| `discount_type`    | string   | ✅ Yes   | `percentage` or `fixed`             |
| `discount_value`   | decimal  | ✅ Yes   | Must be > 0                         |
| `min_order_amount` | decimal  | ❌ No    | Default 0                           |
| `max_uses`         | int      | ❌ No    | Default 100                         |
| `is_active`        | bool     | ❌ No    | Default `true`                      |
| `start_date`       | datetime | ✅ Yes   |                                     |
| `expiry_date`      | datetime | ✅ Yes   |                                     |

---

### `GET /api/admin/coupons/<int:pk>/`

**Permission:** Admin only

Retrieve a single coupon.

---

### `PATCH /api/admin/coupons/<int:pk>/`

**Permission:** Admin only

Partially update a coupon.

---

### `DELETE /api/admin/coupons/<int:pk>/`

**Permission:** Admin only

Delete a coupon.

---

## 📊 9. Inventory

---

### `GET /api/admin/inventory/`

**Permission:** Admin only

List all products as inventory items, ordered by name.

#### Query Parameters

| Param       | Type   | Description                |
|-------------|--------|----------------------------|
| `low_stock` | bool   | `true` → stock ≤ 10        |
| `search`    | string | Search by name or SKU      |

#### Response Fields

| Field       | Type          | Notes |
|-------------|---------------|-------|
| `id`        | int           |       |
| `name`      | string        |       |
| `sku`       | string / null |       |
| `image`     | URL / null    |       |
| `stock`     | int           |       |
| `createdAt` | datetime      |       |

---

### `GET /api/admin/inventory/<int:pk>/`

**Permission:** Admin only

Product detail with recent inventory logs (last 20 entries).

#### Response Fields (additional)

| Field  | Type       | Notes                                |
|--------|------------|--------------------------------------|
| `logs` | object[]   | `[{id, quantity, reason, created_at}]` |

---

### `POST /api/admin/inventory/adjust/`

**Permission:** Admin only

Adjust stock quantity for a product. Creates an `InventoryLog` entry to track the change.

#### Request Body

| Field        | Type   | Required | Constraints                          |
|--------------|--------|----------|--------------------------------------|
| `product_id` | int    | ✅ Yes   | Must reference an existing product   |
| `quantity`   | int    | ✅ Yes   | Must be non-zero (+ add, − remove)   |
| `reason`     | string | ✅ Yes   | Max 255 characters                   |

#### Response `200 OK`

```json
{
  "success": true,
  "message": "Stock adjusted successfully.",
  "data": {
    "product_id": 1,
    "product_name": "Organic Apples",
    "new_stock": 50,
    "adjustment": 10
  }
}
```

---

## 📈 10. Analytics / Dashboard

---

### `GET /api/admin/analytics/dashboard/`

**Permission:** Admin only

Aggregated dashboard statistics.

#### Response `200 OK`

```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully.",
  "data": {
    "overview": {
      "total_products": 100,
      "total_categories": 10,
      "total_customers": 500,
      "total_orders": 1200,
      "total_revenue": 150000.00
    },
    "today": {
      "orders": 5,
      "revenue": 2500.00
    },
    "this_month": {
      "orders": 80,
      "revenue": 45000.00
    },
    "orders_by_status": {
      "pending": 10,
      "processing": 5,
      "shipped": 3,
      "delivered": 2,
      "cancelled": 0,
      "refunded": 0
    },
    "alerts": {
      "low_stock_products": 7,
      "pending_reviews": 12
    }
  }
}
```

> **Note:** Revenue calculations include orders with status `delivered`, `shipped`, or `processing`.

---

### `GET /api/admin/analytics/sales-trend/`

**Permission:** Admin only

Daily sales trend data.

#### Query Parameters

| Param  | Type | Default | Description                 |
|--------|------|---------|-----------------------------|
| `days` | int  | `30`    | Number of days to look back |

#### Response

```json
{
  "success": true,
  "message": "Sales trend retrieved successfully.",
  "data": [
    { "date": "2026-07-01", "total_orders": 10, "total_revenue": 5000.00, "total_items": 25 },
    { "date": "2026-07-02", "total_orders": 8, "total_revenue": 3200.00, "total_items": 18 }
  ]
}
```

---

### `GET /api/admin/analytics/top-products/`

**Permission:** Admin only

Top selling products by quantity.

#### Query Parameters

| Param   | Type | Default | Description                  |
|---------|------|---------|------------------------------|
| `limit` | int  | `10`    | Number of top products       |
| `days`  | int  | `30`    | Look back period (in days)   |

#### Response

```json
{
  "success": true,
  "message": "Top products retrieved successfully.",
  "data": [
    { "id": 1, "name": "Organic Apples", "total_quantity": 150, "total_revenue": 7500.00 },
    { "id": 2, "name": "Bananas", "total_quantity": 120, "total_revenue": 3600.00 }
  ]
}
```

---

### `GET /api/admin/analytics/revenue/`

**Permission:** Admin only

Monthly revenue data.

#### Query Parameters

| Param    | Type | Default | Description                   |
|----------|------|---------|-------------------------------|
| `months` | int  | `12`    | Number of months to look back |

#### Response

```json
{
  "success": true,
  "message": "Revenue data retrieved successfully.",
  "data": [
    { "date": "2026-01", "revenue": 45000.00, "orders": 120 },
    { "date": "2026-02", "revenue": 52000.00, "orders": 135 }
  ]
}
```

---

## ⚙️ 11. System Settings

All settings endpoints follow the same pattern:

- `GET` → Retrieve current settings (returns defaults if none saved yet)
- `PATCH` → Update settings (partial update supported)

---

### `GET / PATCH /api/admin/settings/store/`

**Permission:** Admin only

| Field              | Type   | Default        |
|--------------------|--------|----------------|
| `store_name`       | string | `"My Store"`   |
| `store_email`      | string | `""`           |
| `store_phone`      | string | `""`           |
| `address`          | string | `""`           |
| `currency`         | string | `"BDT"`        |
| `currency_symbol`  | string | `"৳"`          |
| `timezone`         | string | `"Asia/Dhaka"` |
| `logo_url`         | URL    | `""`           |
| `favicon_url`      | URL    | `""`           |

---

### `GET / PATCH /api/admin/settings/tax/`

**Permission:** Admin only

| Field                   | Type    | Default |
|-------------------------|---------|---------|
| `tax_percentage`        | decimal | `0`     |
| `tax_included_in_price` | bool    | `false` |
| `tax_name`              | string  | `"VAT"` |
| `tax_id`                | string  | `""`    |
| `enable_tax`            | bool    | `false` |

---

### `GET / PATCH /api/admin/settings/shipping/`

**Permission:** Admin only

| Field                      | Type     | Default |
|----------------------------|----------|---------|
| `free_shipping_min_amount` | decimal  | `0`     |
| `standard_shipping_charge` | decimal  | `0`     |
| `express_shipping_charge`  | decimal  | `0`     |
| `estimated_delivery_days`  | int      | `3`     |
| `shipping_zones`           | string[] | `[]`    |
| `enable_free_shipping`     | bool     | `false` |

---

### `GET / PATCH /api/admin/settings/payment/`

**Permission:** Admin only

| Field                   | Type     | Default |
|-------------------------|----------|---------|
| `accepted_cards`        | string[] | `[]`    |
| `cod_enabled`           | bool     | `true`  |
| `online_payment_enabled`| bool     | `false` |
| `bkash_enabled`         | bool     | `false` |
| `nagad_enabled`         | bool     | `false` |
| `rocket_enabled`        | bool     | `false` |
| `bkash_number`          | string   | `""`    |
| `nagad_number`          | string   | `""`    |
| `rocket_number`         | string   | `""`    |

---

### `GET / PATCH /api/admin/settings/email/`

**Permission:** Admin only

| Field                       | Type      | Default             |
|-----------------------------|-----------|---------------------|
| `smtp_host`                 | string    | `"smtp.gmail.com"`  |
| `smtp_port`                 | int       | `587`               |
| `smtp_username`             | string    | `""`                |
| `smtp_password`             | string    | `""` (write-only)   |
| `smtp_use_tls`              | bool      | `true`              |
| `from_email`                | email     | `""`                |
| `order_notification_emails` | email[]   | `[]`                |

---

### `GET / PATCH /api/admin/settings/notification/`

**Permission:** Admin only

| Field                  | Type | Default |
|------------------------|------|---------|
| `email_notifications`  | bool | `true`  |
| `order_confirmation`   | bool | `true`  |
| `order_shipped`        | bool | `true`  |
| `order_delivered`      | bool | `true`  |
| `new_order_admin`      | bool | `true`  |
| `low_stock_alert`      | bool | `true`  |
| `low_stock_threshold`  | int  | `10`    |
| `new_customer_signup`  | bool | `true`  |

---

## 📊 Endpoint Quick Reference

| #  | Method | Endpoint | Description |
|----|--------|----------|-------------|
| **🔐 Auth** |
| 1  | POST | `/api/admin/auth/login/` | Admin login |
| 2  | GET | `/api/admin/auth/profile/` | Get admin profile |
| 3  | POST | `/api/admin/auth/refresh/` | Refresh tokens |
| **🏷️ Brands** |
| 4  | GET | `/api/admin/brands/` | List brands |
| 5  | POST | `/api/admin/brands/` | Create brand |
| 6  | GET | `/api/admin/brands/{id}/` | Get brand |
| 7  | PATCH | `/api/admin/brands/{id}/` | Update brand |
| 8  | DELETE | `/api/admin/brands/{id}/` | Delete brand |
| **📂 Categories** |
| 9  | GET | `/api/admin/categories/` | List categories |
| 10 | POST | `/api/admin/categories/` | Create category |
| 11 | GET | `/api/admin/categories/{id}/` | Get category |
| 12 | PATCH | `/api/admin/categories/{id}/` | Update category |
| 13 | DELETE | `/api/admin/categories/{id}/` | Delete category |
| **📦 Products** |
| 14 | GET | `/api/admin/products/` | List products |
| 15 | POST | `/api/admin/products/` | Create product |
| 16 | GET | `/api/admin/products/{id}/` | Get product |
| 17 | PATCH | `/api/admin/products/{id}/` | Update product |
| 18 | DELETE | `/api/admin/products/{id}/` | Delete product |
| 19 | POST | `/api/admin/products/{id}/duplicate/` | Duplicate product |
| **🛒 Orders** |
| 20 | GET | `/api/admin/orders/` | List orders |
| 21 | GET | `/api/admin/orders/{id}/` | Get order |
| 22 | PATCH | `/api/admin/orders/{id}/status/` | Update order status |
| **👥 Customers** |
| 23 | GET | `/api/admin/customers/` | List customers |
| 24 | GET | `/api/admin/customers/{id}/` | Get customer |
| 25 | DELETE | `/api/admin/customers/{id}/` | Delete customer |
| 26 | POST | `/api/admin/customers/{id}/block/` | Block customer |
| 27 | POST | `/api/admin/customers/{id}/unblock/` | Unblock customer |
| **⭐ Reviews** |
| 28 | GET | `/api/admin/reviews/` | List reviews |
| 29 | POST | `/api/admin/reviews/{id}/approve/` | Approve review |
| 30 | POST | `/api/admin/reviews/{id}/reject/` | Reject review |
| 31 | DELETE | `/api/admin/reviews/{id}/` | Delete review |
| **🎫 Coupons** |
| 32 | GET | `/api/admin/coupons/` | List coupons |
| 33 | POST | `/api/admin/coupons/` | Create coupon |
| 34 | GET | `/api/admin/coupons/{id}/` | Get coupon |
| 35 | PATCH | `/api/admin/coupons/{id}/` | Update coupon |
| 36 | DELETE | `/api/admin/coupons/{id}/` | Delete coupon |
| **📊 Inventory** |
| 37 | GET | `/api/admin/inventory/` | List inventory |
| 38 | GET | `/api/admin/inventory/{id}/` | Get inventory item + logs |
| 39 | POST | `/api/admin/inventory/adjust/` | Adjust stock |
| **📈 Analytics** |
| 40 | GET | `/api/admin/analytics/dashboard/` | Dashboard stats |
| 41 | GET | `/api/admin/analytics/sales-trend/` | Sales trend |
| 42 | GET | `/api/admin/analytics/top-products/` | Top products |
| 43 | GET | `/api/admin/analytics/revenue/` | Revenue data |
| **⚙️ Settings** |
| 44 | GET/PATCH | `/api/admin/settings/store/` | Store settings |
| 45 | GET/PATCH | `/api/admin/settings/tax/` | Tax settings |
| 46 | GET/PATCH | `/api/admin/settings/shipping/` | Shipping settings |
| 47 | GET/PATCH | `/api/admin/settings/payment/` | Payment settings |
| 48 | GET/PATCH | `/api/admin/settings/email/` | Email settings |
| 49 | GET/PATCH | `/api/admin/settings/notification/` | Notification settings |

---

## 🔐 Authorization Summary

| Role          | Access                                  |
|---------------|-----------------------------------------|
| `user`        | ❌ No admin access                       |
| `admin`       | ✅ Full access to all admin endpoints    |
| `superadmin`  | ✅ Full access to all admin endpoints    |

### Authentication

| Mechanism    | Details                                     |
|--------------|---------------------------------------------|
| Type         | JWT Bearer Token                            |
| Header       | `Authorization: Bearer <token>`              |
| Access Token | Expires in **1 hour**                        |
| Refresh Token| Expires in **30 days**                        |
| Payload      | Contains `userId`, `role`, `email`, `type`   |

### Standard Response Formats

| Key       | Type    | Description                               |
|-----------|---------|-------------------------------------------|
| `success` | bool    | `true` for success, `false` for errors    |
| `message` | string  | Human-readable description               |
| `data`    | varies  | Response payload (present on success)     |
| `errors`  | object  | Validation error details (present on 400) |
| `code`    | string  | Machine-readable error code (on errors)   |

### Standard Error Codes

| Code                           | Status | Description                    |
|--------------------------------|--------|--------------------------------|
| `UNAUTHORIZED`                 | 401    | Authentication required        |
| `FORBIDDEN`                    | 403    | Admin access required          |
| `ADMIN_AUTH_VALIDATION_ERROR`  | 400    | Login validation failed        |

---

> **Last updated:** July 29, 2026
