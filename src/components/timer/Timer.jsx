import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useTasks } from "../../context/tasks-context/TaskProvider";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "./timer.css";

const playingStyle = {
    backgroundColor: "var(--PRIMARY-500)",
};

const TimerData = ({ remainingTime, originalTime }) => {
    let minutes = Math.floor(remainingTime / 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const seconds =
        remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60;
    
    useDocumentTitle(`${minutes}m : ${seconds}s`);

    return (
        <div className="timer-data-container">
            <h1 className="timer-data">{`${minutes}m : ${seconds}s`}</h1>
            <h3 className="timer-data">{`Out of ${originalTime} min`}</h3>
        </div>
    );
};

export default function Timer({ time, width }) {
    const [isPlaying, setIsplaying] = useState(false);
    const [key, setKey] = useState(uuid());
    const { taskList } = useTasks();
    const { taskId } = useParams();
    const [ timeSeconds, setTimeSeconds]  = useState(0);

    const task = taskList.find((task) => task.id === taskId);
    const { isCompleted } = task;
    useEffect(() => {
        if (isCompleted) {
            setIsplaying(false);
        }
    }, [isCompleted]);

    const play = () => {
        setIsplaying(true);
    };

    const pause = () => {
        setIsplaying(false);
    };

    const reset = () => {
        setIsplaying(false);
        setKey(uuid());
    };

    useEffect(() => {
        let interval;
        if (isPlaying && timeSeconds) {
            let myTime = timeSeconds -1
            interval = setInterval(() => {
                const mins = Math.floor(myTime / 60);
                const secs = Math.floor(myTime % 60);
                myTime--;
                document.title = `${mins<10?`0${mins}`:mins}m : ${secs<10?`0${secs}`:secs}s`;
            }, 1000);
        }

        return function(){  clearInterval(interval)};
    }, [isPlaying]);

    return (
        <div>
            <CountdownCircleTimer
                key={key}
                isPlaying={isPlaying}
                duration={time * 60}
                size={(width ?? false) && width > 275 ? 275 : (width ?? 275)}
                strokeWidth={22}
                colors={["#00cf60", "#00cf60"]}
                updateInterval={0.5}
                colorsTime={[time * 60, 0]}
            >
                {({ remainingTime }) => {
                    if (remainingTime === 0) {
                        setIsplaying(false);
                    }

                    setTimeSeconds(remainingTime)
                    
                    return (
                        <TimerData
                            remainingTime={remainingTime}
                            originalTime={time}
                        />
                    );
                }}
            </CountdownCircleTimer>
            <div className="timer-cta">
                <button
                    style={!isPlaying ? playingStyle : {}}
                    className="timer-button"
                    onClick={pause}
                    disabled={isCompleted}
                >
                    <span className="material-icons btn-icon-lg">pause</span>
                </button>
                <button
                    style={isPlaying ? playingStyle : {}}
                    className="timer-button play-button"
                    onClick={play}
                    disabled={isCompleted}
                >
                    <span className="material-icons ">play_arrow</span>
                </button>
                <button
                    className="timer-button"
                    onClick={reset}
                    disabled={isCompleted}
                >
                    <span className="material-icons btn-icon-lg">
                        restart_alt
                    </span>
                </button>
            </div>
        </div>
    );
}
