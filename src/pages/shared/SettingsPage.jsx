import {
    Box,
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    Divider,
    Button,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import CampaignIcon from '@mui/icons-material/Campaign';
import { useThemeMode } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SettingsPage() {
    const { mode, toggleTheme } = useThemeMode();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [emailNotif, setEmailNotif] = useState(true);
    const [pushNotif, setPushNotif] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Customize your app experience.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 520 }}>
                {/* Appearance */}
                <Card>
                    <CardContent sx={{ px: 1, py: 0 }}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <DarkModeIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Dark Mode"
                                    secondary="Toggle dark/light appearance"
                                />
                                <Switch
                                    checked={mode === 'dark'}
                                    onChange={toggleTheme}
                                    color="primary"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <CardContent sx={{ px: 1, py: 0 }}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <EmailIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Email Notifications"
                                    secondary="Receive donation receipts and updates via email"
                                />
                                <Switch
                                    checked={emailNotif}
                                    onChange={() => setEmailNotif(!emailNotif)}
                                    color="primary"
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemIcon>
                                    <CampaignIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Push Notifications"
                                    secondary="Get notified about project updates"
                                />
                                <Switch
                                    checked={pushNotif}
                                    onChange={() => setPushNotif(!pushNotif)}
                                    color="primary"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>

                {/* Profile & Logout */}
                <Card>
                    <CardContent sx={{ px: 1, py: 0 }}>
                        <List>
                            <ListItem
                                component="div"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate('/profile')}
                            >
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Profile Settings"
                                    secondary="Edit your personal information"
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemIcon>
                                    <LogoutIcon color="error" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography color="error" fontWeight={600}>
                                            Logout
                                        </Typography>
                                    }
                                    secondary="Sign out of your account"
                                />
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
