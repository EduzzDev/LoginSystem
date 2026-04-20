function Input({ type, placeholder, value, onChange, required, }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      minLength={5}
      maxLength={254}
      className="w-full border-0  placeholder-gray-800  p-1 
    outline-0 text-black"
    />
  );
}

export default Input;
