
// This is a basic layout for the admin section.
// It currently doesn't enforce authentication for all admin routes.
// In a production app, this layout or middleware would check for an active admin session.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/40">
      {/* A simple container for admin pages */}
      {/* In a real app, you might have an admin-specific Navbar or Sidebar here */}
      <main className="p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
