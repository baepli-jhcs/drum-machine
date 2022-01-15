import { useEffect, useState } from "react";
import './App.css';
import soundFiles from './soundFiles';
import useComponentWillMount from "./useComponentWillMount";

const App = () => {
    const [sound, setSound] = useState("");
    const [style, setStyle] = useState(Array(9).fill({ "backgroundColor": "hsl(0, 0%, 15%)" }));
    let audioArray = [];
    useComponentWillMount(() => {
        document.addEventListener('keydown', (event) => {
            if (soundFiles.hasOwnProperty(event.key.toUpperCase())) {
                document.getElementById("button" + Object.keys(soundFiles).indexOf(event.key.toUpperCase())).click();
            }
        });
    }, []);
    useEffect(() => {
        for (let i = 0; i < Object.keys(soundFiles).length; i++) {
            document.getElementsByClassName("clip")[i].volume = 0.5;
        }
    });
    for (let i = 0; i < Object.keys(soundFiles).length; i++) {
        audioArray.push(<div id={"button" + i} style={style[i]} className="drum-pad" onClick={() => {
            document.getElementById(Object.keys(soundFiles)[i]).play();
            const newStyle = style.slice()
            newStyle[i] = ({ "backgroundColor": "black" });
            setStyle(newStyle);
            setTimeout(() => {
                const newStyle = style.slice()
                newStyle[i] = ({ "backgroundColor": "hsl(0, 0%, 15%)" });
                setStyle(newStyle);
            }, 250);
            setSound(soundFiles[Object.keys(soundFiles)[i]].id);
        }}><audio src={soundFiles[Object.keys(soundFiles)[i]].url} className="clip" id={Object.keys(soundFiles)[i]} key={Object.keys(soundFiles)[i]} />{Object.keys(soundFiles)[i]}</div>);
    }
    return (
        <div className="container-fluid vh-100 w-100" id="drum-machine">
            <div id="audio-grid">
                {audioArray}
            </div>
            <div id="display">
                {sound}
            </div>
        </div>
    )
}
export default App;