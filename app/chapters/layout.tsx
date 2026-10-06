import { AppSidebar } from "@/components/app-sidebar";
import { CourseCompleteDialog } from "@/components/course-complete-dialog";
import { Header } from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function ChaptersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 overflow-x-hidden">
        <Header />
        <div id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </div>
        <CourseCompleteDialog />
      </SidebarInset>
    </SidebarProvider>
  );
}
