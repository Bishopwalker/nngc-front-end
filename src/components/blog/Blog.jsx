import React, {useState} from 'react';
import {ThemeProvider, useTheme} from '@mui/material/styles';
import {Card, CardContent, CardHeader, CardMedia, Container, Grid, Typography} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from "@mui/material/Button";
import CAT from "../../../public/assets/cartchem3-d0fffe7a.png"
import CAT1 from "../../../public/assets/cat_chem1-24b0ae96.png"
import NNCS from '../../../public/assets/nncs.jpg'
import FUR from "../../../public/assets/furmonster3d-fd7f35f2.png"
import BASS from "../../../public/assets/kingstripper-a07c0608.png"
import TRUCK from "../../../public/assets/truck_trailer-517eec13.png"
import TRUCK1 from "../../../public/assets/truck_trailer1-a6af3c75.png"
import UFO from "../../../public/assets/ufo_trash-43dbeea5.png"
import Service from "../service/Service";
import {Helmet} from "react-helmet";


const blogPosts = [
    {title:'My Speech To Mount Zion Church of Gratitude and Celebration for Northern Neck Christian School...',
    date:'May 6, 2023',
        image: NNCS,
        alt: 'Northern Neck Christian School',
        content: "Good evening, esteemed members of Mount Zion Church, teachers, staff, and fellow parents. I stand before you today, filled with gratitude and admiration for Northern Neck Christian School and its impact on my daughter, Lindsey Walker. Since she began attending in January 2023, we have seen remarkable changes in her life, and it's a pleasure to share some of these with you.\n" +
            "\n" +
            "One of the most heartwarming developments is Lindsey's newfound appreciation for prayer. She now eagerly leads our family in prayer before every meal, reminding us of the importance of gratitude and our connection to a higher power. This has created a beautiful environment of love and reverence in our home.\n" +
            "\n" +
            "Lindsey's personal relationship with Jesus has blossomed at Northern Neck Christian School. She often comes home, enthusiastically telling my wife Victoria and me about her love for Jesus, and it is a joy to see her faith grow stronger each day.\n" +
            "\n" +
            "Her academic progress has been equally impressive. It is clear that someone at the school has dedicated time and effort to helping Lindsey improve her reading skills. We often find her singing \"Go Tell It on the Mountain\" with passion and pride, a testament to the nurturing atmosphere at the school.\n" +
            "\n" +
            "Her knowledge of the Bible has grown exponentially, as she shares stories and verses such as Genesis 1:1, Chronicles 15:2, and Joel 2:32 with us. She has even begun teaching my wife new things about Jesus, and her happiness in attending school is palpable.\n" +
            "\n" +
            "Initially, I must admit, I was skeptical about the traditional values of Dr. Morrison and had enrolled Lindsey in a public school. However, God reached out and guided me, showing me that Northern Neck ChristianSchool was where Lindsey truly belonged. I am profoundly grateful for this divine intervention, as it has shielded my daughter from the confusing and misguided ideologies prevalent in today's world.\n" +
            "\n" +
            "In closing, I would like to express my deepest gratitude to Mount Zion Church for allowing Northern Neck Christian School to use their facilities. Your generosity has made it possible for children like Lindsey to grow in faith, knowledge, and love. May God continue to bless this wonderful partnership. Thank you."

    },
    {
        title: 'How to Choose a Solid Waste Removal Company',
        date: 'August 20, 2023',
        image: CAT,
        alt: 'Cartoon Chemist Junk Removal',
        content: 'Choosing the right solid waste removal company is essential for both residential and commercial properties. Here are some tips to help you make the right choice:\n' +
            '1. Research Companies: Look for companies with a good reputation and positive customer reviews.\n' +
            '2. Check Credentials: Ensure the company is licensed and follows environmental regulations.\n' +
            '3. Get Quotes: Compare pricing and services offered by different companies.\n' +
            '4. Understand Services: Know what types of waste the company handles and their disposal methods.\n' +
            '5. Customer Service: Choose a company that offers excellent customer support and flexible scheduling.\n' +
            '6. Consider Sustainability: Opt for companies that prioritize recycling and eco-friendly practices.\n' +
            '7. Trust Your Instincts: Go with a company that feels right and meets your specific needs.\n' +
            'By following these guidelines, you can find a reliable solid waste removal company that fits your budget and requirements.',
    },
    {
        title: 'Yard Junk Removal: A Comprehensive Guide',
        date: 'August 22, 2023',
        image: CAT1,
        alt: 'Cartoon Chemist Debris Removal',
        content: 'Yard junk can accumulate quickly, especially after a landscaping project or seasonal cleanup. Here’s a guide to help you with yard junk removal:\n' +
            '1. Identify Junk: Determine what needs to be removed, such as branches, leaves, old furniture, or construction debris.\n' +
            '2. Sort Materials: Separate recyclable materials like metals and plastics from non-recyclables.\n' +
            '3. Hire Professionals: Consider hiring a yard junk removal service for large or heavy items.\n' +
            '4. Use Proper Tools: Utilize wheelbarrows, rakes, and shovels to gather and transport junk.\n' +
            '5. Dispose Responsibly: Take materials to a recycling center or landfill, following local regulations.\n' +
            '6. Consider a Dumpster Rental: For big projects, renting a dumpster can be a convenient option.\n' +
            '7. Restore Your Yard: Fill holes, plant new grass, or add mulch to restore the appearance of your yard.\n' +
            'With proper planning and execution, yard junk removal can be a manageable task that enhances the beauty and functionality of your outdoor space.',
    },
    {
        title: 'The Importance of Proper E-Waste Disposal',
        date: 'September 1, 2023',
        image: UFO,
        alt: 'UFO Trash Waste Collection Northumberland County',
        content: 'Electronic waste, or e-waste, is a growing concern. Improper disposal can lead to harmful chemicals leaking into the environment. Here’s how to handle e-waste responsibly:\n' +
            '1. Identify E-Waste: Includes old computers, phones, TVs, and batteries.\n' +
            '2. Find a Recycling Center: Many facilities specialize in e-waste recycling.\n' +
            '3. Wipe Data: Ensure personal data is removed from devices.\n' +
            '4. Avoid Landfills: Never dispose of e-waste with regular trash.\n' +
            '5. Consider Donation: Working electronics can be donated to schools or charities.\n' +
            'By following these steps, you contribute to a cleaner environment and responsible waste management.',
    },
    {
        title: 'Tips for Efficient Yard Waste Removal',
        date: 'September 10, 2023',
        image: FUR,
        alt: 'Fur Monster Weekly Trash Pickup',
        content: 'Yard waste removal is essential for maintaining a clean and healthy outdoor space. Here are some tips to make the process more efficient:\n' +
            '1. Use Compost Bins: Turn organic waste into valuable compost.\n' +
            '2. Bag Leaves: Use biodegradable bags for easy disposal.\n' +
            '3. Rent a Chipper: Turn branches into wood chips for landscaping.\n' +
            '4. Schedule Bulky Pick-up: Many cities offer pick-up for large yard waste.\n' +
            '5. Hire Professionals: Consider a yard waste removal service for big jobs.\n' +
            'With proper planning and tools, yard waste removal can be a simple and rewarding task.',
    },
    {
        title: 'Understanding Hazardous Waste Disposal',
        date: 'September 15, 2023',
        image: TRUCK1,
        alt: 'Truck Trash Collection Northumberland County',
        content: 'Hazardous waste requires special handling to prevent harm to people and the environment. Here’s what you need to know:\n' +
            '1. Identify Hazardous Waste: Includes chemicals, paints, pesticides, and certain cleaning products.\n' +
            '2. Use Proper Containers: Store in original or clearly labeled containers.\n' +
            '3. Find a Collection Facility: Many areas have facilities for hazardous waste.\n' +
            '4. Follow Local Regulations: Adhere to local guidelines for disposal.\n' +
            '5. Never Mix or Pour Down Drains: This can cause dangerous reactions or contamination.\n' +
            'Understanding and following proper disposal methods ensures safety and environmental protection.',
    },
    {
        title: 'Commercial Waste Management: Best Practices',
        date: 'September 20, 2023',
        image: BASS,
        alt: 'Bass Monster Recycling Pickup',
        content: 'Effective commercial waste management is vital for businesses. Here are best practices to follow:\n' +
            '1. Assess Waste Streams: Understand the types and amounts of waste generated.\n' +
            '2. Implement Recycling: Set up recycling programs for paper, plastic, and metal.\n' +
            '3. Educate Employees: Provide training on waste reduction and recycling.\n' +
            '4. Choose Reusable Products: Opt for reusable containers and supplies.\n' +
            '5. Hire a Waste Management Company: Professionals can tailor services to your needs.\n' +
            'By adopting these practices, businesses can reduce waste, save money, and contribute to sustainability.',
    },
    {
        title: 'Spring Yard Cleanup: A Step-by-Step Guide',
        date: 'September 25, 2023',
        image: TRUCK,
        alt: 'Truck Trash Collection Northumberland County',
        content: 'Spring is the perfect time to rejuvenate your yard. Here’s a step-by-step guide for a thorough cleanup:\n' +
            '1. Clear Debris: Remove leaves, branches, and trash.\n' +
            '2. Prune Shrubs: Trim overgrown shrubs and trees.\n' +
            '3. Prep Garden Beds: Remove weeds and add fresh soil or compost.\n' +
            '4. Repair Hardscapes: Fix any damaged paths, patios, or fences.\n' +
            '5. Mow and Edge Lawn: Give your lawn a fresh, clean appearance.\n' +
            '6. Mulch and Plant: Add mulch and new plants for a refreshed look.\n' +
            'With these steps, your yard will be ready to enjoy all spring and summer long.',
    }

];

const Blog = () => {
    console.log(blogPosts)
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [expandedPost, setExpandedPost] = useState(null);

    const handleViewMore = (index) => {
        if (expandedPost === index) {
            setExpandedPost(null);
        } else {
            setExpandedPost(index);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>Blogs by Bishop Walker - Northern Neck Garbage Collection</title>
                <meta name="description" content="Explore insightful blogs by Bishop Walker on waste management topics and industry insights. Stay informed with Northern Neck Garbage Collection." />
                <meta name="keywords" content="Northern Neck Garbage blogs, waste management insights, Bishop Walker articles, environmental care, recycling tips" />
            </Helmet>
            <Container maxWidth="lg" sx={{ padding: '40px 0' }}>
                <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', margin: '0rem 0 2rem 0', color: '#2d3436', fontFamily: 'Montserrat, sans-serif', }}>
                    Blogs
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold', margin: '0rem 0 2rem 0', color: '#2d3436', fontFamily: 'Montserrat, sans-serif', }}>
                    by Bishop Walker (Owner/CEO)
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {blogPosts.map((post, index) => (
                        <Grid key={index} item xs={12} sm={expandedPost === index ? 12 : 6} md={expandedPost === index ? 12 : 4}>
                            <Card onClick={() => handleViewMore(index)} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)', }, }}>
                                <CardHeader title={post.title} sx={{ background: '#2d3436', color: '#fff', padding: '12px 16px', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', fontWeight: 'bold', fontSize: '1.2rem', }} />
                                <CardMedia component="img" height="150" image={post.image} alt={post.alt} sx={{ objectFit: 'cover', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', }} />
                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1" color="text.secondary">{post.date}</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '12px', flexGrow: 1 }}>
                                            {expandedPost === index ? post.content : `${post.content.slice(0, 100)}...`}
                                        </Typography>
                                    </CardContent>

                                <Button variant="contained" color="primary" >
                                    {expandedPost === index ? 'View Less' : 'View More'}
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Service/>
        </ThemeProvider>
    );
};

export default Blog;
