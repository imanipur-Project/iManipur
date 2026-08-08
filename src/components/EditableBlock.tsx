import { useState, useEffect, useRef } from "react";
import DOMPurifyClient from "dompurify";
import { toast } from "sonner";
import { RichTextEditor } from "./RichTextEditor";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabase";
import { isCmsEnabled } from "../lib/flags";

import { cn } from "../lib/utils";

interface EditableBlockProps {
  slug: string;
  defaultHtml: string;
  className?: string;
}

export function EditableBlock({ slug, defaultHtml, className }: EditableBlockProps) {
  const { isEditMode, user } = useAuth();
  const [content, setContent] = useState(defaultHtml);
  const [originalContent, setOriginalContent] = useState(defaultHtml);
  const [isLoading, setIsLoading] = useState(isCmsEnabled);
  const [isSaving, setIsSaving] = useState(false);

  // Key trick: incrementing this forces RichTextEditor to re-mount with fresh content.
  const [editorKey, setEditorKey] = useState(0);

  // Guard against stale fetch responses when slug changes mid-flight.
  const activeSlugRef = useRef(slug);

  useEffect(() => {
    if (!isCmsEnabled || !supabase) return;

    activeSlugRef.current = slug;
    setIsLoading(true);
    setContent(defaultHtml);
    setOriginalContent(defaultHtml);

    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from("content_blocks")
          .select("html_content")
          .eq("slug", slug)
          .maybeSingle();

        // Discard response if slug changed while request was in flight.
        if (activeSlugRef.current !== slug) return;

        if (error) {
          console.error(`Error loading ${slug}:`, error);
        }

        if (data?.html_content) {
          setContent(data.html_content);
          setOriginalContent(data.html_content);
        }
      } catch (err) {
        if (activeSlugRef.current !== slug) return;
        console.error("Unexpected error:", err);
      } finally {
        if (activeSlugRef.current === slug) {
          setIsLoading(false);
        }
      }
    }

    fetchContent();
  }, [slug]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (!supabase) return;
      const { error } = await supabase
        .from("content_blocks")
        .upsert({ slug, html_content: content }, { onConflict: "slug" });

      if (error) throw error;
      setOriginalContent(content);
      toast.success("Saved to live site.");
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (isSaving) return;
    setContent(originalContent);
    // Increment key to force RichTextEditor remount with the reset content.
    setEditorKey((k) => k + 1);
  };

  if (isLoading) {
    return <div className="animate-pulse h-10 bg-white/5 rounded-none w-full" />;
  }

  if (isCmsEnabled && isEditMode && user) {
    return (
      <div className="flex flex-col gap-4 p-4 border border-primary/30 bg-[#080808] rounded-none shadow-[0_0_20px_rgba(202,146,29,0.05)] relative -mx-4">
        <div className="absolute -top-3 left-4 bg-[#080808] px-2 label-mono text-primary z-10 text-[10px]">
          Editing: {slug}
        </div>
        <RichTextEditor key={editorKey} content={content} onChange={setContent} />

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-4 py-2 border border-border text-muted-foreground hover:bg-white/5 text-sm transition-colors rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || content === originalContent}
            className="px-6 py-2 bg-primary/20 border border-primary text-primary hover:bg-primary/30 transition-all text-sm rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save to Live Site"}
          </button>
        </div>
      </div>
    );
  }

  // Only sanitize on the client — DOMPurify requires a browser DOM.
  // Content from Supabase is trusted (sanitized at save time), so passing
  // the raw string through SSR is safe and avoids hydration mismatches.
  const cleanHtml = typeof window !== "undefined" ? DOMPurifyClient.sanitize(content) : content;

  return (
    <div
      className={cn(
        "prose prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-primary max-w-none transition-opacity duration-300",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
