import { prisma } from '@/lib/prisma';
import AdminDashboard from '@/components/AdminDashboard';
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    // Fetch real data
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });

    // Dummy summary data (In a real app, these would be aggregations from the DB)
    const summary = {
        totalUsers: users.length,
        totalPosts: 42, // Dummy count
        activeUsersToday: 12, // Dummy count
        totalViews: 15420 // Dummy count
    };

    return <AdminDashboard users={users} summary={summary} />;
}
