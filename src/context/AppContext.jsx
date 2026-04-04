import { createContext, useState, useContext, useCallback } from 'react';
import {
    projects as initialProjects,
    donations as initialDonations,
    notifications as initialNotifications,
    certificates as initialCertificates,
    faqs,
} from '../data/mockData';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

/* ── helper: get financial year string from a Date ── */
function getFY(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth(); // 0-indexed
    // FY runs Apr→Mar: if month >= 3 (April) then FY = year-(year+1), else (year-1)-year
    if (month >= 3) return `${year}-${String(year + 1).slice(2)}`;
    return `${year - 1}-${String(year).slice(2)}`;
}

/* ── helper: relative time label ── */
function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
}

export function AppProvider({ children }) {
    const [projects, setProjects] = useState(initialProjects);
    const [donations, setDonations] = useState(initialDonations);
    const [notifications, setNotifications] = useState(initialNotifications);
    const [certificates, setCertificates] = useState(initialCertificates);

    /* ────────────── DONATION ────────────── */
    const addDonation = useCallback(
        (projectName, amount, method) => {
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];

            // 1. Create donation record
            const newDonation = {
                id: Date.now(),
                date: dateStr,
                amount: Number(amount),
                project: projectName,
                status: 'Success',
                method,
            };
            setDonations((prev) => [newDonation, ...prev]);

            // 2. Update project raised amount
            setProjects((prev) =>
                prev.map((p) =>
                    p.name === projectName
                        ? { ...p, raised: p.raised + Number(amount) }
                        : p
                )
            );

            // 3. Add notification
            const notif = {
                id: Date.now() + 1,
                type: 'donation',
                title: 'Donation Successful',
                message: `Your donation of ₹${Number(amount).toLocaleString('en-IN')} to ${projectName} was successful.`,
                time: timeAgo(now),
                timestamp: now.toISOString(),
                read: false,
            };
            setNotifications((prev) => [notif, ...prev]);

            // 4. Update / create certificate for current FY
            const fy = getFY(now);
            setCertificates((prev) => {
                const exists = prev.find((c) => c.year === fy);
                if (exists) {
                    return prev.map((c) =>
                        c.year === fy
                            ? { ...c, totalDonation: c.totalDonation + Number(amount) }
                            : c
                    );
                }
                return [
                    { year: fy, totalDonation: Number(amount), panVerified: true, status: 'Available' },
                    ...prev,
                ];
            });

            return newDonation;
        },
        []
    );

    /* ────────────── NOTIFICATIONS ────────────── */
    const markNotificationRead = useCallback((id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    }, []);

    const markAllNotificationsRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }, []);

    /* ────────────── COMPUTED STATS ────────────── */
    // Donor stats
    const successfulDonations = donations.filter((d) => d.status === 'Success');
    const totalDonated = successfulDonations.reduce((s, d) => s + d.amount, 0);
    const donationCount = donations.length;
    const projectsSupported = new Set(donations.map((d) => d.project)).size;
    const unreadCount = notifications.filter((n) => !n.read).length;

    // Admin stats (computed from actual data)
    const totalFunds = projects.reduce((s, p) => s + p.raised, 0);
    const activeProjects = projects.length;
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const monthlyDonations = donations
        .filter((d) => {
            const dd = new Date(d.date);
            return (
                dd.getMonth() === thisMonth &&
                dd.getFullYear() === thisYear &&
                d.status === 'Success'
            );
        })
        .reduce((s, d) => s + d.amount, 0);

    // Build recent donors list from donations (latest 5 unique names)
    const recentDonors = donations.slice(0, 5).map((d) => ({
        name: 'Donor', // in a real app these would be different users
        amount: d.amount,
        date: d.date,
        project: d.project,
    }));

    const donorStats = { totalDonated, donationCount, projectsSupported, unreadCount };
    const adminStats = {
        totalFunds,
        totalDonors: 342 + donations.length, // base + new
        activeProjects,
        monthlyDonations,
        recentDonors,
    };

    return (
        <AppContext.Provider
            value={{
                // data
                projects,
                donations,
                notifications,
                certificates,
                faqs,
                // computed
                donorStats,
                adminStats,
                // actions
                addDonation,
                markNotificationRead,
                markAllNotificationsRead,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
