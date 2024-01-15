import React, {useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import NNGCLogo from "../../../public/assets/nngc-logo.png";
import {Link, useLocation} from 'react-router-dom';

import {useAppSelector} from "../../redux/hooks";

const NavBottom = () => {
    const role: any = useAppSelector(state => state.userInfo?.role);


    const location = useLocation();
    const { pathname } = location;
    const [pageNumber, setPageNumber] = useState('1');


    // Hide the component if the route is /blogs
    if (pathname === '/blog') {
        return null;
    }
  return (
    <Box sx={{ padding: '1rem' }}>
           {role && role ==='ADMIN' && (
            <Box sx={{
                display:'flex', justifyContent:'space-around'
            }}>

                <Button variant={"contained"} color={"primary"} sx={{mt: '1rem'}} component={Link}  to={`/emaps?page=${pageNumber}`}>
                    View Routes
                </Button>
                <TextField
                    label="Page Number"
                    variant="outlined"
                    type="number"
                    value={pageNumber}
                    onChange={(e) => setPageNumber(e.target.value)}
                    sx={{ mt: '1rem' }}
                />

                <Button variant={"contained"} color={"primary"} sx={{mt: '1rem'}} component={Link}  to={`/admin`}>
                    Signup New Customer
                </Button>
            </Box>
        )}

	  <Box sx={{ maxWidth: '150px', mx: 'auto' }}>
          <Link to="/">
		  <img src={NNGCLogo} alt="Northern Neck Garbage logo" style={{ width: '100%', height: 'auto' }} />
          </Link>

	  </Box>
      <Typography align="center" variant="body1" sx={{ fontWeight: 300 }}>
          Nurturing Neighborhoods, Guaranteeing Cleanliness
      </Typography>

    </Box>
  );
};

export default NavBottom;

