import React from "react";
import {Box, Grid, Typography} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import {Email, Phone} from "@mui/icons-material";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

const Footer = () => {

	const handleIconClick = (url: string | URL | undefined) => {
		window.open(url, '_blank');
	};

	return (
	<Box>
		<Helmet>
			<title>Contact Us - Northern Neck Garbage Collection</title>
			<meta name="description" content="Contact Northern Neck Garbage Collection for eco-friendly waste management services. Reach out to us via email or phone." />
			<meta name="keywords" content="contact, Northern Neck Garbage Collection, waste management, eco-friendly, recycling services, Virginia" />
		</Helmet>
		<Box sx={{ backgroundColor: '#2C3E50', color: 'white' }} pb={2}>
			<Grid container spacing={2}>
			  <Grid item xs={12} sm={4}>
				<Typography variant="body1" textAlign="center" fontWeight={500} pb={1}>
					CONTACT US
				</Typography>
				<Typography variant="body1" textAlign="center" pb={1} onClick={() => window.location.href = 'mailto:bishop@northernneckgarbage.com'}>
					<Email sx={{ color: '#26C9FF', marginRight: '0.5rem' }} from='bishop@northernneckgarbage.com'  />
					Email: bishop@northernneckgarbage.com
				</Typography>
				<Typography variant="body1" textAlign="center" pb={1} onClick={() => window.location.href = 'tel:+18042200029'}>
					<Phone sx={{ color: '#26C9FF', marginRight: '0.5rem' }}  />
					Phone: 804-220-0029
				</Typography>
				<Typography variant="body1" textAlign="center">
					Address: PO Box 301 Lottsburg, VA 22511
				</Typography>
			  </Grid>
			  <Grid item xs={12} sm={4}>
				<Typography variant="body1" textAlign="center" fontWeight={500} pb={1}>
					HOURS
				</Typography>
				<Typography variant="body1" textAlign="center" pb={1}>
					Monday - Friday: 7:00 AM - 5:00 PM
				</Typography>
				  <Typography variant="body1" textAlign="center" pb={1}>
					  <Link color="white" style={{
						  textDecoration: 'blue underline solid 2px',
						  color: 'white',
						  fontWeight: 500,
						  fontSize: '1.1rem',

					  }} to="/policy"> Privacy Policy </Link>
				  </Typography>
			  </Grid>
			  <Grid item xs={12} sm={4}>
				<Typography variant="body1" textAlign="center" fontWeight={500} pb={1}>
					<FacebookIcon onClick={() => handleIconClick('https://www.facebook.com/profile.php?id=61551799658594')} sx={{ color: 'white', marginRight: '0.5rem' }} />
					<TwitterIcon   onClick={() => handleIconClick('https://www.twitter.com')} sx={{ color: 'white', marginRight: '0.5rem' }} />
					<InstagramIcon  onClick={() => handleIconClick('https://www.instagram.com/northern_neck_garbage/')} sx={{ color: 'white', marginRight: '0.5rem' }} />
				</Typography>
				  <Typography variant="body1" textAlign="center" pb={1}>
					  <Link color="white" style={{
						  textDecoration: 'blue underline solid 2px',
						  color: 'white',
						  fontWeight: 500,
						  fontSize: '1.1rem',
					  }} to="town"> Montross Residents </Link>
				  </Typography>
				  <Typography variant="body1" textAlign="center" pb={1}>
					  <Link color="white" style={{
						  textDecoration: 'blue underline solid 2px',
						  color: 'white',
						  fontWeight: 500,
						  fontSize: '1.1rem',
					  }} to="town"> Forbidden Items </Link>
				  </Typography>
			  </Grid>
			</Grid>
		</Box>
		<Box sx={{ backgroundColor: '#26C9FF', color: 'white' }} pb={1} pt={1}>
			<Grid container>
			  <Grid item xs={12} sm={12}>
				<Typography variant="body1" textAlign="center">
					© 2025 Northern Neck Garbage Collection, LLC.
				</Typography>
			  </Grid>
			</Grid>
		</Box>
	</Box>
  );
};

export default Footer;

