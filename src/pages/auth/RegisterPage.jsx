import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Link,
    InputAdornment,
    IconButton,
    Alert,
    Grid,
    Fade,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        pan: '',
        address: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const update = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
            errs.email = 'Valid email required';
        if (!form.phone.match(/^\+?\d{10,13}$/))
            errs.phone = 'Valid mobile number required';
        if (!form.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]$/))
            errs.pan = 'Valid PAN required (e.g. ABCPS1234F)';
        if (!form.address.trim()) errs.address = 'Address is required';
        if (form.password.length < 6)
            errs.password = 'Password must be at least 6 characters';
        if (form.password !== form.confirmPassword)
            errs.confirmPassword = 'Passwords do not match';
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;
        register(form);
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 1200);
    };

    const field = (label, key, icon, type = 'text', extra = {}) => (
        <TextField
            fullWidth
            label={label}
            value={form[key]}
            onChange={update(key)}
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            error={!!errors[key]}
            helperText={errors[key]}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">{icon}</InputAdornment>
                ),
                ...(type === 'password'
                    ? {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    size="small"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }
                    : {}),
            }}
            {...extra}
        />
    );

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                    'linear-gradient(135deg, #004D40 0%, #009688 50%, #4DB6AC 100%)',
                p: 2,
            }}
        >
            <Fade in timeout={600}>
                <Card sx={{ maxWidth: 520, width: '100%' }}>
                    <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 3,
                                    background:
                                        'linear-gradient(135deg, #009688 0%, #00695C 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2,
                                    color: '#fff',
                                    fontWeight: 800,
                                    fontSize: 24,
                                }}
                            >
                                N
                            </Box>
                            <Typography variant="h5" fontWeight={700}>
                                Create Account
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Join the NGO Transparency platform
                            </Typography>
                        </Box>

                        {success && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                Registration successful! Redirecting…
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    {field('Full Name', 'name', <PersonIcon color="action" />)}
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    {field('Email', 'email', <EmailIcon color="action" />, 'email')}
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    {field('Mobile Number', 'phone', <PhoneIcon color="action" />)}
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    {field('PAN Number', 'pan', <BadgeIcon color="action" />)}
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    {field('Address', 'address', <HomeIcon color="action" />)}
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    {field(
                                        'Password',
                                        'password',
                                        <LockIcon color="action" />,
                                        'password'
                                    )}
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    {field(
                                        'Confirm Password',
                                        'confirmPassword',
                                        <LockIcon color="action" />,
                                        'password'
                                    )}
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                        </form>

                        <Typography variant="body2" align="center">
                            Already have an account?{' '}
                            <Link component={RouterLink} to="/login" fontWeight={600}>
                                Login here
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Fade>
        </Box>
    );
}
