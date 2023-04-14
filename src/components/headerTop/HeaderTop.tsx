import {Box, Grid, Typography} from "@mui/material";
import {Email, Phone} from '@mui/icons-material';
import React from "react";

const HeaderTop = () => {
  return (
	<Box sx={{ backgroundColor: 'white', color: '#777', borderTop: '5px solid #26C9FF', borderBottom: '5px solid #26C9FF', marginTop: 0 }}>
		<Box>
			<Grid container spacing={2} sx={{ padding: '16px', border: '1px solid grey' }}>
			  <Grid item xs={12} sm={6}>
				<Typography variant="body1" textAlign="center">
					We are Northumberland's #1 choice for trash removal!
				</Typography>
			  </Grid>
			  <Grid item xs={12} sm={4}>
				<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
				  <Email sx={{ color: '#26C9FF', marginRight: '0.5rem' }} />
				  info@northernneckgarbage.com
				</Typography>
			  </Grid>
			  <Grid item xs={12} sm={2}>
				<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
				  <Phone sx={{ color: '#26C9FF', marginRight: '0.5rem' }} />
				  804-435-1234
				</Typography>
			  </Grid>
			</Grid>
		</Box>
	</Box>
  );
};

export default HeaderTop;

