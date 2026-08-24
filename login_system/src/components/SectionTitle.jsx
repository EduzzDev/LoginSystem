import React from "react";

export default function SectionTitle({ children, className = "", ...props }) {
  return (
    <h2 className={`${className} text-gray-400 text-lg`} {...props}>
      {children}
    </h2>
  );
}
