import React, { useEffect, useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Detail from "./pages/Detail";

const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            const newItem = {
                ...action.data,
            };
            newState = [newItem, ...state];
            break;
        }
        case "REMOVE": {
            newState = state.filter((it) => it.id !== action.targetId);
            break;
        }
        case "EDIT": {
            newState = state.map((it) =>
                it.id === action.data.id ? { ...action.data } : it
            );
            break;
        }
        default:
            return state;
    }

    localStorage.setItem("til", JSON.stringify(newState));
    return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
    const [data, dispatch] = useReducer(reducer, []);
    useEffect(() => {
        const localData = localStorage.getItem("til");

        if (localData) {
            const tilList = JSON.parse(localData).sort((a, b) =>
                parseInt(b.id - a.id)
            );
            dataId.current = parseInt(tilList[0].id + 1);

            console.log(tilList);
            console.log(dataId);

            dispatch({ type: "INIT", data: tilList });
        }
    }, []);

    const dataId = useRef(1);
    // CREATE
    const onCreate = (date, content, intelligibility) => {
        dispatch({
            type: "CREATE",
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
                intelligibility,
            },
        });
        dataId.current += 1;
    };

    // REMOVE
    const onRemove = (targetId) => {
        dispatch({ type: "REMOVE", targetId });
    };

    // EDIT
    const onEdit = (targetId, date, content, intelligibility) => {
        dispatch({
            type: "EDIT",
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                intelligibility,
            },
        });
    };

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider
                value={{ onCreate, onEdit, onRemove }}
            >
                <BrowserRouter>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/new" element={<New />} />
                            <Route path="/detail/:id" element={<Detail />} />
                            <Route path="/edit/:id" element={<Edit />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
