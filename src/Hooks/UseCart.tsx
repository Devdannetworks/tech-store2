import React, { createContext, useCallback, useEffect, useState } from "react";
import { cartProductsType, Item } from "../Utils/Store";

interface CartContextTypeProps {
  cartItems: cartProductsType[] | null;
  addToCart: (product: cartProductsType | null) => void;
  removeFromCart: (product: cartProductsType | null) => void;
  clearCart: () => void;
  favItems: Item[] | null;
  addToFav: (product: Item) => void;
  removeFromFav: (product: Item) => void;
  handleQtyDecrease: (product: cartProductsType) => void;
  handleQtyIncrease: (product: cartProductsType) => void;
  totalAmount: number | null;
}

//CartProvider prop
interface CartProviderProps {
  children: React.ReactNode;
}

//create a context with initial state
const CartContext = createContext<CartContextTypeProps | undefined>(undefined);

//provider to wrap your app
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<cartProductsType[] | null>(null);
  const [favItems, setFavItems] = useState<Item[] | null>(null);
  const totalAmount =
    cartItems &&
    cartItems.reduce(
      (acc, cartItem) => (acc += cartItem.price * cartItem.quantity),
      0
    );

  useEffect(() => {
    const localStorageItems: any = localStorage.getItem("eComShop");
    const convertedProducts: cartProductsType[] | null =
      JSON.parse(localStorageItems);
    setCartItems(convertedProducts);

    const localStorageFavItems: any = localStorage.getItem("eComShopFav");
    const convertedFavProducts: Item[] | null =
      JSON.parse(localStorageFavItems);
    setFavItems(convertedFavProducts);
  }, []);

  const addToCart = useCallback((product: cartProductsType | null) => {
    if (product === null) return;
    setCartItems((prevCartItems) => {
      let updatedCart;

      if (prevCartItems) {
        updatedCart = [...prevCartItems, product];
      } else {
        updatedCart = [product];
      }
      localStorage.setItem("eComShop", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback(
    (product: cartProductsType | null) => {
      if (product === null) return;

      if (cartItems) {
        const filteredProducts = cartItems.filter(
          (item) => item.id !== product.id
        );
        setCartItems(filteredProducts);
        localStorage.setItem("eComShop", JSON.stringify(filteredProducts));
      }
    },
    [cartItems]
  );

  const clearCart = () => {
    let updatedCart = cartItems;
    updatedCart = [];
    setCartItems([]);
    localStorage.setItem("eComShop", JSON.stringify(updatedCart));
  };

  const addToFav = useCallback((Product: Item) => {
    setFavItems((prevFavItems) => {
      let updatedFavItems;

      if (prevFavItems) {
        updatedFavItems = [...prevFavItems, Product];
      } else {
        updatedFavItems = [Product];
      }
      localStorage.setItem("eComShopFav", JSON.stringify(updatedFavItems));

      return updatedFavItems;
    });
  }, []);

  const removeFromFav = useCallback(
    (Product: Item) => {
      if (favItems === null) return;
      const updatedFavItems = favItems?.filter(
        (item) => item.id !== Product.id
      );
      localStorage.setItem("eComShop", JSON.stringify(updatedFavItems));

      setFavItems(updatedFavItems);
    },
    [favItems]
  );

  const handleQtyIncrease = useCallback(
    (cartProduct: cartProductsType) => {
      if (cartProduct.quantity === 99) return;

      if (cartItems) {
        const updatedCart = [...cartItems];

        const existingIndex =
          cartItems &&
          cartItems.findIndex((cartItem) => cartItem.id === cartProduct.id);

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
          updatedCart[existingIndex].itemTotal =
            updatedCart[existingIndex].quantity *
            updatedCart[existingIndex].price;
        }
        setCartItems(updatedCart);
      }
    },
    [cartItems]
  );

  const handleQtyDecrease = useCallback(
    (cartProduct: cartProductsType) => {
      if (cartProduct.quantity === 1) {
        return;
      }

      if (cartItems) {
        let updatedCartItems = [...cartItems];
        const existingProductIndex = updatedCartItems.findIndex(
          (updatedCartItem) => updatedCartItem.id === cartProduct.id
        );

        if (existingProductIndex > -1) {
          updatedCartItems[existingProductIndex].quantity = --updatedCartItems[
            existingProductIndex
          ].quantity;

          updatedCartItems[existingProductIndex].itemTotal =
            updatedCartItems[existingProductIndex].quantity *
            updatedCartItems[existingProductIndex].price;
        }
        setCartItems(updatedCartItems);
      }
    },
    [cartItems]
  );

  const value: CartContextTypeProps = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    favItems,
    addToFav,
    removeFromFav,
    totalAmount,
    handleQtyDecrease,
    handleQtyIncrease,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("UseCart must be used within a CartProvider");
  }
  return context;
};
