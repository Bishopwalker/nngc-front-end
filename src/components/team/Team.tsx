import {Avatar, Box, Card, CardContent, Grid, Typography} from "@mui/material";
import React from "react";
import Bishop from '/Bishop-e3dcf521.jpg';

const teamMembers = [
  { name: 'Bishop Walker', designation: 'Owner/CEO', image: Bishop },

];

const Team = () => {
  return (
    <Box mb={4} display="flex" flexDirection="column" alignItems="center">
		<Typography variant="h4" align="center" sx={{ 
		  fontWeight: 'bold',
		  color: '#2C3E50',
		  letterSpacing: '1px',
		  textTransform: 'uppercase'
		}}>
		  Founder
		</Typography>
<Grid container spacing={2} alignItems="center" justifyContent="center" mt={2} mb={4}>
  {teamMembers.map((member) => (
    <Grid item key={member.name} xs={12} sm={12} md={3}>
      <Card sx={{ bgcolor: '#2C3E50', color: 'white', maxWidth: 300 }}>
        <Box padding={2}>
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

