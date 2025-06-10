
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, LogOut, Settings, Users, FileText, Edit, ShieldQuestion, AlertTriangle } from "lucide-react";
import Link from "next/link";
// For Firebase Auth Logout
// import { getAuth, signOut } from "firebase/auth";
// import { app } from "@/lib/firebase"; // Assuming app is exported from firebase.ts
// import { useRouter } from 'next/navigation'; // If client-side logout

export default function AdminDashboardPage() {
  // const router = useRouter(); // If client-side logout
  // const auth = getAuth(app);

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     router.push('/admin/login');
  //   } catch (error) {
  //     console.error("Error signing out: ", error);
  //     // Optionally, show a toast or alert to the user
  //   }
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary flex items-center">
          <LayoutDashboard className="mr-3 h-8 w-8" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1.5 text-md">Welcome, Admin! Manage your website content from here.</p>
      </header>

      <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 rounded-md text-sm flex items-start">
        <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-500" />
        <div>
          <h3 className="font-semibold mb-1">Development Notice: Route Protection Pending</h3>
          <p>This admin dashboard is currently accessible directly without login during development. Route protection to secure this area for authenticated users only has not yet been implemented.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card className="hover:shadow-lg transition-shadow duration-300 rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl sm:text-2xl">
              <Edit className="mr-2.5 h-6 w-6 text-secondary" />
              Manage Projects
            </CardTitle>
            <CardDescription className="text-sm">Add, edit, or remove portfolio projects displayed on your site.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">
              Go to Projects (Coming Soon)
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl sm:text-2xl">
              <FileText className="mr-2.5 h-6 w-6 text-secondary" />
              Manage Resume
            </CardTitle>
            <CardDescription className="text-sm">Update your resume details, skills, experiences, and downloadable PDF.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">
              Go to Resume (Coming Soon)
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow duration-300 rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl sm:text-2xl">
              <ShieldQuestion className="mr-2.5 h-6 w-6 text-secondary" />
              Manage About & Hero
            </CardTitle>
            <CardDescription className="text-sm">Edit the text content for your Homepage Hero and About Me sections.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">
              Edit Content (Coming Soon)
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl sm:text-2xl">
              <Users className="mr-2.5 h-6 w-6 text-secondary" />
              User Management
            </CardTitle>
            <CardDescription className="text-sm">Manage admin users, roles, and their permissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">
              Manage Users (Coming Soon)
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow duration-300 rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl sm:text-2xl">
             <Settings className="mr-2.5 h-6 w-6 text-secondary" />
              Site Settings
            </CardTitle>
            <CardDescription className="text-sm">Configure global site settings and metadata.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">
              Go to Settings (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        {/* For Firebase Auth, logout is typically handled client-side */}
        {/* Placeholder for now; uncomment and adapt if using client component for logout */}
        {/* <Button variant="outline" onClick={handleLogout}> */}
        <Button variant="outline" asChild> 
          <Link href="/admin/login"> {/* Temporary: links back to login for simulated logout */}
            <LogOut className="mr-2 h-4 w-4" /> Logout (Simulated)
          </Link>
        </Button>
      </div>
    </div>
  );
}
