import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';
import firebase from 'firebase';

function Chat() {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState([]);
    const channelName = useSelector(selectChannelName);
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);

    useEffect(() => {
        if (channelId) {
            db.collection('channels').doc(channelId).collection('messages')
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    setMessages(
                        snapshot.docs.map((doc) => doc.data())
                    );
                });
        }
    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('channels').doc(channelId).collection('messages')
            .add({
                message: input,
                user: user,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

        setInput(' ');
    };

    return (
        <div className="chat">
            {/* #1 */}
            <ChatHeader />

            {/* #2 */}
            <div className="chat__messages">
                {messages.map((message) =>
                    <Message
                        timestamp={message.timestamp}
                        message={message.message}
                        user={message.user}
                    />
                )}
            </div>

            {/* #3 */}
            <div className="chat__input">
                {/* #3,1 */}
                <AddCircleIcon fontSize="large" />
                {/* #3.2 */}
                <form>
                    <input
                        placeholder={channelName ? (`Message #${channelName}`) : `Select Channel to Message`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={!channelId}
                    />
                    <button
                        className="chat__inputButton"
                        type='submit'
                        disabled={!channelId}
                        onClick={sendMessage}
                    >
                        Send Message
                    </button>
                </form>
                {/* #3.3 */}
                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>

        </div>
    );
}

export default Chat;
