import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import publicAxios from '../../axios';
import Navigation from '../Navbar/UserNav';
import { Image_URL } from '../../constants/constans';
import PublicAxios from '../../axios';

const ChatPage = () => {
    const user = useSelector((state) => state.user)
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [headerData, setHeaderData] = useState('')
    const [fetchGroup, setFetchGroup] = useState('')
    const [roomname, setRoomname] = useState(null);
    const [memberUsernames, setMemberUsernames] = useState([]);
    const [groupId, setGroupId] = useState(null)

    const fetchMemberUsernames = async () => {
        if (headerData && headerData.members) {
            const memberIds = headerData.members.slice(0, 4);
            try {
                const response = await publicAxios.get('/userName', {
                    params: { member_id: memberIds }
                });
                setMemberUsernames(response.data);
            } catch (error) {
                console.error('Error fetching usernames:', error.message);
                setMemberUsernames([]);
            }
        }
    };
    useEffect(() => {
        fetchMemberUsernames();
    }, [headerData]);
    
    const fetchGroupMessage = async (id, data) => {
        try {
            setRoomname(id);
            setHeaderData(data)
            const response = await publicAxios.get('/chat/fetchMessage', { params: { id } }, {
                headers: {
                    'Content-Type': 'application/Json',
                },
                withCredentials: true,
            });

            setMessages(response.data)
            setGroupId(id)

        } catch (error) {
            console.log('Error fetching group message :', error);
        }
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
          if (groupId) {
            fetchGroupMessage(groupId, headerData);
          }
        }, 3000);
    
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
      }, [groupId, headerData]);
    
    // const client = new WebSocket(`wss://symplycode.basith.shop/ws/chat/${roomname}/`);

    useEffect(() => {
        const fetchRoomCourse = async () => {
            try {
                const response = await publicAxios.get('/chat/fetchRoom', {
                    params: { id: user.user_id },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                setFetchGroup(response.data);
            } catch (error) {
                console.log('smothing issues', error);
            }
        };
        fetchRoomCourse();
    }, []);

    // useEffect(() => {
    //     // const client = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomname}/`);
    //     const client = new WebSocket(`wss://symplycode.basith.shop/ws/chat/${roomname}/`);

    //     client.onopen = () => {
    //         console.log('WebSocket Client Connected');
    //     };

    //     client.onerror = (error) => {
    //         console.error('WebSocket Error:', error);
    //     };

    //     let messageListener = null;

    //     messageListener = (message) => {
    //         const messageData = JSON.parse(message.data);
    //         setMessages((prevMessages) => [...prevMessages, messageData]);
    //     };

    //     client.onmessage = messageListener;

    //     return () => {

    //         if (messageListener) {
    //             client.onmessage = null;
    //         }
    //         client.close();
    //     };
    // }, [roomname]);


    // const sendMessage = () => {
    //     if (client.readyState === client.OPEN) {
    //         if (inputMessage) {
    //             const messageData = {
    //                 text: inputMessage,
    //                 sender: user.username,
    //             };
    //             client.send(JSON.stringify(messageData));
    //             setInputMessage('');
    //         }
    //     } else {
    //         console.error('WebSocket connection not open');
    //     }
    // };
    const sendMessage = async () => {
        if (inputMessage) {
            const messageData = {
                text: inputMessage,
                sender: user.username,
                groupId:groupId
            };
            const response=await PublicAxios.post('/chat/save-message',messageData,{
                headers:{
                    "Content-Type":"application/json",
                },
                withCredentials:true,
            })
            setInputMessage('');
        }
    }
        const getTimeDifference = (timestamp) => {
            const now = new Date();
            const messageTime = new Date(timestamp);
            const timeDifference = now - messageTime;

            if (timeDifference < 60000) {
                // Less than 1 minute ago
                return `${Math.floor(timeDifference / 1000)} s ago`;
            } else if (timeDifference < 3600000) {
                // Less than 1 hour ago
                return `${Math.floor(timeDifference / 60000)} m ago`;
            } else if (timeDifference < 86400000) {
                // Less than 1 day ago
                return `${Math.floor(timeDifference / 3600000)} h ago`;
            } else {
                // More than 1 day ago
                return `${Math.floor(timeDifference / 86400000)} d ago`;
            }
        };
        return (
            <>
                <div>
                    <div className="w-full h-32 " style={{ backgroundColor: '#449388' }}></div>
                    <div className="container mx-auto" style={{ marginTop: '-128px' }}>
                        <div className="py-6 h-screen">
                            <div className="flex border border-grey rounded shadow-lg h-full">

                                {/* <!-- Left --> */}

                                <div className="w-1/3 border flex flex-col">

                                    {/* <!-- Header --> */}
                                    <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">

                                        <div className="flex">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#727A7E" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path></svg>
                                            </div>
                                            <div className="ml-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".55" fill="#263238" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path></svg>
                                            </div>
                                            <div className="ml-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Search --> */}
                                    <div className="py-2 px-2 bg-grey-lightest">
                                        <input type="text" className="w-full px-2 py-2 text-sm" placeholder="Search or start new chat" />
                                    </div>

                                    {/* <!-- Contacts --> */}
                                    <div className="bg-grey-lighter flex-1 overflow-auto">
                                        {Array.isArray(fetchGroup) && fetchGroup.length > 0 ? (
                                            fetchGroup.map((group) =>
                                            (<div onClick={() => fetchGroupMessage(group.id, group)} className="px-3 flex items-center bg-grey-light cursor-pointer">
                                                {group.course.cover_image ?
                                                    (<div>
                                                        <img className="h-12 w-12 rounded-full"
                                                            src={`${Image_URL}${group.course.cover_image}`} />
                                                    </div>) :
                                                    (<div>
                                                        <img className="h-12 w-12 rounded-full"
                                                            src="https://www.svgrepo.com/show/4552/user-groups.svg" />
                                                    </div>)}
                                                <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                    <div className="flex items-bottom justify-between">
                                                        <p className="text-grey-darkest">
                                                            {group.title}
                                                        </p>
                                                        <p className="text-xs text-grey-darkest">
                                                            12:45 pm
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>))
                                        ) : (
                                            <p>No groups found</p>
                                        )}
                                    </div>
                                </div>
                                {/* <!-- Right --> */}
                                {!groupId ?
                                    (
                                        <div className="w-2/3 border flex flex-col justify-center items-center">
                                            <p>Please select any group</p>
                                        </div>) :
                                    (<div className="w-2/3 border flex flex-col">

                                        {/* <!-- Header --> */}

                                        <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                                            {headerData &&
                                                <div className="flex items-center">
                                                    <div>
                                                        <img className="w-10 h-10 rounded-full" src={`${Image_URL}${headerData.course.cover_image}`} />
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-grey-darkest">
                                                            {headerData.title}
                                                        </p>
                                                        <p className="text-grey-darker text-xs mt-1">
                                                            {memberUsernames.map((user, index) => (
                                                                <span key={index}>{user.username}, </span>
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>}

                                            <div className="flex">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".5" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
                                                </div>
                                                <div className="ml-6">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".5" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg>
                                                </div>
                                                <div className="ml-6">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Messages --> */}
                                        <div className="flex-1 overflow-auto" style={{ backgroundColor: '#DAD3CC' }}>
                                            <div className="py-2 px-3">

                                                <div className="flex justify-center mb-2">
                                                    <div className="rounded py-2 px-4" style={{ backgroundColor: '#DDECF2' }}>
                                                        <p className="text-sm uppercase">
                                                            February 20, 2018
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex justify-center mb-4">
                                                    <div className="rounded py-2 px-4" style={{ backgroundColor: '#FCF4CB' }}>
                                                        <p className="text-xs">
                                                            Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* messages */}
                                                {messages.map((msg, index) => {
                                                    return msg.sender === user.username ?
                                                        (<div className="flex justify-end mb-2">
                                                            <div className="rounded py-2 px-3" style={{ backgroundColor: '#E2F7CB' }}>
                                                                <p className="text-sm mt-1">
                                                                    {msg.text}
                                                                </p>
                                                                <p className="text-right text-xs text-grey-dark mt-1">
                                                                    {getTimeDifference(msg.timestamp)}
                                                                </p>
                                                            </div>
                                                        </div>) :
                                                        (<div className="flex mb-2">
                                                            <div className="rounded py-2 px-3" style={{ backgroundColor: '#F2F2F2' }} >
                                                                <p className="text-sm text-teal">{msg.sender}
                                                                    {/* {msg.sender === user.username ? (<strong>Me</strong>) : (<strong>{msg.sender}</strong>)} */}
                                                                </p>
                                                                <p className="text-sm mt-1">
                                                                    {msg.text}
                                                                </p>
                                                                <p className=" text-xs text-grey-dark mt-1">
                                                                    {getTimeDifference(msg.timestamp)}
                                                                </p>
                                                            </div>
                                                        </div>)
                                                })}

                                            </div>
                                        </div>

                                        {/* <!-- Input --> */}
                                        <div className="bg-grey-lighter px-4 py-4 flex items-center">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".45" fill="#263238" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg>
                                            </div>
                                            <div className="flex-1 mx-4" >
                                                <input
                                                    className="w-full border rounded px-2 py-2"
                                                    type="text"
                                                    placeholder="Type a message..."
                                                    value={inputMessage}
                                                    onChange={(e) => setInputMessage(e.target.value)}
                                                />
                                            </div>
                                            <div className='flex'>
                                                <div className='p-1'>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24">
                                                        <path
                                                            fill="#263238"
                                                            fill-opacity=".45"
                                                            d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z">
                                                        </path>
                                                    </svg>
                                                </div>
                                                <button className='p-1' onClick={sendMessage}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-onClick={()=>sendMessage}6" onClick={() => sendMessage}>
                                                        <path fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    export default ChatPage
