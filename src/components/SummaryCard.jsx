import { Card, CardContent, Typography, Box } from '@mui/material';

export default function SummaryCard({ title, value, icon, color = '#009688' }) {
    return (
        <Card
            sx={{
                position: 'relative',
                overflow: 'visible',
                minWidth: 200,
                flex: '1 1 220px',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: -18,
                    left: 20,
                    width: 52,
                    height: 52,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
                    boxShadow: `0 4px 14px ${color}55`,
                    color: '#fff',
                }}
            >
                {icon}
            </Box>
            <CardContent sx={{ pt: 5, pb: '16px !important' }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="right"
                    gutterBottom
                >
                    {title}
                </Typography>
                <Typography variant="h5" align="right" fontWeight={700}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}
