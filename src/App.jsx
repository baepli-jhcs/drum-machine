import { useRef, useState } from "react";
import './App.css';
import soundFiles from './soundFiles';
import useComponentWillMount from "./useComponentWillMount";

const App = () => {
    const [power, setPower] = useState(false);
    const [sound, setSound] = useState("");
    const [volume, setVolume] = useState(50);
    const [style] = useState(Array(9).fill({ "backgroundColor": "hsl(0, 0%, 15%)" }));
    let audioArray = [];
    useComponentWillMount(() => {
        document.addEventListener('keydown', (event) => {
            if (soundFiles.hasOwnProperty(event.key.toUpperCase())) {
                document.getElementById("button" + Object.keys(soundFiles).indexOf(event.key.toUpperCase())).click();
            }
        });
    }, []);
    for (let i = 0; i < Object.keys(soundFiles).length; i++) {
        audioArray.push(<div id={"button" + i} style={style[i]} className="col-3 drum-pad" onClick={() => {
            for (let i = 0; i < Object.keys(soundFiles).length; i++) {
                document.getElementsByClassName("clip")[i].volume = volume / 100;
            }
            document.getElementById(Object.keys(soundFiles)[i]).play();
            style[i] = ({ "backgroundColor": "black" })
            setTimeout(() => {
                style[i] = ({ "backgroundColor": "hsl(0, 0%, 15%)" });
            }, 0);
            setSound(soundFiles[Object.keys(soundFiles)[i]].id);
        }}><audio src={soundFiles[Object.keys(soundFiles)[i]].url} className="clip" id={Object.keys(soundFiles)[i]} key={Object.keys(soundFiles)[i]}/>{Object.keys(soundFiles)[i]}</div>);
    }
    return (
        <div className="container-fluid vh-100 w-100" id="drum-machine">
            <div className="col-12">
                <div className="col-9 row">
                    {audioArray.slice(0, 3)}
                </div>
                <div className="col-9 row">
                    {audioArray.slice(3, 6)}
                </div>
                <div className="col-9 row">
                    {audioArray.slice(6, 9)}
                </div>
            </div>
            <div id="display">
                {sound}
            </div>
            <div id="settings" className="col-md-2 bg-white">
                <div id="power-btn">
                    <label id="power-switch">
                        <input type="checkbox" onClick={() => setPower(!power)} />
                        <span id="power-slider" />
                    </label>
                </div>
                <div id="volume-slider-cont">
                    <div id="volume-slider">
                        <input type="range" min="0" max="100" value={volume} onInput={(event) => { setVolume(event.target.value) }} />
                        console
                        <progress min="0" max="100" value={volume} />
                    </div>
                    <div id="volume-value">{volume}</div>
                </div>
            </div>
        </div>
    )
}
export default App;