import * as React from "react";
import { Container, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Hooks/UseCart";
import AccountDrop from "./AccountDrop";
import SideMenu from "./SideMenu/SideMenu";
import NavIcons from "../../Components/NavIcons";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import NavigationText from "./NavigationText";
import CategoriesPage from "../Categories/CategoriesPage";
import Search from "./Search";

export default function PrimarySearchAppBar() {
  const { cartItems, favItems } = useCart();

  const noOfItemsInCart = cartItems?.length;
  const noOfItemsInFav = favItems?.length;

  const isDesktop = useMediaQuery("(min-width: 900px)");

  const navigate = useNavigate();
  const showCartItems = () => {
    navigate("/ShoppingCartComponent");
  };
  const showFavouriteItems = () => {
    navigate("/FavComponents");
  };
  const showShop = () => {
    navigate("/Popular");
  };
  const showHome = () => {
    navigate("/");
  };

  return (
    <div className="sticky bg-slate-100 left-0 right-0 top-0 z-30 py-3">
      <Container maxWidth={"xl"}>
        <div className="bg-slate-100 justify-between flex w-full items-center ">
          <div>
            {isDesktop ? (
              <div className="flex gap-12 items-center justify-between w-full">
                <NavigationText onClick={showShop} text="Popular" />
                <NavigationText onClick={showHome} text="Home" />
              </div>
            ) : (
              <>
                <SideMenu />
              </>
            )}
          </div>
          <div>{isDesktop ? <Search /> : <></>}</div>

          <div className="flex flex-row gap-4 lg:gap-8 justify-between items-center ">
            <NavIcons
              icon={CiShoppingCart}
              onClick={showCartItems}
              value={noOfItemsInCart}
            />
            <NavIcons
              icon={CiHeart}
              onClick={showFavouriteItems}
              value={noOfItemsInFav}
            />
            <AccountDrop />
          </div>
        </div>
      </Container>
      <CategoriesPage />
    </div>
  );
}
