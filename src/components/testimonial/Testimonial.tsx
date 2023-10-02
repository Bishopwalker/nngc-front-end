import {Avatar, Box, Card, CardContent, Grid, Typography} from '@mui/material';
import dirty from '/dirty_yard-b272813f.jpg';
import yard_clean from '/yarn_clean-f205d94a.png';
import yard_clean1 from '/yarnCleanup-de6f1abd.png';

const testimonials = [
  {
    name: '-- James Franco, Junk Owner',
    image: dirty,
    testimonial: 'This guy is amazing, he is like Jesus, but with a dump trailer and low prices!'
    },
  {
    name: '-- Amanda Taylor, Cat Person',
    image: yard_clean,
    testimonial: 'My son left so much junk in our barn we knew we couldn`t sale the house until it was clean! NNGC came and serviced me'

  },
  {
    name: '-- Scott Harris, Retired Vet',
    image: yard_clean1,
    testimonial: 'This guy is one thing you won`t find often in the Northern Neck...On time!.',
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ mt: 4, mb: 6 }}>
		<Typography variant="h4" align="center" sx={{ 
		  fontWeight: 'bold',
		  color: '#2C3E50',
		  letterSpacing: '1px',
		  textTransform: 'uppercase',
		}}>
		  The Testimonials
		</Typography>
      <Grid container spacing={2} mt={4}>
        {testimonials.map((testimonial) => (
          <Grid item key={testimonial.name} xs={12} sm={6} md={4}>
			<Card sx={{ bgcolor: '#2C3E50' }}>
			  <Avatar alt={testimonial.name} src={testimonial.image} sx={{ width: 100, height: 100, margin: 'auto', mt: 2 }} />
			  <CardContent sx={{ textAlign: 'center', color: 'white' }}>
				<Typography variant="body1" gutterBottom>"{testimonial.testimonial}"</Typography>
				<Typography variant="subtitle1">{testimonial.name}</Typography>
			  </CardContent>
			</Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;

