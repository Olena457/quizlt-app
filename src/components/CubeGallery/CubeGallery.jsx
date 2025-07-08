import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Navigation } from 'swiper/modules';
import androidImg from '../../assets/images/android.jpg';
import planetImg from '../../assets/images/planet.jpg';
import youngImg from '../../assets/images/young.jpg';
import scienceImg from '../../assets/images/science.jpg';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';
import './CubeGallery.module.css';

const CubeGallery = () => {
  return (
    <Swiper
      effect="cube"
      grabCursor={true}
      speed={1400}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 30,
        shadowScale: 0.94,
      }}
      navigation
      loop={true}
      modules={[EffectCube, Navigation]}
      className="cubeSwiper"
    >
      <SwiperSlide>
        <img src={planetImg} alt="Side 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={androidImg} alt="Side 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={scienceImg} alt="Side 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={youngImg} alt="Side 4" />
      </SwiperSlide>
    </Swiper>
  );
};

export default CubeGallery;
