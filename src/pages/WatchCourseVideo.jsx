import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";
import Iconbutton from "../component/common/Iconbutton";
import VideoDetailsSideBar from "../component/common/core/dashboard/VideoDetailsSideBar";
import { markAsCompleted } from "../services/operations/authApi";
import toast from "react-hot-toast";
import { updateCompletedLectures } from "../slices/viewCourseSlice";
const WatchCourseVideo = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loaction = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData, completedLectures, courseSectionData } =
    useSelector((state) => state.viewcourse);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setVideoDetails();
  }, [courseSectionData, courseEntireData, loaction.pathname,sectionId,courseId,subSectionId]);
  const setVideoDetails = async () => {
    if (!courseSectionData.length) {
      return;
    } else if (!courseId && !sectionId && !subSectionId) {
      navigate("/dashboard/enrolled-courses");
    } else {
      const sectionData = await courseSectionData?.filter(
        (section) => section._id === sectionId
      );
      const subSectionData = sectionData?.[0]?.subSection?.filter(
        (data) => data._id === subSectionId
      );
      setVideoData(subSectionData?.[0]);
      setVideoEnded(false);
    }
  };
  const isFirstVideo = () => {
    const currentSectionIdx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIdx = courseSectionData[
      currentSectionIdx
    ]?.subSection?.findIndex((data) => data._id === subSectionId);
    if (currentSectionIdx === 0 && currentSubSectionIdx === 0) {
      return true;
    } else {
      return false;
    }
  };
  const isLastVideo = () => {
    const currentSectionIdx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSection =
      courseSectionData[currentSectionIdx].subSection.length;
    const currentSubSectionIdx = courseSectionData[
      currentSectionIdx
    ].subSection.findIndex((data) => data._id === subSectionId);
    if (
      currentSectionIdx === courseSectionData.length - 1 &&
      currentSubSectionIdx === noOfSubSection - 1
    ) {
      return true;
    } else {
      return false;
    }
  };
  const goToNextVideo = () => {
    const currentSectionIdx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSection =
      courseSectionData[currentSectionIdx].subSection.length;
    const currentSubSectionIdx = courseSectionData[
      currentSectionIdx
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIdx !== noOfSubSection - 1) {
      const nextSubSection =
        courseSectionData[currentSectionIdx].subSection[
          currentSubSectionIdx + 1
        ]._id;
      navigate(`/view-lecture/${courseId}/${sectionId}/${nextSubSection}`);
    } else {
      const nextSectionId = courseSectionData[currentSectionIdx + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIdx + 1].subSection[0]._id;
      navigate(`/view-lecture/${courseId}/${nextSectionId}/${nextSubSectionId}`);
    }
  };
  const goToPervVideo = () => {
    const currentSectionIdx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSection =
      courseSectionData[currentSectionIdx].subSection.length;
    const currentSubSectionIdx = courseSectionData[
      currentSectionIdx
    ].subSection.findIndex((data) => data._id === subSectionId);
    if (currentSubSectionIdx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIdx].subSection[
          currentSubSectionIdx - 1
        ]._id;
      navigate(`/view-lecture/${courseId}/${sectionId}/${prevSubSectionId}`);
    } else {
      const prevSectionId = courseSectionData[currentSectionIdx - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIdx - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIdx - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      navigate(`/view-lecture/${courseId}/${prevSectionId}/${prevSubSectionId}`);
    }
  };
  const handelLectureCompletion = async () => {
    setLoading(true);
    try{
      const result=await markAsCompleted(token,courseId,subSectionId)
      if(result){
        dispatch(updateCompletedLectures(subSectionId))
      }
    }catch(err){
      toast.error("Failed to mark lecture");
    }
    setLoading(false);
  };
  return (
    <div className="text-white">
      <VideoDetailsSideBar/>
      {!videoData ? (
        <div>No data Found</div>
      ) : (
        <div>
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => {
              setVideoEnded(true);
            }}
            src={videoData.videoUrl}
          >
            <div>
              {videoEnded && (
                <div>
                  {!completedLectures.includes(subSectionId) && (
                    <Iconbutton
                      disable={true}
                      disabled={loading}
                      onclick={() => {
                        handelLectureCompletion();
                      }}
                      btnText={!loading ? "Mark As Completed" : "Loading..."}
                    />
                  )}
                  <Iconbutton
                    disable={true}
                    onclick={() => {
                      if (playerRef?.current) {
                        playerRef.current?.seek(0);
                        setVideoEnded(false);
                      }
                    }}
                    btnText={"Re Watch"}
                  />
                </div>
              )}
              <div>
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={() => {
                      goToPervVideo();
                    }}
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={() => {
                      goToNextVideo();
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </Player>
        
          <div>
            <h1>{videoData.title}</h1>
            <p>{videoData.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchCourseVideo;
