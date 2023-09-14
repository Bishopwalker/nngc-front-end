import {Box, Grid, Typography} from "@mui/material";
import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
	<Box>
		<Box sx={{ backgroundColor: '#2C3E50', color: 'white' }} pb={2}>
			<Grid container spacing={2}>
			  <Grid item xs={12} sm={4}>
				<Typography variant="body1" textAlign="center" fontWeight={500} pb={1}>
					CONTACT US
				</Typography>
				<Typography variant="body1" textAlign="center" pb={1}>
					Email: bishop@northernneckgarbage.com
				</Typography>
				<Typography variant="body1" textAlign="center" pb={1}>
					Phone: 804-220-0029
				</Typography>
				<Typography variant="body1" textAlign="center">
					Address: 164 Cellar Haven Ln, Lottsburg, VA 22511
				</Typography>
			  </Grid>
			  <Grid item xs={12} sm={4}>
				<Typography variant="body1" textAlign="center" fontWeight={500} pb={1}>
					HOURS
				</Typography>
				<Typography variant="body1" textAlign="center" pb={1}>
					Monday - Friday: 7:00 AM - 5:00 PM
				</Typography>
			  </Grid>
			  <Grid item xs={12} sm={4}>
				<Typography variant="body1" textAlign="center" fontWeight={500} pb={1}>
					<FacebookIcon sx={{ color: 'white', marginRight: '0.5rem' }} />
					<TwitterIcon sx={{ color: 'white', marginRight: '0.5rem' }} />
					<InstagramIcon sx={{ color: 'white', marginRight: '0.5rem' }} />
				</Typography>
			  </Grid>
			</Grid>
		</Box>
		<Box sx={{ backgroundColor: '#26C9FF', color: 'white' }} pb={1} pt={1}>
			<Grid container>
			  <Grid item xs={12} sm={12}>
				<Typography variant="body1" textAlign="center">
					© 2023 Northern Neck Garbage Collection, LLC.	
				</Typography>
			  </Grid>
			</Grid>
		</Box>
	</Box>
  );
};

export default Footer;

