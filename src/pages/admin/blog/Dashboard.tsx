import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import BlogLayout from "@/components/admin/BlogLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Eye, 
  TrendingUp, 
  ArrowUpRight,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['blog-stats'],
    queryFn: api.getBlogStats
  });

  const { data: recentPosts = [] } = useQuery({
    queryKey: ['recent-posts'],
    queryFn: () => api.getBlogs({ limit: 5 })
  });

  const statCards = [
    { title: "Total Blogs", value: stats?.total || 0, icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Published", value: stats?.published || 0, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Drafts", value: stats?.drafts || 0, icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Avg. Views", value: stats?.avgViews || "1.2k", icon: Eye, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <BlogLayout title="Dashboard">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Admin!</h2>
          <p className="text-muted-foreground">Here's what's happening with your blog today.</p>
        </div>
        <Button asChild className="shadow-glow">
          <Link to="/blog/admin/editor" className="flex items-center gap-2">
            <Plus size={18} /> New Post
          </Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border/50 hover:border-primary/20 transition-all shadow-card group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-green-500 flex items-center font-medium">
                  <ArrowUpRight size={12} /> +12%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Posts</CardTitle>
              <p className="text-sm text-muted-foreground">Your most recently updated blog posts.</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary hover:bg-primary/5">
              <Link to="/blog/admin/posts">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.length > 0 ? recentPosts.map((post: any) => (
                <div key={post._id} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-secondary/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                      {post.featuredImage ? (
                        <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <FileText size={20} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">{post.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                         {post.category} • {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                    post.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                  }`}>
                    {post.status}
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground italic">No posts found. Get started by creating one!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" /> Popular Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Technology", "Design", "Marketing", "Business"].map((cat) => (
                <div key={cat} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{cat}</span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">12 posts</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6" variant="secondary" size="sm" asChild>
              <Link to="/blog/admin/categories">Manage Categories</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </BlogLayout>
  );
};

export default Dashboard;
