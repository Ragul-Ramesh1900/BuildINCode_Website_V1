import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Tag, 
  Image as ImageIcon, 
  Settings,
  ChevronRight,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/blog/admin" },
  { icon: FileText, label: "All Posts", path: "/blog/admin/posts" },
  { icon: Layers, label: "Categories", path: "/blog/admin/categories" },
  { icon: Tag, label: "Tags", path: "/blog/admin/categories" }, // Redirects to combined page
  { icon: ImageIcon, label: "Media", path: "/blog/admin/media" },
  { icon: Settings, label: "Settings", path: "/blog/admin/settings" },
];

const BlogSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-glow">
            DF
          </div>
          <span className="font-bold text-xl tracking-tight">DevForge <span className="text-primary italic">Blog</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
              location.pathname === item.path 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} className={cn(
                "transition-colors",
                location.pathname === item.path ? "text-primary" : "group-hover:text-foreground"
              )} />
              {item.label}
            </div>
            {location.pathname === item.path && <ChevronRight size={14} className="text-primary" />}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border relative">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 mb-12">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">Administrator</p>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-0 w-full px-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive group"
            onClick={() => {
               if(confirm("Sign out of admin session?")) {
                  authService.logout();
                  window.location.href = "/blog/admin/login";
               }
            }}
          >
            <LogOut className="mr-3 group-hover:rotate-12 transition-transform" size={18} />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
