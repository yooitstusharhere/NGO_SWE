export const projects = [
    { id: 1, name: 'Clean Water Initiative', description: 'Providing clean drinking water to rural villages in Rajasthan through bore wells and filtration systems.', beneficiaries: 2450, goal: 500000, raised: 385000, category: 'Water' },
    { id: 2, name: 'Girl Child Education', description: 'Scholarships and school supplies for underprivileged girls in Bihar and UP to complete secondary education.', beneficiaries: 1200, goal: 300000, raised: 270000, category: 'Education' },
    { id: 3, name: 'Rural Healthcare', description: 'Mobile health camps and telemedicine services across 50 villages in Maharashtra.', beneficiaries: 5800, goal: 800000, raised: 520000, category: 'Healthcare' },
    { id: 4, name: 'Tree Plantation Drive', description: 'Planting 100,000 native trees across degraded forest land in Western Ghats.', beneficiaries: 15000, goal: 200000, raised: 175000, category: 'Environment' },
    { id: 5, name: 'Skill Development Program', description: 'Vocational training in tailoring, computing, and electrician skills for unemployed youth.', beneficiaries: 800, goal: 400000, raised: 160000, category: 'Livelihood' },
];

export const donations = [
    { id: 1, date: '2026-03-15', amount: 5000, project: 'Clean Water Initiative', status: 'Success', method: 'UPI' },
    { id: 2, date: '2026-03-10', amount: 2000, project: 'Girl Child Education', status: 'Success', method: 'Card' },
    { id: 3, date: '2026-02-28', amount: 1000, project: 'Rural Healthcare', status: 'Success', method: 'Net Banking' },
    { id: 4, date: '2026-02-20', amount: 500, project: 'Tree Plantation Drive', status: 'Pending', method: 'UPI' },
    { id: 5, date: '2026-01-15', amount: 10000, project: 'Clean Water Initiative', status: 'Success', method: 'Card' },
    { id: 6, date: '2026-01-05', amount: 3000, project: 'Skill Development Program', status: 'Success', method: 'UPI' },
    { id: 7, date: '2025-12-20', amount: 2000, project: 'Girl Child Education', status: 'Success', method: 'Net Banking' },
    { id: 8, date: '2025-12-01', amount: 5000, project: 'Rural Healthcare', status: 'Success', method: 'Card' },
];

export const notifications = [
    { id: 1, type: 'donation', title: 'Donation Successful', message: 'Your donation of ₹5,000 to Clean Water Initiative was successful.', time: '2 hours ago', read: false },
    { id: 2, type: 'project', title: 'Project Update', message: 'Clean Water Initiative has reached 77% of its funding goal!', time: '1 day ago', read: false },
    { id: 3, type: 'certificate', title: '80G Certificate Ready', message: 'Your 80G certificate for FY 2025-26 is ready for download.', time: '3 days ago', read: true },
    { id: 4, type: 'donation', title: 'Donation Successful', message: 'Your donation of ₹2,000 to Girl Child Education was successful.', time: '5 days ago', read: true },
    { id: 5, type: 'project', title: 'New Project Launched', message: 'A new project "Skill Development Program" has been launched. Explore and contribute!', time: '1 week ago', read: true },
    { id: 6, type: 'donation', title: 'Donation Pending', message: 'Your donation of ₹500 to Tree Plantation Drive is being processed.', time: '2 weeks ago', read: true },
];

export const certificates = [
    { year: '2025-26', totalDonation: 28500, panVerified: true, status: 'Available' },
    { year: '2024-25', totalDonation: 45000, panVerified: true, status: 'Available' },
    { year: '2023-24', totalDonation: 12000, panVerified: true, status: 'Available' },
];

export const adminStats = {
    totalFunds: 1510000,
    totalDonors: 342,
    activeProjects: 5,
    monthlyDonations: 185000,
    recentDonors: [
        { name: 'Rahul Sharma', amount: 5000, date: '2026-03-15' },
        { name: 'Priya Patel', amount: 10000, date: '2026-03-14' },
        { name: 'Amit Kumar', amount: 2500, date: '2026-03-13' },
        { name: 'Sneha Reddy', amount: 7500, date: '2026-03-12' },
    ],
};

export const faqs = [
    { q: 'How can I donate?', a: 'You can donate through UPI, credit/debit card, or net banking on the Donate page. Select a project, enter the amount, and complete the payment.' },
    { q: 'What is an 80G certificate?', a: 'An 80G certificate is a tax-exemption certificate issued under Section 80G of the Income Tax Act, allowing donors to claim deductions on donations made to registered NGOs.' },
    { q: 'How do I download my 80G certificate?', a: 'Go to the 80G Certificate page, select the financial year, and click the download button to get your certificate as a PDF.' },
    { q: 'Can I track how my donation is used?', a: 'Yes! Visit the Impact page to see detailed progress reports for each project, including beneficiary counts and fund utilization.' },
    { q: 'How do I change my profile information?', a: 'Navigate to your Profile page and click the "Edit Profile" button to update your personal details.' },
    { q: 'Is my PAN information secure?', a: 'Absolutely. Your PAN information is encrypted and stored securely. It is only used for generating 80G certificates as required by law.' },
];
