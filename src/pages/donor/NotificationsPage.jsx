import {
    Box,
    Typography,
    Card,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Chip,
    Button,
} from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CampaignIcon from '@mui/icons-material/Campaign';
import DescriptionIcon from '@mui/icons-material/Description';
import CircleIcon from '@mui/icons-material/Circle';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useApp } from '../../context/AppContext';

const typeIcon = {
    donation: <VolunteerActivismIcon color="primary" />,
    project: <CampaignIcon sx={{ color: '#7B1FA2' }} />,
    certificate: <DescriptionIcon sx={{ color: '#0288D1' }} />,
};

export default function NotificationsPage() {
    const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1,
                    flexWrap: 'wrap',
                    gap: 1,
                }}
            >
                <Typography variant="h4">Notifications</Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {unreadCount > 0 && (
                        <>
                            <Chip
                                label={`${unreadCount} unread`}
                                color="error"
                                size="small"
                                variant="outlined"
                            />
                            <Button
                                size="small"
                                startIcon={<DoneAllIcon />}
                                onClick={markAllNotificationsRead}
                            >
                                Mark all read
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Stay updated on your donations and projects.
            </Typography>

            <Card>
                <List disablePadding>
                    {notifications.length === 0 && (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Typography color="text.secondary">
                                No notifications yet.
                            </Typography>
                        </Box>
                    )}
                    {notifications.map((n, i) => (
                        <Box key={n.id}>
                            {i > 0 && <Divider />}
                            <ListItemButton
                                onClick={() => markNotificationRead(n.id)}
                                sx={{
                                    py: 2,
                                    px: 3,
                                    bgcolor: n.read ? 'transparent' : 'action.hover',
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 44 }}>
                                    {typeIcon[n.type] || typeIcon.donation}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {n.title}
                                            </Typography>
                                            {!n.read && (
                                                <CircleIcon
                                                    sx={{ fontSize: 8, color: 'primary.main' }}
                                                />
                                            )}
                                        </Box>
                                    }
                                    secondary={
                                        <>
                                            <Typography variant="body2" color="text.secondary">
                                                {n.message}
                                            </Typography>
                                            <Typography variant="caption" color="text.disabled">
                                                {n.time}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItemButton>
                        </Box>
                    ))}
                </List>
            </Card>
        </Box>
    );
}
