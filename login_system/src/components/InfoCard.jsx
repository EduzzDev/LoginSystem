function InfoCard({ icon, title, children, className }) {
    return (
        <div className={` w-38 max-[350px]:w-35.5 min-[380px]:w-42 sm:w-60  lg:w-46 lg:left-0 relative min-[380px]:left-2
        @max-xs:h-10 min-[380px]:h-17 p-1.5 rounded-2xl
        mt-2 flex flex-row items-center gap-1.5 bg-[#292B30] py-3 ${className} `}>
            {icon}
            <p className="text-[#A5A8B5] flex flex-col font-medium ">
                {title}
                {children}
            </p>
        </div>
    );
}

export default InfoCard;
