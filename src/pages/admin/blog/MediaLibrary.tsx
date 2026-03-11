import { useState } from "react";
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
  Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";

const MediaLibrary = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Image URL copied to clipboard");
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
          <Button className="shadow-glow flex items-center gap-2">
            <Upload size={18} /> Upload Media
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i} className="group border-border/50 shadow-card overflow-hidden hover:border-primary/30 transition-all">
            <div className="aspect-square bg-muted relative">
               <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                  <ImageIcon size={48} />
               </div>
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                  <div className="flex gap-2">
                    <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(`https://buildincode.com/media/img-${i}.jpg`)}>
                      <Copy size={14} />
                    </Button>
                    <Button variant="secondary" size="icon" className="h-8 w-8">
                      <ExternalLink size={14} />
                    </Button>
                  </div>
                  <Button variant="destructive" size="icon" className="h-8 w-8">
                    <Trash2 size={14} />
                  </Button>
               </div>
            </div>
            <CardContent className="p-2">
              <p className="text-[10px] font-medium truncate text-muted-foreground">image-asset-{i}.jpg</p>
              <p className="text-[8px] text-muted-foreground/50">1.2 MB • 1200x800</p>
            </CardContent>
          </Card>
        ))}
        
        {/* Helper to add placeholder */}
        <div className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all cursor-pointer bg-secondary/10">
           <Upload size={24} className="mb-2" />
           <span className="text-xs font-bold uppercase tracking-widest">Drop Files</span>
        </div>
      </div>
    </BlogLayout>
  );
};

export default MediaLibrary;
