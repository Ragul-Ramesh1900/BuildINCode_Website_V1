import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateFilter } from "@/components/DateFilter";

const Admin = () => {
  const queryClient = useQueryClient();
  const [projectForm, setProjectForm] = useState({
    title: "", problem: "", solution: "", technologies: "", result: "", colorGradient: "from-blue-500/20 to-cyan-500/20"
  });

  const { data: projects = [] } = useQuery({ queryKey: ['projects'], queryFn: api.getProjects });
  const { data: contacts = [] } = useQuery({ queryKey: ['contacts'], queryFn: api.getContacts });

  const createProject = useMutation({
    mutationFn: api.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Project created!");
      setProjectForm({ title: "", problem: "", solution: "", technologies: "", result: "", colorGradient: "from-blue-500/20 to-cyan-500/20" });
    }
  });

  const deleteProject = useMutation({
    mutationFn: api.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Project deleted!");
    }
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    createProject.mutate({
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(t => t.trim())
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="projects">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Project</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateProject} className="space-y-4">
                  <Input
                    placeholder="Project Title"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Problem"
                    value={projectForm.problem}
                    onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Solution"
                    value={projectForm.solution}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Technologies (comma-separated)"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Result"
                    value={projectForm.result}
                    onChange={(e) => setProjectForm({ ...projectForm, result: e.target.value })}
                    required
                  />
                  <Button type="submit" disabled={createProject.isPending}>
                    {createProject.isPending ? "Creating..." : "Create Project"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {projects.map((project: any) => (
                <Card key={project._id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {project.title}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteProject.mutate(project._id)}
                      >
                        Delete
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{project.problem}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1">Contact Inquiries</h2>
                <p className="text-sm text-muted-foreground">Manage and filter your incoming leads.</p>
              </div>
              <div className="scale-90 origin-top-right">
                <DateFilter />
              </div>
            </div>
            
            <div className="grid gap-4">
              {contacts.map((contact: any) => (
              <Card key={contact._id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {contact.name}
                    <span className={`text-xs px-2 py-1 rounded ${
                      contact.status === 'new' ? 'bg-green-500/20 text-green-500' :
                      contact.status === 'read' ? 'bg-blue-500/20 text-blue-500' :
                      'bg-gray-500/20 text-gray-500'
                    }`}>
                      {contact.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm"><strong>Email:</strong> {contact.email}</p>
                  {contact.phone && <p className="text-sm"><strong>Phone:</strong> {contact.phone}</p>}
                  {contact.company && <p className="text-sm"><strong>Company:</strong> {contact.company}</p>}
                  <p className="text-sm mt-2"><strong>Message:</strong> {contact.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(contact.createdAt).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Hero section editor coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
