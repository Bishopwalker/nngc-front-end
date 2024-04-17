import {Box, Grid, Typography,Button} from "@mui/material";
import {Email, Phone} from '@mui/icons-material';
import React from "react";
import NNGCLogo from "/src/assets/nngc-logo.png";
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

const HeaderTop = () => {



	return (
		<Box sx={{ backgroundColor: 'white', color: '#777', borderTop: '5px solid #26C9FF', borderBottom: '5px solid #26C9FF', marginTop: 0 }}>
			<Helmet>
				<title>Navigation - Northern Neck Garbage Collection</title>
				<meta name="description" content="Navigate through Northern Neck Garbage Collection's website for waste management services." />
				<meta name="keywords" content="navigation, garbage collection, waste management, eco-friendly services" />
			</Helmet>
			<Box>
				<Grid container spacing={1} sx={{ padding: '8px', border: '1px solid grey' }}>
					<Grid item xs={3} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
						<Link to="/">
							<img src={NNGCLogo} alt="logo" style={{ height: '1.3rem' }} />
						</Link>
					</Grid>
					<Grid item xs={3} sm={3} sx={{ display: { xs: 'none', sm: 'none', lg: 'block', xl: 'block' } }}>
						<Typography variant="body1" textAlign="center" sx={{ lineHeight: '1rem',fontWeight:'bold',fontSize:'1.25rem', marginLeft:-40}}>
							Northern Neck Garbage Collection
						</Typography>
					</Grid>
					<Grid item xs={3} sm={3} sx={{ display: { xs: 'none', sm: 'none', lg: 'flex', xl: 'flex' }, alignItems: 'center', lineHeight: '1rem' }}>
						<Email sx={{ color: '#26C9FF', marginRight: '0.5rem' }} from='bishop@northernneckgarbage.com'  onClick={() => window.location.href = 'mailto:bishop@northernneckgarbage.com'}/>
						bishop@northernneckgarbage.com
					</Grid>
					<Grid item xs={3} sm={3} sx={{ display: { xs: 'none', sm: 'none', lg: 'flex', xl: 'flex' }, alignItems: 'center', lineHeight: '1rem' }}>
					<Button onClick={() => window.location.href = 'tel:+18042200029'}>
						<Phone sx={{ color: '#26C9FF', marginRight: '0.5rem' }} onClick={() => window.location.href = 'tel:+18042200029'} />
						804-220-0029
					</Button>
					</Grid>
					<Grid item xs={9} sm={9} sx={{ display: { xs: 'block', sm: 'block', lg: 'none', xl: 'none' } }}>
						<Typography variant="body1" textAlign="center" sx={{ lineHeight: '1rem', fontWeight:'bold',fontSize:'1.25rem' }}>
							Northern Neck Garbage Collection
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default HeaderTop;


