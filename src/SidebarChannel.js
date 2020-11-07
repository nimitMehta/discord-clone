import React from 'react';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from './features/appSlice';
import './SidebarChannel.css';

function SidebarChannel({ id, channelName }) {

    const dispatch = useDispatch();

    const setChannelInfoDispatch = () => {
        dispatch(setChannelInfo({
            channelId: id,
            channelName: channelName
        }));
    };

    return (
        <div className="sidebarChannel" onClick={setChannelInfoDispatch}>
            <h4>
                {console.log(channelName)}
                <span className="sidebarChannel__hash">#</span>{channelName}
            </h4>
        </div>
    );
}

export default SidebarChannel;
