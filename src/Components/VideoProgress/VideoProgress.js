import React, { useEffect, useState } from 'react'
import api from "../../Util/interceptors"

const VideoProgress = ({ id, percentage }) => {
    const [videoLength, setVideoLength] = useState(0)
    const [courseVideo, setCourseVideo] = useState(0)

    useEffect(() => {
        async function fetchData() {
            await api.get(`course/${id}`).then((res) => {
                setCourseVideo(res?.data?.course_status)
                setVideoLength(res?.data?.data?.Lesson?.length)
            }).catch((e) => {
                console.log(e)
            })
        }
        fetchData();
    }, [])

    function calculateVideos(percentageWatched, totalVideos) {
        if (percentageWatched >= 0 && percentageWatched <= 1) {
            const watchedVideos = totalVideos * percentageWatched;
            return Math.round(watchedVideos)
        }
        else return 0
    }

    return (
        <div className={percentage === 1 ? 'Progress passed' : 'Progress'} >
            <div>
                <div className='Percentage'>{parseFloat(courseVideo).toFixed(2)}%</div>
                <div className='Status'>{calculateVideos(courseVideo / 100, videoLength)}/{videoLength} videos</div>
            </div>
            <div className='ProgressBar'>
                <div className='Status' style={{ width: `${parseFloat(courseVideo).toFixed(2)}%` }}></div>
            </div>
        </div>
    )
}

export default VideoProgress