import { Typography, Box } from '@mui/material';
import SummaryCard from '../../components/SummaryCard';
import QuickActionCard from '../../components/QuickActionCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HistoryIcon from '@mui/icons-material/History';
import InsightsIcon from '@mui/icons-material/Insights';
import DescriptionIcon from '@mui/icons-material/Description';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useApp } from '../../context/AppContext';

export default function DonorDashboard() {
    const { donorStats } = useApp();

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Welcome back! Here's your donation overview.
            </Typography>

            {/* Summary Cards */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 3,
                    flexWrap: 'wrap',
                    mb: 5,
                    mt: 3,
                }}
            >
                <SummaryCard
                    title="Total Donated"
                    value={`₹${donorStats.totalDonated.toLocaleString('en-IN')}`}
                    icon={<CurrencyRupeeIcon />}
                    color="#009688"
                />
                <SummaryCard
                    title="Donations"
                    value={donorStats.donationCount}
                    icon={<ReceiptLongIcon />}
                    color="#FF6F00"
                />
                <SummaryCard
                    title="Projects Supported"
                    value={donorStats.projectsSupported}
                    icon={<FolderSpecialIcon />}
                    color="#7B1FA2"
                />
            </Box>

            {/* Quick Actions */}
            <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <QuickActionCard
                    title="Donate"
                    icon={<VolunteerActivismIcon fontSize="large" />}
                    to="/donate"
                    color="#009688"
                />
                <QuickActionCard
                    title="History"
                    icon={<HistoryIcon fontSize="large" />}
                    to="/history"
                    color="#FF6F00"
                />
                <QuickActionCard
                    title="Impact"
                    icon={<InsightsIcon fontSize="large" />}
                    to="/impact"
                    color="#7B1FA2"
                />
                <QuickActionCard
                    title="Certificate"
                    icon={<DescriptionIcon fontSize="large" />}
                    to="/certificate"
                    color="#0288D1"
                />
                <QuickActionCard
                    title="Notifications"
                    icon={<NotificationsActiveIcon fontSize="large" />}
                    to="/notifications"
                    color="#E53935"
                />
            </Box>
        </Box>
    );
}
