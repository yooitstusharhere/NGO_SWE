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
    Divider,
    InputAdornment,
    IconButton,
    Alert,
    Fade,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        login(email, password);
        navigate('/dashboard');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #004D40 0%, #009688 50%, #4DB6AC 100%)',
                p: 2,
            }}
        >
            <Fade in timeout={600}>
                <Card sx={{ maxWidth: 440, width: '100%' }}>
                    <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                        {/* Header */}
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 3,
                                    background: 'linear-gradient(135deg, #009688 0%, #00695C 100%)',
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
                                Welcome Back
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Sign in to your NGO Transparency account
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email or Mobile"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mb: 2 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ mb: 1 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="action" />
                                        </InputAdornment>
                                    ),
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
                                }}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                                <Link
                                    component="button"
                                    type="button"
                                    variant="body2"
                                    underline="hover"
                                >
                                    Forgot Password?
                                </Link>
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{ mb: 2. }}
                            >
                                Login
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                size="large"
                                startIcon={<PhonelinkLockIcon />}
                                sx={{ mb: 3 }}
                            >
                                Login with OTP
                            </Button>
                        </form>

                        <Divider sx={{ mb: 2 }}>
                            <Typography variant="caption" color="text.secondary">
                                OR
                            </Typography>
                        </Divider>

                        <Typography variant="body2" align="center">
                            New user?{' '}
                            <Link component={RouterLink} to="/register" fontWeight={600}>
                                Register here
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Fade>
        </Box>
    );
}
