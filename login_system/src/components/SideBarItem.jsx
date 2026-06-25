import { useState } from "react";

function SideBarItem({ children, onClick }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <li
      onClick={(event) => {
        setIsActive(!isActive);
        if (onClick) {
          onClick(event);
        }
      }}
      className={`flex w-[95%] p-2.5 rounded-2xl z-10 hover:bg-gray-600 hover:text-white  text-xl items-center mb-2 cursor-pointer
        ${
          isActive
            ? " w-[95%] p-2.5 rounded-2xl bg-gray-600 text-white border-gray-200"
            : ""
        }`}
    >
      {children}
    </li>
  );
}

export default SideBarItem;
