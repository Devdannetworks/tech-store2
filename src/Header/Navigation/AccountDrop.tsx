import React from "react";
import AccountMenuItem from "./AccountMenuItem";
import { Link, useNavigate } from "react-router-dom";
import AvatarComp from "../../Components/AvatarComp";
import BackDrop from "./BackDrop";
import { AiFillCaretDown } from "react-icons/ai";
import { handleLogOut } from "../../Actions/Authentication/Auth";
import { useAuth } from "../../Hooks/UseAuth";

const AccountDrop = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAccountMenu = () => {
    setIsOpen(!isOpen);
  };
  const doHandleLogOut = () => {
    handleLogOut();
    setIsOpen(!isOpen);
    navigate("/ShoppingCartComponent");
  };

  return (
    <div className="relative flex z-20 flex-col justify-center cursor-pointer">
      <div className="z-40 ">
        <div
          className="flex gap-2 items-center py-2 px-2 border-[1px] border-slate-500 rounded-full"
          onClick={toggleAccountMenu}
        >
          <AvatarComp />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="text-sm absolute rounded-md shadow-md w-[140px] bg-white overflow-hidden right-0 top-12 flex flex-col cursor-pointer">
            {isLoggedIn ? (
              <div className="py-2">
                <Link to={"/Admin"}>
                  <AccountMenuItem onClick={toggleAccountMenu}>
                    Admin Dashboard
                  </AccountMenuItem>
                </Link>

                <Link to={"/orders"}>
                  <AccountMenuItem onClick={toggleAccountMenu}>
                    Check Orders
                  </AccountMenuItem>
                </Link>
                <hr className="h-[1.5px] bg-slate-300 w-full my-1" />

                <AccountMenuItem onClick={doHandleLogOut}>
                  Log out
                </AccountMenuItem>
              </div>
            ) : (
              <div className="">
                <Link to={"/LogIn"}>
                  <AccountMenuItem onClick={toggleAccountMenu}>
                    Log in
                  </AccountMenuItem>
                </Link>
                <Link to={"/Register"}>
                  <AccountMenuItem onClick={toggleAccountMenu}>
                    Sign up
                  </AccountMenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleAccountMenu} /> : null}
    </div>
  );
};

export default AccountDrop;
