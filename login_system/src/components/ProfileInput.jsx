function ProfileInput({
  type = "text",
  value,
  onChange,
  placeholder,
  minLength,
  maxLength,
  required,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
      className={`w-[20dvw] pt-1 pb-1 pl-5 pr-2 text-xl border relative rounded-lg hover:bg-[#6366F1] hover:border-white border-[#4F46E5] text-[#FFFFFF] cursor-pointer bg-[#1F2937] outline-none ${className}`}
      {...props}
    />
  );
}

export default ProfileInput;
