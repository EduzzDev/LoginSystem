function ProfileInput({
  name,
  type,
  value,
  onChange,
  placeholder,
  minLength,
  maxLength,
  required,
  icon,
  className = "",
  ...props
}) {
  return (
    <div className="relative">
       {icon && (
        <span className=" absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 z-10">
          {icon}
        </span>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        className={`w-50 min-[400px]:min-w-68 min-[600px]:min-w-80 pt-1  pb-1 scroll-pl-1.5 pl-1.5
          min-[400px]:pl-10 pr-2 text-xl
          border relative
          rounded-lg hover:bg-[#6366F1] hover:border-white border-[#4F46E5]
           text-[#FFFFFF] cursor-pointer bg-[#1F2937]  outline-none ${className}`}
        {...props}
      />
    </div>
  );
}

export default ProfileInput;
