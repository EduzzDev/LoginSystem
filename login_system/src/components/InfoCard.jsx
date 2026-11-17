function InfoCard({ icon, title, children }) {
    return (
        <div className=" w-36 min-[380px]:w-44 @max-xs:h-10 min-[380px]:h-18 p-1.5 rounded-2xl mt-4 flex flex-row items-center gap-1.5 bg-[#292B30] py-3  ">
            {icon}
            <p className="text-[#A5A8B5] flex flex-col font-medium ">
                {title}
                {children}
            </p>
        </div>
    );
}

export default InfoCard;
