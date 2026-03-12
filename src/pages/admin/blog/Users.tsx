import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { authService } from "@/services/auth";
import BlogLayout from "@/components/admin/BlogLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users as UsersIcon,
  UserPlus,
  Search,
  MoreVertical,
  Shield,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Copy,
  Upload,
  Loader2,
  Image as ImageIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  isActive: boolean;
  avatar?: string;
  createdAt: string;
}

const Users = () => {
  const queryClient = useQueryClient();
  const currentUser = authService.getUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const addAvatarInputRef = useRef<HTMLInputElement>(null);
  const editAvatarInputRef = useRef<HTMLInputElement>(null);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor",
    avatar: ""
  });

  const [editUserForm, setEditUserForm] = useState({
    name: "",
    role: "",
    isActive: true,
    avatar: ""
  });

  // Fetch Users
  const { data, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: api.getUsers
  });

  const users = data?.users || [];
  
  const filteredUsers = users.filter((u: User) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mutations
  const createUserMutation = useMutation({
    mutationFn: (data: any) => api.registerUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success("User created successfully");
      setIsAddUserOpen(false);
      setNewUser({ name: "", email: "", password: "", role: "editor", avatar: "" });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create user");
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => api.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success("User updated successfully");
      setIsEditUserOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update user");
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => api.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success("User deleted successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete user");
    }
  });

  // Handlers
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate(newUser);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      updateUserMutation.mutate({ id: selectedUser._id, data: editUserForm });
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditUserForm({
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      avatar: user.avatar || ""
    });
    setIsEditUserOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (id === currentUser?.id) {
      toast.error("You cannot delete yourself!");
      return;
    }
    if (confirm(`Are you sure you want to permanently delete user "${name}"?`)) {
      deleteUserMutation.mutate(id);
    }
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewUser({ ...newUser, password });
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditMode: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    const toastId = toast.loading("Uploading avatar...");

    try {
      const result = await api.uploadImage(file);
      toast.success("Avatar uploaded!", { id: toastId });
      
      if (isEditMode) {
         setEditUserForm(prev => ({ ...prev, avatar: result.url }));
      } else {
         setNewUser(prev => ({ ...prev, avatar: result.url }));
      }
    } catch (err: any) {
      toast.error(err.message || "Avatar upload failed", { id: toastId });
    } finally {
      setIsUploadingAvatar(false);
      if (e.target) e.target.value = '';
    }
  };

  return (
    <BlogLayout title="User Management">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Team & Users</h1>
          <p className="text-muted-foreground">Manage administrative access to your blog.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search users..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="shadow-glow flex items-center gap-2" onClick={() => setIsAddUserOpen(true)}>
            <UserPlus size={18} /> Add User
          </Button>
        </div>
      </div>

      <Card className="border-border/50 shadow-card bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    <div className="flex justify-center mb-2">
                       <Shield size={24} className="animate-pulse" />
                    </div>
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user: User) => (
                  <tr key={user._id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shadow-glow-sm overflow-hidden shrink-0">
                          {user.avatar ? (
                             <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                             user.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground flex items-center gap-2 truncate">
                             {user.name} 
                             {user._id === currentUser?.id && <span className="shrink-0 text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">You</span>}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {user.role === 'admin' ? (
                           <Shield size={14} className="text-purple-500" />
                        ) : (
                           <UserPlus size={14} className="text-blue-500" />
                        )}
                        <span className="capitalize font-medium">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.isActive ? (
                        <div className="flex items-center gap-1.5 text-green-500">
                          <CheckCircle2 size={14} />
                          <span className="text-xs font-medium uppercase tracking-wider">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <XCircle size={14} />
                          <span className="text-xs font-medium uppercase tracking-wider">Deactivated</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs font-medium w-32">
                      {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-secondary">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openEditModal(user)}>
                            <Edit2 size={14} className="mr-2" /> Edit User
                          </DropdownMenuItem>
                          {user._id !== currentUser?.id && (
                            <DropdownMenuItem 
                              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                              onClick={() => handleDelete(user._id, user.name)}
                            >
                              <Trash2 size={14} className="mr-2" /> Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ADD USER DIALOG */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new account to grant someone access to the admin portal.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4 pt-4">

            {/* Avatar Upload for New User */}
            <div className="flex flex-col items-center gap-3">
               <div className="w-28 h-28 rounded-full border-2 border-dashed border-border/50 flex items-center justify-center overflow-hidden bg-secondary relative group shadow-sm">
                  {newUser.avatar ? (
                     <img src={newUser.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                     <ImageIcon size={24} className="text-muted-foreground/30" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => addAvatarInputRef.current?.click()}>
                     {isUploadingAvatar ? <Loader2 size={20} className="text-white animate-spin" /> : <Upload size={20} className="text-white" />}
                  </div>
               </div>
               <input type="file" ref={addAvatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleAvatarUpload(e, false)} />
               <Button type="button" variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => addAvatarInputRef.current?.click()} disabled={isUploadingAvatar}>
                 {newUser.avatar ? "Change Photo" : "Upload Profile Photo"}
               </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Account Role</Label>
              <Select 
                value={newUser.role} 
                onValueChange={(val) => setNewUser({...newUser, role: val})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor (Can manage posts)</SelectItem>
                  <SelectItem value="admin">Administrator (Full access)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between items-center">
                 <Label htmlFor="password">Temporary Password</Label>
                 <button 
                   type="button" 
                   onClick={generatePassword}
                   className="text-xs text-primary hover:underline"
                 >
                    Generate Strong
                 </button>
               </div>
              <div className="flex gap-2">
                 <Input 
                   id="password" 
                   type="text" 
                   placeholder="Enter password..." 
                   value={newUser.password}
                   onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                   required
                   minLength={6}
                 />
                 <Button 
                   type="button" 
                   variant="secondary" 
                   size="icon"
                   onClick={() => {
                     navigator.clipboard.writeText(newUser.password);
                     toast.success("Password copied!");
                   }}
                   title="Copy password"
                 >
                    <Copy size={16} />
                 </Button>
              </div>
              <p className="text-[10px] text-muted-foreground">Provide this password to the user. They can change it after logging in.</p>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createUserMutation.isPending || isUploadingAvatar}>
                {createUserMutation.isPending ? "Creating..." : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT USER DIALOG */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User: {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Update profile, role, or deactivate the account.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 pt-4">

            {/* Avatar Upload for Existing User */}
            <div className="flex flex-col items-center gap-3">
               <div className="w-28 h-28 rounded-full border-2 border-dashed border-border/50 flex items-center justify-center overflow-hidden bg-secondary relative group shadow-sm">
                  {editUserForm.avatar ? (
                     <img src={editUserForm.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                     <div className="text-2xl font-bold text-muted-foreground">
                        {editUserForm.name?.charAt(0).toUpperCase() || <ImageIcon size={24} />}
                     </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => editAvatarInputRef.current?.click()}>
                     {isUploadingAvatar ? <Loader2 size={20} className="text-white animate-spin" /> : <Upload size={20} className="text-white" />}
                  </div>
               </div>
               <input type="file" ref={editAvatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleAvatarUpload(e, true)} />
               <Button type="button" variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => editAvatarInputRef.current?.click()} disabled={isUploadingAvatar}>
                 {editUserForm.avatar ? "Update Photo" : "Upload Profile Photo"}
               </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input 
                id="edit-name" 
                value={editUserForm.name}
                onChange={(e) => setEditUserForm({...editUserForm, name: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-role">Account Role</Label>
              <Select 
                value={editUserForm.role} 
                onValueChange={(val) => setEditUserForm({...editUserForm, role: val})}
                disabled={selectedUser?._id === currentUser?.id}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
              {selectedUser?._id === currentUser?.id && (
                <p className="text-xs text-muted-foreground">You cannot change your own role.</p>
              )}
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border mt-4">
               <div>
                  <Label className="font-bold">Account Active</Label>
                  <p className="text-xs text-muted-foreground mt-1">If disabled, the user cannot log in.</p>
               </div>
               <Switch 
                 checked={editUserForm.isActive}
                 onCheckedChange={(checked) => setEditUserForm({...editUserForm, isActive: checked})}
                 disabled={selectedUser?._id === currentUser?.id}
               />
            </div>
            {selectedUser?._id === currentUser?.id && !editUserForm.isActive && (
               <p className="text-xs text-destructive">You cannot deactivate your own account.</p>
            )}

            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsEditUserOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={updateUserMutation.isPending || isUploadingAvatar}>
                {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </BlogLayout>
  );
};

export default Users;
