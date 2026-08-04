import React from "react";

export default function SectionTitle({ children, className = "", ...props }) {
  return (
    <h2 className={className} {...props}>
      {children}
    </h2>
  );
}
