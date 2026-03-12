import { useState, useRef, useCallback } from "react";
import BlogLayout from "@/components/admin/BlogLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Search, 
  Grid, 
  List as ListIcon, 
  Trash2, 
  Copy,
  ExternalLink,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/services/api";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const MediaLibrary = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  // Track images uploaded during this session
  const [sessionImages, setSessionImages] = useState<Array<{ url: string, name: string, publicId: string, size: string }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Image URL copied to clipboard");
  };

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
    const toastId = toast.loading("Uploading image to Cloudinary...");

    try {
      const result = await api.uploadImage(file);
      toast.success("Image uploaded successfully!", { id: toastId });
      
      const newImage = {
        url: result.url,
        publicId: result.publicId,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB"
      };
      
      setSessionImages(prev => [newImage, ...prev]);
    } catch (err: any) {
      toast.error(err.message || "Upload failed", { id: toastId });
    } finally {
      setIsUploading(false);
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

  const removeSessionImage = (publicId: string) => {
    // We just remove it from local view for now, but you could call delete API from Cloudinary here
    // api.deleteImage(publicId).catch(...)
    setSessionImages(prev => prev.filter(img => img.publicId !== publicId));
    toast.info("Removed from current view");
  };

  return (
    <BlogLayout title="Media Library">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="Search media..." className="pl-10" />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex border border-border rounded-lg overflow-hidden">
             <button 
                onClick={() => setView('grid')}
                className={`p-2 transition-colors ${view === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
             >
               <Grid size={18} />
             </button>
             <button 
                onClick={() => setView('list')}
                className={`p-2 transition-colors ${view === 'list' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
             >
               <ListIcon size={18} />
             </button>
          </div>
          <Button 
            className="shadow-glow flex items-center gap-2" 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
            {isUploading ? "Uploading..." : "Upload Media"}
          </Button>
        </div>
      </div>

      {sessionImages.length === 0 && (
         <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-500 text-sm">
           <strong>Session View:</strong> Images uploaded right now will appear below. They are saved directly to Cloudinary CDN and you can copy their URLs to use anywhere.
         </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        
        {/* Upload Zone */}
        <div 
          className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
            isDragging 
              ? "bg-primary/20 border-primary text-primary" 
              : "border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 bg-secondary/10"
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
        >
           {isUploading ? (
             <div className="text-center text-primary flex flex-col items-center gap-2">
               <Loader2 size={24} className="animate-spin" />
               <span className="text-xs font-bold uppercase tracking-widest">Uploading...</span>
             </div>
           ) : (
             <>
               <Upload size={24} className="mb-2" />
               <span className="text-xs font-bold uppercase tracking-widest text-center">
                 {isDragging ? "Drop here!" : "Click or Drop to Upload"}
               </span>
               <span className="text-[10px] opacity-60 mt-2 text-center px-2">Max 5MB. Auto optimized.</span>
             </>
           )}
        </div>

        {/* Uploaded Images from memory */}
        {sessionImages.map((img, idx) => (
          <Card key={idx} className="group border-border/50 shadow-card overflow-hidden hover:border-primary/30 transition-all">
            <div className="aspect-square bg-muted relative">
               <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
               <div className="absolute top-2 left-2 bg-blue-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                 ☁ CDN
               </div>

               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                  <div className="flex gap-2">
                    <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(img.url)} title="Copy URL">
                      <Copy size={14} />
                    </Button>
                    <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => window.open(img.url, "_blank")} title="Open in new tab">
                      <ExternalLink size={14} />
                    </Button>
                  </div>
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => removeSessionImage(img.publicId)}>
                    <Trash2 size={14} />
                  </Button>
               </div>
            </div>
            <CardContent className="p-2">
              <p className="text-[10px] font-medium truncate text-foreground" title={img.name}>{img.name}</p>
              <p className="text-[8px] text-muted-foreground/50">{img.size} • Cloudinary Optimized</p>
            </CardContent>
          </Card>
        ))}

      </div>
    </BlogLayout>
  );
};

export default MediaLibrary;
