import React from 'react';
import {Switch, Route} from "react-router-dom"
import ChooseFbFriend from "./ChooseFbFriend";
import ShowMsgs from "./ShowMsgs";

function Routing(props) {
    return (
        <Switch>

            <Route path='/conver/:id/:page'>
                <ShowMsgs />
            </Route>

            <Route path='/'>
                <ChooseFbFriend/>
            </Route>
        </Switch>
    );
}

export default Routing;