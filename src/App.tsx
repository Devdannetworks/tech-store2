import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home"; // Loaded immediately
import PrimarySearchAppBar from "./Header/Navigation/Navigation"; // Loaded immediately
import NotFound from "./Components/NotFound"; // Loaded immediately
import Popular from "./Main/Products/Popular";
import FailedCheckout from "./Main/Checkout/FailedCheckout";
import CreateCampaign from "./Admin/Create-campaign/CreateCampaign";

// Lazy loading the components
const ShoppingCartComponent = lazy(
  () => import("./Main/ShoppingCart/ShoppingCartComponent")
);
const FavComponents = lazy(() => import("./Main/ShoppingCart/FavComponents"));
const Shop = lazy(() => import("./Main/ShoppingCart/Shop"));
const ProductPageTemp = lazy(() => import("./Main/Products/ProductPageTemp"));
const RegisterPage = lazy(() => import("./Main/Register/RegisterPage"));
const LogInPage = lazy(() => import("./Main/LogIn/LogInPage"));
const Admin = lazy(() => import("./Admin/AdminHome.tsx/admin"));
const AddProducts = lazy(() => import("./Admin/AddProducts/AddProducts"));
const ManageOrders = lazy(() => import("./Admin/ManageOrders/ManageOrders"));
const ManageProducts = lazy(
  () => import("./Admin/ManageProducts/ManageProducts")
);
const SuccessCheckout = lazy(() => import("./Main/Checkout/SuccessCheckout"));
const CancelCheckout = lazy(() => import("./Main/Checkout/CancelCheckout"));
const CheckoutPage = lazy(() => import("./Main/Checkout/Page"));
const PaymentForm = lazy(() => import("./Main/Checkout/PaymentForm"));
const Return = lazy(() => import("./Main/Checkout/return"));
const OrderAdmin = lazy(() => import("./Admin/Order/orderAdmin"));
const Orders = lazy(() => import("./Main/OrderClient/Orders"));
const ProtectRoutesAdminOnly = lazy(() => import("./Components/ProtectRoutes"));

function App() {
  return (
    <div>
      <Router>
        <div className="relative">
          <PrimarySearchAppBar />

          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Product/:id" element={<ProductPageTemp />} />
              <Route path="/order/:id" element={<OrderAdmin />} />
              <Route
                path="/ShoppingCartComponent"
                element={<ShoppingCartComponent />}
              />
              <Route path="/FavComponents" element={<FavComponents />} />
              <Route path="/Shop" element={<Shop />} />
              <Route path="/Popular" element={<Popular />} />
              <Route path="/Register" element={<RegisterPage />} />
              <Route path="/LogIn" element={<LogInPage />} />
              <Route
                path="/Admin"
                element={
                  <ProtectRoutesAdminOnly>
                    <Admin />
                  </ProtectRoutesAdminOnly>
                }
              />
              <Route
                path="/Admin/add-products"
                element={
                  <ProtectRoutesAdminOnly>
                    <AddProducts />
                  </ProtectRoutesAdminOnly>
                }
              />
              <Route
                path="/Admin/manage-orders"
                element={
                  <ProtectRoutesAdminOnly>
                    <ManageOrders />
                  </ProtectRoutesAdminOnly>
                }
              />
              <Route
                path="/Admin/manage-products"
                element={
                  <ProtectRoutesAdminOnly>
                    <ManageProducts />
                  </ProtectRoutesAdminOnly>
                }
              />
              <Route
                path="/Admin/create-campaign"
                element={
                  <ProtectRoutesAdminOnly>
                    <CreateCampaign />
                  </ProtectRoutesAdminOnly>
                }
              />
              <Route
                path="/success/:OrderTrackingId"
                element={<SuccessCheckout />}
              />
              <Route
                path="/failed/:OrderTrackingId"
                element={<FailedCheckout />}
              />
              <Route
                path="/cancel-checkout/:OrderTrackingId"
                element={<CancelCheckout />}
              />
              <Route path="/checkoutPage" element={<CheckoutPage />} />
              <Route path="/checkout" element={<PaymentForm />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/return" element={<Return />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

export default App;
