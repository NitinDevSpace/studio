
// This is a placeholder Admin Dashboard page.
// In a real application, this page would be protected and only accessible after successful login.
// It would contain summaries, quick actions, and navigation to different management sections.

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, LogOut, Settings, Users, FileText, Edit } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  // NOTE: This page is NOT currently protected.
  // A real app needs middleware or layout checks for authentication.

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-primary flex items-center">
          <LayoutDashboard className="mr-3 h-8 w-8" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Welcome, Admin! Manage your website content from here.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Edit className="mr-2 h-5 w-5 text-secondary" />
              Manage Projects
            </CardTitle>
            <CardDescription>Add, edit, or remove portfolio projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">Go to Projects (Coming Soon)</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <FileText className="mr-2 h-5 w-5 text-secondary" />
              Manage Resume
            </CardTitle>
            <CardDescription>Update your resume details, skills, and experiences.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">Go to Resume (Coming Soon)</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Users className="mr-2 h-5 w-5 text-secondary" />
              User Management
            </CardTitle>
            <CardDescription>Manage admin users and their permissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">Manage Users (Coming Soon)</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
             <Settings className="mr-2 h-5 w-5 text-secondary" />
              Site Settings
            </CardTitle>
            <CardDescription>Update general site information like hero text.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">Go to Settings (Coming Soon)</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        {/* In a real app, logout would clear session/token */}
        <Button variant="outline" asChild>
          <Link href="/admin/login"> 
            <LogOut className="mr-2 h-4 w-4" /> Logout (Simulated)
          </Link>
        </Button>
      </div>
       <div className="mt-8 p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-md text-sm">
          <p><strong>Important:</strong> This dashboard and its features are placeholders. The content is not yet dynamic, and user roles are not implemented. This login does not provide real security for a production environment.</p>
        </div>
    </div>
  );
}
