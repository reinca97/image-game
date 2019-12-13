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
        result: { isDone: false,  timeStamp: "" }
    },
    {
        src: list2,
        result: { isDone: false,  timeStamp: "" }
    },
    {
        src: list3,
        result: { isDone: false,  timeStamp: "" }
    },
    {
        src: list4,
        result: { isDone: false,  timeStamp: "" }
    },
    {
        src: list5,
        result: { isDone: false,  timeStamp: "" }
    },
    {
        src: list6,
        result: { isDone: false,  timeStamp: "" }
    }
];

const App = () => {
    const [dataList, setDataList] = useState(initialDataList);
    const [selectedFolder, selectFolder] = useState(null);
    const [selectedData, selectData] = useState(null);

    const onSelectData = (data, index) => {
        selectFolder(index);
        selectData(data);
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
            <div className="direction">
                <h1>💁이름 맞추기 게임</h1>
                <h2>사진을 보고 👀빠르게 해당 물건 / 인물의 이름을 말하세요!🗣</h2>
            </div>

            {selectedData === null ? (
                <div className="select-box">
                    <ul>
                        {dataList.map((data, index) => (
                            <li
                                num={index}
                                key={`k${index}`}
                                onClick={() => onSelectData(data, index)}
                                className={data.result.isDone ? "done" : ""}
                            >
                               - {index+1}번 -
                                {
                                    data.result.timeStamp &&
                                    <div>
                                        {(data.result.timeStamp*0.001).toFixed(3)}초
                                    </div>
                                }

                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <ShowPicture
                    data={selectedData}
                    setDataList={setDataList}
                    selectedFolder={selectedFolder}
                    onSetResult={onSetResult}
                />
            )}
            <div onClick={() => selectData(null)}>🐣</div>
        </div>
    );
};

export default App;
