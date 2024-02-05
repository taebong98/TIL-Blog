import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "../App";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import IntelItem from "./IntelItem";

const intelList = [
    {
        intel_id: 1,
        intel_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        intel_descript: "100%",
    },
    {
        intel_id: 2,
        intel_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
        intel_descript: "75%",
    },
    {
        intel_id: 3,
        intel_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
        intel_descript: "50%",
    },
    {
        intel_id: 4,
        intel_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
        intel_descript: "25%",
    },
    {
        intel_id: 5,
        intel_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
        intel_descript: "0%",
    },
];

const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [intel, setIntel] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const { onCreate } = useContext(DiaryDispatchContext);
    const navigate = useNavigate();

    const handleClickIntel = (intel) => {
        setIntel(intel);
    };

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        onCreate(date, content, intel);
        navigate("/", { replace: true });
    };

    return (
        <div className="DiaryEditor">
            <MyHeader
                headText={"새로운 TIL 작성"}
                leftChild={
                    <MyButton
                        text={"< 뒤로가기"}
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                }
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input
                            className="input_date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>이해도</h4>
                    <div className="input_box intelligibility_list_wrapper">
                        {intelList.map((it) => (
                            <IntelItem
                                key={it.intel_id}
                                {...it}
                                onClick={handleClickIntel}
                                isSelected={it.intel_id === intel}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>Today I Learning</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder="오늘 공부한 내용"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton
                            text={"취소하기"}
                            onClick={() => navigate(-1)}
                        />
                        <MyButton
                            text={"작성완료"}
                            type={"positive"}
                            onClick={() => {
                                handleSubmit();
                            }}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;
