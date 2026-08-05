===================================================================                SEDI CSS SYSTEM LEDGER (STYLE ENGINE)              
===================================================================
[Status]: Indexing CSS Architecture
[Active Module]: System Utilities

Mapped CSS Zones:

1. [ZONE: CSS-ZONE-1 - Core Styling Reset & System CSS Variables]
   - File Source: styles.css
   - Key Selectors / Tokens:
     • Universal Reset: `*` (box-sizing, margins, reset padding, Inter font stack, antialiased rendering)
     • Design Tokens (`:root`):
       - Colors: `--bg-dark` (#111111), `--bg-white` (#ffffff)
       - Borders: `--border-light` (rgba 8%), `--border-hover` (rgba 15%)
       - Elevation: `--shadow-subtle` (0 4px 12px 3%), `--shadow-medium` (0 8px 24px 6%)
       - Radii: `--radius-card` (12px), `--radius-pill` (30px)
       - Motion: `--transition-smooth` (0.25s cubic-bezier)
   - Interconnections: Base visual primitive layer. Inherited by all layout shells, cards, modals, navigation, and floating assistant elements.
   - Annotated Notes: Establishes global box-model, typography, color palette tokens, shadows, and smooth motion curves for the LifeOS interface.

2. [ZONE: CSS-ZONE-2 - Body & Dynamic Home Background Configurations]
   - File Source: styles.css
   - Key Selectors / Tokens:
     • Viewport Shell: `body` (background `--bg-white`, text `--bg-dark`, min 100vh height, horizontal overflow hidden)
     • View-State Class Override: `body.home-active` (fixed 3-stop sky gradient: `#59b2ec` -> `#aadefa` -> `#eaf6fc`)
   - Interconnections:
     • Governs top-level background rendering across all router views.
     • Relies on JS view-switching logic adding/removing `.home-active` on `<body>` when swapping to `HTML-ZONE-3A` (#view-home).
   - Annotated Notes: Handles full-screen body styling and dynamic background theme shifts specifically for the landing Home module.

3. [ZONE: CSS-ZONE-3 - Navigation Header & Dropdown Menu Styling]
   - File Source: styles.css
   - Key Selectors / Tokens:
     • Navbar Shell: `.navbar` (fixed top header, height 64px, z-index 100, flex layout with space-between alignment, 1px bottom border using `--border-light`, rgba 80% white background with 12px backdrop blur filter)
     • Home View State Override: `body.home-active .navbar` (transparent background and border when Home dashboard is active)
     • Brand Left Container: `.nav-left` (flex alignment with 12px gap for logo and title)
   - Interconnections:
     • Directly styles `HTML-ZONE-1` (<header class="navbar">).
     • Interacts with `body.home-active` state from `CSS-ZONE-2` to remove header background blur when on the Home screen.
   - Annotated Notes: Implements fixed glassmorphic top navigation bar with dynamic visual overrides during active Home view states.

4. [ZONE: CSS-ZONE-4 - Dynamic Atom Logo Animations & Menu Dropdown Component Rules]
   - File Source: styles.css
   - Key Selectors / Tokens:
     • Brand Typography: `.brand-name` (font-weight 500, size 16px, -0.5px letter spacing)
     • Atom Animation Engine: `.atom-logo` (flex centering, 24s infinite linear `@keyframes rotateAtom` from 0deg to 360deg rotation)
     • Dropdown Container: `.nav-right` (relative positioning anchor)
     • Hamburger Trigger: `.hamburger-btn`, `.hamburger-btn span` (flex column layout with 4px gap, 18px x 1.5px bars using `--bg-dark`, smooth transitions)
     • Dropdown Panel: `.dropdown-menu` (absolute position at top 40px right 0, `--bg-white` background, `--shadow-medium` elevation, hidden by default, z-index 110)
     • Dropdown States & Actions: `.dropdown-menu.open` (flex toggle display), `.dropdown-menu button` (13px left-aligned menu items with hover background overlay), `.dropdown-menu button.danger` (#ff3b30 text for clear/destructive actions)
   - Interconnections:
     • Styles brand assets and interactive utility triggers in `HTML-ZONE-1` (#hamburgerBtn, #dropdownMenu, #btnSync, #btnDownload, #btnClear).
     • Shared branding style `.atom-logo` also targets vector logos used in `HTML-ZONE-6` (LifeOS Intelligence Engine).
   - Annotated Notes: Manages continuous CSS keyframe rotations for brand assets alongside absolute positioning, hover effects, and toggle visibility for the main navigation dropdown.

5. [ZONE: CSS-ZONE-5 - Universal Staging Board Floating Trigger & Drawer]
   - File Source: styles.css
   - Key Selectors / Tokens:
     • Floating Action Button: `.universal-btn` (fixed position top 80px right 32px, 44x44px circular `--bg-dark` pill, z-index 90, scale hover transition)
     • Staging Drawer Panel: `.universal-board` (fixed top 135px right 32px, 320px width, 450px max-height card with `--shadow-medium` elevation, z-index 95, flex column layout, hidden by default)
     • Staging Drawer Display State: `.universal-board.open` (flex display toggle)
     • Drawer Header Layout: `.ub-header`, `.ub-header-left` (16px padded flex row, bottom border, 14px/600 font header, close button)
     • Dropzone Container: `.ub-dropzone` (scrollable flex grow container, min-height 150px, subtle background tint `rgba(17,17,17,0.01)`)
   - Interconnections:
     • Directly styles floating staging board components in `HTML-ZONE-2` (#universalBtn, #universalBoard, #ubDropzone).
     • Sits at z-index 90-95 directly below fixed navbar (`.navbar` z-index 100).
   - Annotated Notes: Provides fixed positioning, hover micro-interactions, layout constraints, and scrollable dropzone containers for the persistent universal staging board overlay.

6. [ZONE: CSS-ZONE-6 - Side Navigator & Floating Pill Controls]
   - File Source: styles.css
   - Key Selectors / Tokens:
     • Floating Rail Wrapper: `.side-navigator` (fixed right 0, top 50% with `translateY(-50%)` vertical centering, z-index 80, flex row container)
     • Drawer Toggle Button: `.nav-toggle-trigger` (dark tab pinned to left edge of pill drawer, 8px top/bottom left border radii)
     • Vector Pointer Indicator: `.triangle-pointer` (6px CSS triangle pointing left; rotates 180deg via `.side-navigator.open .triangle-pointer`)
     • Collapsible Pill Panel: `.nav-pills-wrapper` (`--bg-white` card with `--shadow-medium` elevation, left rounded corners, `translateX(100%)` hidden drawer state; slides in via `.side-navigator.open`)
     • Navigation Pill Actions: `.pill-btn` (30px `--radius-pill`, 13px font, flex layout with icon gap; active and hover states transition smoothly to `--bg-dark` background and `--bg-white` text)
   - Interconnections:
     • Directly styles view-switching drawer components in `HTML-ZONE-4` (#sideNavigator, #sideNavToggle, `.pill-btn` links).
     • Controls visual active indicators when toggling view contexts (`#view-home`, `#view-board`, etc.) in `HTML-ZONE-3`.
   - Annotated Notes: Manages off-screen translation physics, arrow rotation keyframes, and pill selector state overrides for the slide-out view navigation rail.

7. [ZONE: CSS-ZONE-7 - Main App Container & View Switch Animations]
   - File Source: styles.css
   - Key Selectors / Tokens:
     • Main Viewport Shell: `.app-container` (margin-top 64px to offset fixed navbar, padding 40px top/bottom/left and 120px right to clear floating side nav, min-height `calc(100vh - 64px)`)
     • View Display Toggles: `.view` (display none), `.view.active` (display block, triggers `@keyframes fadeIn`)
     • Entrance Keyframes: `@keyframes fadeIn` (0.3s ease transition from opacity 0 / `translateY(4px)` to opacity 1 / `translateY(0)`)
     • View Title Layout: `.view-header` (flex space-between row, 32px bottom margin), `.view-header h2` (28px font, 600 weight, -0.5px letter spacing), `.header-title-wrapper` (flex alignment with 12px gap)
   - Interconnections:
     • Directly styles `<main class="app-container">` and view modules in `HTML-ZONE-3` (`.view#view-home`, `.view#view-board`, etc.).
     • Works with JS router logic toggling `.active` on views to execute smooth entrance animations.
   - Annotated Notes: Handles global layout bounds, right-side clearance padding for side controls, view toggling states, slide/fade-in keyframes, and standardized view headers.

8. [ZONE: CSS-ZONE-8 - Global Buttons & Action Frameworks]
   - File Source: styles.css
   - Key Selectors / Tokens:
     • Primary Action Button: `.btn-action` (`--bg-dark` background, `--bg-white` text, 6px border-radius, 13px/500 font, 8px 16px padding, opacity 0.9 hover effect)
     • Secondary Action Variant: `.btn-action.secondary` (transparent background, `--bg-dark` text, 1px border using `--border-light`, subtle `rgba(17,17,17,0.02)` hover tint)
     • Inline Creation Circle Trigger: `.btn-create-circle` (22x22px circular `--bg-dark` pill button, centered `+` glyph, scale 1.08 and `#333333` background hover shift)
   - Interconnections:
     • Provides global interactive button primitives used across header actions (`HTML-ZONE-3`), view headers, column quick-adds, and modal submission forms.
     • Direct companion to `.header-title-wrapper` and Kanban/Board header triggers.
   - Annotated Notes: Establishes standardized button visual hierarchies (primary solid, secondary outline, and compact circular add triggers) across the Sedi ecosystem.

9. [ZONE: CSS-ZONE-9 - Universal Card Architecture & Drag States]
   - File Source: styles.css
   - Key Selectors / Tokens:
     • Universal Card Container: `.lifeos-card` (flex column layout, `--bg-white` background, 1px `--border-light`, `--radius-card`, `--shadow-subtle` elevation, min-height 84px, cursor grab, `user-select: none`, `flex-shrink: 0`)
     • Interactive & Drag States: `.lifeos-card:hover` (`--border-hover` and `--shadow-medium`), `.lifeos-card:active` (`cursor: grabbing`), `.lifeos-card.dragging` (opacity 0.35, scale 0.98, `transition: none !important` to eliminate drag-along latency)
     • Card Header & Inline Editing: `.card-title` (14px/500 font, truncated single line), `.card-title .title-text` (frameless inline focus with `rgba(0,0,0,0.04)` background tint on `contenteditable="true"`), `.is-empty-placeholder` (#aaaaaa italicized placeholder text)
     • Card Descriptions: `.card-desc-preview` (12px #666666 single-line truncated preview), `.card-desc` (12px #666666 `white-space: pre-wrap` body text)
     • Card Metadata & Footer: `.card-footer` (flex space-between row), `.card-updated-badge` (10px relative time badge with inline SVG clock), `.card-meta` (10px #999999 meta line)
   - Interconnections:
     • Forms the foundational card primitive used dynamically inside Kanban dropzones (`CSS-ZONE-5`, `#ubDropzone`, and board views in `HTML-ZONE-3`).
     • Interfaces directly with HTML Drag and Drop API event handlers, adjusting layout properties and disablement during drag sessions.
   - Annotated Notes: Encapsulates card structure, drag-and-drop feedback states, frameless inline text editing overrides, description previews, and timestamp badge aesthetics.

10. [ZONE: CSS-ZONE-10 - Module Views Styling]
    - File Source: styles.css
    - Key Selectors / Tokens:
      • Header Section Marker: `CSS-ZONE-10: MODULE VIEWS STYLING`
    - Interconnections:
      • Serves as the overarching structural entry header for specific application view module rules.
    - Annotated Notes: Marks the beginning of view-specific CSS layout definitions following global card and container rules.

11. [ZONE: CSS-ZONE-10A - Home View Dashboard]
    - File Source: styles.css
    - Key Selectors / Tokens:
      • Hero Container: `.hero-section` (centered flex column, 60px top padding)
      • Glassmorphic Clock Badge: `.clock-display` (80px light 300 weight typography, -2px letter-spacing, `rgba(255,255,255,0.2)` backdrop blur pill card with `--radius-card` corners)
      • Date & Weather Headers: `.date-display` (16px/500 font), `.weather-display` (14px font, smooth opacity transitions)
      • Dashboard Grid Layout: `.dashboard-grid` (CSS Grid 2-column layout, `repeat(2, minmax(280px, 420px))`, 32px gap, centered alignment)
      • Column Headers & Dropzones: `.dash-col h3` (16px/600 font), `.dash-card-list` (200px minimum height for card drops)
    - Interconnections:
      • Directly styles `HTML-ZONE-3A` (#view-home, #homeClock, #homeDate, #homeWeather, #dashColToday, #dashColFocus).
      • Complements sky gradient background from `CSS-ZONE-2` (`body.home-active`).
      • Hosts universal card primitives from `CSS-ZONE-9` inside `.dash-card-list` containers.
    - Annotated Notes: Configures the hero header, frosted glass clock surface, live metadata text, and 2-column layout grid for the primary Home dashboard view.

12. [ZONE: CSS-ZONE-10B - Taskly Kanban Module]
    - File Source: styles.css
    - Key Selectors / Tokens:
      • Kanban Board Shell: `.kanban-board` (5-column CSS Grid layout `repeat(5, 1fr)`, 16px gap, top aligned flex items)
      • Column Container: `.kanban-col` (`rgba(17,17,17,0.02)` background tint, `--radius-card` border radius, 12px padding, flex column layout, `max-height: 70vh`, overflow hidden)
      • Column Header Stack: `.col-header-wrapper` (flex column, left-aligned items, 8px gap, bottom border), `.col-title` (13px/600 font, color `#555555`)
      • Circular Add Button: `.add-task-circle-btn` (24x24px dark `#111111` circle trigger, white centered plus glyph, hover scale 1.08, active scale 0.95)
      • Column Scroll Dropzone: `.col-body` (flex grow container, vertical scroll `overflow-y: auto`, horizontal overflow hidden, `min-height: 150px`, 8px gap)
      • Settings Trigger: `.card-settings-btn` (transparent borderless button with hover background tint and `#111111` active state, 14x14px SVG gear icon)
    - Interconnections:
      • Directly styles `HTML-ZONE-3B` (#view-board and its Kanban column structures).
      • Acts as the primary grid container for `.lifeos-card` instances (`CSS-ZONE-9`).
      • Works in tandem with global button primitives from `CSS-ZONE-8`.
    - Annotated Notes: Establishes a 5-column layout architecture with constrained column heights, dedicated dropzone scroll containers, vertical stack column headers, and compact circular task triggers for Taskly Kanban.

13. [ZONE: CSS-ZONE-10C - Boardly Category Canvas Module]
    - File Source: styles.css
    - Key Selectors / Tokens:
      • Scrollable Category Bar: `.boardly-tabs-bar` (flex row layout, 8px gap, 1px bottom border using `--border-light`, horizontal scroll `overflow-x: auto`)
      • Category Tab Trigger: `.boardly-tab` (borderless, transparent background, 13px color `#666666`, flex alignment with 8px gap for color dots, relative positioning anchor)
      • Active Tab State & Indicator: `.boardly-tab.active` (color `--bg-dark`, font-weight 600), `.boardly-tab.active::after` (absolute positioned 2px bottom underline pseudo-element spanning tab width using `--bg-dark`)
      • Color Dot Indicator: `.tab-dot` (8x8px circular pill, `border-radius: 50%`)
      • Workspace & Grid Shell: `.boardly-workspace` (flex column, 16px gap), `.boardly-grid` (responsive CSS grid using `repeat(auto-fill, minmax(240px, 1fr))`, 16px gap, min-height 300px for card drops)
    - Interconnections:
      • Directly styles `HTML-ZONE-3C` (#view-categories, #boardlyTabsBar, #boardlyGrid).
      • Renders active/inactive category states and dynamic responsive grid dropzones for `.lifeos-card` instances (`CSS-ZONE-9`).
    - Annotated Notes: Controls horizontal category tab navigation, active bottom border indicator pseudo-elements, category color dots, and a responsive auto-filling grid layout for Boardly.

14. [ZONE: CSS-ZONE-10D - Timely Scheduling & Planning Module]
    - File Source: styles.css
    - Key Selectors / Tokens:
      • Mode Toggle Container: `.toggle-switch` (flex row layout, subtle `rgba(17,17,17,0.04)` pill background tint, 2px padding, 6px border-radius)
      • Toggle Switch Option: `.toggle-btn` (borderless, transparent background, 6px 12px padding, 12px font size, 4px border-radius, pointer cursor)
      • Active Toggle State: `.toggle-btn.active` (solid `--bg-white` pill background, 600 font weight, elevated with `--shadow-subtle`)
      • Sub-Navigation Tab Bar: `.sub-tabs` (flex row layout, 16px gap, 20px top/bottom margins, 1px bottom border using `rgba(17,17,17,0.04)`, 8px bottom padding)
      • Sub-Tab Trigger & States: `.sub-tab` (borderless, transparent background, 13px font, color `#666666`), `.sub-tab.active` (color `--bg-dark`, font-weight 600)
      • Content Panel Container: `.panel-card` (subtle `rgba(17,17,17,0.01)` background tint, 1px border using `--border-light`, `--radius-card` rounded corners, 24px padding, 200px minimum height)
    - Interconnections:
      • Directly styles `HTML-ZONE-3D` (#view-timely, toggle switches, sub-navigation tabs, and panel views).
      • Complements layout and card variables from `CSS-ZONE-1` (`--bg-white`, `--shadow-subtle`, `--border-light`, `--radius-card`).
    - Annotated Notes: Configures segmented mode toggle pills, secondary tab navigation bars, and padded container panels for the Timely scheduling/planning workspace.

15. [ZONE: CSS-ZONE-10E - Brainly Knowledge Base Module]
    - File Source: styles.css
    - Key Selectors / Tokens:
      • Knowledge Base Layout: `.brainly-layout` (2-column CSS Grid layout `260px 1fr`, 24px gap, 16px top margin)
      • Sidebar Container Stack: `.brainly-sidebar` (flex column layout, 20px gap)
      • Sidebar Storage Boxes: `.my-links-box`, `.folders-box` (subtle `rgba(17,17,17,0.02)` background tint, `--radius-card` rounded corners, 16px padding)
      • Section Headers: `.my-links-box h4`, `.folders-box h4` (12px font, 600 weight, uppercase, 0.5px letter spacing, 12px bottom margin, 0.7 opacity)
      • Search Bar Input: `.brainly-top-center input` (320px width, 8px 16px padding, `--radius-pill` rounded corners, 1px border using `--border-light`, outline focus transitions to `--bg-dark` border)
      • Link Input Field: `#linkInput` (100% width, 6px 12px padding, 1px border using `--border-light`, 6px border-radius, 8px bottom margin, 12px font)
      • Bookmark List & Truncation: `.links-list` (unstyled list, 12px font), `.links-list li` (4px bottom margin, single-line truncation with `text-overflow: ellipsis`, `overflow: hidden`, `white-space: nowrap`)
      • Folder Item Selector: `.folder-item` (flex alignment with 8px gap, 13px font, 6px padding, pointer cursor, 4px border-radius, hover background tint `rgba(17,17,17,0.04)`)
    - Interconnections:
      • Directly styles `HTML-ZONE-3E` (#view-brainly, search inputs, bookmark drawers, and folder lists).
      • Integrates tokens from `CSS-ZONE-1` (`--radius-card`, `--radius-pill`, `--border-light`, `--bg-dark`).
    - Annotated Notes: Establishes a 2-column sidebar/main layout, pill search bar interactions, truncated bookmark link lists, and hoverable folder items for Brainly.

16. [ZONE: CSS-ZONE-11 - Global Trash Bin Target Zone]
    - File Source: styles.css
    - Key Selectors / Tokens:
      • Fixed Trash Container: `.global-trash-bin` (fixed bottom 32px right 32px, 54x54px circular shape, `--bg-white` background, 1px `--border-light`, `--shadow-medium` elevation, centered flex alignment, 20px font, z-index 100, smooth transition using `--transition-smooth`)
      • Hovered Drop Target State: `.global-trash-bin.hovered` (#ff3b30 red fill background and border, 1.15x scale transformation)
      • Trash Icon Animation: `.global-trash-bin.hovered .trash-icon` (15deg clockwise rotation transform on active drag hover)
    - Interconnections:
      • Directly styles `HTML-ZONE-5` (#globalTrashBin, .trash-icon).
      • Sits at z-index 100 on par with fixed top navbar (`CSS-ZONE-3`).
      • Serves as the primary HTML Drag and Drop API drop target zone for deleting card components from `CSS-ZONE-9`.
    - Annotated Notes: Configures fixed screen alignment, elevation shadows, high-visibility drop target scale/color transformations (#ff3b30 red shift), and rotational icon micro-interactions during active card deletion drag states.

17. [ZONE: CSS-ZONE-12 - LifeOS Intelligence Engine / Voice Assistant]
    - File Source: styles.css
    - Key Selectors / Tokens:
      • Centered Dock Container: `.lifeos-assistant` (fixed bottom 32px, horizontal centering via `left: 50%` & `translateX(-50%)`, z-index 100, flex column alignment)
      • Assistant Trigger Pill: `.assistant-trigger` (52x52px circular `--bg-dark` background, `--bg-white` icon color, `--shadow-medium` elevation, hover scale 1.05 transformation)
      • Intelligence Drawer Panel: `.assistant-panel` (absolute position bottom 68px, 380px fixed width, `--bg-white` fill, 1px `--border-light`, `--radius-card` corners, `--shadow-medium` elevation, hidden `display: none` default)
      • Panel Toggle State: `.assistant-panel.open` (`display: flex` column override)
      • Panel Header & Body: `.assistant-header` (14px/16px padding, 13px/600 font, -0.3px letter spacing, bottom border), `.assistant-body` (16px padding, min 100px / max 240px auto-scroll height, 13px font)
      • Dialogue Messaging: `.system-msg` (#888 color, italic style), `.user-msg` (margin-top 6px, 500 font weight)
      • Inline Footer Control Bar: `.assistant-footer` (flex row, 8px 12px padding, top border, 6px gap), `.assistant-footer input` (frameless inline text input, 13px font)
      • Icon Action Triggers: `.assistant-icon-btn` (32x32px circular action buttons, hover fill `rgba(17,17,17,0.05)`), `.assistant-icon-btn.submit-btn` (solid hover transition to `--bg-dark` fill and `--bg-white` icon color)
    - Interconnections:
      • Directly styles `HTML-ZONE-6` (#assistantTrigger, #assistantPanel, dialogue body, and input footer).
      • Sits at z-index 100 aligned with top navigation bar (`CSS-ZONE-3`) and global trash bin (`CSS-ZONE-11`).
      • Shares rotating atom asset themes from `CSS-ZONE-4` (`.atom-logo`).
    - Annotated Notes: Implements a bottom-centered floating AI assistant dock with absolute overlay drawer panels, message body scroll constraints, and inline input footer buttons.

18. [ZONE: CSS-ZONE-13 - Modal Overlay Architecture]
    - File Source: styles.css
    - Key Selectors / Tokens:
      • Backdrop Shell: `.modal-overlay` (fixed top/left/right/bottom 0, `rgba(0,0,0,0.2)` translucent dark mask, `backdrop-filter: blur(4px)`, z-index 200, centered flex alignment, hidden `display: none` default)
      • Active Display State: `.modal-overlay.open` (`display: flex` override to activate backdrop and center dialog)
      • Modal Card Container: `.modal-content` (`--bg-white` fill, 24px padding, `--radius-card` corners, 400px width, `--shadow-medium` elevation, flex column layout with 12px gap)
      • Header & Date Badge: `.modal-header-wrapper` (flex space-between row, 4px bottom margin), `.modal-header-wrapper h3` (16px/600 font, `--bg-dark` color), `.modal-date-badge` (11px #888888 font, 500 weight, 0.3px letter-spacing)
      • Form Field Inputs: `.modal-content input`, `.modal-content textarea` (100% width, 8px padding, 1px border using `--border-light`, 6px border-radius, 13px font, focus transition to `#111111` border)
      • Action Bar & Buttons: `.modal-actions` (flex right-aligned row, 8px gap, 8px top margin), `.btn-action` (solid `#111111` fill, `#ffffff` text, `--radius-card` corners, 12px/500 font, 8px 16px padding), `.btn-action.secondary` (transparent fill, `#666666` text, 1px border using `--border-light`, hover fill `rgba(17,17,17,0.04)`)
    - Interconnections:
      • Directly styles `HTML-ZONE-7` (#editModal, #modalTitleInput, #modalDescInput, #modalSaveBtn, #modalCancelBtn).
      • Sits at top-tier z-index 200, overlaying all lower UI layers including the fixed navbar (`CSS-ZONE-3`, z-index 100) and floating docks (`CSS-ZONE-11` & `CSS-ZONE-12`, z-index 100).
      • Re-uses global action button primitives from `CSS-ZONE-8` with explicit modal overrides.
    - Annotated Notes: Manages high-elevation modal backdrops, glassmorphic backdrop filters, centered dialog cards, focus border micro-interactions, and modal footer button actions for editing card details across Sedi.

19. [ZONE: CSS-ZONE-14 - System Utilities]
    - File Source: styles.css
    - Key Selectors / Tokens:
      • Force Hide Utility: `.hidden` (`display: none !important`)
    - Interconnections:
      • Global helper class used dynamically across JavaScript state controllers and HTML modules to force element visibility override.
    - Annotated Notes: Provides an authoritative CSS visibility toggle rule using high-specificity `!important` flags for dynamic UI hide/show logic.
===================================================================
