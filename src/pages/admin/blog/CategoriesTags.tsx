import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import BlogLayout from "@/components/admin/BlogLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Trash2, 
  Layers, 
  Tag as TagIcon,
  Search
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CategoriesTags = () => {
  const queryClient = useQueryClient();
  const [newCategory, setNewCategory] = useState("");
  const [newTag, setNewTag] = useState("");
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState<{isOpen: boolean, id: string, name: string}>({ isOpen: false, id: '', name: '' });
  const [deleteTagDialog, setDeleteTagDialog] = useState<{isOpen: boolean, id: string, name: string}>({ isOpen: false, id: '', name: '' });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories
  });

  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: api.getTags
  });

  const createCategory = useMutation({
    mutationFn: (name: string) => api.createCategory({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setNewCategory("");
      toast.success("Category created");
    }
  });

  const createTag = useMutation({
    mutationFn: (name: string) => api.createTag({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      setNewTag("");
      toast.success("Tag created");
    }
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => api.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Category deleted");
    }
  });

  const deleteTag = useMutation({
    mutationFn: (id: string) => api.deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast.success("Tag deleted");
    }
  });

  return (
    <BlogLayout title="Categories & Tags">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Categories Section */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers size={20} className="text-primary" /> Add New Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input 
                    placeholder="Category name..." 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && newCategory && createCategory.mutate(newCategory)}
                  />
                </div>
                <Button onClick={() => createCategory.mutate(newCategory)} disabled={!newCategory || createCategory.isPending}>
                  <Plus size={18} /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-card overflow-hidden">
             <div className="bg-secondary/30 p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">Existing Categories</h3>
                <div className="relative w-32">
                   <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                   <input className="w-full bg-background border border-border rounded text-[10px] pl-7 pr-2 py-1 outline-none" placeholder="Filter..." />
                </div>
             </div>
             <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
                {categories.length > 0 ? categories.map((cat: any) => (
                  <div key={cat._id} className="flex items-center justify-between p-4 hover:bg-secondary/10 transition-colors">
                    <span className="font-medium text-sm">{cat.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">{cat.count || 0} posts</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setDeleteCategoryDialog({ isOpen: true, id: cat._id, name: cat.name })}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center text-muted-foreground italic text-sm">
                    No categories found.
                  </div>
                )}
             </div>
          </Card>
        </div>

        {/* Tags Section */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TagIcon size={20} className="text-primary" /> Add New Tag
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input 
                    placeholder="Tag name..." 
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && newTag && createTag.mutate(newTag)}
                  />
                </div>
                <Button onClick={() => createTag.mutate(newTag)} disabled={!newTag || createTag.isPending}>
                  <Plus size={18} /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-card p-6 min-h-[460px]">
             <h3 className="font-bold mb-4 flex items-center gap-2">
               <TagIcon size={18} className="text-primary" /> Tag Cloud
             </h3>
             <div className="flex flex-wrap gap-2">
                {tags.length > 0 ? tags.map((tag: any) => (
                  <div key={tag._id} className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-border hover:border-primary/30 transition-all cursor-default text-sm">
                    <span className="font-medium">{tag.name}</span>
                    <button 
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setDeleteTagDialog({ isOpen: true, id: tag._id, name: tag.name })}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )) : (
                  <div className="w-full py-12 text-center text-muted-foreground italic text-sm">
                    No tags found.
                  </div>
                )}
             </div>
          </Card>
        </div>
      </div>

      {/* Delete Category Dialog */}
      <AlertDialog open={deleteCategoryDialog.isOpen} onOpenChange={(isOpen) => setDeleteCategoryDialog(prev => ({ ...prev, isOpen }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the category "{deleteCategoryDialog.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteCategory.mutate(deleteCategoryDialog.id)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete Category
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Tag Dialog */}
      <AlertDialog open={deleteTagDialog.isOpen} onOpenChange={(isOpen) => setDeleteTagDialog(prev => ({ ...prev, isOpen }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tag</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the tag "{deleteTagDialog.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteTag.mutate(deleteTagDialog.id)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete Tag
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </BlogLayout>
  );
};

export default CategoriesTags;
