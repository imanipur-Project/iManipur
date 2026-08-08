import { useState, useEffect } from 'react'
import DOMPurify from 'dompurify'
import { RichTextEditor } from './RichTextEditor'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'

const isCmsEnabled = import.meta.env['VITE_ENABLE_CMS'] === 'true';

interface EditableBlockProps {
  slug: string
  defaultHtml: string
}

export function EditableBlock({ slug, defaultHtml }: EditableBlockProps) {
  const { isEditMode, user } = useAuth()
  const [content, setContent] = useState(defaultHtml)
  const [originalContent, setOriginalContent] = useState(defaultHtml)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch live content from DB on mount
  useEffect(() => {
    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from('content_blocks')
          .select('html_content')
          .eq('slug', slug)
          .single()
        
        if (error && error.code !== 'PGRST116') {
          console.error(`Error loading ${slug}:`, error)
        }
        
        if (data?.html_content) {
          setContent(data.html_content)
          setOriginalContent(data.html_content)
        }
      } catch (err) {
        console.error('Unexpected error:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchContent()
  }, [slug])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('content_blocks')
        .upsert({ slug, html_content: content }, { onConflict: 'slug' })
      
      if (error) throw error
      setOriginalContent(content)
      alert('Saved to Supabase!')
    } catch (err) {
      console.error('Save failed:', err)
      alert('Failed to save')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setContent(originalContent)
  }

  if (isLoading) {
    return <div className="animate-pulse h-10 bg-white/5 rounded-none w-full" />
  }

  if (isCmsEnabled && isEditMode && user) {
    return (
      <div className="flex flex-col gap-4 p-4 border border-primary/30 bg-[#080808] rounded-none shadow-[0_0_20px_rgba(202,146,29,0.05)] relative -mx-4">
        <div className="absolute -top-3 left-4 bg-[#080808] px-2 label-mono text-primary z-10 text-[10px]">
          Editing: {slug}
        </div>
        <RichTextEditor content={content} onChange={setContent} />
        
        <div className="flex justify-end gap-2 mt-2">
          <button 
            onClick={handleCancel}
            className="px-4 py-2 border border-border text-muted-foreground hover:bg-white/5 text-sm transition-colors rounded-none"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving || content === originalContent}
            className="px-6 py-2 bg-primary/20 border border-primary text-primary hover:bg-primary/30 transition-all text-sm rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save to Live Site'}
          </button>
        </div>
      </div>
    )
  }

  const cleanHtml = DOMPurify.sanitize(content)

  return (
    <div 
      className="prose prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-primary max-w-none transition-opacity duration-300"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  )
}
