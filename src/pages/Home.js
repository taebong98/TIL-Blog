import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import TilList from "../components/TilList";

const Home = () => {
    const tilList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `TIL 기록`;
    }, []);

    useEffect(() => {
        if (tilList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0
            ).getTime();

            setData(
                tilList.filter(
                    (it) => firstDay <= it.date && it.date <= lastDay
                )
            );
        }
    }, [tilList, curDate]);

    const increaseMonth = () => {
        setCurDate(
            new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                curDate.getDate()
            )
        );
    };

    const decreaseMonth = () => {
        setCurDate(
            new Date(
                curDate.getFullYear(),
                curDate.getMonth() - 1,
                curDate.getDate()
            )
        );
    };

    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={
                    <MyButton
                        text={"<"}
                        onClick={() => {
                            decreaseMonth();
                        }}
                    />
                }
                rightChild={
                    <MyButton
                        text={">"}
                        onClick={() => {
                            increaseMonth();
                        }}
                    />
                }
            />
            <TilList tilList={data} />
        </div>
    );
};

export default Home;
