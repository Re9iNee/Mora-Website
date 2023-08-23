import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";

const AdminDashboardPage: FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session?.user?.name) {
        router.replace("/"); // Redirect non-admin users
        return null;
    }

    return (
        <div>
            <h1>Welcome to the Admin Dashboard</h1>
        </div>
    );
};

export default AdminDashboardPage;
