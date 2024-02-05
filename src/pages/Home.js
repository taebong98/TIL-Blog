import { useContext } from "react";
import { DiaryStateContext } from "../App";

const Home = () => {
    const tliList = useContext(DiaryStateContext);

    return (
        <div>
            <h4>{tliList.length}개의 TIL가 있습니다.</h4>
            
            <h1>Home</h1>
            <p>이곳은 홈 입니다.</p>
            
        </div>
    );
};

export default Home;
