import {Avatar, Box, Card, CardContent, Grid, Typography} from "@mui/material";
import React from "react";
import Bishop from '../../../public/assets/Bishop-e3dcf521.jpg';
import Rauf from '../../../public/assets/Rauf.png';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Helmet} from "react-helmet";

const teamMembers = [
  { name: 'Bishop Walker', designation: 'Owner/CEO', image: Bishop },
    { name: 'Rauf Demirkan', designation: 'Co-Founder/CTO', image: Rauf},

];

const Team = () => {


    return (
    <Box mb={4} display="flex" flexDirection={ 'row'}  alignItems="center">
        <Helmet>
            <title>Meet Our Team - Northern Neck Garbage Collection</title>
            <meta name="description" content="Discover the dedicated team behind Northern Neck Garbage Collection. Learn about our experienced staff who are committed to providing top-notch waste management services." />
            <meta name="keywords" content="Northern Neck Garbage Collection team, waste management experts, experienced professionals, Bishop Walker, Rauf Demirkan, waste management team, Virginia" />
        </Helmet>

<Grid container spacing={2} alignItems="center" justifyContent="center" mt={2} mb={4}>
  {teamMembers.map((member) => (
    <Grid item key={member.name} xs={12} sm={6} md={3}>
      <Card sx={{ bgcolor: '#2C3E50', color: 'white', maxWidth: 300 }}>
        <Box >
          <Avatar alt={member.name} src={member.image} sx={{ width: 200, height: 200, margin: 'auto' }} />
        </Box>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6">{member.name}</Typography>
          <Typography variant="subtitle1" color="#FFF">
            {member.designation}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>


    </Box>
  );
};

export default Team;

