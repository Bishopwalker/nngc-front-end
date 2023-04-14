import {Avatar, Box, Card, CardContent, Grid, Typography} from '@mui/material';

const testimonials = [
  {
    name: '-- Emily Brown, Building Owner',
    image: 'https://via.placeholder.com/200',
    testimonial: 'To anyone in need of reliable garbage cleaning services, I highly recommend this company. They are efficient, professional, and always get the job done right.',
  },
  {
    name: '-- Amanda Taylor, Building Owner',
    image: 'https://via.placeholder.com/200',
    testimonial: 'For reliable and efficient garbage collection, this company is the best choice. Their track record of excellence speaks for itself, and I highly recommend them to anyone in need.',
  },
  {
    name: '-- Scott Harris, Construction Builder',
    image: 'https://via.placeholder.com/200',
    testimonial: 'Northern Neck Garbage Collection has provided me with extremely satisfying services. Their efficient cleaning has kept my neighborhood hygienic and clean.',
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

