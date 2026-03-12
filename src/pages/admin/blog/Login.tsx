import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authService } from "@/services/auth";
import { api } from "@/services/api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await api.login(formData);
      authService.login(result.token, result.user);
      toast.success(`Welcome back, ${result.user?.name || 'Admin'}!`);
      navigate("/blog/admin");
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030303] relative overflow-hidden font-inter">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[440px] px-6 relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <span className="text-2xl font-bold tracking-tight text-white capitalize">
              BuildINCode <span className="text-primary">Blog</span>
            </span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Admin Authentication</h1>
          <p className="text-muted-foreground text-sm">Secure access to the blog management portal.</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden relative group">
          {/* Subtle overlay shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-none" />
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">Work Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                <Input 
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-11 py-6 bg-white/5 border-white/10 focus-visible:ring-primary/30 text-white placeholder:text-muted-foreground/30 rounded-xl"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label htmlFor="password" className="text-xs uppercase tracking-widest text-muted-foreground">Master Password</Label>
                <button type="button" className="text-[10px] text-primary hover:underline uppercase tracking-wider font-bold">Forgot Access?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-11 py-6 bg-white/5 border-white/10 focus-visible:ring-primary/30 text-white placeholder:text-muted-foreground/30 rounded-xl"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-7 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-glow-primary transition-all active:scale-[0.98] group"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Authorize Access</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
               <ShieldCheck size={12} className="text-primary" /> Encrypted Session
            </div>
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
               <Code size={12} className="text-primary" /> V1.0 Stable
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground/40 text-center max-w-[280px]">
            This portal is restricted to authorized BuildINCode personnel only. Unauthorized access attempts are monitored and logged.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
