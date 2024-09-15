interface SCardProps {
    title: string;
    icon: React.ReactNode;
    description: string;
}

const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SCard: React.FC<SCardProps> = ({ title, icon, description }) => {
    return (
        <div
            className="flex m-2 p-2 items-center w-[316px] h-[92px] rounded-lg backdrop-blur-lg border border-opacity-20 bg-primary/40 text-primary-content"
        >
            <div className="flex justify-center items-center w-1/4">
                <div className="text-2xl">{icon}</div>
            </div>
            <div className="w-3/4">
                <div className="border-b border-opacity-20 text-primary-content">
                    <h3
                        className="text-xl truncate"
                        title={title}
                    >
                        {title}
                    </h3>
                </div>
                <div>
                    <h6
                        className="text-sm truncate"
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
