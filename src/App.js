import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

// COMPOENETS

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <MyHeader
                    headText={"App"}
                    leftChild={<MyButton text={"<"} onClick={() => {}} />}
                    rightChild={<MyButton text={">"} onClick={() => {}} />}
                />
                <h2>App.js</h2>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/diary" element={<Diary />} />
                    <Route path="/edit" element={<Edit />} />
                </Routes>
                <MyButton text={"버튼"} type={"positive"} />
                <MyButton text={"버튼"} type={"negative"} />
                <MyButton text={"버튼"} type={"default"} />
            </div>
        </BrowserRouter>
    );
}

export default App;
