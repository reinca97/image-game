import React from "react";

const leftPad = (width, n) => {
    if ((n + "").length > width) {
        return n;
    }
    const padding = new Array(width).join("0");
    return (padding + n).slice(-width);
};

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.update =this.update.bind(this);

        this.state = this.initialState = {
            timeElapsed: 0
        };
    }

    start() {
        this.startTimer();
        this.props.showNextPic();
    }

    stop() {
        clearInterval(this.timer);
        this.props.getResultTime(this.state.timeElapsed);
    }


    startTimer() {
        this.startTime = Date.now();
        this.timer = setInterval(this.update, 10);
    }

    update() {
        const delta = Date.now() - this.startTime;
        this.setState({ timeElapsed: this.state.timeElapsed + delta });
        this.startTime = Date.now();
    }

    render() {
        const { timeElapsed } = this.state;
        return (
            <div className="button-wrapper">
                <TimeElapsed id="timer" timeElapsed={timeElapsed} />

                {this.props.currentIndex === 0 ? (
                    <button className="correct" onClick={() => this.start()}>
                        시작
                    </button>
                ) : this.props.currentIndex === this.props.maxIndex - 1 ? (
                    <button className="incorrect" onClick={() => this.stop()}>
                        종료
                    </button>
                ) : (
                    <button
                        className="correct"
                        onClick={this.props.showNextPic}
                    >
                        다음
                    </button>
                )}
            </div>
        );
    }
}

class TimeElapsed extends React.Component {
    getUnits() {
        const seconds = this.props.timeElapsed / 1000;
        return {
            min: Math.floor(seconds / 60).toString(),
            sec: Math.floor(seconds % 60).toString(),
            msec: (seconds % 1).toFixed(3).substring(2)
        };
    }
    render() {
        const units = this.getUnits();
        return (
            <div id={this.props.id} className="time">
                <span>{leftPad(2, units.min)}:</span>
                <span>{leftPad(2, units.sec)}.</span>
                <span>{units.msec}</span>
            </div>
        );
    }
}

export default Stopwatch;
