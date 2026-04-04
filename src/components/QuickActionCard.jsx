import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function QuickActionCard({ title, icon, to, color = '#009688' }) {
    const navigate = useNavigate();

    return (
        <Card sx={{ flex: '1 1 160px', minWidth: 160, maxWidth: 220 }}>
            <CardActionArea onClick={() => navigate(to)} sx={{ p: 2 }}>
                <CardContent sx={{ textAlign: 'center', p: 1 }}>
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 1.5,
                            background: `${color}18`,
                            color,
                        }}
                    >
                        {icon}
                    </Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
