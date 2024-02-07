import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `새 TIL 작성하기`;
    });

    return (
        <div>
            <DiaryEditor />
        </div>
    );
};

export default New;
