import { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { faqs } from '../../data/mockData';

export default function HelpPage() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (_event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Help & Support
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Find answers to common questions or get in touch with us.
            </Typography>

            <Grid container spacing={3}>
                {/* FAQ */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Frequently Asked Questions
                    </Typography>
                    {faqs.map((faq, i) => (
                        <Accordion
                            key={i}
                            expanded={expanded === `panel${i}`}
                            onChange={handleChange(`panel${i}`)}
                            sx={{ mb: 1, borderRadius: '12px !important', overflow: 'hidden' }}
                            disableGutters
                            elevation={0}
                            variant="outlined"
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{ fontWeight: 600 }}
                            >
                                <Typography fontWeight={600}>{faq.q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" color="text.secondary">
                                    {faq.a}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>

                {/* Contact */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Contact Us
                    </Typography>
                    <Card>
                        <CardContent sx={{ p: 3 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    mb: 3,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: '50%',
                                        bgcolor: 'primary.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <SupportAgentIcon sx={{ color: '#fff' }} />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        Support Team
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        We're here to help
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    mb: 2,
                                }}
                            >
                                <EmailIcon color="action" />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Email
                                    </Typography>
                                    <Typography variant="body2" fontWeight={500}>
                                        support@ngotransparency.org
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <PhoneIcon color="action" />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Phone
                                    </Typography>
                                    <Typography variant="body2" fontWeight={500}>
                                        +91 1800-123-4567 (Toll Free)
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
