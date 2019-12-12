import React, { useState } from "react";
import "./components/style.scss";
import list1 from "./images/1";
import list2 from "./images/2";
import list3 from "./images/3";
import list4 from "./images/4";
import list5 from "./images/5";
import list6 from "./images/6";
import ShowPicture from "./components/showPicture";

const initialDataList = [
    {
        src: list1,
        result: { isDone: false, correct: [], incorrect: [], time: "" }
    },
    {
        src: list2,
        result: { isDone: false, correct: [], incorrect: [], time: "" }
    },
    {
        src: list3,
        result: { isDone: false, correct: [], incorrect: [], time: "" }
    },
    {
        src: list4,
        result: { isDone: false, correct: [], incorrect: [], time: "" }
    },
    {
        src: list5,
        result: { isDone: false, correct: [], incorrect: [], time: "" }
    },
    {
        src: list6,
        result: { isDone: false, correct: [], incorrect: [], time: "" }
    }
];

const App = () => {
    const [dataList, setDataList] = useState(initialDataList);
    const [selectedFolder, selectFolder] = useState(null);
    const [selectedList, selectList] = useState(null);

    const onSelectData = (data, index) => {
        selectFolder(index);
        selectList(data.src);
    };

    const onSetResult = (index, result) => {
        let tempDataList = [...dataList];
        tempDataList[index] = {
            ...tempDataList[index],
            result: result
        };
        setDataList(tempDataList);
    };

    return (
        <div className="App">
            <div onClick={() => selectList(null)}>🐣</div>
            <div className="direction">
                <h1>이름 맞추기 게임</h1>
                <h2>사진을 보고 빠르게 해당 물건/인물의 이름을 말하세요!</h2>
            </div>

            {selectedList === null ? (
                <div className="select-box">
                    <ul>
                        {dataList.map((data, index) => (
                            <li
                                num={index}
                                key={`k${index}`}
                                onClick={() => onSelectData(data, index)}
                                className={data.result.isDone ? "done" : ""}
                            >
                                {index + 1}({data.result.correct.length})
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <ShowPicture
                    img={selectedList}
                    selectedFolder={selectedFolder}
                    onSetResult={onSetResult}
                />
            )}
        </div>
    );
};

export default App;
