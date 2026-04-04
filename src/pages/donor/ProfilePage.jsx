import { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button,
    TextField,
    Grid,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ ...user });
    const [pwDialog, setPwDialog] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateProfile(form);
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                My Profile
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Manage your personal information.
            </Typography>

            {saved && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Profile updated successfully!
                </Alert>
            )}

            <Card sx={{ maxWidth: 600 }}>
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    {/* Avatar & Name */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2.5,
                            mb: 3,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 72,
                                height: 72,
                                bgcolor: 'primary.main',
                                fontSize: 28,
                                fontWeight: 700,
                            }}
                        >
                            {user.name?.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography variant="h6">{user.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Fields */}
                    <Grid container spacing={2}>
                        {[
                            { label: 'Full Name', key: 'name' },
                            { label: 'Email', key: 'email' },
                            { label: 'Phone', key: 'phone' },
                            { label: 'PAN Number', key: 'pan' },
                            { label: 'Address', key: 'address' },
                        ].map(({ label, key }) => (
                            <Grid size={{ xs: 12, sm: key === 'address' ? 12 : 6 }} key={key}>
                                <TextField
                                    fullWidth
                                    label={label}
                                    value={editing ? form[key] || '' : user[key] || ''}
                                    onChange={(e) =>
                                        setForm((p) => ({ ...p, [key]: e.target.value }))
                                    }
                                    InputProps={{ readOnly: !editing }}
                                    variant={editing ? 'outlined' : 'filled'}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                        {editing ? (
                            <>
                                <Button variant="contained" onClick={handleSave}>
                                    Save Changes
                                </Button>
                                <Button variant="outlined" onClick={() => setEditing(false)}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => {
                                    setForm({ ...user });
                                    setEditing(true);
                                }}
                            >
                                Edit Profile
                            </Button>
                        )}
                        <Button
                            variant="outlined"
                            startIcon={<LockResetIcon />}
                            onClick={() => setPwDialog(true)}
                        >
                            Change Password
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<LogoutIcon />}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Change Password Dialog */}
            <Dialog
                open={pwDialog}
                onClose={() => setPwDialog(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent sx={{ pt: '16px !important' }}>
                    <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        sx={{ mb: 2 }}
                    />
                    <TextField fullWidth label="Confirm New Password" type="password" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPwDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setPwDialog(false)}>
                        Update Password
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
