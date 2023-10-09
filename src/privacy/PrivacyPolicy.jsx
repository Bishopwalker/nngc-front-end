import React from 'react';
import {Container, Typography} from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
               Don't Worry Be Private!!
            </Typography>
            <Typography variant="body1" paragraph>
                Welcome to our Privacy Policy page! Here at Northern Neck Garbage Collection, we like to keep things transparent, just like our favorite recyclable, glass! Just as we’re passionate about reducing waste in landfills, we’re committed to reducing any waste of your personal data.
            </Typography>
            <Typography variant="body1" paragraph>
                When you visit our website, we collect the basics: your IP address, browser type, and how long you hang out with us online. We promise we’re not stage-five clingers; we just like to know how to improve our site to keep you coming back.
            </Typography>
            <Typography variant="body1" paragraph>
                Now, let's talk cookies — not the chocolate chip kind (though we love those), but the digital ones that help us tailor your experience. By using our website, you're saying "yes" to our cookie party. But don’t worry, you can change your RSVP in your browser settings anytime.
            </Typography>
            <Typography variant="body1" paragraph>
                We vow never to share, sell, or rent your personal data to third parties. It’s a pact sealed tighter than a landfill compacted by our top-notch waste management trucks.
            </Typography>
            <Typography variant="body1" paragraph>
                If you have any questions or just want to chat about recycling (or cookies), feel free to contact us at privacy@[yourcompany].com. We’re here to help, whether it’s managing your data or managing your recyclables.
            </Typography>
        </Container>
    );
};

export default PrivacyPolicy;
