import React, {useState} from 'react';
import "./ChooseFbFriend.css";
import {Link, useHistory} from "react-router-dom";
import find from "lodash/find";
import {GlobalContext} from "./context/GlobalState";
import {useContext} from "react"


function ChooseFbFriend(props) {
    const [name, setName] = useState("");
    const [showAllConvers, setShowAllConvers] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const history = useHistory();
    const {allConvers} = useContext(GlobalContext);

    const handleSubmit = e => {
        e.preventDefault();
        setNotFound(false);
        if (name.length > 0) {
            const obj = find(allConvers['conversations'], {name});
            if (obj) {
                history.push(`/conver/${obj['name']}_${obj['id']}/1`);
            } else {
                setNotFound(true);
            }
        }
    }


    const showConverList = () => {
        return allConvers['conversations'].map((item) => (
            <li key={item.id}><Link to={`/conver/${item.name}_${item.id}/1`}>{item.name}</Link></li>
        ))
    }

    return (
        <div className='ChooseFbFriend'>
            {notFound && <p>Friend Not Found</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">FB Conversation Name</label><input type="text" id="name" value={name}
                                                                   onChange={(e) => setName(e.target.value)}/>
                <input type="submit" value='GO'/>
            </form>
            <button onClick={()=>setShowAllConvers(!showAllConvers)}>{showAllConvers?'Hide All' : 'Show All'}</button>

            {
                allConvers.hasOwnProperty('conversations') && showAllConvers &&
                <ul>
                    {showConverList()}
                </ul>
            }
        </div>


    );
}

export default ChooseFbFriend;