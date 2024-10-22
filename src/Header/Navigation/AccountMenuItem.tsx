import React from "react";

interface AccountMenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

const AccountMenuItem: React.FC<AccountMenuItemProps> = ({
  children,
  onClick,
}) => {
  return (
    <div
      className="py-2 px-3 hover:bg-neutral-200 transition cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default AccountMenuItem;
