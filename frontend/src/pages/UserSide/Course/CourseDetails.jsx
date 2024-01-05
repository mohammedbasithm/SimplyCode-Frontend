import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player';
import Navigation from '../../../Component/Navbar/UserNav';
import { useEffect } from 'react';
import PublicAxios from '../../../axios';
import { useSelector } from 'react-redux';
import { Image_URL } from '../../../constants/constans';

const CourseDetails = () => {
    const isAuth = useSelector((state) => state.user)
    const user_id = isAuth.user_id
    const { id: courseId } = useParams()
    const [currentVideo, setCurrentVideo] = useState('')
    const [chapterDetails, setChapterDetails] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState('')
    const [paymentsDetails, setPaymentDetails] = useState('')

    useEffect(() => {
        const chapterFetchdata = async () => {
            try {
                const response = await PublicAxios.get('/course/fetchchapter', { params: { courseId } });
                setChapterDetails(response.data);
                setCurrentVideo(Image_URL + response.data[0].videos)
                setDescription(response.data[0].description)
            } catch (error) {
                console.log('fetching chapter faild', error);
            }
        }

        const fetchPaymentData = async () => {
            try {
                const response = await PublicAxios.get('/course/fetchpaymentsData', {
                    params: {
                        course_id: courseId,
                        user_id: isAuth.user_id,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                setPaymentDetails(response.data.is_paid)
            } catch (error) {
                console.log('Failed to fetch payment data:', error);
            }
        };

        chapterFetchdata();
        fetchPaymentData();
    }, [])
    const handlePurches = async (id) => {
        try {
            const response = await PublicAxios.post('/stripe/create-checkout-session', { id, user_id: user_id }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            setShowModal(false)

            window.location.href = response.data.checkout_session_url;
        } catch (error) {
            console.log('somthing issue', error);
        }
    }
    return (
        <>
            <Navigation />
            <div className="flex flex-col mt-10 lg:flex-row items-start bg-slate-100 pt-16">
                <div className="pl-3 w-full lg:w-2/3 lg:mr-6 mb-6 lg:mb-0">
                    <ReactPlayer url={currentVideo} controls={true} playing={true} width="100%" height="100%" />
                    <div className="p-3 mx-5 w-2/3 w-full">
                        <span className="font-bold text-lg">Description:{` `} </span>
                        <div className="text-justify">{description}</div>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 bg-slate-100 shadow-lg p-4 rounded-lg ">
                    <h3 className="text-xl font-bold mb-4">Chapters</h3>
                    <ul>
                        {chapterDetails && chapterDetails.map(chapter => (
                            <li key={chapter.id} className="mb-4 bg-white shadow-lg p-4 rounded flex items-center justify-between transform transition-transform duration-900 hover:scale-104 hover:bg-gray-200 cursor-pointer">
                                {/* <Lottie animationData={animationData} className="w-12 h-12" /> */}
                                <h3 className="flex-grow text-gray-700 ml-4 text-xl font-bold">{chapter.chapter}</h3>
                                {chapter.is_free || paymentsDetails ? (<button
                                    className="text-white bg-indigo-500 px-4 py-2 rounded-full hover:bg-indigo-600 w-20"
                                    onClick={() => { setCurrentVideo(Image_URL + chapter.videos) }}
                                >
                                    Play
                                </button>)
                                    : (<button
                                        className="text-white bg-indigo-500 px-4 py-2 rounded-full hover:bg-indigo-600 w-20"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Unlock
                                    </button>)}

                            </li>

                        ))}
                    </ul>
                </div>
                {showModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
                        <div className="relative bg-white p-12 rounded-md w-1/3 shadow-2xl">
                            <h2 className="text-3xl font-semibold mb-6">Unlock Full Course</h2>
                            <p className="mb-6 text-lg">🎥 Access to 20+ exclusive videos</p>
                            <p className="mb-6 text-lg">📄 Get 20+ premium PDF notes</p>
                            <p className="mb-8 text-lg">🕒 Enjoy lifetime validity for all content</p>

                            {/* <PayPalComponent course={chapters[0]?.course }refresh ={fetchChapters} setmodal={setShowModal} paymodal ={setPaymentmodal} /> */}
                            <div className='flex justify-center'>
                                <button onClick={() => handlePurches(courseId)} className='bg-green-600 px-4 py-2 rounded-full '>BUY NOW</button>
                            </div>
                            {/* Close Button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-2 right-2 px-3 py-1 mr-0 mt-2"
                            >
                                ✖️
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default CourseDetails
