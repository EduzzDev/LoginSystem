function AuthSwitchLink({ variant, children }) {
  return (
    <a href={variant === "A" ? "/register" : "/"}>
      <button type="button" className="text-blue-800 cursor-pointer">
        {children}
      </button>
    </a>
  );
}

export default AuthSwitchLink;
