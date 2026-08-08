/**
 * Shared feature flags derived from build-time environment variables.
 * Import from here rather than reading import.meta.env directly to ensure
 * a single source of truth and prevent flag drift across files.
 */

/** True when the CMS edit-mode UI is enabled at build time. */
export const isCmsEnabled = import.meta.env["VITE_ENABLE_CMS"] === "true";
