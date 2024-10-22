import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineInbox,
  AiOutlineMenu,
  AiOutlinePhone,
} from "react-icons/ai";
import SideLinksText from "./SideLinksText";
import BackDrop from "../BackDrop";

const SideMenu = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleBackDropClick = () => {
    setDrawerOpen(false);
  };

  const navigate = useNavigate();

  const showShop = () => {
    navigate("/Shop");
  };
  const showCategories = () => {
    navigate("/Categories");
  };
  const showHome = () => {
    navigate("/");
  };

  return (
    <div>
      {!drawerOpen ? (
        <AiOutlineMenu className="text-2xl" onClick={toggleDrawer} />
      ) : null}

      <div
        onClick={toggleDrawer}
        className={`absolute bg-white top-0 left-0 h-screen w-[70%] z-50  px-3 py-6 ${
          drawerOpen
            ? "transform translate-x-0 transition"
            : "transform -translate-x-[800px] transition"
        }`}
      >
        <div className="flex items-center justify-between  mb-4 font-sans">
          <h4 className="font-semibold text-2xl ">Menu</h4>

          <AiOutlineClose className="text-2xl" />
        </div>
        <div className="flex flex-col gap-8">
          <SideLinksText onClick={showShop} text="Popular" />
          <SideLinksText onClick={showHome} text="Home" />
          <SideLinksText onClick={showShop} text="Shop" />
          <SideLinksText onClick={showCategories} text="Categories" />
        </div>

        <hr className="border-[1px] border-slate-300 mt-8 mb-8 w-full " />

        <div className="flex flex-col gap-4 font-mono text-sm">
          <h5 className="">Contact for assistance</h5>

          <div className="flex gap-3 items-center cursor-pointer">
            <AiOutlinePhone className="text-md" />
            <p>+254 740 411 885</p>
          </div>
          <div className="flex gap-3 items-center cursor-pointer">
            <AiOutlineInbox className="text-md" />
            <p>officialdevduncan@gmail.com</p>
          </div>
        </div>
      </div>
      {drawerOpen ? <BackDrop onClick={handleBackDropClick} /> : null}
    </div>
  );
};

export default SideMenu;
