import React from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom arrow components positioned outside
const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:bg-gray-100 rounded-full p-3 transition-all duration-200 group"
    aria-label="Previous slide"
  >
    <ChevronLeft size={24} className="text-gray-600 group-hover:text-pink-500 transition-colors" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:bg-gray-100 rounded-full p-3 transition-all duration-200 group"
    aria-label="Next slide"
  >
    <ChevronRight size={24} className="text-gray-600 group-hover:text-pink-500 transition-colors" />
  </button>
);

const SliderCard = ({
  title,
  data,
  renderCard,
  sliderSettings = {},
  containerClassName = '',
  titleClassName = '',
}) => {
  const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
    ...sliderSettings,
  };

  return (
    <div className={`py-16 ${containerClassName}`}>
      <div className="container mx-auto px-6">
        <h2
          className={`text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-12 ${titleClassName}`}
        >
          {title}
        </h2>
        <div className="max-w-full mx-auto relative">
          <Slider {...defaultSettings}>
            {data.map((item, index) => (
              <div key={index} className="px-4">
                {renderCard(item, index)}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
