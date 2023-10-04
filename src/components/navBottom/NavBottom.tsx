import React from "react";
import {Box, Button, Typography} from "@mui/material";
import NNGCLogo from "../../assets/nngc-logo.png";
import {Link} from 'react-router-dom';
import {useAppSelector} from "../../redux/hooks";

const NavBottom = () => {
    const role: any = useAppSelector(state => state.userInfo.role);
    console.log(role)
  return (
    <Box sx={{ padding: '1rem' }}>
        {role ==='ADMIN' && <Button variant={"contained"} color={"primary"} sx={{mt: '1rem'}} component={Link} to="/emaps">
            View Routes
        </Button>}
	  <Box sx={{ maxWidth: '150px', mx: 'auto' }}>
          <Link to="/">
		  <img src={NNGCLogo} alt="Northern Neck Garbage logo" style={{ width: '100%', height: 'auto' }} />
          </Link>

	  </Box>
      <Typography align="center" variant="body1" sx={{ fontWeight: 300 }}>
		Let's Keep the Northern Neck Wonderful!
      </Typography>

    </Box>
  );
};

export default NavBottom;

