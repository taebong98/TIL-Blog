import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "../App";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import IntelItem from "./IntelItem";

import { getStringDate } from "../util/date";
import { intelList } from "../util/intel";

const DiaryEditor = ({ isEdit, originData }) => {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [intel, setIntel] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
    const navigate = useNavigate();

    const handleClickIntel = (intel) => {
        setIntel(intel);
    };

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if (
            window.confirm(
                isEdit
                    ? "TIL를 수정하시겠습니까?"
                    : "새로운 TIL를 작성하시겠습니까?"
            )
        ) {
            if (!isEdit) {
                onCreate(date, content, intel);
            } else {
                onEdit(originData.id, date, content, intel);
            }
        }

        navigate("/", { replace: true });
    };

    const handleRemove = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            onRemove(originData.id);
            navigate("/", { replace: true });
        }
    };

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setIntel(originData.intelligibility);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    return (
        <div className="DiaryEditor">
            <MyHeader
                headText={isEdit ? "TIL 수정하기" : "새로운 TIL 작성"}
                leftChild={
                    <MyButton
                        text={"< 뒤로가기"}
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                }
                rightChild={
                    isEdit && (
                        <MyButton
                            text={"삭제하기"}
                            type={"negative"}
                            onClick={() => {
                                handleRemove();
                            }}
                        />
                    )
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
