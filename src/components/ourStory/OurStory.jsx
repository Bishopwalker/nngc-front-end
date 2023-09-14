import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const MyStory = () => {
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (firstLoad) {
            window.scrollTo(0, 0);
            setFirstLoad(false);
        }
    }, [firstLoad]);

    const paragraphs = [
        "Hello, I'm Bishop Walker, the founder of Northern Neck Garbage Collection, LLC, or NNGC for short. My journey into this business began on a day that many would prefer to stay indoors—cold, wet, and downright miserable. I was at the city trash compactor, unloading bags of wet trash, when I noticed an elderly lady struggling with her own. Without a second thought, I stepped in to help. It was a simple act, but the gratitude in her eyes spoke volumes. That was the moment I realized there was a gaping need in Northumberland County, Virginia—a need for a dedicated trash and yard cleanup service that not only serves but cares.",
        <h3 key="header1">Why I Started NNGC</h3>,
        "The experience with the elderly lady was a turning point. I knew that if she was facing difficulties, there were likely many more like her—especially senior citizens—who needed help but had no one to turn to. That's when Northern Neck Garbage Collection, LLC was born. Our mission is simple: to provide an invaluable service with a focus on customer service, honesty, and value.",
        <h3 key="header2">Customer Service</h3>,
        "At NNGC, customer service isn't just a department; it's an ethos that permeates every aspect of our business. We believe in going the extra mile—whether that's helping you bring your trash out or ensuring that your yard is spotless after a cleanup. We're not just a service; we're a helping hand.",
        <h3 key="header3">Honesty and Value</h3>,
        "In an industry where shortcuts are often taken at the expense of customers, NNGC stands apart. Our transparent pricing and honest service mean you always know what you're getting. No hidden fees, no surprise charges. Just good, honest work at a value you can appreciate.",
        <h3 key="header4">Taking Care of Our Senior Citizens</h3>,
        "Senior citizens hold a special place in our hearts and our business model. We understand the unique challenges they face and offer tailored services to make their lives a little easier. Whether it's a discount or extra time to ensure the job is done right, we're here for them.",
        <h3 key="header5">The NNGC Promise</h3>,
        "With a unique charitable component, we aim to give back to the community that supports us. A portion of our profits goes towards local charities, focusing on those that assist senior citizens and improve community well-being.",
        "So, when you choose NNGC, you're not just getting a service—you're becoming a part of a community that believes in doing good, one trash bag at a time."
    ];

    return (
        <Box
            sx={{
                width: '100%',
                background: '#333',  // Dark background for better contrast
                color: 'white',  // White text
                fontWeight: 800,
                padding: '20px',
                paddingBottom: '40px',
                fontFamily: 'Montserrat, sans-serif',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: '80%',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#FFF',  // White text for better contrast
                        marginTop: '1rem',
                        marginBottom: '2rem',
                        fontFamily: "'Montserrat', sans-serif",
                    }}
                >
                    My Story
                </Typography>
                {paragraphs.map((paragraph, index) => (
                    <Typography
                        key={index}
                        variant="body1"
                        component="div"  // Changed to div to allow h3 elements
                        sx={{
                            lineHeight: 1.5,
                            textAlign: 'justify',
                            fontSize: '1.2rem',
                            color: '#FFF',  // White text for better contrast
                            fontFamily: 'Montserrat, sans-serif',
                            marginBottom: '1rem',
                        }}
                    >
                        {paragraph}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
};

export default MyStory;