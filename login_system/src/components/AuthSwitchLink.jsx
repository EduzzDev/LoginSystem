function AuthSwitchLink({ variant, children }) {
  let href;
  switch (variant) {
    case "A":
      href = "/register";
      break;
    case "B":
      href = "/";
      break;
    case "C":
      href = "/forgot";
      break;
  }

  return (
    <a href={href}>
      <button type="button"
        className="text-blue-800 cursor-pointer 
       underline font-semibold">
        {children}
      </button>
    </a>
  );
}

export default AuthSwitchLink;
