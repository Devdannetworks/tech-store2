import { Container } from "@mui/material";
import React, { useState } from "react";
import AdminNavItem from "./AdminNavItem";
import {
  MdAdminPanelSettings,
  MdDns,
  MdLibraryAdd,
  MdFormatListBulleted,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";

const DropMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccountMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="  ">
      <Container>
        <div className="relative z-20 flex flex-col justify-end  py-2">
          <div
            onClick={toggleAccountMenu}
            className="flex gap-2 w-fit items-center py-2 px-2 border-[1px] border-slate-500 rounded-full"
          >
            <MdAdminPanelSettings size={20} />
            <AiFillCaretDown />
          </div>
          {isOpen && (
            <div className="absolute  bg-slate-50 p-3 top-12  w-fit flex flex-col gap-4 items-start">
              <button>
                <AdminNavItem
                  icon={MdLibraryAdd}
                  onClick={() => {
                    navigate("/Admin");
                    setIsOpen(!isOpen);
                  }}
                  label="Admin Dashboard"
                  selected
                />
              </button>
              <button>
                <AdminNavItem
                  icon={MdLibraryAdd}
                  onClick={() => {
                    navigate("/Admin/add-products");
                    setIsOpen(!isOpen);
                  }}
                  label="Add Products"
                />
              </button>
              <button>
                <AdminNavItem
                  icon={MdFormatListBulleted}
                  onClick={() => {
                    navigate("/Admin/manage-products");
                    setIsOpen(!isOpen);
                  }}
                  label="Manage Products"
                />
              </button>
              <button>
                <AdminNavItem
                  icon={MdDns}
                  onClick={() => {
                    navigate("/Admin/manage-orders");
                    setIsOpen(!isOpen);
                  }}
                  label="Manage orders"
                />
              </button>
            </div>
          )}
        </div>
      </Container>
      {isOpen ? (
        <div
          className="fixed z-10 bg-slate-300 opacity-50 w-screen h-screen top-0 left-0"
          onClick={toggleAccountMenu}
        ></div>
      ) : null}
    </div>
  );
};

export default DropMenu;
