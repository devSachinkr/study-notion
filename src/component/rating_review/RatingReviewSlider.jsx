import React, { useEffect, useState } from "react";
import { getAllRatingAndReviews } from "../../services/operations/authApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Autoplay, Pagination, Navigation } from "swiper/modules";
import ReactStars from "react-stars";
const RatingReviewSlider = () => {
  const [loading, setLoading] = useState(false);
  const [feedback, setfeedBack] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await getAllRatingAndReviews();
        if (result.success) {
          setfeedBack(result?.allReviews);
        }
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <div className="spinner"></div>;
  }
  return (
    <div className="mb-10 select-none ">
      {feedback?.length !== 0 && (
        <div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            spaceBetween={10}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: 2500,
            }}
            loop={true}
            className="full flex gap-x-3 w-[80vw] rounded-md"
          >
            {feedback.map((data) => (
              <SwiperSlide className="w-[30vw]  ">
                <div className="bg-richblack-800 p-5 h-[40vh] rounded-md border-[2px] border-richblue-300  ">
                  <div className="flex items-center gap-x-5">
                    <div>
                      <img
                        className=" rounded-full aspect-square"
                        width={50}
                        height={50}
                        src={data.user.image}
                        alt="user_image"
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p>{data.user.firstName}</p>
                        <p>{data.user.lastName}</p>
                      </div>
                      <p>{data.user.email}</p>
                    </div>
                  </div>
                  <div>
                    <p>{data.review}</p>
                    <div className="flex items-center gap-x-3">
                      <span>{data.rating}</span>
                      <span>
                        <ReactStars
                          count={5}
                          value={data.rating}
                          size={30}
                          edit={false}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default RatingReviewSlider;
