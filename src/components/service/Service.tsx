import React, {useState} from "react";
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useNavigate} from "react-router-dom";
import { services_sub, servicesOnce} from './services';
import {useAppSelector} from "../../redux/hooks";
import {Box, Button} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import "./service.css"
import {Money} from "@mui/icons-material";

function Service() {
  const [defaultImage, setDefaultImage] = useState({
    linkDefault:"",
  });
  const [activeServiceType, setActiveServiceType] = useState('Monthly');



  const services = activeServiceType === 'Monthly' ? services_sub : servicesOnce;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const userInfo = useAppSelector(state => state.userInfo)

  const navigate = useNavigate();

  const getSliderSettings = (itemsLength: number) => {
    const defaultSlidesToShow = 3;
    let slidesToShow = Math.min(itemsLength, defaultSlidesToShow);

    return {
      dots: true,
      infinite: itemsLength > defaultSlidesToShow,
      autoplay: true,
      autoplaySpeed: 10000,
      speed: 500,
      arrows: false,
      centerMode: true,
      centerPadding: '100px',
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      initialSlide: 0,
      vertical: isMobile,
      verticalSwiping: isMobile,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
          },
        },
      ],
    };
  }

  // Use the function to get current slider settings
  const sliderSettings = getSliderSettings(services.length);

  const handleServiceTypeChange = (type: React.SetStateAction<string>) => {
    setActiveServiceType(type);
  };



  return (
      <Box className="services">
        <Box className="toggle-buttons">
          <Button
              className={`monthly ${activeServiceType === 'Monthly' ? 'active' : ''}`}
              onClick={() => handleServiceTypeChange('Monthly')}
              variant="contained"
              color="primary"
          >
            Monthly
          </Button>
          <Button
              className={`one-time ${activeServiceType === 'One-Time' ? 'active' : ''}`}
              onClick={() => handleServiceTypeChange('One-Time')}
              variant="contained"
              color="secondary"
          >
            One-Time
          </Button>
        </Box>

        <Slider {...sliderSettings}>
          {services.map((item, index) => (
              <div
                  key={index}
                  className="card"
                  onClick={() => navigate(`/dumpster/${item.productId}`)}
              >
                <div className="card-top">
                  <Box
                      width={isMobile ? '100%' : 'auto'}
                      height={isMobile ? 'auto' : 'auto'}
                  >
                    <img
                        src={
                          // @ts-ignore
                          defaultImage[item.title] === item.title
                              ? defaultImage.linkDefault
                              : item.linkImg
                        }
                        alt={item.title}
                        style={{ maxWidth: '70%', height: 'auto' }}
                    />
                  </Box>
                  <h3>{item.title}</h3>
                </div>
                <div className="card-bottom">
                  <span className="category">{item.services}</span>
                  <div className="price-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <Box mt={4} pt={4} display={{ xs: 'block'}}>
                      {}
                    </Box>
                    <h2 style={{ margin: 0 }}>${item.price}</h2>
                    {activeServiceType === 'Monthly' && (
                        <div className="per-month" style={{ display: 'flex', flexDirection: 'row',  }}>
                          <span className="per" style={{ marginLeft: '5px',fontSize:"40%" }}>per</span>
                          <span className="month" style={{ marginLeft: '5px' }}>month</span>
                        </div>
                    )}
                    {activeServiceType === 'One-Time' && (
                        <span className="on-arrival" style={{ marginLeft: '5px' }}>.60 per mile after 30</span>
                    )}
                  </div>


                </div>
              </div>
          ))}
        </Slider>
      </Box>
  );
}

export default Service;

