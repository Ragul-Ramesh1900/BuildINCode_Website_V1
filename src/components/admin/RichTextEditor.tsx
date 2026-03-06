import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Link as LinkIcon, 
  Image as ImageIcon 
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  return (
    <div className="border border-border rounded-xl overflow-hidden focus-within:border-primary/50 transition-colors bg-background">
      <div className="flex items-center gap-1 p-2 border-b border-border bg-secondary/30 flex-wrap">
        <button type="button" className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"><Bold size={16} /></button>
        <button type="button" className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"><Italic size={16} /></button>
        <div className="w-px h-4 bg-border mx-1" />
        <button type="button" className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"><Heading1 size={16} /></button>
        <button type="button" className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"><Heading2 size={16} /></button>
        <div className="w-px h-4 bg-border mx-1" />
        <button type="button" className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"><List size={16} /></button>
        <button type="button" className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"><ListOrdered size={16} /></button>
        <div className="w-px h-4 bg-border mx-1" />
        <button type="button" className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"><LinkIcon size={16} /></button>
        <button type="button" className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"><ImageIcon size={16} /></button>
      </div>
      <textarea
        className="w-full min-h-[400px] p-6 bg-transparent outline-none resize-y text-foreground leading-relaxed placeholder:text-muted-foreground/50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Start writing your masterpiece..."}
      />
      <div className="px-4 py-2 border-t border-border bg-secondary/10 flex justify-between items-center text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
        <span>Word Count: {value.trim().split(/\s+/).length}</span>
        <span>HTML Mode Enabled</span>
      </div>
    </div>
  );
};

export default RichTextEditor;
