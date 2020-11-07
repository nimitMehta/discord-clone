import React from 'react';
import { useSelector } from 'react-redux';
import './ChatHeader.css';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationRoundedIcon from '@material-ui/icons/EditLocationRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import { selectChannelName } from './features/appSlice';

function ChatHeader() {

    const channelName = useSelector(selectChannelName);

    return (
        <div className="chatHeader">
            {/* #1.1 */}
            <div className="chatHeader__left">
                <h3>
                    <span className="chatHeader__hash">#</span>
                    {channelName ? channelName : ":)"}
                </h3>
            </div>
            {/* #1.2 */}
            <div className="chatHeader__right">
                {/* #1.2.1 */}
                <NotificationsIcon />
                <EditLocationRoundedIcon />
                <PeopleAltRoundedIcon />
                {/* #1.2.2 */}
                <div className="chatHeader__search">
                    <input placeholder="Search" />
                    <SearchRoundedIcon />
                </div>
                <SendRoundedIcon />
                <HelpRoundedIcon />
            </div>
        </div>
    );
}

export default ChatHeader;
