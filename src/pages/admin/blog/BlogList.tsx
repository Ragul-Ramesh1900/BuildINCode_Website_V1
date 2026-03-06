import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import BlogLayout from "@/components/admin/BlogLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  ExternalLink,
  MoreVertical
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BlogList = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs', search, statusFilter],
    queryFn: () => api.getBlogs({ search, status: statusFilter !== 'all' ? statusFilter : undefined })
  });

  const deleteBlog = useMutation({
    mutationFn: api.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success("Blog post deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete blog post");
    }
  });

  return (
    <BlogLayout title="Blog Posts">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search by title..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            className="bg-secondary text-foreground text-sm rounded-lg border-none focus:ring-1 focus:ring-primary px-3 py-2 outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <Button asChild className="shadow-glow">
            <Link to="/admin/blog/editor" className="flex items-center gap-2">
              <Plus size={18} /> Add New
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead className="w-[40%]">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">Loading blogs...</TableCell>
              </TableRow>
            ) : blogs.length > 0 ? (
              blogs.map((blog: any) => (
                <TableRow key={blog._id} className="hover:bg-secondary/20 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-muted flex-shrink-0 overflow-hidden">
                        {blog.featuredImage ? (
                          <img src={blog.featuredImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground/50 text-xs">IMG</div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-sm truncate">{blog.title}</span>
                        <span className="text-[10px] text-muted-foreground lowercase truncate">/{blog.slug}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{blog.author || "Admin"}</TableCell>
                  <TableCell>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-[10px] font-bold text-muted-foreground uppercase">{blog.category || "Uncategorized"}</span>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      blog.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      <div className={`w-1 h-1 rounded-full ${blog.status === 'published' ? 'bg-green-500' : 'bg-orange-500'}`} />
                      {blog.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild title="Edit">
                        <Link to={`/admin/blog/editor/${blog._id}`} className="text-muted-foreground hover:text-primary">
                          <Edit size={16} />
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <a href={`/blog/${blog.slug}`} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                              <ExternalLink size={14} /> View Live
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              if(confirm("Are you sure you want to delete this post?")) {
                                deleteBlog.mutate(blog._id);
                              }
                            }}
                          >
                            <Trash2 size={14} /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 text-muted-foreground italic">
                  No blog posts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </BlogLayout>
  );
};

export default BlogList;
