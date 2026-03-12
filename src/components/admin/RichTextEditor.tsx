import { useEffect, useRef, useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";
import { toast } from "sonner";
import { 
  Bold, 
  Italic, 
  Underline,
  Strikethrough,
  List, 
  ListOrdered, 
  Heading1, 
  Heading2,
  Heading3,
  Link as LinkIcon, 
  Image as ImageIcon,
  Quote,
  Code,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Upload,
  Loader2
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ToolbarButton = ({ onClick, title, children, active = false }: { onClick: () => void, title: string, children: React.ReactNode, active?: boolean }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`p-1.5 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors ${active ? 'bg-primary/10 text-primary' : ''}`}
  >
    {children}
  </button>
);

const Divider = () => <div className="w-px h-5 bg-border mx-1 self-center" />;

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  // Initialize content
  useEffect(() => {
    if (editorRef.current && !isInitialized.current) {
      editorRef.current.innerHTML = value || '';
      isInitialized.current = true;
    }
  }, []);

  // Sync external value changes (e.g., when loading a blog for editing)
  useEffect(() => {
    if (editorRef.current && isInitialized.current) {
      const currentContent = editorRef.current.innerHTML;
      if (value !== currentContent && value !== undefined) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  // Custom Prompt Dialog State
  const [promptOpen, setPromptOpen] = useState(false);
  const [promptType, setPromptType] = useState<"link" | "image">("link");
  const [promptUrl, setPromptUrl] = useState("https://");
  const [isUploading, setIsUploading] = useState(false);
  const selectionRef = useRef<Range | null>(null);

  const exec = useCallback((command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      selectionRef.current = selection.getRangeAt(0);
    }
  }, []);

  const restoreSelection = useCallback(() => {
    if (selectionRef.current) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(selectionRef.current);
    }
  }, []);

  const openPrompt = useCallback((type: "link" | "image") => {
    saveSelection();
    setPromptType(type);
    setPromptUrl("https://");
    setPromptOpen(true);
  }, [saveSelection]);

  const insertLink = useCallback(() => openPrompt("link"), [openPrompt]);
  const insertImage = useCallback(() => openPrompt("image"), [openPrompt]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const url = await api.uploadImage(file);
      setPromptUrl(url);
      toast.success("Image uploaded successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const submitPrompt = (e?: React.MouseEvent | React.FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (promptUrl) {
      editorRef.current?.focus();
      restoreSelection();

      // Ensure execution happens after selection restore
      setTimeout(() => {
        if (promptType === "link") {
          exec('createLink', promptUrl);
        } else if (promptType === "image") {
          exec('insertImage', promptUrl);
        }
      }, 10);
    }
    setPromptOpen(false);
  };

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Handle tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      exec('insertText', '    ');
    }
  }, [exec]);

  const wordCount = value.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  const charCount = value.replace(/<[^>]*>/g, '').length;

  return (
    <div className="border border-border rounded-xl overflow-hidden focus-within:border-primary/50 transition-colors bg-background">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 p-2 border-b border-border bg-secondary/30 flex-wrap">
        <ToolbarButton onClick={() => exec('undo')} title="Undo (Ctrl+Z)"><Undo size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('redo')} title="Redo (Ctrl+Y)"><Redo size={15} /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => exec('bold')} title="Bold (Ctrl+B)"><Bold size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('italic')} title="Italic (Ctrl+I)"><Italic size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('underline')} title="Underline (Ctrl+U)"><Underline size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('strikeThrough')} title="Strikethrough"><Strikethrough size={15} /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => exec('formatBlock', 'h1')} title="Heading 1"><Heading1 size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', 'h2')} title="Heading 2"><Heading2 size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', 'h3')} title="Heading 3"><Heading3 size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', 'p')} title="Paragraph">¶</ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => exec('insertUnorderedList')} title="Bullet List"><List size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('insertOrderedList')} title="Numbered List"><ListOrdered size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', 'blockquote')} title="Blockquote"><Quote size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', 'pre')} title="Code Block"><Code size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('insertHorizontalRule')} title="Horizontal Rule"><Minus size={15} /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => exec('justifyLeft')} title="Align Left"><AlignLeft size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('justifyCenter')} title="Align Center"><AlignCenter size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => exec('justifyRight')} title="Align Right"><AlignRight size={15} /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={insertLink} title="Insert Link"><LinkIcon size={15} /></ToolbarButton>
        <ToolbarButton onClick={insertImage} title="Insert Image"><ImageIcon size={15} /></ToolbarButton>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder || "Start writing your masterpiece... Use the toolbar above for formatting."}
        className="rich-editor min-h-[420px] p-6 bg-transparent outline-none text-foreground leading-relaxed overflow-y-auto"
        style={{ maxHeight: '650px' }}
      />

      {/* Footer */}
      <div className="px-4 py-2 border-t border-border bg-secondary/10 flex justify-between items-center text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
        <span>{wordCount} words · {charCount} chars</span>
        <span>WYSIWYG Editor</span>
      </div>

      <style>{`
        .rich-editor:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground) / 0.4);
          pointer-events: none;
        }
        .rich-editor h1 { font-size: 2rem; font-weight: 800; margin: 1.5rem 0 0.75rem; line-height: 1.2; }
        .rich-editor h2 { font-size: 1.5rem; font-weight: 700; margin: 1.25rem 0 0.5rem; border-bottom: 1px solid hsl(var(--border)); padding-bottom: 0.5rem; }
        .rich-editor h3 { font-size: 1.25rem; font-weight: 700; margin: 1rem 0 0.5rem; }
        .rich-editor p { margin: 0.75rem 0; line-height: 1.8; }
        .rich-editor ul, .rich-editor ol { margin: 0.75rem 0 0.75rem 1.5rem; }
        .rich-editor li { margin: 0.25rem 0; line-height: 1.7; }
        .rich-editor blockquote { border-left: 4px solid hsl(var(--primary)); padding: 0.75rem 1rem; background: hsl(var(--muted)); border-radius: 0 0.5rem 0.5rem 0; margin: 1rem 0; font-style: italic; }
        .rich-editor pre { background: hsl(var(--muted)); padding: 1rem; border-radius: 0.5rem; overflow-x: auto; font-family: monospace; margin: 1rem 0; font-size: 0.875rem; }
        .rich-editor code { background: hsl(var(--muted)); padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.875em; }
        .rich-editor a { color: hsl(var(--primary)); text-decoration: underline; }
        .rich-editor img { max-width: 100%; border-radius: 0.75rem; margin: 1rem 0; }
        .rich-editor hr { border: none; border-top: 1px solid hsl(var(--border)); margin: 1.5rem 0; }
        .rich-editor strong { font-weight: 700; }
        .rich-editor em { font-style: italic; }
        .rich-editor u { text-decoration: underline; }
        .rich-editor s { text-decoration: line-through; }
      `}</style>

      {/* Custom Prompt Dialog */}
      <Dialog open={promptOpen} onOpenChange={setPromptOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {promptType === "link" ? "Insert Link" : "Insert Image"}
            </DialogTitle>
            <DialogDescription>
              {promptType === "link" ? "Enter the URL you wish to link to." : "Upload an image or enter the direct URL."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {promptType === "image" && (
              <div className="space-y-2">
                <Label>Upload Image</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    id="editor-image-upload" 
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  <Label 
                    htmlFor="editor-image-upload"
                    className="flex-1 flex items-center justify-center gap-2 h-10 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md cursor-pointer transition-colors border border-border"
                  >
                    {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    {isUploading ? "Uploading..." : "Click to upload from computer"}
                  </Label>
                </div>
                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">OR</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="url">{promptType === "link" ? "URL" : "Image URL"}</Label>
              <Input
                id="url"
                value={promptUrl}
                onChange={(e) => setPromptUrl(e.target.value)}
                placeholder="https://"
                autoFocus
                onKeyDown={(e) => { e.stopPropagation() }} // Prevent editor interference
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setPromptOpen(false)}>Cancel</Button>
              <Button type="button" onClick={submitPrompt} disabled={isUploading}>Insert</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RichTextEditor;
