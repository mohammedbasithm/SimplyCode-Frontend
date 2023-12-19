import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useSelector } from 'react-redux';
import ChatPage from './ChatPage';

const Chat = () => {
  // const api  = useApi()
  // const user = useSelector((state) => state.user)
  // const [messages, setMessages] = useState([]);
  // const [inputMessage, setInputMessage] = useState('');
  // const roomname = 'hello'


  // const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${roomname}/`);


  // useEffect(() => {

  //   client.onopen = () => {
  //     console.log('WebSocket Client Connected');
  //   };

  //   client.onerror = (error) => {
  //     console.error('WebSocket Error:', error);
  //   };


  //   return () => {
  //     client.onmessage = null;

  //   };

  // }, []);

  // useEffect(() => {
  //   client.onmessage = (message) => {
  //     console.log('Received:', message.data);
  //     const messageData = JSON.parse(message.data);
  //     setMessages((prevMessages) => [...prevMessages, messageData]);
  //   };

  // }, [])


  //   const loadMessages = async () => {
  //     try {
  //         const response = await api.get(`families/get-messages/${room_id}/`);


  //       console.log(response.data , 'response))))))))************))))))))))))')
  //       const historyData = response.data;

  //       setMessages((prevMessages) => [...prevMessages, ...historyData]);

  //     } catch (error) {
  //       console.error('Error fetching comments:', error);
  //     }
  //   };


  // const sendMessage = () => {
  //   if (inputMessage) {
  //     const messageData = {
  //       text: inputMessage,
  //       sender: user.username,

  //     };
  //     client.send(JSON.stringify(messageData));
  //     setInputMessage('');
  //   }
  // };

  //   useEffect(() => {
  //     loadMessages()
  //   }, [])




  return (

    // <div className="max-w-screen-xl mx-auto mt-8 flex ">
    //   <div className="w-1/4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-300 p-6 rounded-3xl">

    //   </div>
    //   {/* 3/4 width for chat messages */}
    //   <div className="flex-grow pr-4 relative">
    //     <div className="w-3/4 mx-auto bg-stone-100 p-8 rounded-lg  h-screen ">
    //       <h1 className="text-2xl mb-4">Chat Room: {roomname}</h1>
    //       <div className="flex flex-col space-y-4 bg-slate-100 overflow-y-auto max-h-[80vh] ">
    //         {messages.map((msg, index) => (
    //           <div key={index} className={`flex flex-col items-${msg.sender === user.username ? 'end' : 'start'}`}>
    //             <div className="mb-2">
    //               {msg.sender === user.username ? (<strong>Me</strong>) : (<strong>{msg.sender}</strong>)}
    //             </div>
    //             <div
    //               className={`p-1 px-3 rounded-lg ${msg.sender === user.username ? 'bg-green-500 text-white' : 'bg-slate-300 text-black'
    //                 }`}
    //             >
    //               {msg.text}
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //       <div className="fixed  w-3/4 max-auto bottom-0 bg-[#DAD3CC] p-2 flex-grow">
    //         <input
    //           type="text"
    //           value={inputMessage}
    //           onChange={(e) => setInputMessage(e.target.value)}
    //           placeholder="Type your message..."
    //           className="p-2 border border-gray-300 rounded-xl mr-2 flex-grow w-3/4 ml-16"
    //         />
    //         <button
    //           onClick={sendMessage}
    //           className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
    //         >
    //           Send
    //         </button>
    //       </div>

    //     </div>
    //   </div>
    // </div>
<>
<ChatPage/>
</>
  );
};

export default Chat;