import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
  MdMessage,
} from "react-icons/md";
import AdminNavItem from "./AdminNavItem";
import { useMediaQuery } from "@mui/material";
import DropMenu from "./DropMenu";

const AdminNav = () => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 800px)");

  return (
    <div className="sticky top-0 left-0 right-0 z-10 bg-white">
      {isDesktop ? (
        <div className="flex justify-between md:justify-center py-2 gap-4 md:gap-12 shadow-sm shadow-slate-300 overflow-x-auto flex-wrap">
          <button>
            <AdminNavItem
              icon={MdLibraryAdd}
              onClick={() => navigate("/Admin")}
              label="Admin Dashboard"
              selected
            />
          </button>
          <button>
            <AdminNavItem
              icon={MdLibraryAdd}
              onClick={() => navigate("/Admin/add-products")}
              label="Add Products"
            />
          </button>
          <button>
            <AdminNavItem
              icon={MdFormatListBulleted}
              onClick={() => navigate("/Admin/manage-products")}
              label="Manage Products"
            />
          </button>
          <button>
            <AdminNavItem
              icon={MdDns}
              onClick={() => navigate("/Admin/manage-orders")}
              label="Manage orders"
            />
          </button>
          <button>
            <AdminNavItem
              icon={MdMessage}
              onClick={() => navigate("/Admin/create-campaign")}
              label="Create campaign"
            />
          </button>
        </div>
      ) : (
        <div>
          <DropMenu />
        </div>
      )}
      {}
    </div>
  );
};

export default AdminNav;
