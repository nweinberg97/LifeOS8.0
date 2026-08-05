===================================================================                SEDI JS SYSTEM LEDGER (LOGIC ENGINE)              
===================================================================
[Status]: Indexing JavaScript Architecture Complete
[Active File]: app.js
[Active Module]: JS-ZONE-13: Bootstrapper Entry Point

Mapped JS Zones:

1. [ZONE: JS-ZONE-1 - Application State Store & Schema Definitions]
   - File Source: app.js
   - Key State Properties / Schemas:
     • `state.cards` (Array of card entity objects)
     • `state.boardlyTabs` {Array<String>}
     • `state.boardlyActiveTab` {String}
     • `state.timelyMode` {String}
     • `state.timelySubTab` {String}
     • `state.brainlyLinks` {Array<String>}
     • `state.brainlyFolders` {Array<Object>}
     • `state.brainlyActiveFolder` {String|null}
     • `state.voiceActive` {Boolean}
   - Interconnections:
     • **HTML-ZONE Mapping:** Single source of truth for dynamic components across `HTML-ZONE-3` view modules (#view-home, #view-board, #view-categories, #view-timely, #view-brainly), `HTML-ZONE-2` (#universalBoard), and `HTML-ZONE-7` (#assistantOverlay).
     • **CSS-ZONE Mapping:** Data properties map to visual styling containers in `CSS-ZONE-9`, `CSS-ZONE-10B`, `CSS-ZONE-10C`, `CSS-ZONE-10D`, `CSS-ZONE-10E`, `CSS-ZONE-12`, and `CSS-ZONE-13`.
     • **JS-ZONE Dependencies:** Read/written by `JS-ZONE-3` (State Preservation Layer), `JS-ZONE-4` (Lifecycle Controller), `JS-ZONE-6` (Card Factory), read/mutated in `JS-ZONE-7` through `JS-ZONE-11`, and serialized for client export in `JS-ZONE-12`.
   - Annotated Notes: Centralized reactive state store establishing default seed cards, navigation states, category structures, knowledge folders, and system flags.

2. [ZONE: JS-ZONE-2 - Audio Engine Core (Haptic Sound Synthesis)]
   - File Source: app.js
   - Key Functions & Synthesizers:
     • `crunchAudioContext` (Web Audio API Context)
     • `playCrunchSound()` {Function}
   - Interconnections:
     • **HTML-ZONE Mapping:** Triggered on item drops targeting `HTML-ZONE-5` (#globalTrashBin).
     • **CSS-ZONE Mapping:** Audio feedback complements visual drop state animations defined in `CSS-ZONE-11` (`.global-trash-bin.hovered`).
     • **JS-ZONE Dependencies:** Invoked directly by `JS-ZONE-9` (`setupGlobalDragAndDrop`) during card deletion events.
   - Annotated Notes: Lightweight, zero-dependency procedural audio engine producing haptic-like sound feedback on destructive UI operations.

3. [ZONE: JS-ZONE-3 - State Preservation Layer]
   - File Source: app.js
   - Key Functions & Storage Handlers:
     • `saveState()` {Function}: Serializes `state` into JSON under key `'lifeos_state'` and triggers `lifecycle.renderAll()`.
     • `loadState()` {Function}: Deserializes `'lifeos_state'` from `localStorage` into `state` with fallback handling.
   - Interconnections:
     • **HTML-ZONE Mapping:** Indirectly drives DOM re-rendering across all dynamic views (`HTML-ZONE-3`).
     • **JS-ZONE Dependencies:** Operates on `JS-ZONE-1` (`state`) and calls `lifecycle.renderAll()` in `JS-ZONE-7`. Interacts directly with `JS-ZONE-12` (`clearStorage`).
   - Annotated Notes: LocalStorage persistence wrappers responsible for local-first state hydration, state serialization, and automatic view re-rendering triggers.

4. [ZONE: JS-ZONE-4 - Lifecycle Controller Framework (Bindings & Initialization)]
   - File Source: app.js
   - Key Object Methods & Event Bindings:
     • `lifecycle.init()` {Method}: Sequence runner executing state loading, binding events, clock initialization, drag-and-drop setup, rendering, and initial view routing.
     • `lifecycle.bindEvents()` {Method}: Global event listener aggregator across HTML-ZONE-1 through HTML-ZONE-7.
   - Interconnections:
     • **HTML-ZONE Mapping:** Binds event triggers spanning `HTML-ZONE-1` through `HTML-ZONE-7`.
     • **JS-ZONE Dependencies:** Consumes `JS-ZONE-3` routines, calls `JS-ZONE-9`, delegates event triggers to `JS-ZONE-10`, `JS-ZONE-11`, and `JS-ZONE-12`. Directly invoked at entry point by `JS-ZONE-13`.
   - Annotated Notes: Central application initialization orchestrator and event listener binding hub.

5. [ZONE: JS-ZONE-5 - View Router, Clock & Live Weather Engine]
   - File Source: app.js
   - Key Lifecycle Methods & Algorithms:
     • `initClock()` {Method}: Polling timer for time, date, and weather refresh loop.
     • `fetchLocalWeather()` {Async Method}: Multi-tiered geolocation/weather fetching with localStorage caching.
     • `routeView(viewId)` {Method}: SPA view router managing active states and body classes.
   - Interconnections:
     • **HTML-ZONE Mapping:** Targets #clock, #date, and #weather nodes in `HTML-ZONE-3A` and top-level `.view` containers.
     • **CSS-ZONE Mapping:** Manipulates active visibility on views and body background state rules.
     • **JS-ZONE Dependencies:** Triggered by `lifecycle.init()` and navigation listeners in `JS-ZONE-4`.
   - Annotated Notes: Real-time clock/calendar engine, resilient weather provider with multi-tiered fallback & local caching, and single-page application (SPA) view router.

6. [ZONE: JS-ZONE-6 - Card Factory & Entity Schema Constructors]
   - File Source: app.js
   - Key Lifecycle Methods & Generators:
     • `promptCreateCard()` {Method}: Modal prompt card instantiation.
     • `createInlineCard()` {Method}: Zero-friction top-of-array card insertion with double-click edit trigger.
     • `getDefaultContainerForTool()` {Method}: Target container resolver for specific app tools.
   - Interconnections:
     • **HTML-ZONE Mapping:** Instantiates card objects rendered into dropzones across `HTML-ZONE-2` and `HTML-ZONE-3`.
     • **CSS-ZONE Mapping:** Generates cards styled by `CSS-ZONE-9`.
     • **JS-ZONE Dependencies:** Mutates `JS-ZONE-1` and invokes `saveState()` (`JS-ZONE-3`) and `renderAll()` (`JS-ZONE-7`).
   - Annotated Notes: Entity instantiation pipeline providing both modal-based card creation, zero-friction inline card generation, and fallback schema templates.

7. [ZONE: JS-ZONE-7 - Render Pipeline Orchestrator & DOM Card Builder]
   - File Source: app.js
   - Key Methods & Rendering Handlers:
     • `renderAll()` {Method}: Master execution loop driving view-specific sub-renderers.
     • `createCardDOM(card)` {Method}: Programmatic card DOM node factory featuring inline editing, badge generation, gear modal bindings, and drag event listeners.
   - Interconnections:
     • **HTML-ZONE Mapping:** Generates `.lifeos-card` DOM nodes appended across dynamic view dropzones in `HTML-ZONE-2` and `HTML-ZONE-3`.
     • **CSS-ZONE Mapping:** Constructs elements governed by card styling rules in `CSS-ZONE-9`.
     • **JS-ZONE Dependencies:** Invoked during state changes; dispatches render tasks to sub-renderers grouped under `JS-ZONE-8`.
   - Annotated Notes: Master render execution loop and dynamic card DOM factory featuring inline contentEditable title editing, status badge indicators, and native drag-and-drop state bindings.

8. [ZONE: JS-ZONE-8 - Module Render Engines]
   - File Source: app.js
   - Module Scope & Architecture:
     • Container block header housing individual view render engines (`JS-ZONE-8A` through `JS-ZONE-8F`).
   - Interconnections:
     • **HTML-ZONE Mapping:** Operates directly on view containers in `HTML-ZONE-3` and persistent dropzones in `HTML-ZONE-2`.
     • **CSS-ZONE Mapping:** Renders structural layouts governed by view-specific CSS modules (`CSS-ZONE-10A` through `CSS-ZONE-10E`).
     • **JS-ZONE Dependencies:** Invoked sequentially by `renderAll()` in `JS-ZONE-7`; consumes card entities from `JS-ZONE-1` and uses `createCardDOM()` from `JS-ZONE-7` to populate dropzones.
   - Annotated Notes: Domain-specific render engine wrapper responsible for populating individual view canvases, tabs, and specialized tool dropzones.

9. [ZONE: JS-ZONE-8A - Universal Board Drawer Engine]
   - File Source: app.js
   - Key Methods & Rendering Handlers:
     • `renderUniversalBoard()` {Method}: Filters `state.cards` for `container === 'universal-board'` and populates `#ubDropzone`.
   - Interconnections:
     • **HTML-ZONE Mapping:** Targets `#ubDropzone` in `HTML-ZONE-2`.
     • **CSS-ZONE Mapping:** Governed by `CSS-ZONE-8`.
     • **JS-ZONE Dependencies:** Called in `renderAll()` (`JS-ZONE-7`); consumes state (`JS-ZONE-1`) and uses `createCardDOM()` (`JS-ZONE-7`).
   - Annotated Notes: Staging area renderer for the persistent floating drawer.

10. [ZONE: JS-ZONE-8B - Home View Engine]
    - File Source: app.js
    - Key Methods & Rendering Handlers:
      • `renderHome()` {Method}: Populates `#homeNextUp` (active top 4) and `#homeRecentActivity` (most recently updated top 4).
    - Interconnections:
      • **HTML-ZONE Mapping:** Targets `#homeNextUp` and `#homeRecentActivity` in `HTML-ZONE-3A`.
      • **CSS-ZONE Mapping:** Governed by `CSS-ZONE-10A`.
      • **JS-ZONE Dependencies:** Executed by `renderAll()` (`JS-ZONE-7`); reads `state.cards` from `JS-ZONE-1` and uses `createCardDOM()` (`JS-ZONE-7`).
    - Annotated Notes: Dashboard home engine populating real-time curated feeds.

11. [ZONE: JS-ZONE-8C - Taskly Kanban Engine (60FPS RAF-Optimized)]
    - File Source: app.js
    - Key Methods & Performance Algorithms:
      • `renderTaskly()` {Method}: 5-column Kanban renderer with 60FPS RAF dragover throttling and vertical DOM re-indexing.
      • `getDragAfterElement(container, y)` {Helper Method}: Calculates insertion point relative to cursor Y-position.
    - Interconnections:
      • **HTML-ZONE Mapping:** Targets data-container attributes in `HTML-ZONE-3B`.
      • **CSS-ZONE Mapping:** Governed by `CSS-ZONE-10B`.
      • **JS-ZONE Dependencies:** Called in `renderAll()` (`JS-ZONE-7`); interacts with `JS-ZONE-1`, `JS-ZONE-3`, and `JS-ZONE-7`.
    - Annotated Notes: High-performance Kanban engine with smooth vertical drag re-ordering.

12. [ZONE: JS-ZONE-8D - Boardly Tabbed Workspace Engine]
    - File Source: app.js
    - Key Methods & Rendering Handlers:
      • `renderBoardly()` {Method}: Dynamically renders workspace tabs and populates tab-filtered card grid.
    - Interconnections:
      • **HTML-ZONE Mapping:** Targets `#boardlyTabsBar` and `#boardlyGrid` in `HTML-ZONE-3C`.
      • **CSS-ZONE Mapping:** Governed by `CSS-ZONE-10C`.
      • **JS-ZONE Dependencies:** Called in `renderAll()` (`JS-ZONE-7`); interacts with `JS-ZONE-1`, `JS-ZONE-3`, and `JS-ZONE-7`.
    - Annotated Notes: Dynamic category tab navigation bar renderer and card grid engine.

13. [ZONE: JS-ZONE-8E - Timely Scheduling & Planning Engine]
    - File Source: app.js
    - Key Methods & State Controllers:
      • `renderTimely()` {Method}: Renders scheduling/planning view dropzones with dynamic container key bindings and matrix headers.
      • `setTimelyMode(mode)` {Method}: Toggles active mode state, panel visibility, and default sub-tabs.
    - Interconnections:
      • **HTML-ZONE Mapping:** Targets `#timelySchedZone`, `#timelyPlanZone`, `#timelySchedulingContent`, and `#timelyPlanningContent` in `HTML-ZONE-3D`.
      • **CSS-ZONE Mapping:** Governed by `CSS-ZONE-10D`.
      • **JS-ZONE Dependencies:** Executed in `renderAll()` (`JS-ZONE-7`); interacts with `JS-ZONE-1` and `JS-ZONE-3`.
    - Annotated Notes: Dual-mode matrix engine for scheduling/planning view switching.

14. [ZONE: JS-ZONE-8F - Brainly Knowledge Base Engine]
    - File Source: app.js
    - Key Methods & Search/Filter Routines:
      • `renderBrainly()` {Method}: Handles Quick Links sidebar rendering, folder filter sidebar rendering, and note grid rendering.
      • `deleteLink(idx)` {Method}: Splices link from `state.brainlyLinks` and saves state.
      • `filterBrainly(query)` {Method}: Performs real-time client-side DOM filtering on note titles and descriptions.
    - Interconnections:
      • **HTML-ZONE Mapping:** Interacts with `#linksList`, `#foldersList`, and `#brainlyMainZone` in `HTML-ZONE-3E` (#view-brainly).
      • **CSS-ZONE Mapping:** Governed by `CSS-ZONE-10E`.
      • **JS-ZONE Dependencies:** Executed within `renderAll()` (`JS-ZONE-7`); reads and mutates state in `JS-ZONE-1`, uses `createCardDOM()` from `JS-ZONE-7`, and calls `saveState()` (`JS-ZONE-3`).
    - Annotated Notes: Knowledge management engine handling quick link indexing, dynamic folder tree filtering, tag-based card rendering, inline link deletion, and instant DOM search filtering.

15. [ZONE: JS-ZONE-9 - Drag & Drop Delegation Engine]
    - File Source: app.js
    - Key Methods & Delegation Listeners:
      • `setupGlobalDragAndDrop()` {Method}: Intercepts dragover, handles trash bin hover states, and processes drop actions across dropzones and global trash bin.
    - Interconnections:
      • **HTML-ZONE Mapping:** Targets `.dropzone` elements across `HTML-ZONE-2` and `HTML-ZONE-3`, and `#globalTrashBin` in `HTML-ZONE-5`.
      • **CSS-ZONE Mapping:** Toggles active hover state classes on `.global-trash-bin.hovered` in `CSS-ZONE-11`.
      • **JS-ZONE Dependencies:** Invoked by `JS-ZONE-4`; mutates `JS-ZONE-1`; triggers sound in `JS-ZONE-2`; executes `saveState()` in `JS-ZONE-3`.
    - Annotated Notes: Document-wide event delegation engine driving HTML5 native drag-and-drop operations, dynamic route container string adaptation, entity relocation metadata updates, and audio-visual trash destruction triggers.

16. [ZONE: JS-ZONE-10 - Modal Card Editor Controller]
    - File Source: app.js
    - Key Methods & Modal Controller Routines:
      • `openCardModal(cardId)` {Method}: Populates input fields and date badge, opens modal `#cardModal`.
      • `saveModalCard()` {Method}: Updates card details, injects Brainly folder tags, calls `saveState()`, and refreshes views.
    - Interconnections:
      • **HTML-ZONE Mapping:** Directly binds and manipulates modal UI inputs defined in `HTML-ZONE-4`.
      • **CSS-ZONE Mapping:** Governed by `#cardModal.open` in `CSS-ZONE-12`.
      • **JS-ZONE Dependencies:** Reads/updates `state.cards` (`JS-ZONE-1`); called by `JS-ZONE-7`; calls `JS-ZONE-3` and `JS-ZONE-7`.
    - Annotated Notes: Modal dialog lifecycle controller responsible for detail view population, date formatting, description field updates, contextual folder tag injection, state persistence, and full application re-rendering.

17. [ZONE: JS-ZONE-11 - Intelligence Engine / Voice Assistant Module]
    - File Source: app.js
    - Key Methods & Natural Language Parser Routines:
      • `toggleVoiceStream()` {Method}: Toggles `state.voiceActive`, updates voice button UI, simulates audio codec transfer, and auto-scrolls log output.
      • `processAssistantInput()` {Method}: Parses text commands (`create task ...`, `clear`), pushes new card objects to `state.cards`, and auto-scrolls terminal output node.
    - Interconnections:
      • **HTML-ZONE Mapping:** Targets `#assistantVoiceBtn`, `#assistantOutput`, and `#assistantInput` in `HTML-ZONE-7`.
      • **CSS-ZONE Mapping:** Governed by overlay styling and terminal output rules in `CSS-ZONE-13`.
      • **JS-ZONE Dependencies:** Mutates `state.voiceActive` and `state.cards` in `JS-ZONE-1`; invoked by event listeners bound in `JS-ZONE-4`.
    - Annotated Notes: Command parsing intelligence engine and voice streaming simulation interface capable of natural language command pattern matching, automated Taskly card generation, and real-time terminal output scrolling.

18. [ZONE: JS-ZONE-12 - Data Management & Storage Utilities]
    - File Source: app.js
    - Key Utility Methods & Storage Handlers:
      • `exportData()` {Method}: Serializes `state` to JSON URI, constructs temporary `<a>` element, triggers browser download, and removes link element.
      • `clearStorage()` {Method}: Triggers warning prompt, removes `'lifeos_state'` from `localStorage`, and executes `window.location.reload()`.
    - Interconnections:
      • **HTML-ZONE Mapping:** Triggered via controls (`#exportDataBtn`, `#clearStorageBtn`) in `HTML-ZONE-6` (#settingsDrawer).
      • **CSS-ZONE Mapping:** Styled by rules in `CSS-ZONE-14`.
      • **JS-ZONE Dependencies:** Reads `JS-ZONE-1`; resets `JS-ZONE-3`; forces app re-init via `JS-ZONE-4`.
    - Annotated Notes: System administration and storage utility engine providing client-side JSON database backup generation and destructive localStorage database resets.

19. [ZONE: JS-ZONE-13 - Bootstrapper Entry Point]
    - File Source: app.js
    - Key Event Listeners & Bootstrapping Logic:
      • `document.addEventListener('DOMContentLoaded', ...)` {EventListener}:
        - Listens for complete parsing of the initial HTML document DOM tree (without waiting for stylesheets or images to finish loading).
        - Direct callback handler invokes `lifecycle.init()` defined in `JS-ZONE-4`.
    - Interconnections:
      • **HTML-ZONE Mapping:** Ensures all target DOM nodes across `HTML-ZONE-1` through `HTML-ZONE-7` are hydrated and ready before attachment.
      • **JS-ZONE Dependencies:** Directly triggers the main application entry point routine `lifecycle.init()` in `JS-ZONE-4`, initiating state hydration (`JS-ZONE-3`), event binding (`JS-ZONE-4`), clock execution (`JS-ZONE-5`), drag-and-drop setup (`JS-ZONE-9`), and full UI rendering (`JS-ZONE-7`).
    - Annotated Notes: Main application entry point trigger executing the primary lifecycle initialization routine upon complete DOM tree hydration.
===================================================================
