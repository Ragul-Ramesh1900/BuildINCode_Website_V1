import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import BlogLayout from "@/components/admin/BlogLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Save, 
  ArrowLeft, 
  Globe, 
  Settings2, 
  ImageIcon, 
  Eye,
  CheckCircle,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    excerpt: "",
    featuredImage: "",
    status: "draft",
    tags: "",
    metaTitle: "",
    metaDescription: "",
  });

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => api.getBlog(id!),
    enabled: isEditing
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        content: blog.content || "",
        category: blog.category || "",
        excerpt: blog.excerpt || "",
        featuredImage: blog.featuredImage || "",
        status: blog.status || "draft",
        tags: blog.tags?.join(", ") || "",
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
      });
    }
  }, [blog]);

  const saveMutation = useMutation({
    mutationFn: (data: any) => isEditing ? api.updateBlog(id, data) : api.createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success(`Blog post ${isEditing ? 'updated' : 'created'} successfully`);
      navigate("/blog/admin/posts");
    },
    onError: () => {
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} blog post`);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === "title" && !isEditing) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      setFormData(prev => ({ ...prev, slug: generatedSlug, metaTitle: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags ? formData.tags.split(",").map(t => t.trim()) : [];
    saveMutation.mutate({ ...formData, tags: tagsArray });
  };

  if (isEditing && isLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <BlogLayout title={isEditing ? "Edit Post" : "Compose New Post"}>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" asChild>
            <Link to="/blog/admin/posts" className="flex items-center gap-2">
              <ArrowLeft size={18} /> Back to Posts
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" type="button" className="flex items-center gap-2">
              <Eye size={18} /> Preview
            </Button>
            <Button type="submit" className="shadow-glow flex items-center gap-2" disabled={saveMutation.isPending}>
              <Save size={18} /> {isEditing ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-lg font-bold mb-2 block">Post Title</Label>
                <Input 
                  id="title"
                  name="title"
                  placeholder="Enter a catchy title..." 
                  className="text-xl py-6 font-semibold bg-background border-2 focus-visible:ring-primary/20"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="bg-secondary/50 p-1">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="seo">SEO Settings</TabsTrigger>
                  <TabsTrigger value="settings">Advanced</TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor" className="mt-4">
                   <RichTextEditor 
                      value={formData.content} 
                      onChange={(val) => setFormData(prev => ({ ...prev, content: val }))}
                   />
                </TabsContent>

                <TabsContent value="seo" className="mt-4 space-y-6 bg-card p-6 rounded-xl border border-border/50">
                  <div className="space-y-4">
                    <h3 className="font-bold flex items-center gap-2"><Globe size={18} className="text-primary" /> Search Engine Optimization</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">SEO Meta Title</Label>
                      <Input 
                        id="metaTitle"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleInputChange}
                        placeholder="Title as it appears in search results"
                      />
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Characters: {formData.metaTitle.length} / 60</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <textarea 
                        id="metaDescription"
                        name="metaDescription"
                        className="w-full bg-background border border-border rounded-lg p-3 min-h-[100px] outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                        value={formData.metaDescription}
                        onChange={handleInputChange}
                        placeholder="Briefly describe what this post is about..."
                      />
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Characters: {formData.metaDescription.length} / 160</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">Custom URL Slug</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm font-medium">buildincode.com/blog/</span>
                        <Input 
                          id="slug"
                          name="slug"
                          value={formData.slug}
                          onChange={handleInputChange}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-4 bg-card p-6 rounded-xl border border-border/50">
                   <div className="space-y-4">
                      <h3 className="font-bold flex items-center gap-2"><Settings2 size={18} className="text-primary" /> Post Settings</h3>
                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <textarea 
                          id="excerpt"
                          name="excerpt"
                          className="w-full bg-background border border-border rounded-lg p-3 min-h-[100px] outline-none"
                          value={formData.excerpt}
                          onChange={handleInputChange}
                          placeholder="A short summary of the post..."
                        />
                      </div>
                   </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-card border-border/50">
               <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold border-b border-border pb-2 mb-4">Publish Information</h3>
                  
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">Status</Label>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, status: 'draft' }))}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all text-sm font-medium ${
                          formData.status === 'draft' ? 'bg-orange-500/10 border-orange-500/50 text-orange-500' : 'bg-background border-border text-muted-foreground'
                        }`}
                      >
                        <Clock size={14} /> Draft
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, status: 'published' }))}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all text-sm font-medium ${
                          formData.status === 'published' ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-background border-border text-muted-foreground'
                        }`}
                      >
                        <CheckCircle size={14} /> Publish
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-xs uppercase tracking-widest text-muted-foreground">Category</Label>
                    <select 
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={(any: any) => handleInputChange(any)}
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none"
                    >
                      <option value="">Uncategorized</option>
                      {categories.map((cat: any) => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-xs uppercase tracking-widest text-muted-foreground">Tags (comma separated)</Label>
                    <Input 
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="react, tutorial, tech"
                      className="text-sm"
                    />
                  </div>
               </CardContent>
            </Card>

            <Card className="shadow-card border-border/50 overflow-hidden">
               <div className="p-4 border-b border-border bg-secondary/30">
                 <h3 className="font-bold flex items-center gap-2"><ImageIcon size={18} className="text-primary" /> Featured Image</h3>
               </div>
               <CardContent className="p-0">
                  <div className="aspect-video bg-muted flex flex-col items-center justify-center border-b border-border group relative cursor-pointer">
                    {formData.featuredImage ? (
                      <img src={formData.featuredImage} alt="Featured" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <ImageIcon size={32} className="mx-auto text-muted-foreground/30 mb-2" />
                        <p className="text-xs text-muted-foreground">Click to upload image</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <Input 
                      placeholder="External Image URL" 
                      className="text-xs"
                      name="featuredImage"
                      value={formData.featuredImage}
                      onChange={handleInputChange}
                    />
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </BlogLayout>
  );
};

export default BlogEditor;
