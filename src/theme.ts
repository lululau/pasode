import { RGBA, SyntaxStyle } from "@opentui/core"
import { createSignal } from "solid-js"
import { createStore, reconcile } from "solid-js/store"

/** Same color keys as OpenCode's TUI Theme (packages/tui/src/theme/index.ts), so its themes port 1:1. */
export type ThemeColors = {
  primary: RGBA
  secondary: RGBA
  accent: RGBA
  /** OpenCode's agent color (categorical[0] step 200): the "Build" label, prompt border and user bubbles. */
  agent: RGBA
  error: RGBA
  warning: RGBA
  success: RGBA
  info: RGBA
  text: RGBA
  textMuted: RGBA
  selectedListItemText: RGBA
  actionText: RGBA
  actionTextSelected: RGBA
  promptPasteText: RGBA
  promptPasteBackground: RGBA
  logoShadow: RGBA
  logoShadowMuted: RGBA
  background: RGBA
  backgroundHover: RGBA
  backgroundPanel: RGBA
  backgroundPanelHover: RGBA
  backgroundElement: RGBA
  backgroundMenu: RGBA
  backgroundAction: RGBA
  backgroundActionHovered: RGBA
  backgroundActionFocused: RGBA
  backgroundActionSelected: RGBA
  backgroundMenuActionHovered: RGBA
  backgroundMenuActionFocused: RGBA
  backgroundMenuActionSelected: RGBA
  border: RGBA
  borderActive: RGBA
  borderSubtle: RGBA
  diffAdded: RGBA
  diffRemoved: RGBA
  diffContext: RGBA
  diffHunkHeader: RGBA
  diffHighlightAdded: RGBA
  diffHighlightRemoved: RGBA
  diffAddedBg: RGBA
  diffRemovedBg: RGBA
  diffContextBg: RGBA
  diffLineNumber: RGBA
  diffAddedLineNumberBg: RGBA
  diffRemovedLineNumberBg: RGBA
  markdownText: RGBA
  markdownHeading: RGBA
  markdownLink: RGBA
  markdownLinkText: RGBA
  markdownCode: RGBA
  markdownBlockQuote: RGBA
  markdownEmph: RGBA
  markdownStrong: RGBA
  markdownHorizontalRule: RGBA
  markdownListItem: RGBA
  markdownListEnumeration: RGBA
  markdownImage: RGBA
  markdownImageText: RGBA
  markdownCodeBlock: RGBA
  syntaxComment: RGBA
  syntaxKeyword: RGBA
  syntaxFunction: RGBA
  syntaxVariable: RGBA
  syntaxString: RGBA
  syntaxNumber: RGBA
  syntaxType: RGBA
  syntaxOperator: RGBA
  syntaxPunctuation: RGBA
}

const hex = RGBA.fromHex

/** Built-in fallback: your OpenCode theme, monokai-pro-ristretto (dark). */
export const ristretto: ThemeColors = {
  primary: hex("#a4cff9"),
  secondary: hex("#c8caf4"),
  accent: hex("#ffa5b1"),
  agent: hex("#ffa5b1"),
  error: hex("#ffa5b1"),
  warning: hex("#ffd6a5"),
  success: hex("#cce9ae"),
  info: hex("#b6e8df"),
  text: hex("#f1e3e5"),
  textMuted: hex("#958a8b"),
  selectedListItemText: hex("#2c2525"),
  actionText: hex("#f1e3e5"),
  actionTextSelected: hex("#a4cff9"),
  promptPasteText: hex("#2c2525"),
  promptPasteBackground: hex("#ffd6a5"),
  logoShadow: hex("#5d5555"),
  logoShadowMuted: hex("#463e3f"),
  background: hex("#2c2525"),
  backgroundHover: hex("#362e2e"),
  backgroundPanel: hex("#362e2e"),
  backgroundPanelHover: hex("#3f3737"),
  backgroundElement: hex("#3f3737"),
  backgroundMenu: hex("#362e2e"),
  backgroundAction: hex("#00000000"),
  backgroundActionHovered: hex("#362e2e"),
  backgroundActionFocused: hex("#a4cff9"),
  backgroundActionSelected: hex("#00000000"),
  backgroundMenuActionHovered: hex("#3f3737"),
  backgroundMenuActionFocused: hex("#a4cff9"),
  backgroundMenuActionSelected: hex("#00000000"),
  border: hex("#3f3737"),
  borderActive: hex("#685f5f"),
  borderSubtle: hex("#362e2e"),
  diffAdded: hex("#cce9ae"),
  diffRemoved: hex("#ffa5b1"),
  diffContext: hex("#958a8b"),
  diffHunkHeader: hex("#b6e8df"),
  diffHighlightAdded: hex("#dff2cd"),
  diffHighlightRemoved: hex("#ffc9ce"),
  diffAddedBg: hex("#5c6645"),
  diffRemovedBg: hex("#784047"),
  diffContextBg: hex("#362e2e"),
  diffLineNumber: hex("#685f5f"),
  diffAddedLineNumberBg: hex("#494c39"),
  diffRemovedLineNumberBg: hex("#5a363a"),
  markdownText: hex("#f1e3e5"),
  markdownHeading: hex("#ffa5b1"),
  markdownLink: hex("#a4cff9"),
  markdownLinkText: hex("#b6e8df"),
  markdownCode: hex("#cce9ae"),
  markdownBlockQuote: hex("#c2b5b7"),
  markdownEmph: hex("#ffd6a5"),
  markdownStrong: hex("#fce0a8"),
  markdownHorizontalRule: hex("#3f3737"),
  markdownListItem: hex("#a4cff9"),
  markdownListEnumeration: hex("#b6e8df"),
  markdownImage: hex("#a4cff9"),
  markdownImageText: hex("#b6e8df"),
  markdownCodeBlock: hex("#f1e3e5"),
  syntaxComment: hex("#958a8b"),
  syntaxKeyword: hex("#ffa5b1"),
  syntaxFunction: hex("#a4cff9"),
  syntaxVariable: hex("#f1e3e5"),
  syntaxString: hex("#cce9ae"),
  syntaxNumber: hex("#ffd6a5"),
  syntaxType: hex("#c8caf4"),
  syntaxOperator: hex("#ffa5b1"),
  syntaxPunctuation: hex("#c2b5b7"),
}

/** Built-in fallback: OpenCode's Tokyo Night theme (dark). */
export const tokyonight: ThemeColors = {
  primary: hex("#82aaff"),
  secondary: hex("#c099ff"),
  accent: hex("#ff966c"),
  agent: hex("#c099ff"),
  error: hex("#ff757f"),
  warning: hex("#ff966c"),
  success: hex("#c3e88d"),
  info: hex("#82aaff"),
  text: hex("#c8d3f5"),
  textMuted: hex("#828bb8"),
  selectedListItemText: hex("#1a1b26"),
  actionText: hex("#c8d3f5"),
  actionTextSelected: hex("#82aaff"),
  promptPasteText: hex("#1a1b26"),
  promptPasteBackground: hex("#ff966c"),
  logoShadow: hex("#46495a"),
  logoShadowMuted: hex("#34374a"),
  background: hex("#1a1b26"),
  backgroundHover: hex("#1e2030"),
  backgroundPanel: hex("#1e2030"),
  backgroundPanelHover: hex("#222436"),
  backgroundElement: hex("#222436"),
  backgroundMenu: hex("#1e2030"),
  backgroundAction: hex("#00000000"),
  backgroundActionHovered: hex("#1e2030"),
  backgroundActionFocused: hex("#82aaff"),
  backgroundActionSelected: hex("#00000000"),
  backgroundMenuActionHovered: hex("#222436"),
  backgroundMenuActionFocused: hex("#82aaff"),
  backgroundMenuActionSelected: hex("#00000000"),
  border: hex("#737aa2"),
  borderActive: hex("#9099b2"),
  borderSubtle: hex("#1e2030"),
  diffAdded: hex("#4fd6be"),
  diffRemoved: hex("#c53b53"),
  diffContext: hex("#828bb8"),
  diffHunkHeader: hex("#828bb8"),
  diffHighlightAdded: hex("#b8db87"),
  diffHighlightRemoved: hex("#e26a75"),
  diffAddedBg: hex("#20303b"),
  diffRemovedBg: hex("#37222c"),
  diffContextBg: hex("#1e2030"),
  diffLineNumber: hex("#8f909a"),
  diffAddedLineNumberBg: hex("#1b2b34"),
  diffRemovedLineNumberBg: hex("#2d1f26"),
  markdownText: hex("#c8d3f5"),
  markdownHeading: hex("#c099ff"),
  markdownLink: hex("#82aaff"),
  markdownLinkText: hex("#86e1fc"),
  markdownCode: hex("#c3e88d"),
  markdownBlockQuote: hex("#ffc777"),
  markdownEmph: hex("#ffc777"),
  markdownStrong: hex("#ff966c"),
  markdownHorizontalRule: hex("#828bb8"),
  markdownListItem: hex("#82aaff"),
  markdownListEnumeration: hex("#86e1fc"),
  markdownImage: hex("#82aaff"),
  markdownImageText: hex("#86e1fc"),
  markdownCodeBlock: hex("#c8d3f5"),
  syntaxComment: hex("#828bb8"),
  syntaxKeyword: hex("#c099ff"),
  syntaxFunction: hex("#82aaff"),
  syntaxVariable: hex("#ff757f"),
  syntaxString: hex("#c3e88d"),
  syntaxNumber: hex("#ff966c"),
  syntaxType: hex("#ffc777"),
  syntaxOperator: hex("#86e1fc"),
  syntaxPunctuation: hex("#c8d3f5"),
}

/** Reactive: read `theme.x` inside JSX/effects and it follows `applyTheme`. */
export const [theme, setThemeStore] = createStore<ThemeColors>({ ...tokyonight })

function buildSyntax(colors: ThemeColors) {
  return SyntaxStyle.fromTheme([
    { scope: ["default"], style: { foreground: colors.markdownText } },
    { scope: ["markup.heading"], style: { foreground: colors.markdownHeading, bold: true } },
    { scope: ["markup.bold", "markup.strong"], style: { foreground: colors.markdownStrong, bold: true } },
    { scope: ["markup.italic"], style: { foreground: colors.markdownEmph, italic: true } },
    { scope: ["markup.list"], style: { foreground: colors.markdownListItem } },
    { scope: ["markup.quote"], style: { foreground: colors.markdownBlockQuote, italic: true } },
    { scope: ["markup.raw", "markup.raw.block", "markup.raw.inline"], style: { foreground: colors.markdownCode } },
    { scope: ["markup.link", "markup.link.url"], style: { foreground: colors.markdownLink, underline: true } },
    { scope: ["markup.link.label"], style: { foreground: colors.markdownLinkText } },
    { scope: ["comment"], style: { foreground: colors.syntaxComment, italic: true } },
    { scope: ["string", "symbol"], style: { foreground: colors.syntaxString } },
    { scope: ["number", "boolean", "constant"], style: { foreground: colors.syntaxNumber } },
    { scope: ["keyword", "keyword.import", "keyword.function"], style: { foreground: colors.syntaxKeyword } },
    { scope: ["operator", "keyword.operator"], style: { foreground: colors.syntaxOperator } },
    { scope: ["function", "function.call", "function.method", "constructor"], style: { foreground: colors.syntaxFunction } },
    { scope: ["variable", "variable.parameter", "property"], style: { foreground: colors.syntaxVariable } },
    { scope: ["type", "class", "module"], style: { foreground: colors.syntaxType } },
    { scope: ["punctuation", "punctuation.bracket", "punctuation.delimiter"], style: { foreground: colors.syntaxPunctuation } },
  ])
}

const [syntaxStyle, setSyntaxStyle] = createSignal(buildSyntax(tokyonight))
/** Markdown/code SyntaxStyle for the active theme; call it inside JSX so it tracks theme changes. */
export const syntax = syntaxStyle

/** Swap the whole palette (theme switcher / config). */
export function applyTheme(colors: ThemeColors) {
  setThemeStore(reconcile({ ...colors }))
  const previous = syntaxStyle()
  setSyntaxStyle(buildSyntax(colors))
  // A destroyed style throws if a renderable still draws with it, so free the old native one once they have all switched.
  setTimeout(() => previous.destroy(), 2000).unref()
}
