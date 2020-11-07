import { Avatar } from '@material-ui/core';
import React from 'react';
import './Message.css';

function Message({ user: { photo, displayName }, timestamp, message }) {

    return (
        <div className="message">
            {/* #2.1 */}
            <Avatar src={photo} />
            {/* #2.2 */}
            <div className="message__info">
                <h4>{displayName}
                    <span className="message__timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>

                <p>{message}</p>
            </div>
        </div>
    );
}

export default Message;
