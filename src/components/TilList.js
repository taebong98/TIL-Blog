import { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import TilItem from "./TilItem";

const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된순" },
];

const filterOptionList = [
    { value: "all", name: "전부다" },
    { value: "good", name: "이해한 내용만" },
    { value: "bad", name: "이해 못한 내용만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
    return (
        <select
            className="ControlMenu"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {optionList.map((it, idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
        </select>
    );
};

const TilList = ({ tilList }) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("latest");
    const [filter, setFilter] = useState("all");

    const getProcessTilList = () => {
        const filterCallBack = (item) => {
            if (filter === "good") {
                return parseInt(item.intelligibility) <= 3;
            } else {
                return parseInt(item.intelligibility) > 3;
            }
        };

        const compare = (a, b) => {
            if (sortType === "latest") {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(tilList));

        const filteredList =
            filter === "all"
                ? copyList
                : copyList.filter((it) => filterCallBack(it));

        const sortedList = filteredList.sort(compare);
        return sortedList;
    };

    return (
        <div className="TilList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />
                </div>
                <div className="right_col">
                    <MyButton
                        type={"positive"}
                        text={"새 TIL 작성하기"}
                        onClick={() => navigate("/new")}
                    />
                </div>
            </div>

            {getProcessTilList().map((it) => (
                <div key={it.id}>
                    <TilItem key={it.id} {...it} />
                </div>
            ))}
        </div>
    );
};

TilList.defaultProps = {
    tilList: [],
};

export default TilList;
