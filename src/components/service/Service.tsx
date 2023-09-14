import React, {useState} from "react";
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link, useNavigate} from "react-router-dom";
import {services} from './services';
import {useAppSelector} from "../../redux/hooks";

function Service() {
  const [defaultImage, setDefaultImage] = useState({
    linkDefault:"",
  });
  const userInfo = useAppSelector(state => state.userInfo)
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

console.log(userInfo)
  return (
    <div className="services">
      <Slider {...settings}>
        {services.map((item,index) => (

          <div
              key={index}
              className="card"
              onClick={() => navigate(`/dumpster/${item.productId}`)}
          >
            <div className="card-top">
              
              <img

                src={
                  // @ts-ignore
                  defaultImage[item.title] === item.title
                    ? defaultImage.linkDefault
                    : item.linkImg
                }
                alt={item.title}
              />
              <h1>{item.title}</h1>
            </div>
            <div className="card-bottom">
              <span className="category">{item.services}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Service;

