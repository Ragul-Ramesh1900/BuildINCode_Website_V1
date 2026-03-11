import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import BlogLayout from "@/components/admin/BlogLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, 
  Globe, 
  Mail, 
  Share2, 
  Save,
  Shield,
  Palette
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [formData, setFormData] = useState({
    siteName: "BuildINCode Blog",
    siteDescription: "Insights from the edge of technology and design.",
    contactEmail: "admin@buildincode.com",
    postsPerPage: 10,
    allowComments: true,
    socialLinks: {
      twitter: "",
      linkedin: "",
      github: ""
    }
  });

  const { data: settings, isLoading } = useQuery({
    queryKey: ['blog-settings'],
    queryFn: api.getBlogSettings
  });

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const updateSettings = useMutation({
    mutationFn: (data: any) => api.updateBlogSettings(data),
    onSuccess: () => {
      toast.success("Settings updated successfully");
    },
    onError: () => {
      toast.error("Failed to update settings");
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const platform = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [platform]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings.mutate(formData);
  };

  return (
    <BlogLayout title="Blog Settings">
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">General Settings</h2>
            <p className="text-muted-foreground">Manage your blog's core identity and configuration.</p>
          </div>
          <Button type="submit" className="shadow-glow flex items-center gap-2" disabled={updateSettings.isPending}>
            <Save size={18} /> Save Changes
          </Button>
        </div>

        <div className="grid gap-8">
          <Card className="border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe size={20} className="text-primary" /> Site Identity
              </CardTitle>
              <CardDescription>How your blog appears to search engines and visitors.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input 
                  id="siteName" 
                  name="siteName" 
                  value={formData.siteName} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="siteDescription">Tagline / Description</Label>
                <Input 
                  id="siteDescription" 
                  name="siteDescription" 
                  value={formData.siteDescription} 
                  onChange={handleInputChange} 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette size={20} className="text-primary" /> Reading & Discussion
              </CardTitle>
              <CardDescription>Control how content is presented and interacted with.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Comments</Label>
                  <p className="text-xs text-muted-foreground">Enable or disable visitor comments on posts.</p>
                </div>
                <Switch 
                  checked={formData.allowComments} 
                  onCheckedChange={(checked) => setFormData(p => ({ ...p, allowComments: checked }))} 
                />
              </div>
              <div className="grid gap-2 max-w-xs">
                <Label htmlFor="postsPerPage">Posts per page</Label>
                <Input 
                  id="postsPerPage" 
                  name="postsPerPage" 
                  type="number" 
                  value={formData.postsPerPage} 
                  onChange={handleInputChange} 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 size={20} className="text-primary" /> Social Profiles
              </CardTitle>
              <CardDescription>Configure URLs for social media integration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="social_twitter">Twitter URL</Label>
                <Input 
                  id="social_twitter" 
                  name="social_twitter" 
                  placeholder="https://twitter.com/buildincode" 
                  value={formData.socialLinks.twitter} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="social_linkedin">LinkedIn URL</Label>
                <Input 
                  id="social_linkedin" 
                  name="social_linkedin" 
                  placeholder="https://linkedin.com/company/buildincode" 
                  value={formData.socialLinks.linkedin} 
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-card border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Shield size={20} /> Danger Zone
              </CardTitle>
              <CardDescription>Irreversible actions for your blog data.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" type="button" onClick={() => confirm("Reset all settings to default?")}>
                Reset to Default
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </BlogLayout>
  );
};

export default Settings;
