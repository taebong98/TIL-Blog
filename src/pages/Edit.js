import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    const [originData, setOriginDate] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    const tilList = useContext(DiaryStateContext);

    useEffect(() => {
        if (tilList.length >= 1) {
            const targetTil = tilList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );

            if (targetTil) {
                setOriginDate(targetTil);
            } else {
                navigate("/", { replace: true });
            }
        }
    }, [id, tilList]);

    return (
        <div>
            {originData && (
                <DiaryEditor isEdit={true} originData={originData} />
            )}
        </div>
    );
};

export default Edit;
