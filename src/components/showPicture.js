import React, { useState, useEffect } from "react";

const ShowPicture = props => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImg, setCurrentImg] = useState(null);
    const [correctArr, setCorrectArr] = useState([]);
    const [incorrectArr, setIncorrectArr] = useState([]);
    const [answerStr, setAnswerStr] = useState("");

    const maxIndex = 9;

    useEffect(() => {
        setCurrentImg(props.img[0]);
    }, [props.img]);

    const showNextPic = correct => {
        console.log(currentIndex);
        setAnswerStr(currentImg.title);
        const nextIndex = currentIndex + 1;

        if(maxIndex<=nextIndex){
            props.onSetResult(
                props.selectedFolder,
                {
                    isDone:true,
                    correct:correctArr,
                    incorrect:incorrectArr
                }
            );
            return;
        }

        if(currentIndex!==0){
            correct? (setCorrectArr([...correctArr,currentImg.title])):(
                setIncorrectArr([...incorrectArr,currentImg.title])
            );
        }


        window.setTimeout(()=>{
            setCurrentImg(props.img[nextIndex]);
            setCurrentIndex(nextIndex);
            setAnswerStr("");
        },1000);

    };

    return (
        <section>
            {currentImg !== null && (
                <div className="img-box">
                    <img src={currentImg.src} alt="" />
                </div>
            )}

            <div className="answer">
                {answerStr}
            </div>

            <div className="button-wrapper">
                <button
                    className="incorrect"
                    onClick={() => showNextPic(false)}
                >
                    X
                </button>
                <button className="correct" onClick={() => showNextPic(true)}>
                    O
                </button>
            </div>
        </section>
    );
};

export default ShowPicture;
