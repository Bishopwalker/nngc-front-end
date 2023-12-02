import {Avatar, Box, Card, CardContent, Grid, Typography} from '@mui/material';
import dirty from '../../assets/dirty_yard-b272813f.jpg';
import yard_clean from '../../assets/yarn_clean-f205d94a.png';
import yard_clean1 from '../../assets/yarnCleanup-de6f1abd.png';

const testimonials = [
  {
    name: '-- Nurturing Neighborhoods:',
    image: dirty,
    testimonial: "Northern Neck Garbage Collection (NNGC) isn’t just about waste removal" +
    "we're about community care, especially for our seniors. We strive to make every neighborhood we serve a better, safer place."
    },
  {
    name: '-- Guaranteeing Cleanliness',
    image: yard_clean,
    testimonial: 'At NNGC, cleanliness is our promise. Count on us for dependable and top-quality ' +
        'garbage collection, keeping your surroundings pristine and pleasant.'

  },
  {
    name: '-- Ev',
    image: yard_clean1,
    testimonial: "Either You're born with it, or you're not! Who is this?"
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
		  The NNGC Promise
		</Typography>
      <Grid container spacing={2} mt={4}>
        {testimonials.map((testimonial) => (
          <Grid item key={testimonial.name} xs={12} sm={6} md={4}>
			<Card sx={{ bgcolor: '#2C3E50' }}>
			  <Avatar alt={testimonial.name} src={testimonial.image} sx={{ width: 100, height: 100, margin: 'auto', mt: 2 }} />
			  <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                  <Typography variant="subtitle1">{testimonial.name}</Typography>
                  <Typography variant="body1" gutterBottom>"{testimonial.testimonial}"</Typography>
			  </CardContent>
			</Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;

