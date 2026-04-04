import {
    Box,
    Typography,
    Card,
    CardContent,
    LinearProgress,
    Chip,
    Grid,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { useApp } from '../../context/AppContext';

const categoryColors = {
    Water: '#0288D1',
    Education: '#7B1FA2',
    Healthcare: '#E53935',
    Environment: '#43A047',
    Livelihood: '#FF6F00',
};

export default function ImpactPage() {
    const { projects } = useApp();

    const totalBeneficiaries = projects.reduce((s, p) => s + p.beneficiaries, 0);
    const totalRaised = projects.reduce((s, p) => s + p.raised, 0);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Impact Reports
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                See how your donations are making a real difference.
            </Typography>

            {/* Aggregate stats */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Chip
                    label={`${projects.length} Projects`}
                    color="primary"
                    variant="outlined"
                />
                <Chip
                    label={`${totalBeneficiaries.toLocaleString('en-IN')} Total Beneficiaries`}
                    color="success"
                    variant="outlined"
                />
                <Chip
                    label={`₹${totalRaised.toLocaleString('en-IN')} Total Raised`}
                    variant="outlined"
                />
            </Box>

            <Grid container spacing={3}>
                {projects.map((p) => {
                    const progress = Math.min(Math.round((p.raised / p.goal) * 100), 100);
                    const color = categoryColors[p.category] || '#009688';

                    return (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                {/* Color bar */}
                                <Box sx={{ height: 6, background: color }} />
                                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            mb: 1,
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ lineHeight: 1.3 }}>
                                            {p.name}
                                        </Typography>
                                        <Chip
                                            label={p.category}
                                            size="small"
                                            sx={{
                                                bgcolor: `${color}18`,
                                                color,
                                                fontWeight: 600,
                                                ml: 1,
                                                flexShrink: 0,
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 2, flex: 1 }}
                                    >
                                        {p.description}
                                    </Typography>

                                    {/* Beneficiaries */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            mb: 2,
                                        }}
                                    >
                                        <PeopleIcon fontSize="small" color="action" />
                                        <Typography variant="body2" fontWeight={600}>
                                            {p.beneficiaries.toLocaleString('en-IN')} beneficiaries
                                        </Typography>
                                    </Box>

                                    {/* Progress */}
                                    <Box sx={{ mb: 0.5 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mb: 0.5,
                                            }}
                                        >
                                            <Typography variant="caption" color="text.secondary">
                                                ₹{p.raised.toLocaleString('en-IN')} raised
                                            </Typography>
                                            <Typography variant="caption" fontWeight={600}>
                                                {progress}%
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={progress}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                bgcolor: `${color}22`,
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 4,
                                                    bgcolor: color,
                                                },
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ mt: 0.5, display: 'block', textAlign: 'right' }}
                                        >
                                            Goal: ₹{p.goal.toLocaleString('en-IN')}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
