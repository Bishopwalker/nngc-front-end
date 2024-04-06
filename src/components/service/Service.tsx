import React, {useState} from "react";
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useNavigate} from "react-router-dom";
import { services_sub, servicesOnce} from './services';
import {Box, Button, Dialog, DialogContent, Typography} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useLocation} from "react-router-dom";
import "./service.css"
import {Helmet} from "react-helmet";
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import DialogActions from "@mui/material/DialogActions";
function Service() {
  const [defaultImage, setDefaultImage] = useState({
    linkDefault:"",
  });
  const theme = useTheme();

  const [activeServiceType, setActiveServiceType] = useState('Monthly');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
const [open, setOpen] = useState(false);

const location = useLocation();
const handleOpen = () => {
    setOpen(true);
}

const handleClose = () => {
    setOpen(false);
}

const buttonStyles= isMobile
  ?{position:'relative', bottom:'auto',left:'auto'}
    :{position:'relative', bottom: 'auto', left: 50}

  const services = activeServiceType === 'Monthly' ? services_sub : servicesOnce;

  //const userInfo = useAppSelector(state => state.userInfo)

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
        <Helmet>
          <title>Waste Management Services - Northern Neck Garbage Collection</title>
          <meta name="description" content="Explore our waste management and garbage collection services. Choose from monthly or one-time service options to suit your needs." />
          <meta name="keywords" content="waste management services, garbage collection, monthly service, one-time service, recycling, Northern Neck Garbage Collection, environmental solutions" />
        </Helmet>

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

        {location.pathname === '/services' && <>
          <Box

            sx={{
              p: 2,
              ...buttonStyles,
            }}
        >
          <Button
              variant='contained'
              startIcon={<PdfIcon/>}
              color='primary'
              onClick={handleOpen}
          >
            Service Definitions
          </Button>
        </Box><Dialog
            open={open}
            onClose={handleClose}
            maxWidth='md'
            fullWidth
        >
          <DialogContent>
            <Box sx={{my: 2}}>
              <Typography variant="h4" sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
              }} component="div" gutterBottom>
                Monthly Pickup
              </Typography>
              <Typography variant="body1" gutterBottom>
                Garbage must be in bags and bins
                <br/>
                Garbage should be outside of the house
                <br/>
                Within our service area
                <br/>
                Garbage should not exceed 100 gallons
                <br/>
                Garbage should not include the following items:
              </Typography>
              <ul>
                <li>Biological waste</li>
                <li>Rechargeable Batteries</li>
                <li>Recyclable material</li>
                <li>Hazardous Waste</li>
                <li>Yard waste</li>
                <li>Paint</li>
                <li>Electronics</li>
                <li>Oil</li>
                <li>Pressurized Containers</li>
                <li>Combustible Material</li>
                <li>Any Material prevented by local government codes</li>
              </ul>
              <Typography variant="body1" gutterBottom>
                If you require any service that does not adhere to the above rules please contact a sales representative
                to discuss. Please note this may require additional charges.
              </Typography>
            </Box>

            <Box sx={{my: 2}}>
              <Typography variant="h4" sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
              }} component="div" gutterBottom>
                Bulk Pickup
              </Typography>
              <Typography variant="body1" gutterBottom>
                Bulk pickup is anything over 100 gallons
                <br/>
                Bulk pickup is quoted per job based off of the following:
                <br/>
                Distance Driven
                <br/>
                Amount of material in pickup
                <br/>
                Nature of the material
                <br/>
                Ease of collection
                <br/>
                Amount of time required to collect
                <br/>
                Garbage should not include the following items:
              </Typography>
              <ul>
                <li>Biological waste</li>
                <li>Hazardous Waste</li>
                <li>Yard waste</li>
                <li>Paint</li>
                <li>Oil</li>
                <li>Pressurized Containers</li>
                <li>Combustible Material</li>
                <li>Any Material prevented by local government codes</li>
              </ul>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='contained' color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog></>
      }
      </Box>
  );
}

export default Service;

