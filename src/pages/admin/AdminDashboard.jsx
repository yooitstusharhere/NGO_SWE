import {
    Box,
    Typography,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';
import SummaryCard from '../../components/SummaryCard';
import QuickActionCard from '../../components/QuickActionCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import GroupIcon from '@mui/icons-material/Group';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
    const { adminStats, donations } = useApp();

    const recentDonations = donations.slice(0, 6);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Overview of all funds, donors, and projects.
            </Typography>


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
                    title="Total Funds Raised"
                    value={`₹${adminStats.totalFunds.toLocaleString('en-IN')}`}
                    icon={<CurrencyRupeeIcon />}
                    color="#009688"
                />
                <SummaryCard
                    title="Total Donors"
                    value={adminStats.totalDonors}
                    icon={<GroupIcon />}
                    color="#FF6F00"
                />
                <SummaryCard
                    title="Active Projects"
                    value={adminStats.activeProjects}
                    icon={<FolderSpecialIcon />}
                    color="#7B1FA2"
                />
                <SummaryCard
                    title="This Month"
                    value={`₹${adminStats.monthlyDonations.toLocaleString('en-IN')}`}
                    icon={<TrendingUpIcon />}
                    color="#0288D1"
                />
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>
                Management
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
                <QuickActionCard
                    title="Donor Management"
                    icon={<PeopleIcon fontSize="large" />}
                    to="/admin"
                    color="#009688"
                />
                <QuickActionCard
                    title="Project Management"
                    icon={<AssignmentIcon fontSize="large" />}
                    to="/admin"
                    color="#FF6F00"
                />
                <QuickActionCard
                    title="Reports"
                    icon={<BarChartIcon fontSize="large" />}
                    to="/admin"
                    color="#7B1FA2"
                />
            </Box>


            <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Donations
            </Typography>
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Project</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>
                                    Amount
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>
                                    Method
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>
                                    Date
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentDonations.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.project}</TableCell>
                                    <TableCell align="right">
                                        <Typography fontWeight={600}>
                                            ₹{d.amount.toLocaleString('en-IN')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">{d.method}</TableCell>
                                    <TableCell align="right">
                                        {new Date(d.date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Chip
                                            label={d.status}
                                            size="small"
                                            color={d.status === 'Success' ? 'success' : 'warning'}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
}
