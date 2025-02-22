## Models

> User
- `name`
- `email`
- `password`
- `profile image`
- `roles ["ADMIN","USER"]`

> Product
- `name`
- `price`
- `stock`
- `category`
- `rating`
- `product image`

> Order
- `User`
- `Product`
- `Shipping address`
- `Order status`
- `Payment status`

> Cart
- `Product`
- `User`
- `quantity`