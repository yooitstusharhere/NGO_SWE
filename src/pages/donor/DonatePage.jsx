import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Alert,
    Chip,
    Fade,
} from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useApp } from '../../context/AppContext';

const presets = [500, 1000, 2000, 5000];

export default function DonatePage() {
    const { projects, addDonation } = useApp();
    const navigate = useNavigate();
    const [project, setProject] = useState('');
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('upi');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const methodLabels = { upi: 'UPI', card: 'Card', netbanking: 'Net Banking' };

    const handleDonate = () => {
        if (!project) { setError('Please select a project'); return; }
        if (!amount || Number(amount) <= 0) { setError('Please enter a valid amount'); return; }
        setError('');

        addDonation(project, amount, methodLabels[method]);
        setSuccess(true);

        
        setTimeout(() => {
            setSuccess(false);
            setProject('');
            setAmount('');
        }, 2500);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Make a Donation
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Choose a project and make an impact today.
            </Typography>

            {success && (
                <Fade in>
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Thank you! Your donation of ₹{Number(amount).toLocaleString('en-IN')} to{' '}
                        <strong>{project}</strong> has been recorded successfully. View it in{' '}
                        <Box
                            component="span"
                            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={() => navigate('/history')}
                        >
                            Donation History
                        </Box>
                        .
                    </Alert>
                </Fade>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Card sx={{ maxWidth: 600 }}>
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    {/* Project Selection */}
                    <TextField
                        select
                        fullWidth
                        label="Select Project"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        sx={{ mb: 3 }}
                    >
                        {projects.map((p) => (
                            <MenuItem key={p.id} value={p.name}>
                                <Box>
                                    <Typography variant="body1">{p.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        ₹{p.raised.toLocaleString('en-IN')} / ₹{p.goal.toLocaleString('en-IN')} raised
                                    </Typography>
                                </Box>
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Amount */}
                    <TextField
                        fullWidth
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        sx={{ mb: 2 }}
                        InputProps={{
                            startAdornment: (
                                <CurrencyRupeeIcon color="action" sx={{ mr: 1 }} />
                            ),
                        }}
                    />


                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                        {presets.map((p) => (
                            <Chip
                                key={p}
                                label={`₹${p.toLocaleString('en-IN')}`}
                                variant={Number(amount) === p ? 'filled' : 'outlined'}
                                color="primary"
                                onClick={() => setAmount(String(p))}
                                sx={{ fontWeight: 600 }}
                            />
                        ))}
                    </Box>

                   
                    <FormControl sx={{ mb: 3 }}>
                        <FormLabel sx={{ mb: 1, fontWeight: 600 }}>
                            Payment Method
                        </FormLabel>
                        <RadioGroup
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                        >
                            <FormControlLabel
                                value="upi"
                                control={<Radio />}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PhoneAndroidIcon fontSize="small" /> UPI
                                    </Box>
                                }
                            />
                            <FormControlLabel
                                value="card"
                                control={<Radio />}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CreditCardIcon fontSize="small" /> Credit / Debit Card
                                    </Box>
                                }
                            />
                            <FormControlLabel
                                value="netbanking"
                                control={<Radio />}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <AccountBalanceIcon fontSize="small" /> Net Banking
                                    </Box>
                                }
                            />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleDonate}
                        disabled={!project || !amount}
                    >
                        Donate ₹{amount ? Number(amount).toLocaleString('en-IN') : '0'}
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
