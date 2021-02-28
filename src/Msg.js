import React from 'react';
import "./Msg.css";
import date from 'date-and-time';
const fixUtf8 = require('fix-utf8');

function Msg(props) {
    return (
        <div className={`msg ${props.from.toLowerCase()==='ala ben yahia' ? 'from-me':''}`}>
            <p className='msg__from'>{props.from}</p>
            {props.isUnsent && <p className='msg__unsent'>MESSAGE IS UNSENT</p>}

            {(!props.isUnsent) && props.msg && <p className='msg__msg'>{fixUtf8(props.msg)}</p>}

            {props.photos && props.photos.map((photo, index) =>
                <img key={photo['creation_timestamp'] || index} src={process.env.PUBLIC_URL+ '/data/facebook-alabenyahia18/' + photo['uri']} alt="Message img"/> ) }

            {props.gifs && props.gifs.map((gif, index) =>
                <img key={index} src={process.env.PUBLIC_URL+ '/data/facebook-alabenyahia18/' + gif['uri']} alt="Message gif"/> ) }

            {props.videos && props.videos.map((video, index) =>
                <video key={video['creation_timestamp'] || index}
                       src={process.env.PUBLIC_URL+ '/data/facebook-alabenyahia18/' +video['uri']} controls/>)}

            {props.audioFiles && props.audioFiles.map((audio, index) =>
                <audio key={audio['creation_timestamp'] || index}
                       src={process.env.PUBLIC_URL+ '/data/facebook-alabenyahia18/' +audio['uri']} controls/>)}

            <p className='msg__date'>{date.format(new Date(props.date), 'DD, MMMM YYYY à HH:mm:ss ')}</p>
        </div>
    );
}

export default Msg;