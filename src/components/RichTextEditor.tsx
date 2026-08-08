import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
} from 'lucide-react'

export function RichTextEditor({
  content = '',
  onChange,
}: {
  content?: string
  onChange?: (html: string) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Write your intelligence briefing here...',
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-primary max-w-none focus:outline-none min-h-[300px] p-6',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
  }: {
    onClick: () => void
    isActive?: boolean
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-none border transition-all duration-200 flex items-center justify-center ${
        isActive
          ? 'bg-primary/20 border-primary/50 text-primary shadow-[inset_0_0_10px_rgba(202,146,29,0.2)]'
          : 'border-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="w-full flex flex-col rounded-none border border-border bg-[#121212] overflow-hidden shadow-card transition-all duration-300 focus-within:border-primary/50 focus-within:shadow-[inset_0_0_20px_rgba(202,146,29,0.05)]">
      <div className="flex flex-wrap items-center gap-1 border-b border-border p-2 bg-[#080808]">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
        >
          <Strikethrough size={16} />
        </ToolbarButton>

        <div className="w-[1px] h-6 bg-border mx-2" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
        >
          <Quote size={16} />
        </ToolbarButton>

        <div className="w-[1px] h-6 bg-border mx-2" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        >
          <ListOrdered size={16} />
        </ToolbarButton>
      </div>
      
      {/* The actual editor canvas */}
      <div className="relative">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
