function Input( {type,placeholder, value, onChange, label}){
 return (
    <input 
    label={label}
    type={type} 
    placeholder={placeholder} 
     value={value} 
    onChange={onChange}
    className="w-full border-0  placeholder-gray-800  p-1 
    outline-0 text-black"/>
 )
}

 export default Input