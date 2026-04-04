import { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    MenuItem,
    TextField,
    Button,
    Chip,
    Divider,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VerifiedIcon from '@mui/icons-material/Verified';
import GppBadIcon from '@mui/icons-material/GppBad';
import { useApp } from '../../context/AppContext';

export default function CertificatePage() {
    const { certificates } = useApp();
    const [year, setYear] = useState(certificates[0]?.year || '');
    const cert = certificates.find((c) => c.year === year);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                80G Tax Certificate
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Download your 80G tax exemption certificates.
            </Typography>

            <Card sx={{ maxWidth: 520 }}>
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    <TextField
                        select
                        fullWidth
                        label="Financial Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        sx={{ mb: 3 }}
                    >
                        {certificates.map((c) => (
                            <MenuItem key={c.year} value={c.year}>
                                FY {c.year}
                            </MenuItem>
                        ))}
                    </TextField>

                    {cert && (
                        <>
                            <Divider sx={{ mb: 3 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <InfoRow
                                    label="Total Donations"
                                    value={`₹${cert.totalDonation.toLocaleString('en-IN')}`}
                                />
                                <InfoRow
                                    label="PAN Verification"
                                    value={
                                        cert.panVerified ? (
                                            <Chip
                                                icon={<VerifiedIcon />}
                                                label="Verified"
                                                color="success"
                                                size="small"
                                                variant="outlined"
                                            />
                                        ) : (
                                            <Chip
                                                icon={<GppBadIcon />}
                                                label="Not Verified"
                                                color="error"
                                                size="small"
                                                variant="outlined"
                                            />
                                        )
                                    }
                                />
                                <InfoRow
                                    label="Certificate Status"
                                    value={
                                        <Chip
                                            label={cert.status}
                                            color="primary"
                                            size="small"
                                            variant="outlined"
                                        />
                                    }
                                />
                            </Box>

                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<DownloadIcon />}
                                size="large"
                                sx={{ mt: 4 }}
                            >
                                Download Certificate (PDF)
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

function InfoRow({ label, value }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
            {typeof value === 'string' ? (
                <Typography variant="subtitle1" fontWeight={600}>
                    {value}
                </Typography>
            ) : (
                value
            )}
        </Box>
    );
}
