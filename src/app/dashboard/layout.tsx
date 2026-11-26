import DashboardShell from "@/components/layout/dashboard-shell";
import { getSidebarData } from "@/lib/sidebar-data";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Not awaited: the shell streams the sidebar in behind a Suspense boundary.
  return (
    <DashboardShell sidebarData={getSidebarData()}>{children}</DashboardShell>
  );
}
