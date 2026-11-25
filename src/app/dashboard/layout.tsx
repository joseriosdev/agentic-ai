import DashboardShell from "@/components/layout/dashboard-shell";
import { getSidebarData } from "@/lib/sidebar-data";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardShell sidebarData={getSidebarData()}>{children}</DashboardShell>
  );
}
