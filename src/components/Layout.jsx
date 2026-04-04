import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Box,
    useMediaQuery,
    useTheme,
    Divider,
    Chip,
    Tooltip,
    Switch,
    FormControlLabel,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HistoryIcon from '@mui/icons-material/History';
import InsightsIcon from '@mui/icons-material/Insights';
import DescriptionIcon from '@mui/icons-material/Description';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useAuth } from '../context/AuthContext';

const DRAWER_WIDTH = 260;

const donorMenu = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'Donate', icon: <VolunteerActivismIcon />, path: '/donate' },
    { label: 'Donation History', icon: <HistoryIcon />, path: '/history' },
    { label: 'Impact Reports', icon: <InsightsIcon />, path: '/impact' },
    { label: '80G Certificate', icon: <DescriptionIcon />, path: '/certificate' },
    { label: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
];

const adminMenu = [
    { label: 'Admin Dashboard', icon: <AdminPanelSettingsIcon />, path: '/admin' },
    { label: 'Donor Management', icon: <GroupIcon />, path: '/admin' },
    { label: 'Project Management', icon: <InsightsIcon />, path: '/admin' },
];

const bottomMenu = [
    { label: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { label: 'Help & Support', icon: <HelpIcon />, path: '/help' },
];

export default function Layout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();
    const { user, role, switchRole } = useAuth();

    const menu = role === 'admin' ? adminMenu : donorMenu;

    const drawerContent = (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Brand */}
            <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #009688 0%, #00695C 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: 18,
                    }}
                >
                    N
                </Box>
                <Box>
                    <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
                        NGO Transparency
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Making Impact Visible
                    </Typography>
                </Box>
            </Box>
            <Divider />

            {/* Role Switch */}
            <Box sx={{ px: 2, py: 1.5 }}>
                <Chip
                    icon={<SwapHorizIcon />}
                    label={role === 'donor' ? 'Donor Mode' : 'Admin Mode'}
                    color="primary"
                    variant="outlined"
                    onClick={switchRole}
                    sx={{ width: '100%', justifyContent: 'flex-start' }}
                />
            </Box>

            {/* Main Nav */}
            <List sx={{ flex: 1, px: 1 }}>
                {menu.map((item) => (
                    <ListItem key={item.label} disablePadding sx={{ mb: 0.3 }}>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => {
                                navigate(item.path);
                                if (isMobile) setMobileOpen(false);
                            }}
                            sx={{
                                borderRadius: 2,
                                '&.Mui-selected': {
                                    bgcolor: 'primary.main',
                                    color: '#fff',
                                    '& .MuiListItemIcon-root': { color: '#fff' },
                                    '&:hover': { bgcolor: 'primary.dark' },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider />

            {/* Bottom Nav */}
            <List sx={{ px: 1, pb: 1 }}>
                {bottomMenu.map((item) => (
                    <ListItem key={item.label} disablePadding sx={{ mb: 0.3 }}>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => {
                                navigate(item.path);
                                if (isMobile) setMobileOpen(false);
                            }}
                            sx={{
                                borderRadius: 2,
                                '&.Mui-selected': {
                                    bgcolor: 'primary.main',
                                    color: '#fff',
                                    '& .MuiListItemIcon-root': { color: '#fff' },
                                    '&:hover': { bgcolor: 'primary.dark' },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{ keepMounted: true }}
                    sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
                >
                    {drawerContent}
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: DRAWER_WIDTH,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            borderRight: '1px solid',
                            borderColor: 'divider',
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            {/* Main */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <AppBar
                    position="sticky"
                    color="inherit"
                    elevation={0}
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                >
                    <Toolbar>
                        {isMobile && (
                            <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 1 }}>
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Typography variant="h6" sx={{ flex: 1 }} />
                        <Tooltip title="Profile">
                            <IconButton onClick={() => navigate('/profile')}>
                                <Avatar
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        bgcolor: 'primary.main',
                                        fontSize: 16,
                                    }}
                                >
                                    {user?.name?.charAt(0) || 'U'}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        p: { xs: 2, sm: 3 },
                        maxWidth: 1200,
                        width: '100%',
                        mx: 'auto',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
