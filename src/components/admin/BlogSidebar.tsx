import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Tag, 
  Image as ImageIcon, 
  Settings,
  Users,
  ChevronRight,
  LogOut,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/blog/admin" },
  { icon: FileText, label: "All Posts", path: "/blog/admin/posts" },
  { icon: Layers, label: "Categories", path: "/blog/admin/categories" },
  { icon: Tag, label: "Tags", path: "/blog/admin/categories" }, // Redirects to combined page
  { icon: Users, label: "Users", path: "/blog/admin/users" },
  { icon: ImageIcon, label: "Media", path: "/blog/admin/media" },
  { icon: Settings, label: "Settings", path: "/blog/admin/settings" },
];

const BlogSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const { data: me } = useQuery({
    queryKey: ['me'],
    queryFn: api.getMe
  });
  
  const user = me?.user || me || authService.getUser();

  return (
    <aside className={cn("bg-card border-r border-border flex flex-col h-screen sticky top-0 transition-all duration-300 z-50", isOpen ? "w-64" : "w-[80px]")}>
      <div className={cn("h-20 flex items-center shrink-0 border-b border-border/50", isOpen ? "px-6 justify-between" : "justify-center")}>
        {isOpen && (
          <div className="flex items-center gap-2 group overflow-hidden">
            <span className="font-bold text-xl tracking-tight whitespace-nowrap">BuildINCode <span className="text-primary">Blog</span></span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="shrink-0 text-muted-foreground w-8 h-8 hover:text-foreground hover:bg-secondary">
          <Menu size={20} />
        </Button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            title={!isOpen ? item.label : undefined}
            className={cn(
              "flex items-center justify-between py-2.5 rounded-lg text-sm font-medium transition-all group",
              isOpen ? "px-3" : "px-0 justify-center",
              location.pathname === item.path 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent"
            )}
          >
            <div className={cn("flex items-center gap-3", !isOpen && "w-full justify-center")}>
              <item.icon size={18} className={cn(
                "shrink-0 transition-colors",
                location.pathname === item.path ? "text-primary" : "group-hover:text-foreground"
              )} />
              {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </div>
            {isOpen && location.pathname === item.path && <ChevronRight size={14} className="text-primary shrink-0" />}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border relative shrink-0 min-h-[140px]">
        <div 
          className={cn("flex items-center gap-3 rounded-lg mb-12 transition-colors", isOpen ? "p-2 bg-secondary/50" : "justify-center w-full py-2 hover:bg-secondary/50")}
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs overflow-hidden shrink-0">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.name?.charAt(0)?.toUpperCase() || 'A'
            )}
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || 'Administrator'}</p>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-4 left-0 w-full px-4 flex justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                title={!isOpen ? "Logout" : undefined}
                className={cn("w-full text-destructive hover:bg-destructive/10 hover:text-destructive group", isOpen ? "justify-start" : "justify-center px-0 w-10")}
              >
                <LogOut className={cn("group-hover:rotate-12 transition-transform shrink-0", isOpen && "mr-3")} size={18} />
                {isOpen && "Logout"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign out</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to sign out of your admin session?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  authService.logout();
                  window.location.href = "/blog/admin/login";
                }}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
