import './App.css';
import Routing from "./Routing";
import {GlobalContext} from "./context/GlobalState";
import {useEffect, useContext} from "react";
import {ALL_CONVERS_PATH} from "./data";

function App() {
    const {setAllConver} = useContext(GlobalContext);

    useEffect(()=> {
        fetch(ALL_CONVERS_PATH)
            .then(res => res.json())
            .then(data => setAllConver(data));
    }, []);

  return (
    <div className="App">
        <Routing/>
    </div>
  );
}

export default App;
