import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useSelector } from 'react-redux';
import ChatPage from './ChatPage';

const Chat = () => {

  return (

    <>
      <ChatPage />
    </>
  );
};

export default Chat;