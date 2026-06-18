# 🜏 Frontend Skills & Design System — Dark Fantasy Purple Edition

## UI/UX Modernization
- **Design System:** Upgraded to "Arcane UI" featuring glassmorphism, bento grid layouts, and premium dark fantasy aesthetics.
- **Animations:** Integrated `framer-motion` and custom Tailwind keyframes (`fade-from-abyss`, `rift-border`, `glow-pulse`).
- **Backgrounds:** Implemented dynamic mesh gradient backgrounds and noise texture overlays for a premium feel.
- **Performance:** Refined component structure for better Core Web Vitals.

---

## I. Arcane Foundations — Core Stack Mastery

### React 19

| Skill | Level | Description |
|-------|-------|-------------|
| Server Components (RSC) | ⬛⬛⬛⬛⬜ Advanced | Rendering di server untuk performa awal yang cepat; mengurangi JS bundle yang dikirim ke client |
| `use()` Hook | ⬛⬛⬛⬛⬜ Advanced | Suspense-integrated data fetching; unwrap Promise langsung di render |
| `useFormStatus()` | ⬛⬛⬛⬛⬜ Advanced | Status form submission tanpa prop drilling — ideal untuk form bertema ritual |
| `useOptimistic()` | ⬛⬛⬛⬛⬜ Advanced | Optimistic UI update sebelum response server — transaksi mulus tanpa flicker |
| `useActionState()` | ⬛⬛⬛⬜⬜ Intermediate | State management untuk server actions, menggantikan `useFormState` |
| Concurrent Features | ⬛⬛⬛⬛⬜ Advanced | `startTransition`, `useDeferredValue` — rendering non-blocking untuk interaksi smooth |
| Suspense Boundaries | ⬛⬛⬛⬛⬜ Advanced | Lazy loading dengan fallback skeleton bertema dark fantasy |
| Error Boundaries | ⬛⬛⬛⬛⬜ Advanced | Graceful error handling dengan UI arcane-themed |
| Custom Hooks | ⬛⬛⬛⬛⬛ Expert | Abstraksi logic reusable — `useArcaneEffect`, `useRuneAnimation`, dll |
| Context API | ⬛⬛⬛⬛⬜ Advanced | Global state ringan: theme provider, auth context, dungeon config |
| React.memo & useMemo | ⬛⬛⬛⬛⬜ Advanced | Performance optimization — mencegah re-render yang tidak perlu |

### TypeScript

| Skill | Level | Description |
|-------|-------|-------------|
| Strict Mode | ⬛⬛⬛⬛⬛ Expert | `strict: true` — zero `any`, type safety penuh untuk codebase yang aman |
| Generics | ⬛⬛⬛⬛⬜ Advanced | `T`, `K extends keyof T` — reusable typed utilities untuk spell system, inventory, dsb |
| Utility Types | ⬛⬛⬛⬛⬜ Advanced | `Partial`, `Required`, `Pick`, `Omit`, `Record` — manipulasi type yang elegan |
| Discriminated Unions | ⬛⬛⬛⬛⬜ Advanced | Tagged union untuk state machine: `SpellStatus = 'chanting' \| 'cast' \| 'failed'` |
| Mapped & Conditional Types | ⬛⬛⬛⬜⬜ Intermediate | Type-level programming — validasi form, transformasi data shape |
| Template Literal Types | ⬛⬛⬛⬜⬜ Intermediate | `"arcane-${string}"` — type-safe string pattern untuk CSS class, route, event name |
| Declaration Files (.d.ts) | ⬛⬛⬛⬜⬜ Intermediate | Module augmentation, global type extensions untuk library tanpa type |
| Type Guards & Narrowing | ⬛⬛⬛⬛⬜ Advanced | `is`, `in`, `typeof` narrowing — runtime safety + compile-time guarantee |
| Zod / Valibot Integration | ⬛⬛⬛⬛⬜ Advanced | Runtime validation yang sinkron dengan TypeScript types |

### Vite

| Skill | Level | Description |
|-------|-------|-------------|
| Dev Server & HMR | ⬛⬛⬛⬛⬛ Expert | Instant module replacement — perubahan langsung terlihat tanpa full reload |
| Build Optimization | ⬛⬛⬛⬛⬜ Advanced | Code splitting, tree-shaking, chunk strategy untuk production build yang ramping |
| Plugin System | ⬛⬛⬛⬛⬜ Advanced | `@vitejs/plugin-react`, SVGR, compression — extend build pipeline sesuai kebutuhan |
| Environment Modes | ⬛⬛⬛⬛⬜ Advanced | `.env.development` / `.env.production` — konfigurasi per environment |
| Path Aliases | ⬛⬛⬛⬛⬛ Expert | `@/` alias untuk import yang bersih — `@/components/ui/arcane-button` |
| CSS Pre-processing | ⬛⬛⬛⬛⬜ Advanced | PostCSS, CSS Modules, Tailwind integration — styling pipeline yang seamless |
| SSR / SSG Support | ⬛⬛⬛⬜⬜ Intermediate | Server-side rendering atau static generation bila diperlukan |

### Tailwind CSS

| Skill | Level | Description |
|-------|-------|-------------|
| Utility-First Workflow | ⬛⬛⬛⬛⬛ Expert | Komposisi class untuk UI tanpa custom CSS — produktivitas maksimal |
| Theme Configuration | ⬛⬛⬛⬛⬛ Expert | `tailwind.config.ts` — custom colors, spacing, typography untuk dark fantasy system |
| Dark Mode Strategy | ⬛⬛⬛⬛⬛ Expert | `class` based dark mode — toggle theme melalui `dark` class di root |
| Responsive Design | ⬛⬛⬛⬛⬛ Expert | `sm:`, `md:`, `lg:`, `xl:`, `2xl:` — layout yang adaptif di semua layar |
| Animation & Transitions | ⬛⬛⬛⬛⬜ Advanced | `animate-`, `transition-`, `duration-` — micro-interactions yang magis |
| Custom Plugins | ⬛⬛⬛⬜⬜ Intermediate | Plugin untuk utility custom: `glow`, `rune-border`, `arcane-gradient` |
| Container Queries | ⬛⬛⬛⬜⬜ Intermediate | `@container` — component-level responsive, bukan viewport-based |
| CSS Variables Integration | ⬛⬛⬛⬛⬜ Advanced | `var(--purple-abyss)` — runtime theming dengan CSS custom properties |

### shadcn/ui

| Skill | Level | Description |
|-------|-------|-------------|
| Component Installation | ⬛⬛⬛⬛⬛ Expert | `npx shadcn@latest add` — tambah komponen sesuai kebutuhan, bukan full library |
| Theming System | ⬛⬛⬛⬛⬛ Expert | CSS variable-based theming — override `--primary`, `--background`, dll untuk dark fantasy |
| Component Composition | ⬛⬛⬛⬛⬜ Advanced | Radix primitives + Tailwind — aksesibilitas built-in dengan styling custom |
| Form Integration | ⬛⬛⬛⬛⬜ Advanced | React Hook Form + Zod + shadcn Form — validasi yang type-safe dan UX-friendly |
| Dialog / Sheet / Popover | ⬛⬛⬛⬛⬜ Advanced | Overlay components untuk modal ritual, character sheet, inventory panel |
| Table / Data Display | ⬛⬛⬛⬛⬜ Advanced | TanStack Table + shadcn — data grid untuk skill tree, quest log, bestiary |
| Custom Component Variants | ⬛⬛⬛⬛⬛ Expert | `cva` (class-variance-authority) — variant system yang konsisten untuk setiap komponen |

---

## II. The Grimoire — Dark Fantasy Purple Design System

### Color Palette

#### Core Abyss — Backgrounds & Surfaces

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ─── BASE LAYER (Backgrounds) ───                                  │
│                                                                     │
│  ████ #0a0a0f   void-950   — Darkest void, page background         │
│  ████ #0f0e17   void-900   — Main surface, card backgrounds        │
│  ████ #161425   void-800   — Elevated surface, sidebar             │
│  ████ #1e1a30   void-700   — Hover state, secondary surface        │
│  ████ #282340   void-600   — Active state, tertiary surface        │
│                                                                     │
│  ─── PURPLE ARCANE (Primary) ───                                   │
│                                                                     │
│  ████ #2d1b4e   arcane-950  — Deepest purple, shadow accent        │
│  ████ #3d2a5c   arcane-900  — Dark purple, border subtle           │
│  ████ #5b3a8c   arcane-800  — Medium-dark, icon muted              │
│  ████ #7c4dba   arcane-700  — Mid purple, secondary accent         │
│  ████ #9b6dd7   arcane-600  — Bright mid, primary accent           │
│  ████ #b68ee6   arcane-500  — Vivid purple, primary interactive    │
│  ████ #c9a5f0   arcane-400  — Light purple, text highlight         │
│  ████ #dbc4f7   arcane-300  — Soft purple, placeholder text        │
│  ████ #ece2fb   arcane-200  — Pale purple, subtle label            │
│  ████ #f5f0fe   arcane-100  — Near white, high-contrast text       │
│                                                                     │
│  ─── ENCHANT ACCENTS ───                                           │
│                                                                     │
│  ████ #e040fb   enchant-500 — Magenta glow, critical action        │
│  ████ #ea80fc   enchant-400 — Light magenta, success flash         │
│  ████ #7c3aed   rift-500    — Violet rift, link / nav active       │
│  ████ #a78bfa   rift-400    — Soft violet, focus ring              │
│  ████ #f59e0b   gold-500    — Ancient gold, warning / legendary    │
│  ████ #fbbf24   gold-400    — Bright gold, highlight / epic tier   │
│  ████ #ef4444   blood-500   — Blood red, error / danger            │
│  ████ #10b981   eldritch-500 — Eldritch green, success / rare      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### Semantic Color Map

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#0a0a0f` | Page background |
| `--foreground` | `#ece2fb` | Primary text on dark |
| `--card` | `#0f0e17` | Card surface |
| `--card-foreground` | `#dbc4f7` | Card text |
| `--popover` | `#161425` | Dropdown / popover surface |
| `--popover-foreground` | `#c9a5f0` | Popover text |
| `--primary` | `#b68ee6` | Primary buttons, links, active state |
| `--primary-foreground` | `#0a0a0f` | Text on primary (high contrast) |
| `--secondary` | `#282340` | Secondary buttons, tags |
| `--secondary-foreground` | `#b68ee6` | Text on secondary |
| `--muted` | `#1e1a30` | Muted backgrounds, skeleton |
| `--muted-foreground` | `#7c4dba` | Muted text, placeholder |
| `--accent` | `#3d2a5c` | Accent background, hover |
| `--accent-foreground` | `#c9a5f0` | Text on accent |
| `--destructive` | `#ef4444` | Error, delete, danger |
| `--destructive-foreground` | `#fce4ec` | Text on destructive |
| `--border` | `#2d1b4e` | Default border |
| `--input` | `#1e1a30` | Input background |
| `--ring` | `#a78bfa` | Focus ring |

### Typography — Runic Script

```css
/* Font Stack */
--font-heading: 'Cinzel Decorative', 'Cinzel', serif;
--font-body: 'Inter', 'Segoe UI', system-ui, sans-serif;
--font-mono: 'Fira Code', 'JetBrains Mono', monospace;
--font-rune: 'MedievalSharp', 'UnifrakturMaguntia', cursive;
```

| Element | Font | Size | Weight | Color | Tracking |
|---------|------|------|--------|-------|----------|
| H1 — Page Title | Cinzel Decorative | 2.25rem (36px) | 700 | `#b68ee6` | 0.05em |
| H2 — Section Title | Cinzel | 1.875rem (30px) | 600 | `#c9a5f0` | 0.03em |
| H3 — Card Title | Cinzel | 1.5rem (24px) | 600 | `#dbc4f7` | 0.02em |
| H4 — Subsection | Cinzel | 1.25rem (20px) | 500 | `#dbc4f7` | 0.01em |
| Body | Inter | 1rem (16px) | 400 | `#ece2fb` | normal |
| Body Small | Inter | 0.875rem (14px) | 400 | `#c9a5f0` | normal |
| Caption / Label | Inter | 0.75rem (12px) | 500 | `#7c4dba` | 0.05em |
| Code / Mono | Fira Code | 0.875rem (14px) | 400 | `#e040fb` | normal |
| Rune / Decorative | MedievalSharp | varies | 400 | `#b68ee6` | 0.1em |

### Spacing & Layout — Sacred Geometry

```
4px   ── xs   — Tight padding, icon gap
8px   ── sm   — Inner component padding
12px  ── md   — Standard gap
16px  ── lg   — Card padding, section gap
24px  ── xl   — Section padding
32px  ── 2xl  — Page margin
48px  ── 3xl  — Major section divider
64px  ── 4xl  — Hero spacing
```

**Grid System:**
- Desktop: 12-column grid, `max-width: 1280px`
- Tablet: 8-column grid, `max-width: 768px`
- Mobile: 4-column grid, full width
- Gutter: `24px` (desktop), `16px` (tablet), `12px` (mobile)

### Border & Radius — Ethereal Edges

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | `2px` | Badge, tag |
| `--radius-sm` | `4px` | Input, small button |
| `--radius-md` | `8px` | Card, dialog |
| `--radius-lg` | `12px` | Modal, sheet |
| `--radius-xl` | `16px` | Hero card |
| `--radius-full` | `9999px` | Avatar, pill button |

**Border Styles:**
```css
/* Default border */
border: 1px solid var(--border);          /* #2d1b4e */

/* Hover border — subtle glow */
border: 1px solid var(--arcane-700);      /* #5b3a8c */

/* Active / Focus border — bright glow */
border: 1px solid var(--primary);          /* #b68ee6 */

/* Legendary / Rare border — animated */
border: 1px solid var(--gold-500);         /* #f59e0b */
```

### Shadows — Umbral Depth

```css
/* Layered shadow system — mimics magical depth */

--shadow-xs:   0 1px 2px rgba(45, 27, 78, 0.3);
--shadow-sm:   0 2px 4px rgba(45, 27, 78, 0.4),
               0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md:   0 4px 8px rgba(45, 27, 78, 0.4),
               0 2px 4px rgba(0, 0, 0, 0.3);
--shadow-lg:   0 8px 16px rgba(45, 27, 78, 0.5),
               0 4px 8px rgba(0, 0, 0, 0.3);
--shadow-xl:   0 12px 24px rgba(45, 27, 78, 0.5),
               0 6px 12px rgba(0, 0, 0, 0.4);
--shadow-glow: 0 0 15px rgba(182, 142, 230, 0.15),
               0 0 30px rgba(182, 142, 230, 0.08);
--shadow-arcane: 0 0 20px rgba(182, 142, 230, 0.25),
                 0 0 40px rgba(124, 61, 186, 0.15),
                 0 4px 8px rgba(0, 0, 0, 0.4);
--shadow-rift: 0 0 25px rgba(124, 58, 237, 0.3),
               0 0 50px rgba(124, 58, 237, 0.15),
               0 4px 12px rgba(0, 0, 0, 0.5);
```

### Effects — Arcane Auras

#### Glow Pulse Animation
```css
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 15px rgba(182, 142, 230, 0.15); }
  50%      { box-shadow: 0 0 25px rgba(182, 142, 230, 0.3); }
}

.animate-glow-pulse {
  animation: glow-pulse 3s ease-in-out infinite;
}
```

#### Rune Shimmer Animation
```css
@keyframes rune-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.animate-rune-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(182, 142, 230, 0.1) 25%,
    rgba(182, 142, 230, 0.3) 50%,
    rgba(182, 142, 230, 0.1) 75%,
    transparent 100%
  );
  background-size: 200% auto;
  animation: rune-shimmer 3s linear infinite;
}
```

#### Fade Through Abyss
```css
@keyframes fade-from-abyss {
  0%   { opacity: 0; transform: translateY(8px); filter: blur(4px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}

.animate-fade-from-abyss {
  animation: fade-from-abyss 0.4s ease-out;
}
```

#### Void Float
```css
@keyframes void-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

.animate-void-float {
  animation: void-float 4s ease-in-out infinite;
}
```

#### Rift Border Animation
```css
@keyframes rift-border {
  0%   { border-color: #7c3aed; box-shadow: 0 0 10px rgba(124, 58, 237, 0.2); }
  33%  { border-color: #b68ee6; box-shadow: 0 0 20px rgba(182, 142, 230, 0.3); }
  66%  { border-color: #e040fb; box-shadow: 0 0 15px rgba(224, 64, 251, 0.25); }
  100% { border-color: #7c3aed; box-shadow: 0 0 10px rgba(124, 58, 237, 0.2); }
}

.animate-rift-border {
  animation: rift-border 4s ease-in-out infinite;
}
```

---

## III. Component Grimoire — Dark Fantasy UI Patterns

### Button Variants

```tsx
// Variant definitions using cva (class-variance-authority)

const buttonVariants = cva(
  // Base — shared styles
  "inline-flex items-center justify-center font-cinzel tracking-wide transition-all duration-200",
  {
    variants: {
      variant: {
        // ═══ PRIMARY — Arcane Action ═══
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-arcane-600 hover:shadow-glow",
          "active:bg-arcane-700 active:scale-[0.97]",
          "focus-visible:ring-ring focus-visible:ring-2",
        ].join(" "),

        // ═══ SECONDARY — Subtle Ritual ═══
        secondary: [
          "bg-secondary text-secondary-foreground border border-border",
          "hover:bg-arcane-900/50 hover:border-arcane-700",
          "active:bg-arcane-800 active:scale-[0.97]",
        ].join(" "),

        // ═══ GHOST — Ethereal Touch ═══
        ghost: [
          "text-muted-foreground",
          "hover:text-foreground hover:bg-accent",
          "active:bg-arcane-900/30",
        ].join(" "),

        // ═══ DESTRUCTIVE — Blood Curse ═══
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-red-600 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]",
          "active:bg-red-700 active:scale-[0.97]",
        ].join(" "),

        // ═══ LEGENDARY — Gold Enchantment ═══
        legendary: [
          "bg-gradient-to-r from-gold-500/20 to-gold-400/10",
          "text-gold-400 border border-gold-500/40",
          "hover:from-gold-500/30 hover:to-gold-400/20",
          "hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]",
          "animate-rift-border",
        ].join(" "),

        // ═══ ARCANE — Deep Magic ═══
        arcane: [
          "bg-gradient-to-r from-arcane-800 to-arcane-700",
          "text-arcane-100 border border-arcane-600/50",
          "hover:from-arcane-700 hover:to-arcane-600",
          "hover:shadow-arcane animate-glow-pulse",
        ].join(" "),
      },
      size: {
        sm:     "h-8 px-3 text-xs rounded-sm",
        md:     "h-10 px-4 text-sm rounded-md",
        lg:     "h-12 px-6 text-base rounded-lg",
        xl:     "h-14 px-8 text-lg rounded-xl",
        icon:   "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
```

### Input — Enchanted Fields

```tsx
const inputVariants = cva(
  "flex w-full bg-input border border-border text-foreground",
  "placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  "focus-visible:border-primary focus-visible:shadow-glow",
  "transition-all duration-200",
  "disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      inputSize: {
        sm: "h-8 px-3 text-sm rounded-sm",
        md: "h-10 px-4 text-sm rounded-md",
        lg: "h-12 px-4 text-base rounded-lg",
      },
      inputVariant: {
        default:  "",
        arcane:   "border-arcane-700 focus-visible:border-arcane-500 focus-visible:shadow-arcane",
        rift:     "border-rift-500/30 animate-rift-border",
        legendary: "border-gold-500/30 focus-visible:border-gold-500 focus-visible:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
      },
    },
  }
);
```

### Card — Tome Pages

```tsx
const cardVariants = cva(
  "bg-card text-card-foreground border border-border",
  "transition-all duration-300",
  {
    variants: {
      cardVariant: {
        default:   "shadow-md hover:shadow-lg hover:border-arcane-700",
        elevated:  "shadow-lg hover:shadow-arcane",
        arcane:    "border-arcane-700/50 shadow-glow animate-glow-pulse",
        legendary: "border-gold-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
        ghost:     "border-transparent hover:border-border hover:bg-void-800/50",
      },
      cardRadius: {
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
      },
    },
  }
);
```

### Badge — Rarity Tier

```tsx
const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 text-xs font-medium tracking-wide rounded-sm",
  {
    variants: {
      rarity: {
        common:    "bg-void-700 text-arcane-300 border border-arcane-900/50",
        uncommon:  "bg-eldritch-500/15 text-eldritch-500 border border-eldritch-500/30",
        rare:      "bg-rift-500/15 text-rift-400 border border-rift-500/30",
        epic:      "bg-arcane-500/15 text-arcane-400 border border-arcane-500/30",
        legendary: "bg-gold-500/15 text-gold-400 border border-gold-500/30 animate-rune-shimmer",
        mythic:    "bg-enchant-500/15 text-enchant-400 border border-enchant-500/30 animate-rift-border",
      },
    },
  }
);
```

---

## IV. Tailwind Configuration — Dark Fantasy Theme

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ─── Color System ───
      colors: {
        void: {
          950: "#0a0a0f",
          900: "#0f0e17",
          800: "#161425",
          700: "#1e1a30",
          600: "#282340",
        },
        arcane: {
          950: "#2d1b4e",
          900: "#3d2a5c",
          800: "#5b3a8c",
          700: "#7c4dba",
          600: "#9b6dd7",
          500: "#b68ee6",
          400: "#c9a5f0",
          300: "#dbc4f7",
          200: "#ece2fb",
          100: "#f5f0fe",
        },
        enchant: {
          500: "#e040fb",
          400: "#ea80fc",
        },
        rift: {
          500: "#7c3aed",
          400: "#a78bfa",
        },
        gold: {
          500: "#f59e0b",
          400: "#fbbf24",
        },
        blood: {
          500: "#ef4444",
        },
        eldritch: {
          500: "#10b981",
        },
      },

      // ─── Typography ───
      fontFamily: {
        heading: ['"Cinzel Decorative"', '"Cinzel"', "serif"],
        body: ['"Inter"', '"Segoe UI"', "system-ui", "sans-serif"],
        mono: ['"Fira Code"', '"JetBrains Mono"', "monospace"],
        rune: ['"MedievalSharp"', '"UnifrakturMaguntia"', "cursive"],
      },

      // ─── Shadows ───
      boxShadow: {
        glow:    "0 0 15px rgba(182, 142, 230, 0.15), 0 0 30px rgba(182, 142, 230, 0.08)",
        arcane:  "0 0 20px rgba(182, 142, 230, 0.25), 0 0 40px rgba(124, 61, 186, 0.15), 0 4px 8px rgba(0, 0, 0, 0.4)",
        rift:    "0 0 25px rgba(124, 58, 237, 0.3), 0 0 50px rgba(124, 58, 237, 0.15), 0 4px 12px rgba(0, 0, 0, 0.5)",
      },

      // ─── Animations ───
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(182, 142, 230, 0.15)" },
          "50%":      { boxShadow: "0 0 25px rgba(182, 142, 230, 0.3)" },
        },
        "rune-shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-from-abyss": {
          "0%":   { opacity: "0", transform: "translateY(8px)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        "void-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        "rift-border": {
          "0%":   { borderColor: "#7c3aed", boxShadow: "0 0 10px rgba(124, 58, 237, 0.2)" },
          "33%":  { borderColor: "#b68ee6", boxShadow: "0 0 20px rgba(182, 142, 230, 0.3)" },
          "66%":  { borderColor: "#e040fb", boxShadow: "0 0 15px rgba(224, 64, 251, 0.25)" },
          "100%": { borderColor: "#7c3aed", boxShadow: "0 0 10px rgba(124, 58, 237, 0.2)" },
        },
      },
      animation: {
        "glow-pulse":     "glow-pulse 3s ease-in-out infinite",
        "rune-shimmer":   "rune-shimmer 3s linear infinite",
        "fade-from-abyss":"fade-from-abyss 0.4s ease-out",
        "void-float":     "void-float 4s ease-in-out infinite",
        "rift-border":    "rift-border 4s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
```

---

## V. CSS Variables — Root Configuration

```css
/* globals.css — Dark Fantasy Purple Theme */

@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&family=MedievalSharp&display=swap');

@layer base {
  :root {
    /* ─── shadcn/ui Semantic Tokens ─── */
    --background:         240 20% 3.5%;     /* #0a0a0f */
    --foreground:         265 30% 91%;      /* #ece2fb */
    --card:               245 22% 7%;       /* #0f0e17 */
    --card-foreground:    265 25% 88%;      /* #dbc4f7 */
    --popover:            250 25% 10%;      /* #161425 */
    --popover-foreground: 265 28% 82%;      /* #c9a5f0 */
    --primary:            265 45% 73%;      /* #b68ee6 */
    --primary-foreground: 240 20% 3.5%;     /* #0a0a0f */
    --secondary:          250 22% 18%;      /* #282340 */
    --secondary-foreground: 265 45% 73%;    /* #b68ee6 */
    --muted:              250 22% 14%;      /* #1e1a30 */
    --muted-foreground:   265 38% 48%;      /* #7c4dba */
    --accent:             265 35% 24%;      /* #3d2a5c */
    --accent-foreground:  265 28% 82%;      /* #c9a5f0 */
    --destructive:        0 84% 60%;        /* #ef4444 */
    --destructive-foreground: 0 0% 94%;     /* #fce4ec */
    --border:             265 30% 22%;      /* #2d1b4e */
    --input:              250 22% 14%;      /* #1e1a30 */
    --ring:               256 60% 73%;      /* #a78bfa */
    --radius:             0.5rem;

    /* ─── Extended Design Tokens ─── */
    --sidebar-background:  245 22% 7%;
    --sidebar-foreground:  265 25% 88%;
    --sidebar-border:      265 30% 22%;
    --sidebar-accent:      265 35% 24%;
    --chart-1:            265 45% 73%;
    --chart-2:            265 60% 62%;
    --chart-3:            45 93% 47%;
    --chart-4:            160 84% 39%;
    --chart-5:            292 64% 42%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-body antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading tracking-wide;
  }

  /* Custom scrollbar — Abyss style */
  ::-webkit-scrollbar {
    @apply w-2;
  }
  ::-webkit-scrollbar-track {
    @apply bg-void-950;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-arcane-800 rounded-full;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-arcane-700;
  }

  /* Selection — Arcane highlight */
  ::selection {
    @apply bg-arcane-500/30 text-arcane-100;
  }
}
```

---

## VI. Advanced Skills — Arcane Techniques

### State Management

| Approach | Use Case | Libraries |
|----------|----------|-----------|
| Local State | Component-scoped, simple UI state | `useState`, `useReducer` |
| Shared State | Cross-component, moderate complexity | React Context + `useContext` |
| Server State | API data, caching, real-time sync | TanStack Query v5 |
| Form State | Complex forms, validation | React Hook Form + Zod |
| URL State | Filters, pagination, shareable state | `nuqs` / `useSearchParams` |
| Global Client State | Complex client-side state machine | Zustand (lightweight) |
| Real-time State | WebSocket, live collaboration | Socket.IO / Liveblocks |

### Performance Optimization

| Technique | Description |
|-----------|-------------|
| Code Splitting | `React.lazy()` + `Suspense` — load page/halaman saat dibutuhkan saja |
| Image Optimization | `<img>` dengan `loading="lazy"`, WebP format, `srcset` untuk responsive |
| Virtualization | `@tanstack/react-virtual` — render hanya item yang visible (long list, chat log) |
| Memoization | `React.memo`, `useMemo`, `useCallback` — cegah re-render komponen berat |
| Bundle Analysis | `rollup-plugin-visualizer` — identifikasi chunk yang terlalu besar |
| Prefetching | `<Link prefetch>` atau `router.prefetch()` — preload route sebelum user klik |
| Skeleton Loading | Shimmer placeholder bertema dark fantasy saat data loading |

### Accessibility (a11y) — Inclusive Arcana

| Standard | Implementation |
|----------|---------------|
| Keyboard Navigation | Semua interactive element bisa diakses via Tab / Enter / Escape |
| Screen Reader | `aria-label`, `aria-describedby`, `role` attribute yang tepat |
| Color Contrast | Minimum WCAG AA (4.5:1) — semua text pada background gelap |
| Focus Management | Visible focus ring (`ring-2 ring-ring`), logical tab order |
| Reduced Motion | `prefers-reduced-motion` — disable animasi untuk user yang minta |
| Semantic HTML | `<nav>`, `<main>`, `<article>`, `<aside>` — struktur yang bermakna |

### Animation & Micro-interactions

| Pattern | Implementation | Timing |
|---------|---------------|--------|
| Page Transition | `framer-motion` AnimatePresence — fade + slide dari abyss | 300ms ease-out |
| Card Hover | `scale(1.02)` + shadow upgrade + border glow | 200ms ease |
| Button Press | `scale(0.97)` — tactile feedback | 100ms ease |
| List Item Appear | Staggered `fade-from-abyss` — item muncul berurutan | 50ms stagger |
| Toast Notification | Slide-in dari kanan + glow pulse | 300ms spring |
| Modal Open | Backdrop blur + content scale from 0.95 | 200ms ease-out |
| Skeleton Loading | `rune-shimmer` — gradient bergerak horizontal | 2s linear infinite |
| Dropdown Reveal | Scale dari 0.95 + opacity fade-in | 150ms ease-out |
| Tab Switch | Cross-fade content | 200ms ease |
| Drag & Drop | Ghost element + drop zone glow | Real-time |

### Testing — Quality Enchantment

| Layer | Tool | Coverage |
|-------|------|----------|
| Unit Tests | Vitest | Logic, hooks, utils — fast isolated testing |
| Component Tests | Testing Library + Vitest | Render, interact, assert UI behavior |
| E2E Tests | Playwright | Full user flow — login, CRUD, navigation |
| Visual Regression | Playwright screenshots | Detect unintended UI changes |
| Type Checking | `tsc --noEmit` | Compile-time safety gate |
| Linting | ESLint + typescript-eslint | Code quality & consistency |
| Format | Prettier | Consistent code style |

---

## VII. Project Structure — Dark Fantasy Architecture

```
src/
├── app/                      # Route pages (file-based routing)
│   ├── layout.tsx            # Root layout — theme provider, fonts, metadata
│   ├── page.tsx              # Home — gateway page
│   └── [route]/
│       ├── layout.tsx        # Route layout
│       └── page.tsx          # Route page
│
├── components/
│   ├── ui/                   # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   ├── layout/               # Layout components
│   │   ├── sidebar.tsx       # Navigation sidebar
│   │   ├── header.tsx        # Top bar / header
│   │   └── footer.tsx        # Page footer
│   ├── feedback/             # Status & feedback components
│   │   ├── skeleton.tsx      # Loading skeleton (rune-shimmer)
│   │   ├── toast.tsx         # Notification toast
│   │   └── alert.tsx         # Alert / banner
│   └── shared/               # Custom shared components
│       ├── arcane-card.tsx   # Themed card with glow variants
│       ├── rarity-badge.tsx  # Badge with rarity tier styling
│       └── page-transition.tsx # Framer Motion page wrapper
│
├── hooks/                    # Custom React hooks
│   ├── use-theme.ts          # Dark/light theme toggle
│   ├── use-media-query.ts    # Responsive breakpoint detection
│   ├── use-debounce.ts       # Debounced value hook
│   └── use-local-storage.ts  # Persistent state hook
│
├── lib/                      # Utilities & configurations
│   ├── utils.ts              # `cn()` helper, formatters
│   ├── constants.ts          # App-wide constants
│   └── validators.ts         # Zod schemas
│
├── types/                    # TypeScript type definitions
│   ├── index.ts              # Shared types
│   └── api.ts                # API response types
│
├── styles/
│   └── globals.css           # Tailwind directives + CSS variables
│
└── assets/                   # Static assets
    ├── images/
    ├── icons/
    └── fonts/
```

---

## VIII. Ritual Setup — Quick Start Commands

```bash
# 1. Create project with Vite
npm create vite@latest my-dark-fantasy -- --template react-ts

# 2. Install Tailwind CSS
npm install -D tailwindcss @tailwindcss/vite
npx tailwindcss init -p

# 3. Install shadcn/ui
npx shadcn@latest init
# Choose: TypeScript, Tailwind CSS, src/, CSS variables

# 4. Add essential components
npx shadcn@latest add button input card dialog badge
npx shadcn@latest add dropdown-menu sheet tabs tooltip
npx shadcn@latest add form table skeleton separator

# 5. Install animation library
npm install framer-motion

# 6. Install form & validation
npm install react-hook-form @hookform/resolvers zod

# 7. Install state management
npm install @tanstack/react-query

# 8. Install routing (if needed)
npm install react-router-dom

# 9. Install fonts (or use Google Fonts CDN)
# Cinzel Decorative, Cinzel, Inter, Fira Code, MedievalSharp

# 10. Run dev server
npm run dev
```

---

## IX. Dark Fantasy Design Principles

### 1. Depth Through Darkness
Setiap layer harus punya kedalaman visual. Gunakan shadow system yang layered — bukan shadow datar. Background paling gelap (`void-950`), surface sedikit terang (`void-900`), elevated surface lebih terang lagi (`void-800`). Ini menciptakan ilusi kedalaman yang membuat UI terasa punya dimensi, bukan flat dan membosankan.

### 2. Purple as Arcane Language
Purple bukan sekadar warna — itu bahasa visual. Gunakan gradasi purple untuk komunikasi hirarki: `arcane-500` untuk primary action, `arcane-700` untuk secondary, `arcane-900` untuk subtle border. Jangan campur warna secara random; setiap shade purple punya peran.

### 3. Glow is Reward, Not Noise
Efek glow dan shimmer hanya untuk elemen yang penting dan interaktif. Jangan glow semua — itu menghilangkan nilai. Glow = perhatian. Gunakan dengan bijak: primary button, active state, legendary items, dan focus ring.

### 4. Typography as Hierarchy
Font heading (Cinzel) untuk judul dan label penting — ini "suara" formal dari interface. Font body (Inter) untuk konten yang dibaca — harus nyaman dan jelas. Font mono (Fira Code) untuk code dan data teknis. Font rune (MedievalSharp) hanya untuk dekorasi dan flavor text.

### 5. Animation Tells a Story
Setiap animasi harus punya narasi: `fade-from-abyss` = sesuatu muncul dari kegelapan, `glow-pulse` = kekuatan yang berdenyut, `rift-border` = portal yang berubah-ubah. Animasi tanpa makna = noise. Animasi dengan cerita = magic.

### 6. Contrast is King
Di dark theme, kontras adalah segalanya. Text harus cukup terang di atas background gelap. WCAG AA minimum (4.5:1 ratio). Jangan pakai `arcane-700` text di atas `void-900` — terlalu gelap. Gunakan `arcane-300` atau lebih terang untuk text yang bisa dibaca.

### 7. Borders Define Boundaries
Border yang tipis dan subtle (`arcane-900`) memisahkan area tanpa mengganggu. Border yang lebih terang (`arcane-700`) menandakan interaktif. Border yang beranimasi (`rift-border`) menandakan sesuatu yang istimewa. Setiap level border punya makna.

---

*Forged in the abyss, rendered in purple, delivered through React.*
