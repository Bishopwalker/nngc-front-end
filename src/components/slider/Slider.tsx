import React, {useState} from "react";
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css';
import {sliders} from './sliders';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import QuickBuyButton from "../styledComponents/QuickBuyButton";

function ImageSlider() {
  const [defaultImage, setDefaultImage] = useState({
    linkDefault:""
  });
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 100000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
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

  return (
      <div className="sliders">
        <Helmet>
          <title>Gallery - Northern Neck Garbage Collection</title>
          <meta name="description" content="Explore our gallery showcasing Northern Neck Garbage Collection's services and community involvement." />
          <meta name="keywords" content="gallery, images, waste management, Northern Neck Garbage Collection" />
        </Helmet>
        <QuickBuyButton title={"QuiCk Buy BuTtOn"}  />

        <Slider {...settings}>

          {sliders.map((item,index) => (
              <div className="sliderCard" key={index}>

                <Link to={`/dumpster/${item.productId}`}>
                  <img
                      src={
                        //@ts-ignore
                        defaultImage[item.title] === item.title
                            ? defaultImage.linkDefault
                            : item.linkImg
                      }
                   alt={item.alt}/>
                </Link>
              </div>
          ))}
        </Slider>
      </div>
  );
}




export default ImageSlider;

