function helpList({ children }) {
    return (
        <>
            <ul className="flex flex-col m-2 gap-3 relative text-[14px]">
                {children}
            </ul>
        </>
    )
}

export default helpList;