import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function HeroSlider() {
  return (
    <div className="w-full">
      <Swiper loop={true} autoplay={{ delay: 3000 }}>
        <SwiperSlide>
          <div className="h-[400px] bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            Learn Life Lessons That Truly Matter
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-[400px] bg-green-600 text-white flex items-center justify-center text-3xl font-bold">
            Improve Yourself Everyday
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-[400px] bg-purple-600 text-white flex items-center justify-center text-3xl font-bold">
            Real Experiences. Real Growth.
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
