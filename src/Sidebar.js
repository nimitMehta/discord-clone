import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import db, { auth } from "./firebase";
import { selectUser } from "./features/userSlice";
import firebase from "firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            channel: doc.data(),
          }))
        );
      });
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter the Channel Name");
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return (
    <div className="sidebar">
      {/* #1 */}
      <div className="sidebar__top">
        <h3>Nimit's Chat Room</h3>
        <ExpandMoreIcon />
      </div>

      {/* #2 */}
      <div className="sidebar__channels">
        {/* #2.1 */}
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon className="sidebar__addChannel" onClick={handleAddChannel} />
        </div>
        {/* #2.2 */}
        <div className="sidebar__channelsList">
          {channels.map((channel) => (
            <SidebarChannel
              key={channel.id}
              id={channel.id}
              channelName={channel.channel.channelName}
            />
          ))}
        </div>
      </div>

      {/* #3 */}
      <div className="sidebar__voice">
        {/* #3.1 */}
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        {/* #3.2 */}
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        {/* #3.3 */}
        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      {/* #4 */}
      <div className="sidebar__profile">
        {/* #4.1 */}
        <Avatar
          className="sidebar__avatarIcon"
          src={user.photo}
          onClick={() => auth.signOut()}
        />
        <span className="sidebar__hoverText">Click to Logout</span>
        {/* #4.2 */}
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 8)}</p>
        </div>
        {/* #4.3 */}
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
