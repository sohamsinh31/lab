interface SCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  linkurl: string;
}

const SCard: React.FC<SCardProps> = ({ title, icon, description, linkurl }) => {
  return (
    <div
      className=" inline-block items-center m-2 p-4 rounded-md bg-slate-900 gap-4 
                 backdrop-blur-xl shadow-sm shadow-transparent cursor-pointer hover:shadow-lg 
                 transition-all duration-200 ease-in-out  w-60 overflow-hidden"
      onClick={() => {
        window.location.href = linkurl;
      }}
    >
      {/* Icon Section */}

      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center w-12 h-12 bg-gray-800 rounded-lg">
          {icon}
        </div>

        {/* Text Section */}
        <div className="flex flex-col flex-grow min-w-0">
          <h3
            className="text-sm sm:text-base font-semibold text-gray-100 truncate"
            title={title}
          >
            {title}
          </h3>
          <h6
            className="text-xs sm:text-sm text-gray-400 truncate"
            title={description}
          >
            {description}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SCard;
