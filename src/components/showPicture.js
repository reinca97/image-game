import React, { useState, useEffect, useRef } from "react";
import Stopwatch from "./stopwatch";

const ShowPicture = props => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImg, setCurrentImg] = useState(null);
    const maxIndex = 11;

    useEffect(() => {
        setCurrentImg(props.data.src[0]);
    }, [props.data]);

    const showNextPic = () => {
        const nextIndex = currentIndex + 1;
        setCurrentImg(props.data.src[nextIndex]);
        setCurrentIndex(nextIndex);
    };

    const getResultTime = timeStamp => {
        props.onSetResult(props.selectedFolder, {
            isDone: true,
            timeStamp: timeStamp
        });
    };

    return (
        <section>
            {currentImg !== null && (
                <div className="img-box">
                    <img src={currentImg.src} alt="" />
                </div>
            )}

            <div>
                <div className="display-index">
                    {currentIndex}/{maxIndex - 1}
                </div>

                <Stopwatch
                    showNextPic={showNextPic}
                    currentIndex={currentIndex}
                    maxIndex={maxIndex}
                    getResultTime={getResultTime}
                />
            </div>
        </section>
    );
};

export default ShowPicture;
