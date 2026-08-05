===================================================================
                   SEDI SYSTEM SHARED LEDGER                      
===================================================================
[Status]: Indexing Architecture Complete (HTML Scope)
[Active Module]: Item Card Detail Modal & Application Bootstrapper

Mapped Zones:

1. [ZONE: HTML Header & Asset Loader]
   - File Source: index.html (<head> + <body> opening)
   - Key Dependencies: styles.css, Google Fonts (Inter)
   - Interconnections: Base HTML page wrapper.
   - Annotated Notes: Sets UTF-8 encoding, responsive viewport, page title ("LifeOS"), CSS stylesheet link, and font preconnects.

2. [ZONE: HTML-ZONE-1 - Top Navigation Header & Dropdown Menu]
   - File Source: index.html (<header class="navbar">)
   - Key Bindings / IDs: #hamburgerBtn, #dropdownMenu, #btnSync, #btnDownload, #btnClear
   - Interconnections: Requires JS event listeners for menu toggles and data export/clear utilities.
   - Annotated Notes: Houses SVG brand logo ("LifeOS"), hamburger trigger, and utility action menu.

3. [ZONE: HTML-ZONE-2 - Floating Universal Staging Board Trigger & Drawer]
   - File Source: index.html (<button class="universal-btn"> & <div class="universal-board">)
   - Key Bindings / IDs: #universalBtn, #universalBoard, #closeUbBtn, #ubDropzone
   - Interconnections: Relies on `lifecycle.promptCreateCard('universal-board')`.
   - Annotated Notes: Global quick-capture inbox/staging area.

4. [ZONE: HTML-ZONE-3 - Main View Shell Container]
   - File Source: index.html (<main class="app-container" id="appContainer">)
   - Key Bindings / IDs: #appContainer
   - Interconnections: Encloses all tool view panels (3A through 3E).
   - Annotated Notes: Primary `<main>` view wrapper.

5. [ZONE: HTML-ZONE-3A - Home Module View]
   - File Source: index.html (<section class="view active" id="view-home">)
   - Key Bindings / IDs: #view-home, #clock, #date, #weather, #homeNextUp, #homeRecentActivity
   - Interconnections: JS tick script updating widgets; state renderers populating summary cards.
   - Annotated Notes: Primary landing dashboard view.

6. [ZONE: HTML-ZONE-3B - Taskly Kanban Module View]
   - File Source: index.html (<section class="view" id="view-taskly">)
   - Key Bindings / IDs: #view-taskly, dropzones: taskly-todo, taskly-inprogress, taskly-review, taskly-completed, taskly-backlog
   - Interconnections: Invokes `lifecycle.createInlineCard('taskly', containerId)`.
   - Annotated Notes: Taskly inline card creation pattern (Problem 5 benchmark).

7. [ZONE: HTML-ZONE-3C - Boardly Category Canvas Module View]
   - File Source: index.html (<section class="view" id="view-boardly">)
   - Key Bindings / IDs: #view-boardly, #addBoardlyTabBtn, #boardlyTabsBar, #boardlyGrid
   - Interconnections: Invokes `lifecycle.promptCreateCard('boardly', null, type)`.
   - Annotated Notes: Categorized tab workspace with typed card triggers (Goal, Task, Note).

8. [ZONE: HTML-ZONE-3D - Timely Scheduling & Planning Module View]
   - File Source: index.html (<section class="view" id="view-timely">)
   - Key Bindings / IDs: #view-timely, #timelyModeSched, #timelyModePlan, #timelySchedulingContent, #timelyPlanningContent, #timelySchedZone, #timelyPlanZone
   - Interconnections: Invokes `lifecycle.promptCreateCard('timely-sched')`.
   - Annotated Notes: Dual-mode time-management module (Scheduling vs. Planning) with sub-tab navigation and dedicated dropzones.

9. [ZONE: HTML-ZONE-3E - Brainly Knowledge Base Module View]
   - File Source: index.html (<section class="view" id="view-brainly"> & closing </main>)
   - Key Bindings / IDs: #view-brainly, #brainlySearch, #brainlyNewNoteBtn, #brainlyNewFolderBtn, #myLinksBox, #linkInput, #linksList, #foldersList, #brainlyMainZone
   - Interconnections: Requires JS listeners for search filtering, link ingestion, and folder creation. Closes `#appContainer`.
   - Annotated Notes: Knowledge base hub combining external link management, folder trees, and note card grid rendering.

10. [ZONE: HTML-ZONE-4 - Collapsible Side Navigator]
    - File Source: index.html (<nav class="side-navigator" id="sideNavigator">)
    - Key Bindings / IDs: #sideNavigator, #navToggleTrigger, pill buttons with `data-target`
    - Interconnections: JS view-router listens to `.pill-btn` `data-target` attributes to toggle section visibility.
    - Annotated Notes: Core view-switching pill bar anchored on the side.

11. [ZONE: HTML-ZONE-5 - Global Drag-and-Drop Trash Bin]
    - File Source: index.html (<div class="global-trash-bin" id="globalTrashBin">)
    - Key Bindings / IDs: #globalTrashBin
    - Interconnections: JS drag-and-drop event listeners bound to handle card deletion across all modules.
    - Annotated Notes: Universal drag-target component for destroying/deleting cards globally.

12. [ZONE: HTML-ZONE-6 - LifeOS Intelligence Engine / Voice Assistant]
    - File Source: index.html (<div class="lifeos-assistant" id="lifeosAssistant">)
    - Key Bindings / IDs: #lifeosAssistant, #assistantTrigger, #assistantPanel, #assistantOutput, #assistantInput, #assistantVoiceBtn, #assistantSubmit
    - Interconnections: JS listeners for AI interactions, Web Speech API, and output log rendering.
    - Annotated Notes: Floating AI utility dock with atom vector branding, output logs, text execution input, and voice stream triggers.

13. [ZONE: HTML-ZONE-7 - Item Card Detail Modal & Script Entry]
    - File Source: index.html (<div class="modal-overlay" id="cardModal"> to </html>)
    - Key Bindings / IDs:
      • #cardModal (Global detail modal overlay container)
      • #modalCardTitle (Text input for editing item title)
      • #modalCardDesc (Textarea input for editing item description/markdown)
      • #modalCardId (Hidden field carrying the targeted card state ID)
      • #modalCardDate (Date badge indicator)
      • #modalCloseBtn (Modal cancel/close trigger)
      • #modalSaveBtn (Modal save modifications trigger)
      • <script src="app.js"></script> (Primary JS bundle entry point)
    - Interconnections:
      • JS card lifecycle handlers populate `#modalCardId`, `#modalCardTitle`, `#modalCardDesc`, and `#modalCardDate` upon double-click or edit action on any card.
      • Event listeners on `#modalSaveBtn` commit mutated data to state and trigger re-renders.
      • Event listeners on `#modalCloseBtn` or overlay click toggle active visibility class on `#cardModal`.
      • Loads `app.js` prior to closing `</body>`.
    - Annotated Notes: Universal detail modal overlay for inspecting and mutating card properties across all modules; concludes HTML document structure.
===================================================================
