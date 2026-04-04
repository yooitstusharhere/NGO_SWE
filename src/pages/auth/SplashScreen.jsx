import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Fade } from '@mui/material';

export default function SplashScreen() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => navigate('/login'), 2500);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #004D40 0%, #009688 50%, #4DB6AC 100%)',
                color: '#fff',
            }}
        >
            <Fade in={show} timeout={800}>
                <Box sx={{ textAlign: 'center' }}>
                    {/* Logo */}
                    <Box
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: 4,
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                            fontSize: 48,
                            fontWeight: 800,
                            border: '2px solid rgba(255,255,255,0.3)',
                        }}
                    >
                        N
                    </Box>

                    <Typography variant="h4" fontWeight={800} gutterBottom>
                        NGO Transparency
                    </Typography>
                    <Typography variant="subtitle1" sx={{ opacity: 0.85, mb: 5 }}>
                        Making Impact Visible
                    </Typography>

                    <CircularProgress
                        size={36}
                        thickness={4}
                        sx={{ color: 'rgba(255,255,255,0.7)' }}
                    />
                </Box>
            </Fade>
        </Box>
    );
}
