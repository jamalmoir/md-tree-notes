module.exports = {
  mode: "jit",
  purge: ["./src/**/*.svelte"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "xs": "var(--spacing-xs)",
        "sm": "var(--spacing-sm)",
        "md": "var(--spacing-md)",
        "lg": "var(--spacing-lg)",
        "xl": "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
      },
      colors: {
        "primary": "var(--primary)",
        "success": "var(--success)",
        "info": "var(--info)",
        "warning": "var(--warning)",
        "danger": "var(--danger)",
        "black": "var(--black)",
        "white": "var(--white)",
        "neutral-dark": "var(--neutral-dark)",
        "neutral-light": "var(--neutral-light)",
        "background": "var(--background)",
        "text": "var(--text)",
        "secondary-text": "var(--secondary-text)",
      },
      fontSize: {
        "sm": "var(--text-sm)",
        "md": "var(--text-md)",
        "lg": "var(--text-lg)",
        "xl": "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "h1": "var(--text-h1)",
        "h2": "var(--text-h2)",
        "h3": "var(--text-h3)",
        "h4": "var(--text-h4)",

        "intro": "var(--text-intro)",
        "main": "var(--text-main)",
        "medium": "var(--text-medium)",
        "caption": "var(--text-caption)",
        "small": "var(--text-small)",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
