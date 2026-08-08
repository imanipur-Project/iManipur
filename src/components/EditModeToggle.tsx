import { useAuth } from "./AuthContext";
import { isCmsEnabled } from "../lib/flags";

/**
 * Floating edit-mode toggle button.
 * Rendered only when CMS is enabled at build time and a user is authenticated.
 * Mount this in the root layout so consumers control its placement.
 */
export function EditModeToggle() {
  const { user, isEditMode, toggleEditMode } = useAuth();

  if (!isCmsEnabled || !user) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
      <button
        onClick={toggleEditMode}
        aria-pressed={isEditMode}
        aria-label={isEditMode ? "Disable edit mode" : "Enable edit mode"}
        className={`px-4 py-2 rounded-none font-mono text-xs uppercase tracking-widest transition-all shadow-card border backdrop-blur-md ${
          isEditMode
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background/80 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
        }`}
      >
        {isEditMode ? "Edit Mode: ON" : "Edit Mode: OFF"}
      </button>
    </div>
  );
}
