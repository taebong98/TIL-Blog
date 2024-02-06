import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const TilItem = ({ id, intelligibility, content, date }) => {
    const navigate = useNavigate();
    const strDate = new Date(parseInt(date)).toLocaleDateString();

    const goDetail = () => {
        navigate(`/detail/${id}`);
    };

    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="TilItem">
            <div
                onClick={goDetail}
                className={[
                    "intel_img_wrapper",
                    `intel_img_wrapper_${intelligibility}`,
                ].join(" ")}
            >
                <img
                    src={
                        process.env.PUBLIC_URL +
                        `assets/emotion${intelligibility}.png`
                    }
                />
            </div>
            <div className="info_wrapper" onClick={goDetail}>
                <div className="til_date">{strDate}</div>
                <div className="til_content_preview">
                    {content.slice(0, 25)}
                </div>
            </div>
            <div className="btn_wrapper">
                <MyButton
                    text={"수정하기"}
                    onClick={() => {
                        goEdit();
                    }}
                />
            </div>
        </div>
    );
};

export default TilItem;
