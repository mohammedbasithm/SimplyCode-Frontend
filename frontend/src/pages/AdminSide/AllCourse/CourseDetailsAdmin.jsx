import React from 'react'
import AdminNav from '../../../Component/Navbar/AdminNav'
import ReactPlayer from 'react-player';
import { useEffect } from 'react';
import PublicAxios from '../../../axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Image_URL } from '../../../constants/constans';

const CourseDetailsAdmin = () => {

    const { id: courseId } = useParams()
    const [currentVideo, setCurrentVideo] = useState('')
    const [chapterDetails, setChapterDetails] = useState('')
    const [description, setDescription] = useState('')
    const baseURL = Image_URL

    useEffect(() => {
        const chapterFetchdata = async () => {
            try {
                const response = await PublicAxios.get('/course/fetchchapter', { params: { courseId } });
                setChapterDetails(response.data);
                setCurrentVideo(baseURL + response.data[0].videos)
                setDescription(response.data[0].description)
            } catch (error) {
                console.log('fetching chapter faild', error);
            }
        }
        chapterFetchdata()
    }, [])
    return (
        <>
            <AdminNav />
            <div className="flex flex-col mt-10 lg:flex-row items-start bg-slate-100 pt-16">
                <div className="pl-3 w-full lg:w-2/3 lg:mr-6 mb-6 lg:mb-0">
                    <ReactPlayer url={currentVideo} controls={true} playing={true} width="100%" height="100%" />
                    <div className="p-3 mx-5 w-2/3">
                        <span className="font-bold text-lg">Description:{` `} </span>
                        <div className="text-justify">{description}</div>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 bg-slate-100 shadow-lg p-4 rounded-lg ">
                    <h3 className="text-xl font-bold mb-4">Chapters</h3>
                    <ul>
                        {chapterDetails && chapterDetails.map(chapter => (
                            <li key={chapter.id} className="mb-4 bg-white shadow-lg p-4 rounded flex items-center justify-between transform transition-transform duration-900 hover:scale-104 hover:bg-gray-200 cursor-pointer">
                                <h3 className="flex-grow text-gray-700 ml-4 text-xl font-bold">{chapter.chapter}</h3>
                                <button
                                    className="text-white bg-indigo-500 px-4 py-2 rounded-full hover:bg-indigo-600 w-20"
                                    onClick={() => { setCurrentVideo(baseURL + chapter.videos) }}
                                >
                                    Play
                                </button>

                            </li>

                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CourseDetailsAdmin

