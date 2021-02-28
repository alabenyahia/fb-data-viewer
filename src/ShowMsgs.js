import React from 'react';
import Msg from "./Msg";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import "./ShowMsgs.css";
import filter from "lodash/filter"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function ShowMsgs(props) {
    const {id, page} = useParams();
    const basePath = process.env.PUBLIC_URL + '/data/facebook-alabenyahia18/messages/inbox/' + id;
    const [msgs, setMsgs] = useState({});
    const [filteredMsgs, setFilteredMsgs] = useState({});
    const [showAllMsgs, setShowAllMsgs] = useState(false);
    const [showFilteredMsgs, setShowFilteredMsgs] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);


    useEffect(()=> {
        fetch(basePath + '/message_' + page + '.json')
            .then(res => res.json())
            .then(data => setMsgs(data))
            .catch(e => console.log(e));
    }, []);

    useEffect(()=>{
        if (msgs.hasOwnProperty('messages')) {
            setMaxDate(new Date(msgs['messages'][0]['timestamp_ms']))
            setMinDate(new Date(msgs['messages'][msgs['messages'].length-1]['timestamp_ms']));
        }
    },[msgs]);
    console.log(minDate);
    console.log(maxDate);

    const renderMsgs = isFiltered => {
        if (isFiltered && filteredMsgs.length >0) {
            return filteredMsgs.map((item) => (
                <Msg key={item['timestamp_ms']} from={item['sender_name']}
                     msg={item['content']?item['content']:null}
                     videos={item['videos']?item['videos']:null}
                     photos={item['photos']?item['photos']:null}
                     gifs={item['gifs']?item['gifs']:null}
                     audioFiles={item['audio_files']?item['audio_files']:null}
                     isUnsent={item['is_unsent']}
                     date={item['timestamp_ms']}/>
            ));

        } else if (msgs.hasOwnProperty('messages')) {
            return msgs['messages'].map((item) => (
                <Msg key={item['timestamp_ms']} from={item['sender_name']}
                     msg={item['content']?item['content']:null}
                     videos={item['videos']?item['videos']:null}
                     photos={item['photos']?item['photos']:null}
                     gifs={item['gifs']?item['gifs']:null}
                     audioFiles={item['audio_files']?item['audio_files']:null}
                     isUnsent={item['is_unsent']}
                     date={item['timestamp_ms']}/>
            ));
        }

        return 'No messages found';
    }
    return (
        <div className='show-msgs'>
            <div className='show-msgs__topbar'>
                <div className="show-msgs__topbar__pickers">
                    <p>Choose Start Date</p>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        showTimeSelect
                        minDate={minDate}
                        maxDate={maxDate}
                        dateFormat="MMMM d, yyyy H:mm"
                    />

                    <p>Choose End Date</p>
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        showTimeSelect
                        minDate={minDate}
                        maxDate={maxDate}
                        dateFormat="MMMM d, yyyy H:mm"
                    />
                </div>

                <div className="show-msgs__topbar__btns">
                    <button className='show-msgs__show-filtered-btn' onClick={async ()=> {
                        const filtered = await filter(msgs['messages'], function(o) { return o['timestamp_ms']>=startDate && o['timestamp_ms']<=endDate; })
                        await setFilteredMsgs(filtered);
                        if (showAllMsgs) setShowAllMsgs(false);
                        setShowFilteredMsgs(!showFilteredMsgs);
                    }}>{showFilteredMsgs ? 'Hide Filtered': 'Show Filtered'}</button>

                    <button className='show-msgs__show-all-btn' onClick={()=> {
                        if (showFilteredMsgs) setShowFilteredMsgs(false);
                        setShowAllMsgs(!showAllMsgs);
                    }}>{showAllMsgs ? 'Hide All': 'Show All'}</button>
                </div>

            </div>

            {showAllMsgs  && renderMsgs(false)}
            {showFilteredMsgs  && renderMsgs(true)}
        </div>
    );
}

export default ShowMsgs;