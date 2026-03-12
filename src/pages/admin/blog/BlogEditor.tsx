import { useState, useEffect, useRef, useCallback } from "react";
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
  Clock,
  Upload,
  X,
  Loader2,
  Link as LinkIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Image upload state
  const [isDragging, setIsDragging]   = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");

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

  // ─── Cloudinary Upload Logic ──────────────────────────────────────────────
  const uploadFile = useCallback(async (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG, and WebP images are allowed.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size exceeds 5MB. Please compress or resize it.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 85));
    }, 200);

    try {
      const result = await api.uploadImage(file);
      clearInterval(progressInterval);
      setUploadProgress(100);
      setFormData(prev => ({ ...prev, featuredImage: result.url }));
      toast.success("Image uploaded to Cloudinary CDN ✓");
    } catch (err: any) {
      clearInterval(progressInterval);
      toast.error(err.message || "Upload failed. Check your Cloudinary credentials in server/.env");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 800);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const clearImage = () => setFormData(prev => ({ ...prev, featuredImage: "" }));
  // ─────────────────────────────────────────────────────────────────────────

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
            {/* Publish Info Card */}
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

            {/* ── Cloudinary Featured Image Card ── */}
            <Card className="shadow-card border-border/50 overflow-hidden">
               <div className="p-4 border-b border-border bg-secondary/30 flex items-center justify-between">
                 <h3 className="font-bold flex items-center gap-2">
                   <ImageIcon size={18} className="text-primary" /> Featured Image
                 </h3>
                 {/* Upload / URL toggle */}
                 <div className="flex items-center gap-1 bg-background border border-border rounded-lg p-0.5 text-xs">
                   <button
                     type="button"
                     onClick={() => setImageMode("upload")}
                     className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${imageMode === "upload" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                   >
                     <Upload size={11} /> Upload
                   </button>
                   <button
                     type="button"
                     onClick={() => setImageMode("url")}
                     className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${imageMode === "url" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                   >
                     <LinkIcon size={11} /> URL
                   </button>
                 </div>
               </div>

               <CardContent className="p-0">
                 {/* Preview Area */}
                 <div className="relative aspect-video bg-muted border-b border-border overflow-hidden">
                   {formData.featuredImage ? (
                     <>
                       <img
                         src={formData.featuredImage}
                         alt="Featured"
                         className="w-full h-full object-cover"
                       />
                       {formData.featuredImage.includes("cloudinary") && (
                         <div className="absolute top-2 left-2 bg-blue-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                           ☁ CDN
                         </div>
                       )}
                       <button
                         type="button"
                         onClick={clearImage}
                         className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                       >
                         <X size={14} />
                       </button>
                     </>
                   ) : imageMode === "upload" ? (
                     <div
                       className={`w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${
                         isDragging
                           ? "bg-primary/10 border-2 border-dashed border-primary"
                           : "border-2 border-dashed border-border/40 hover:border-primary/40 hover:bg-primary/5"
                       }`}
                       onDrop={handleDrop}
                       onDragOver={handleDragOver}
                       onDragLeave={handleDragLeave}
                       onClick={() => fileInputRef.current?.click()}
                     >
                       {isUploading ? (
                         <div className="flex flex-col items-center gap-2">
                           <Loader2 size={28} className="animate-spin text-primary" />
                           <p className="text-xs text-muted-foreground">Uploading to Cloudinary…</p>
                           <div className="w-32 h-1.5 bg-border rounded-full overflow-hidden">
                             <div
                               className="h-full bg-primary rounded-full transition-all duration-300"
                               style={{ width: `${uploadProgress}%` }}
                             />
                           </div>
                           <p className="text-[10px] text-muted-foreground">{uploadProgress}%</p>
                         </div>
                       ) : (
                         <>
                           <div className={`p-3 rounded-full transition-colors ${isDragging ? "bg-primary/20" : "bg-secondary"}`}>
                             <Upload size={22} className={isDragging ? "text-primary" : "text-muted-foreground"} />
                           </div>
                           <div className="text-center px-4">
                             <p className="text-sm font-medium">
                               {isDragging ? "Drop to upload" : "Drag & drop or click"}
                             </p>
                             <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP · Max 5MB</p>
                           </div>
                         </>
                       )}
                     </div>
                   ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                       <ImageIcon size={32} className="opacity-30" />
                       <p className="text-xs">Paste a URL below to preview</p>
                     </div>
                   )}
                 </div>

                 {/* Hidden file input */}
                 <input
                   ref={fileInputRef}
                   type="file"
                   accept=".jpg,.jpeg,.png,.webp"
                   className="hidden"
                   onChange={handleFileSelect}
                 />

                 {/* Bottom Controls */}
                 <div className="p-4 space-y-3">
                   {imageMode === "upload" ? (
                     <>
                       {!formData.featuredImage && (
                         <Button
                           type="button"
                           variant="outline"
                           size="sm"
                           className="w-full flex items-center gap-2"
                           disabled={isUploading}
                           onClick={() => fileInputRef.current?.click()}
                         >
                           {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                           {isUploading ? "Uploading…" : "Choose File"}
                         </Button>
                       )}
                       {formData.featuredImage && (
                         <p className="text-[10px] text-muted-foreground truncate text-center" title={formData.featuredImage}>
                           {formData.featuredImage.includes("cloudinary") ? "✓ Cloudinary CDN" : formData.featuredImage}
                         </p>
                       )}
                     </>
                   ) : (
                     <Input 
                       placeholder="https://example.com/image.jpg" 
                       className="text-xs"
                       name="featuredImage"
                       value={formData.featuredImage}
                       onChange={handleInputChange}
                     />
                   )}
                   <p className="text-[10px] text-muted-foreground text-center opacity-60">
                     Served via Cloudinary CDN · Auto WebP + Optimized
                   </p>
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
