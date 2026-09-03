import { useState } from "react";

function SideBarMobile({ children, onClick }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <li
      onClick={(event) => {
        setIsActive(!isActive);
        if (onClick) {
          onClick(event);
        }
      }}
      className={`flex flex-col w-[95%] min-w-15 py-2rounded-xl transition p-2.5   hover:bg-gray-600 hover:text-white items-center 
        mb-2 cursor-pointer
        ${isActive
          ? " w-[95%] p-2.5 rounded-2xl bg-gray-600 text-white border-gray-200"
          : ""
        }`}
    >
      {children}
    </li>
  );
}

export default SideBarMobile;
