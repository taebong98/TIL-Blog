import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import { getStringDate } from "../util/date";
import { intelList } from "../util/intel";

const Detail = () => {
    const { id } = useParams();
    const tilList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setDate] = useState();

    console.log(id);

    useEffect(() => {
        const targetTil = tilList.find(
            (it) => parseInt(it.id) === parseInt(id)
        );

        if (targetTil) {
            setDate(targetTil);
            console.log(data);
        } else {
            alert("없는 TIL 입니다.");
            navigate("/", { replace: true });
        }
    }, [id, tilList]);

    if (!data) {
        return <div className="DetailPage">로딩중입니다...</div>;
    } else {
        const currentIntelData = intelList.find(
            (it) => parseInt(it.intel_id) === parseInt(data.intelligibility)
        );

        return (
            <div className="DetailPage">
                <MyHeader
                    headText={`${getStringDate(new Date(data.date))} 기록`}
                    leftChild={
                        <MyButton
                            text={"< 뒤로가기"}
                            onClick={() => navigate(-1)}
                        />
                    }
                    rightChild={
                        <MyButton
                            text={"수정하기"}
                            onClick={() => navigate(`/edit/${data.id}`)}
                        />
                    }
                />
                <article>
                    <section>
                        <h4>이해도</h4>
                        <div
                            className={[
                                "detail_img_wrapper",
                                `detail_img_wrapper_${data.intelligibility}`,
                            ].join(" ")}
                        >
                            <img src={currentIntelData.intel_img} />
                            <div className="detail_decript">
                                {currentIntelData.intel_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>TIL 상세</h4>
                        <div className="til_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};

export default Detail;
