const IntelItem = ({
    intel_id,
    intel_img,
    intel_descript,
    onClick,
    isSelected,
}) => {
    return (
        <div
            onClick={() => onClick(intel_id)}
            className={[
                "IntelItem",
                isSelected ? `IntelItem_on_${intel_id}` : `IntelItem_off`,
            ].join(" ")}
        >
            <img src={intel_img} />
            <span>{intel_descript}</span>
        </div>
    );
};

export default IntelItem;
