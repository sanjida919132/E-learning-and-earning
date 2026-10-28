---
name: Command Center ICT
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c4c6ce'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#8e9098'
  outline-variant: '#44474d'
  surface-tint: '#b6c7e7'
  primary: '#b6c7e7'
  on-primary: '#20314a'
  primary-container: '#0b1e36'
  on-primary-container: '#7586a3'
  inverse-primary: '#4e5f7a'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#93ccff'
  on-tertiary: '#003351'
  tertiary-container: '#002035'
  on-tertiary-container: '#1d8cd0'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b6c7e7'
  on-primary-fixed: '#091c34'
  on-primary-fixed-variant: '#364762'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Geist
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.1em
spacing:
  gutter: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system targets an advanced educational operations hub for high-intensity ICT freelancing, software engineering, and AI skills laboratories. The visual identity operates as a high-density, technical command console. It balances institutional authority with the fast-paced, high-yield atmosphere of real-world freelance workspaces.

The aesthetic blends technical brutalism and high-tech minimalism:
- Monolithic, angular surfaces with absolute precision.
- No rounded corners (`roundedness: 0`), enforcing strict computational logic.
- Deep, low-reflectance navy environments punctuated by electric emerald terminals, indicating real-time earning signals, lab occupancy, and server/hardware activity.
- Data-forward composition with sharp division lines, modular paneling, and tactile status indicators that evoke professional workstations.

## Colors

The color palette reinforces a focused command-line and operational environment.

- **Primary (`#0B1E36`)**: Anchor navy. Serves as base structures, panel backgrounds, deep container layers, and dominant authority markers.
- **Secondary (`#10B981`)**: Terminal emerald. Represents earning metrics, online infrastructure, active laboratory seats, and validated student milestones.
- **Tertiary (`#0284C7`)**: Cyan telemetry. Used for computational statuses, system-level updates, network diagnostics, and secondary interactive targets.
- **Neutral (`#94A3B8`)**: High-legibility technical slate. Used for structural grid borders, deactivated hardware nodes, metadata strings, and technical labels.

### Functional Palette
- **Canvas Base**: `#050D1A` (ultra-deep void navy).
- **Surface Level 1 (Panels & Cards)**: `#0B1E36` (core brand navy).
- **Surface Level 2 (Elevated Inputs & Cells)**: `#122846`.
- **Borders & Dividers**: `#1E3A5F` (subtle) to `#334E68` (structural).
- **Text High Contrast**: `#F8FAFC`.
- **Text De-emphasized**: `#64748B`.
- **Status Indicators**:
  - Active / Yielding: `#10B981` (Emerald)
  - Pending / Standby: `#F59E0B` (Amber)
  - Inactive / Offline: `#64748B` (Muted Slate)
  - Error / Critical: `#EF4444` (Crimson)

## Typography

The typography couples the engineered precision of `Space Grotesk` with the ultra-clean clarity of `Geist`.

- **Headlines (`Space Grotesk`)**: Provides an authoritative, technical atmosphere. Used across system overview headers, laboratory designations (e.g., `LAB-A // WORKSTATION 04`), financial aggregates, and KPI stat counters. Tracking is tight across large scales to maintain cohesion.
- **Body & Labels (`Geist`)**: Delivers dense data scannability across telemetry tables, attendance logs, and project submission queues without optical fatigue.
- **Case Rules**: All badges, micro-labels, table columns, and data descriptors use strict uppercase styling with positive letter-spacing (`0.08em` to `0.1em`). Numerical readouts and metrics should enable tabular figures (`font-variant-numeric: tabular-nums`) to ensure strict visual vertical alignment across dashboards.

## Layout & Spacing

Layouts adhere to an information-dense, 12-column fluid grid tailored for situational awareness and high-frequency portal navigation.

- **Breakpoints**:
  - `Desktop (>= 1280px)`: 12-column layout, fixed navigation rail (width: `260px`), dynamic content pane, `margin-lg` outer padding, `gutter-lg` column separations.
  - `Tablet (768px - 1279px)`: 8-column layout, compact icon rail (width: `72px`), `margin-md` margins, `gutter-md` column gaps.
  - `Mobile (< 768px)`: 4-column layout, full-bleed views with bottom utility navigation bar, `margin` canvas borders, `gutter` column gaps.

- **Grid Alignment**: Layout elements must conform to strict rectangular tiling. Surfaces snap side-by-side using shared border boundaries (collapsed single-pixel separations) rather than loose floating cards to evoke unified command software.

## Elevation & Depth

This design system avoids soft, blurred drop-shadows and skeuomorphic gradients. Visual depth is established through stacked planar surfaces and distinct structural borders:

1. **Floor / Base Layer (`#050D1A`)**: Underlying structural background canvas.
2. **Container Paneling (`#0B1E36`)**: Default modular containers, table viewports, and statistical cards. Borders are framed in `1px solid #1E3A5F`.
3. **Interactive & Active Layer (`#122846`)**: Elevated inputs, active table rows, and selected lab states. Framed in `1px solid #334E68`.
4. **Accent Keying**: Focused inputs or active lab selection swap their bounding borders from muted slate directly to high-visibility terminal emerald (`#10B981`) or cyan (`#0284C7`), reinforced by an interior inset hairline (`box-shadow: inset 0 0 0 1px #10B981`).
5. **Modals & Overlays**: Overlays sit directly on `#050D1A` at 85% opacity with an intense backdrop blur (`backdrop-filter: blur(8px)`). Modals are anchored centrally, outlined by a 1px dual-color border (`#10B981` header border edge, `#1E3A5F` peripheral frame).

## Shapes

The design system uses absolute sharp geometry (`roundedness: 0`). No corner radius is applied to any element—cards, buttons, badging, inputs, dialogs, and popovers maintain rigid 90-degree corners.

- **Corner Cuts & Technical Motifs**: For specialized elements like lab indicators and primary CTAs, use diagonal 45-degree chamfers (`clip-path: polygon(...)`) on one top corner (4px) to subtly evoke industrial machinery plates and specialized defense/command-line hardware.
- **Divider Hairlines**: Horizontal and vertical separation lines use crisp 1px rule dividers without gradient fade-outs.

## Components

### Buttons
- **Primary Action**: Solid `#10B981` background, `#050D1A` bold uppercase typography, 0px border radius, `0.75rem 1.5rem` padding. On hover, background shifts to `#059669`.
- **Secondary Action**: Background `#0B1E36`, `1px solid #334E68`, text `#F8FAFC`. On hover, border transitions to `#10B981` with text `#10B981`.
- **Danger Action**: Background transparent, `1px solid #EF4444`, text `#EF4444`. Hover fills with `#EF4444` at 15% opacity.

### Status Badges
- Displayed as high-contrast, rectangular tags (`padding: 2px 8px`). Text is `label-sm` uppercase.
- **Active**: Background `#064E3B`, border `#10B981`, text `#6EE7B7`. Prefixed by a filled square glyph (`■`).
- **Inactive / Standby**: Background `#1E293B`, border `#64748B`, text `#94A3B8`.
- **Pending / Queue**: Background `#78350F`, border `#F59E0B`, text `#FCD34D`.
- **Completed / Certified**: Background `#0C4A6E`, border `#0284C7`, text `#7DD3FC`.

### Laboratory Cards (Lab-A, Lab-B, Lab-C, AI Lab)
- Monolithic panels framed by `1px solid #1E3A5F`. 
- **Header**: Features lab callout (`Space Grotesk`, e.g., `LAB-04 // AI ACCELERATOR`), accompanied by a live node counter (e.g., `32/32 WORKSTATIONS ACTIVE`).
- **Telemetry Bar**: Segmented progress line illustrating compute and seat capacity. Filled segments render in `#10B981`, idle segments in `#1E3A5F`.
- **Footer Metadata**: Displays active mentor, running curriculum track, and real-time connectivity status.

### Metric Stats Cards
- Compact, border-enclosed rectangular modules.
- **Structure**: Metric label (`label-sm`, `#94A3B8`) on top, oversized value (`Space Grotesk`, `headline-xl`, `#F8FAFC`) in the center, and trend indicator (e.g., `+18.4% EARNINGS RUN-RATE`) with an emerald/crimson arrow indicator on the bottom.

### Student Data Tables
- Strict grid system with alternating row zebra-striping (`#0B1E36` to `#08172A`).
- **Header Row**: `#050D1A`, uppercase `label-md`, `1px solid #1E3A5F` lower border.
- **Cells**: Precise vertical borders between columns. Cell padding: `12px 16px`. Text rendered in `Geist`, tabular numerals enabled.
- **Hover State**: Entire row illuminates with a `#122846` fill and a left-aligned 2px `#10B981` border stroke.

### Input Fields & Search Filters
- Surfaces: `#050D1A`, border: `1px solid #1E3A5F`, text: `#F8FAFC`.
- Focus State: Border snaps to `#10B981`, no soft ring glow. A sharp 1px emerald accent underscores the input.
- Placeholder: `#475569`.

### Modal Dialogs
- Centered layout, max-width `640px`, backdrop `#050D1A` with 80% opacity and 8px blur.
- Outer container framed by `1px solid #334E68`. Header block distinctively separated by an emerald horizontal bar (`2px solid #10B981`).
- Action bar aligned to the right edge with square primary and secondary button pairs.