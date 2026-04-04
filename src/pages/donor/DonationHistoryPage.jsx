import { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { useApp } from '../../context/AppContext';

export default function DonationHistoryPage() {
    const { donations } = useApp();
    const [selected, setSelected] = useState(null);

    // Compute totals
    const totalAmount = donations.reduce((s, d) => s + d.amount, 0);
    const successCount = donations.filter((d) => d.status === 'Success').length;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Donation History
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                View all your past donations and their status.
            </Typography>

            {/* Summary bar */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    mb: 3,
                }}
            >
                <Chip label={`${donations.length} Total`} variant="outlined" />
                <Chip label={`${successCount} Successful`} color="success" variant="outlined" />
                <Chip
                    label={`₹${totalAmount.toLocaleString('en-IN')} Total Amount`}
                    color="primary"
                    variant="outlined"
                />
            </Box>

            <Card>
                <List disablePadding>
                    {donations.length === 0 && (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Typography color="text.secondary">
                                No donations yet. Make your first donation!
                            </Typography>
                        </Box>
                    )}
                    {donations.map((d, i) => (
                        <Box key={d.id}>
                            {i > 0 && <Divider />}
                            <ListItemButton onClick={() => setSelected(d)} sx={{ py: 2, px: 3 }}>
                                <ListItemIcon sx={{ minWidth: 44 }}>
                                    {d.status === 'Success' ? (
                                        <CheckCircleIcon color="success" />
                                    ) : (
                                        <HourglassTopIcon color="warning" />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={d.project}
                                    secondary={new Date(d.date).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                />
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="subtitle1" fontWeight={700}>
                                        ₹{d.amount.toLocaleString('en-IN')}
                                    </Typography>
                                    <Chip
                                        label={d.status}
                                        size="small"
                                        color={d.status === 'Success' ? 'success' : 'warning'}
                                        variant="outlined"
                                    />
                                </Box>
                            </ListItemButton>
                        </Box>
                    ))}
                </List>
            </Card>

            {/* Detail Dialog */}
            <Dialog
                open={!!selected}
                onClose={() => setSelected(null)}
                maxWidth="xs"
                fullWidth
            >
                {selected && (
                    <>
                        <DialogTitle>Donation Details</DialogTitle>
                        <DialogContent dividers>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Detail label="Project" value={selected.project} />
                                <Detail
                                    label="Date"
                                    value={new Date(selected.date).toLocaleDateString('en-IN', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                />
                                <Detail
                                    label="Amount"
                                    value={`₹${selected.amount.toLocaleString('en-IN')}`}
                                />
                                <Detail label="Payment Method" value={selected.method} />
                                <Detail label="Status" value={selected.status} />
                                <Detail label="Transaction ID" value={`TXN${selected.id}`} />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setSelected(null)}>Close</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}

function Detail({ label, value }) {
    return (
        <Box>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body1" fontWeight={500}>
                {value}
            </Typography>
        </Box>
    );
}
