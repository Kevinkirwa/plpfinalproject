import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";
import notificationReducer from './reducers/notificationSlice';
import { shopReducer } from "./reducers/shop";
import { sellersReducer } from "./reducers/sellers";

export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    sellers: sellersReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    notification: notificationReducer,
    shop: shopReducer,
  },
});

// For backwards compatibility
export default store;
