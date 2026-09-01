function Wrapper({ variant, children }) {
  return (
    <div
      className={`w-50 h-15 min-[500px]:w-70 
               text-white text-lg font-bold bg-linear-to-br
                from-purple-600 to-blue-600 rounded-2xl flex justify-center 
            items-center relative ${
              variant === "A" ? " mt-6.5 mb-3.5" : "  mt-3 mb-3.5"
            }`}
    >
      {children}
    </div>
  );
}

export default Wrapper;
