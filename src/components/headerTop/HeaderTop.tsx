import { Box, Grid, Typography } from "@mui/material";
import { Email, Phone } from '@mui/icons-material';
import React from "react";
import NNGCLogo from "../../assets/nngc-logo.png";
import { Link } from 'react-router-dom';

const HeaderTop = () => {
	return (
		<Box sx={{ backgroundColor: 'white', color: '#777', borderTop: '5px solid #26C9FF', borderBottom: '5px solid #26C9FF', marginTop: 0 }}>
			<Box>
				<Grid container spacing={1} sx={{ padding: '8px', border: '1px solid grey' }}>
					<Grid item xs={3} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
						<Link to="/">
							<img src={NNGCLogo} alt="logo" style={{ height: '1.3rem' }} />
						</Link>
					</Grid>
					<Grid item xs={3} sm={3} sx={{ display: { xs: 'none', sm: 'none', lg: 'block', xl: 'block' } }}>
						<Typography variant="body1" textAlign="center" sx={{ lineHeight: '1rem' }}>
							We are Northumberland's #1 choice for trash removal!
						</Typography>
					</Grid>
					<Grid item xs={3} sm={3} sx={{ display: { xs: 'none', sm: 'none', lg: 'flex', xl: 'flex' }, alignItems: 'center', lineHeight: '1rem' }}>
						<Email sx={{ color: '#26C9FF', marginRight: '0.5rem' }} />
						info@northernneckgarbage.com
					</Grid>
					<Grid item xs={3} sm={3} sx={{ display: { xs: 'none', sm: 'none', lg: 'flex', xl: 'flex' }, alignItems: 'center', lineHeight: '1rem' }}>
						<Phone sx={{ color: '#26C9FF', marginRight: '0.5rem' }} />
						804-435-1234
					</Grid>
					<Grid item xs={9} sm={9} sx={{ display: { xs: 'block', sm: 'block', lg: 'none', xl: 'none' } }}>
						<Typography variant="body1" textAlign="center" sx={{ lineHeight: '1rem' }}>
							We are Northumberland's #1 choice for trash removal!
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default HeaderTop;


