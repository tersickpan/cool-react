import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BaseImagePreview from "./BaseImagePreview";
import BaseVideoPreview from "./BaseVideoPreview";

export default function BaseCarousel({ files, mediaType, vidVolume }) {
  const swiperRef = useRef(null);

  // Pause/play videos depending on active slide
  const handleSlideChange = () => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper;
    const activeIndex = swiper.activeIndex;

    // pause all videos
    const videos = document.querySelectorAll(".carousel-video");
    videos.forEach((video, idx) => {
      if (idx === activeIndex) {
        video.play().catch(() => {}); // play active video
      } else {
        if (!video.paused) {
          video.pause();
          video.currentTime = 0; // reset only if paused
        }
      }
    });
  };

  // Run once when mounted
  useEffect(() => {
    handleSlideChange();
  }, []);

  if (!files || files.length === 0) return;

  if (files.length === 1) {
    const file = files[0];

    return mediaType === "pictures" ? (
      <BaseImagePreview
        key={file.name}
        src={URL.createObjectURL(file)}
      />
    ) : (
      <BaseVideoPreview
        key={file.name}
        src={URL.createObjectURL(file)}
        volume={vidVolume || 0.07}
      />
    );
  }

  return (
    <Swiper
      ref={swiperRef}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={
        mediaType === "pictures"
          ? {
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          : false
      }
      onSlideChange={handleSlideChange}
    >
      {Array.from(files).map((file, i) => (
        <SwiperSlide
          key={i}
          className="flex items-center justify-center"
        >
          {mediaType === "pictures" ? (
            <BaseImagePreview src={URL.createObjectURL(file)} />
          ) : (
            <BaseVideoPreview
              src={URL.createObjectURL(file)}
              volume={vidVolume || 0.07}
              muted={false}
              loop={false}
              onEnded={() => swiperRef.current?.swiper?.slideNext()} // 👈 super clean
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
