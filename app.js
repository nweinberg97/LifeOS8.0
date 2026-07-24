/**
 * LifeOS Core Architecture Operations Module
 * Engine Framework: Local-first schema bindings, universal state controllers
 */

// ==========================================================================
// JS-ZONE-1: APPLICATION STATE STORE & SCHEMA DEFINITIONS
// Purpose: Holds global state object, persistent cards array, tab configurations,
//          mode switches, and assistant voice flags.
// ==========================================================================
let state = {
    cards: [
        {
            id: 'card_sample_1',
            type: 'task',
            title: 'Refine Forth Strategy Deck',
            description: 'Align the physical coworking space metrics with digital Human Potential Infrastructure frameworks.',
            tool: 'taskly',
            container: 'taskly-todo',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'card_sample_2',
            type: 'note',
            title: 'Kitsilano QR Campaign Structure',
            description: 'Plan hyper-local content release cycles using Substack endpoints and local physical anchors.',
            tool: 'brainly',
            container: 'brainly-notes',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ],
    boardlyTabs: ["Health", "Relationships", "Work", "Chores", "Admin"],
    boardlyActiveTab: "Health",
    timelyMode: "scheduling", // scheduling | planning
    timelySubTab: "daily",    // scheduling: daily, weekly, monthly, reminders | planning: projects, goals
    brainlyLinks: ["https://github.com"],
    brainlyFolders: [
        { title: "Reflections", emoji: "💭" },
        { title: "Research Pipeline", emoji: "🔬" }
    ],
    brainlyActiveFolder: null, // Track folder selection for item filtering
    voiceActive: false
};

// ==========================================================================
// JS-ZONE-2: AUDIO ENGINE CORE (HAPTIC SOUND SYNTHESIS)
// Purpose: Web Audio API synthesis for generating procedural sound effects
//          when dropping elements into the trash bin. (Matches HTML-ZONE-5)
// ==========================================================================
const crunchAudioContext = new (window.AudioContext || window.webkitAudioContext)();
function playCrunchSound() {
    try {
        const osc = crunchAudioContext.createOscillator();
        const gain = crunchAudioContext.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, crunchAudioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(10, crunchAudioContext.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, crunchAudioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, crunchAudioContext.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(crunchAudioContext.destination);
        osc.start();
        osc.stop(crunchAudioContext.currentTime + 0.15);
    } catch (e) {
        console.log("Audio node stream blocked before user gesture interaction.");
    }
}

// ==========================================================================
// JS-ZONE-3: STATE PRESERVATION LAYER
// Purpose: LocalStorage persistence wrappers for saving/deserializing state.
// ==========================================================================
function saveState() {
    localStorage.setItem('lifeos_state', JSON.stringify(state));
    lifecycle.renderAll();
}

function loadState() {
    const data = localStorage.getItem('lifeos_state');
    if (data) {
        try {
            state = JSON.parse(data);
        } catch (e) {
            console.error("State deserialization failure, falling back to defaults", e);
        }
    }
}

// ==========================================================================
// JS-ZONE-4: LIFECYCLE CONTROLLER FRAMEWORK
// Purpose: Application initialization and global DOM event listener bindings.
//          (Binds elements across HTML-ZONE-1 through HTML-ZONE-7)
// ==========================================================================
const lifecycle = {
    init() {
        loadState();
        this.bindEvents();
        this.initClock();
        this.setupGlobalDragAndDrop();
        this.renderAll();
        
        // Restore saved active view or default to home
        const savedView = localStorage.getItem('lifeos_active_view') || "view-home";
        this.routeView(savedView);
    },

    bindEvents() {
        // Dropdown Navigation Core Controls (HTML-ZONE-1)
        document.getElementById('hamburgerBtn').addEventListener('click', () => {
            document.getElementById('dropdownMenu').classList.toggle('open');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-right')) {
                document.getElementById('dropdownMenu').classList.remove('open');
            }
        });

        document.getElementById('btnDownload').addEventListener('click', () => this.exportData());
        document.getElementById('btnClear').addEventListener('click', () => this.clearStorage());

        // Universal Board Switch Trigger (HTML-ZONE-2)
        document.getElementById('universalBtn').addEventListener('click', () => {
            document.getElementById('universalBoard').classList.toggle('open');
        });
        document.getElementById('closeUbBtn').addEventListener('click', () => {
            document.getElementById('universalBoard').classList.remove('open');
        });

        // Navigator View Control Loops (HTML-ZONE-4)
        document.getElementById('navToggleTrigger').addEventListener('click', () => {
            document.getElementById('sideNavigator').classList.toggle('open');
        });
        
        document.querySelectorAll('.pill-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetBtn = e.target.closest('.pill-btn');
                const targetView = targetBtn.getAttribute('data-target');
                this.routeView(targetView);
                document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
                targetBtn.classList.add('active');
            });
        });

        // Boardly Tab Creation Operations (HTML-ZONE-3C)
        document.getElementById('addBoardlyTabBtn').addEventListener('click', () => {
            const name = prompt("Enter new board category name (Max 10 categories):");
            if (name && name.trim() !== "" && state.boardlyTabs.length < 10) {
                state.boardlyTabs.push(name.trim());
                state.boardlyActiveTab = name.trim();
                saveState();
            }
        });

        // Timely Core Layout Mode Switches (HTML-ZONE-3D)
        document.getElementById('timelyModeSched').addEventListener('click', () => this.setTimelyMode('scheduling'));
        document.getElementById('timelyModePlan').addEventListener('click', () => this.setTimelyMode('planning'));
        
        // Timely Sub-Tabs Routing Engine
        document.querySelectorAll('#view-timely .sub-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const parent = e.target.closest('#timelySchedulingContent, #timelyPlanningContent');
                parent.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                state.timelySubTab = e.target.getAttribute('data-sub');
                saveState();
            });
        });

        // Brainly Components Controllers (HTML-ZONE-3E)
        document.getElementById('brainlyNewNoteBtn').addEventListener('click', () => this.promptCreateCard('brainly', 'brainly-notes', 'note'));
        document.getElementById('brainlyNewFolderBtn').addEventListener('click', () => {
            const name = prompt("Enter folder title descriptor:");
            if (name && name.trim() !== "") {
                state.brainlyFolders.push({ title: name.trim(), emoji: "📁" });
                saveState();
            }
        });

        document.getElementById('linkInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.value.trim() !== "") {
                let url = e.target.value.trim();
                if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
                state.brainlyLinks.push(url);
                e.target.value = "";
                saveState();
            }
        });

        document.getElementById('brainlySearch').addEventListener('input', (e) => this.filterBrainly(e.target.value));

        // Intelligence Assistant Panel Toggle (HTML-ZONE-6)
        document.getElementById('assistantTrigger').addEventListener('click', () => {
            document.getElementById('assistantPanel').classList.toggle('open');
        });

        // Assistant Executive Interfaces (Submit & Voice Controls)
        document.getElementById('assistantSubmit').addEventListener('click', () => this.processAssistantInput());
        document.getElementById('assistantInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') this.processAssistantInput(); });
        
        document.getElementById('assistantVoiceBtn').addEventListener('click', () => this.toggleVoiceStream());

        // Modal Action Windows Elements (HTML-ZONE-7)
        document.getElementById('modalCloseBtn').addEventListener('click', () => {
            document.getElementById('cardModal').classList.remove('open');
        });
        document.getElementById('modalSaveBtn').addEventListener('click', () => this.saveModalCard());
    },
    
// ==========================================================================
// JS-ZONE-5: VIEW ROUTER, CLOCK & LIVE WEATHER ENGINE
// Purpose: Handles live time, dynamic calendar date, rate-limit-proof weather,
//          and view switching.
// ==========================================================================
    initClock() {
        const updateClockAndCalendar = () => {
            const now = new Date();
            
            // 1. Live Time Display (HH:MM:SS)
            const timeNode = document.getElementById('clock');
            if (timeNode) {
                timeNode.textContent = now.toTimeString().split(' ')[0];
            }
            
            // 2. Live Calendar Display (e.g., "Wednesday, July 22, 2026")
            const dateNode = document.getElementById('date');
            if (dateNode) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                dateNode.textContent = now.toLocaleDateString('en-US', options);
            }
        };

        // Initialize clock immediately and refresh every second
        setInterval(updateClockAndCalendar, 1000);
        updateClockAndCalendar();

        // 3. Rate-Limit-Proof Weather Engine (Uses localStorage caching)
        this.fetchLocalWeather();
        // Check cache / refresh every 15 minutes
        setInterval(() => this.fetchLocalWeather(), 15 * 60 * 1000);
    },

    async fetchLocalWeather() {
        const weatherNode = document.getElementById('weather');
        if (!weatherNode) return;

        const CACHE_KEY = 'sedi_weather_cache';
        const FIFTEEN_MINUTES = 15 * 60 * 1000;

        // Step 1: Read Cache for Instant Loading (Zero API calls on refresh)
        const cachedData = localStorage.getItem(CACHE_KEY);
        let parsedCache = null;

        if (cachedData) {
            try {
                parsedCache = JSON.parse(cachedData);
                const isFresh = (Date.now() - parsedCache.timestamp) < FIFTEEN_MINUTES;

                // Always display cached value immediately
                weatherNode.textContent = parsedCache.text;

                // Stop here if cache is fresh — no network requests made!
                if (isFresh) return;
            } catch (e) {
                localStorage.removeItem(CACHE_KEY);
            }
        }

        // Step 2: Determine Coordinates (GPS -> Saved Override -> IP Lookup)
        let coords = null;

        // A. Native Device Geolocation (Vacation-aware, VPN-proof, zero rate limits)
        if (navigator.geolocation) {
            coords = await new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
                    () => resolve(null),
                    { timeout: 4000 }
                );
            });
        }

        // B. Check Backlogged Manual City Setting Override (from localStorage)
        if (!coords) {
            const savedCity = localStorage.getItem('sedi_preferred_city');
            if (savedCity) {
                try {
                    const geoRes = await fetch(
                        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(savedCity)}&count=1`
                    );
                    if (geoRes.ok) {
                        const geoData = await geoRes.json();
                        if (geoData.results && geoData.results[0]) {
                            coords = {
                                lat: geoData.results[0].latitude,
                                lon: geoData.results[0].longitude,
                                city: geoData.results[0].name
                            };
                        }
                    }
                } catch (e) {
                    console.warn("Geocoding saved city failed:", e);
                }
            }
        }

        // C. Network IP Lookup (Fallback if no GPS and no saved city)
        if (!coords) {
            try {
                const ipRes = await fetch('https://ipapi.co/json/');
                if (ipRes.ok) {
                    const ipData = await ipRes.json();
                    if (ipData.latitude && ipData.longitude) {
                        coords = { lat: ipData.latitude, lon: ipData.longitude, city: ipData.city };
                    }
                }
            } catch (e) {
                console.warn("IP lookup skipped or rate-limited");
            }
        }

        // D. Default Coordinates Fallback (Vancouver)
        if (!coords) {
            coords = { lat: 49.2827, lon: -123.1207, city: "Vancouver" };
        }

        // Step 3: Fetch Weather from Open-Meteo
        try {
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`
            );
            if (!weatherRes.ok) throw new Error("Weather fetch failed");
            const weatherData = await weatherRes.json();
            
            const temp = Math.round(weatherData.current_weather.temperature);
            const code = weatherData.current_weather.weathercode;

            let cityName = coords.city;
            if (!cityName) {
                try {
                    const reverseRes = await fetch(
                        `https://geocoding-api.open-meteo.com/v1/search?name=${coords.lat},${coords.lon}`
                    );
                    if (reverseRes.ok) {
                        const revData = await reverseRes.json();
                        if (revData.results && revData.results[0]) {
                            cityName = revData.results[0].name;
                        }
                    }
                } catch (e) {
                    cityName = "Local";
                }
            }

            const weatherMap = {
                0: { emoji: "☀️", desc: "Clear" },
                1: { emoji: "🌤️", desc: "Mostly Clear" },
                2: { emoji: "⛅", desc: "Partly Cloudy" },
                3: { emoji: "☁️", desc: "Overcast" },
                45: { emoji: "🌫️", desc: "Foggy" },
                48: { emoji: "🌫️", desc: "Rime Fog" },
                51: { emoji: "🌧️", desc: "Light Drizzle" },
                61: { emoji: "🌧️", desc: "Rain" },
                71: { emoji: "❄️", desc: "Snow" },
                80: { emoji: "🌦️", desc: "Rain Showers" },
                95: { emoji: "🌩️", desc: "Thunderstorm" }
            };

            const info = weatherMap[code] || { emoji: "🌡️", desc: "Weather" };
            const formattedText = `${info.emoji} ${temp}°C ${info.desc} (${cityName || 'Local'})`;

            // Update UI & save to LocalStorage
            weatherNode.textContent = formattedText;
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                text: formattedText
            }));

        } catch (err) {
            console.warn("Weather sync error:", err);
            if (parsedCache && parsedCache.text) {
                weatherNode.textContent = parsedCache.text;
            } else {
                weatherNode.textContent = "🌤️ Local Weather Sync Active";
            }
        }
    },

    routeView(viewId) {
        document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
        
        if (viewId === 'view-home') {
            document.body.classList.add('home-active');
        } else {
            document.body.classList.remove('home-active');
        }
    },
// ==========================================================================
// JS-ZONE-6: CARD FACTORY & ENTITY SCHEMA CONSTRUCTORS
// Purpose: Prompts user input and builds standardized card entities mapped to target tools.
// ==========================================================================
    promptCreateCard(tool, initialContainer, forceType = 'task') {
        const title = prompt(`Enter ${forceType} title text:`);
        if (!title || title.trim() === "") return;
        
        const newCard = {
            id: 'card_' + Date.now() + Math.random().toString(36).substr(2, 4),
            type: forceType,
            title: title.trim(),
            description: '',
            tool: tool,
            container: initialContainer || this.getDefaultContainerForTool(tool),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        state.cards.push(newCard);
        saveState();
    },

    getDefaultContainerForTool(tool) {
        if (tool === 'taskly') return 'taskly-todo';
        if (tool === 'boardly') return `boardly-${state.boardlyActiveTab}`;
        if (tool === 'timely') return state.timelyMode === 'scheduling' ? `timely-scheduling-${state.timelySubTab}` : `timely-planning-${state.timelySubTab}`;
        if (tool === 'brainly') return 'brainly-notes';
        return 'universal-board';
    },

// ==========================================================================
// JS-ZONE-7: RENDER PIPELINE ORCHESTRATOR & DOM CARD BUILDER
// Purpose: Master render execution loop and HTML DOM element instantiation for cards.
// ==========================================================================
    renderAll() {
        this.renderHome();
        this.renderTaskly();
        this.renderBoardly();
        this.renderTimely();
        this.renderBrainly();
        this.renderUniversalBoard();
    },

    createCardDOM(card) {
        const div = document.createElement('div');
        div.className = 'lifeos-card';
        div.setAttribute('draggable', 'true');
        div.setAttribute('data-id', card.id);
        
        let typeIcon = "📄";
        if (card.type === 'goal') typeIcon = "🎯";
        if (card.type === 'task') typeIcon = "✅";
        if (card.type === 'note') typeIcon = "📝";

        div.innerHTML = `
            <div class="card-title">${typeIcon} ${card.title}</div>
            <div class="card-desc">${card.description || 'No detailed data entries compiled.'}</div>
            <div class="card-meta">
                <span>${card.tool.toUpperCase()}</span>
                <span>${new Date(card.updatedAt).toLocaleDateString()}</span>
            </div>
        `;

        div.addEventListener('dragstart', (e) => {
            div.classList.add('dragging');
            e.dataTransfer.setData('text/plain', card.id);
            e.dataTransfer.effectAllowed = 'move';
        });

        div.addEventListener('dragend', () => {
            div.classList.remove('dragging');
        });

        div.addEventListener('dblclick', () => this.openCardModal(card.id));

        return div;
    },

// ==========================================================================
// JS-ZONE-8: MODULE RENDER ENGINES
// ==========================================================================

    // ----------------------------------------------------------------------
    // JS-ZONE-8A: UNIVERSAL BOARD DRAWER ENGINE
    // Purpose: Renders staging cards inside the floating universal drawer.
    // ----------------------------------------------------------------------
    renderUniversalBoard() {
        const zone = document.getElementById('ubDropzone');
        if (!zone) return;
        zone.innerHTML = '';
        state.cards.filter(c => c.container === 'universal-board').forEach(c => {
            zone.appendChild(this.createCardDOM(c));
        });
    },

    // ----------------------------------------------------------------------
    // JS-ZONE-8B: HOME VIEW ENGINE
    // Purpose: Populates "Next Up" tasks and recent activity feeds on the Home view.
    // ----------------------------------------------------------------------
    renderHome() {
        const nextUp = document.getElementById('homeNextUp');
        const recent = document.getElementById('homeRecentActivity');
        if (!nextUp || !recent) return;
        nextUp.innerHTML = '';
        recent.innerHTML = '';

        const activeTasks = state.cards.filter(c => c.container && !c.container.includes('completed') && c.container !== 'universal-board').slice(0, 4);
        activeTasks.forEach(c => nextUp.appendChild(this.createCardDOM(c)));

        const dynamicRecent = [...state.cards].sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 4);
        dynamicRecent.forEach(c => recent.appendChild(this.createCardDOM(c)));
    },

   // ----------------------------------------------------------------------
// JS-ZONE-8C: TASKLY KANBAN ENGINE
// Purpose: Distributes cards across 5 Taskly columns & updates metadata.
// ----------------------------------------------------------------------
renderTaskly() {
    const columns = ['backlog', 'todo', 'inprogress', 'review', 'completed'];

    columns.forEach(col => {
        const containerKey = `taskly-${col}`;
        const containerNode = document.querySelector(`[data-container="${containerKey}"]`);
        const countNode = document.getElementById(`count-${containerKey}`);

        if (containerNode) {
            // Clear current column cards
            containerNode.innerHTML = '';

            // Filter cards matching this exact column
            const columnCards = state.cards.filter(c => c.container === containerKey);

            // Update column counter badge if present
            if (countNode) {
                countNode.textContent = columnCards.length;
            }

            // Render matching card DOM nodes
            columnCards.forEach(c => {
                const cardEl = this.createCardDOM(c);
                cardEl.setAttribute('draggable', 'true');
                
                // Attach drag events to card
                cardEl.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', c.id);
                    cardEl.classList.add('dragging');
                });

                cardEl.addEventListener('dragend', () => {
                    cardEl.classList.remove('dragging');
                });

                containerNode.appendChild(cardEl);
            });

            // Bind column dropzone listeners for horizontal/vertical movement
            this.bindDropzoneEvents(containerNode, containerKey);
        }
    });
},

bindDropzoneEvents(containerNode, containerKey) {
    containerNode.addEventListener('dragover', (e) => {
        e.preventDefault();
        containerNode.classList.add('drag-hover');
    });

    containerNode.addEventListener('dragleave', () => {
        containerNode.classList.remove('drag-hover');
    });

    containerNode.addEventListener('drop', (e) => {
        e.preventDefault();
        containerNode.classList.remove('drag-hover');
        
        const cardId = e.dataTransfer.getData('text/plain');
        const card = state.cards.find(c => c.id === cardId);

        if (card && card.container !== containerKey) {
            card.container = containerKey; // Move card to new column in state
            this.syncStorage();            // Persist changes
            this.renderTaskly();           // Re-render board
        }
    });
}
    
    // ----------------------------------------------------------------------
    // JS-ZONE-8D: BOARDLY TABBED WORKSPACE ENGINE
    // Purpose: Renders dynamic category tabs and filters cards for active workspace tab.
    // ----------------------------------------------------------------------
    renderBoardly() {
        const bar = document.getElementById('boardlyTabsBar');
        if (!bar) return;
        bar.innerHTML = '';
        
        state.boardlyTabs.forEach(tab => {
            const btn = document.createElement('button');
            btn.className = `boardly-tab ${state.boardlyActiveTab === tab ? 'active' : ''}`;
            btn.innerHTML = `<span class="tab-dot" style="background:#111111"></span> ${tab}`;
            btn.addEventListener('click', () => {
                state.boardlyActiveTab = tab;
                saveState();
            });
            bar.appendChild(btn);
        });

        const grid = document.getElementById('boardlyGrid');
        if (!grid) return;
        grid.setAttribute('data-container', `boardly-${state.boardlyActiveTab}`);
        grid.innerHTML = '';
        state.cards.filter(c => c.container === `boardly-${state.boardlyActiveTab}`).forEach(c => {
            grid.appendChild(this.createCardDOM(c));
        });
    },

    // ----------------------------------------------------------------------
    // JS-ZONE-8E: TIMELY SCHEDULING & PLANNING ENGINE
    // Purpose: Controls view switching between scheduling/planning sub-tabs and renders matrix cards.
    // ----------------------------------------------------------------------
    renderTimely() {
        const isSched = state.timelyMode === 'scheduling';
        const activeContainerId = isSched ? 'timelySchedZone' : 'timelyPlanZone';
        const container = document.getElementById(activeContainerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        const targetContainerKey = `timely-${state.timelyMode}-${state.timelySubTab}`;
        container.setAttribute('data-container', targetContainerKey);

        const headingInfo = document.createElement('div');
        headingInfo.style.cssText = "font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 14px; font-weight: 600;";
        headingInfo.innerHTML = `Tool Pipeline Matrix ➔ ${state.timelyMode} / ${state.timelySubTab}`;
        container.appendChild(headingInfo);

        const filtered = state.cards.filter(c => c.container === targetContainerKey);
        if (filtered.length === 0) {
            const emptyHint = document.createElement('p');
            emptyHint.style.cssText = "font-size: 12px; color: #aaa; font-style: italic;";
            emptyHint.textContent = "No matrix parameters mapped to this window. Drag elements here to bind.";
            container.appendChild(emptyHint);
        } else {
            filtered.forEach(c => container.appendChild(this.createCardDOM(c)));
        }
    },

    setTimelyMode(mode) {
        state.timelyMode = mode;
        if (mode === 'scheduling') {
            document.getElementById('timelyModeSched').classList.add('active');
            document.getElementById('timelyModePlan').classList.remove('active');
            document.getElementById('timelySchedulingContent').classList.remove('hidden');
            document.getElementById('timelyPlanningContent').classList.add('hidden');
            state.timelySubTab = 'daily';
            
            // Sync UI internal class styling states
            document.querySelectorAll('#timelySchedulingContent .sub-tab').forEach(t => t.classList.remove('active'));
            const defaultTab = document.querySelector('#timelySchedulingContent [data-sub="daily"]');
            if (defaultTab) defaultTab.classList.add('active');
        } else {
            document.getElementById('timelyModeSched').classList.remove('remove');
            document.getElementById('timelyModeSched').classList.remove('active');
            document.getElementById('timelyModePlan').classList.add('active');
            document.getElementById('timelySchedulingContent').classList.add('hidden');
            document.getElementById('timelyPlanningContent').classList.remove('hidden');
            state.timelySubTab = 'projects';

            document.querySelectorAll('#timelyPlanningContent .sub-tab').forEach(t => t.classList.remove('active'));
            const defaultTab = document.querySelector('#timelyPlanningContent [data-sub="projects"]');
            if (defaultTab) defaultTab.classList.add('active');
        }
        saveState();
    },

    // ----------------------------------------------------------------------
    // JS-ZONE-8F: BRAINLY KNOWLEDGE BASE ENGINE
    // Purpose: Renders quick links, folder selection sidebar, note filtering, and search.
    // ----------------------------------------------------------------------
    renderBrainly() {
        const linksList = document.getElementById('linksList');
        if (linksList) {
            linksList.innerHTML = '';
            state.brainlyLinks.forEach((link, idx) => {
                const li = document.createElement('li');
                li.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 4px 0;";
                li.innerHTML = `
                    <span style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 85%;">
                        🔗 <a href="${link}" target="_blank" style="color:inherit; text-decoration:none; border-bottom: 1px dotted #888;">${link}</a>
                    </span>
                    <span class="delete-link-trigger" style="cursor:pointer; opacity: 0.5; font-size:10px;" onclick="lifecycle.deleteLink(${idx})">×</span>
                `;
                linksList.appendChild(li);
            });
        }

        const fList = document.getElementById('foldersList');
        if (fList) {
            fList.innerHTML = '';
            
            // All Notes Filter Trigger
            const allDiv = document.createElement('div');
            allDiv.className = `folder-item ${state.brainlyActiveFolder === null ? 'active' : ''}`;
            if (state.brainlyActiveFolder === null) allDiv.style.fontWeight = '600';
            allDiv.innerHTML = `<span>📂</span> <span>Show All Notes</span>`;
            allDiv.addEventListener('click', () => {
                state.brainlyActiveFolder = null;
                saveState();
            });
            fList.appendChild(allDiv);

            state.brainlyFolders.forEach(f => {
                const div = document.createElement('div');
                div.className = `folder-item ${state.brainlyActiveFolder === f.title ? 'active' : ''}`;
                if (state.brainlyActiveFolder === f.title) div.style.fontWeight = '600';
                div.innerHTML = `<span>${f.emoji}</span> <span>${f.title}</span>`;
                div.addEventListener('click', () => {
                    state.brainlyActiveFolder = f.title;
                    saveState();
                });
                fList.appendChild(div);
            });
        }

        const mainZone = document.getElementById('brainlyMainZone');
        if (mainZone) {
            mainZone.innerHTML = '';
            let brainlyCards = state.cards.filter(c => c.container === 'brainly-notes');
            
            if (state.brainlyActiveFolder !== null) {
                brainlyCards = brainlyCards.filter(c => c.description && c.description.includes(`[Folder: ${state.brainlyActiveFolder}]`));
            }

            brainlyCards.forEach(c => mainZone.appendChild(this.createCardDOM(c)));
        }
    },

    deleteLink(idx) {
        state.brainlyLinks.splice(idx, 1);
        saveState();
    },

    filterBrainly(query) {
        const lowercaseQuery = query.toLowerCase();
        document.querySelectorAll('#brainlyMainZone .lifeos-card').forEach(cardDom => {
            const id = cardDom.getAttribute('data-id');
            const card = state.cards.find(c => c.id === id);
            if (card && (card.title.toLowerCase().includes(lowercaseQuery) || card.description.toLowerCase().includes(lowercaseQuery))) {
                cardDom.style.display = 'block';
            } else {
                cardDom.style.display = 'none';
            }
        });
    },

// ==========================================================================
// JS-ZONE-9: DRAG & DROP DELEGATION ENGINE
// Purpose: Handles HTML5 drag events, dropzone target binding, card re-routing,
//          and trash deletion triggers with haptic sound playback.
// ==========================================================================
    setupGlobalDragAndDrop() {
        document.addEventListener('dragover', (e) => {
            const dropzone = e.target.closest('.dropzone');
            const trashBin = e.target.closest('#globalTrashBin');
            if (dropzone || trashBin) {
                e.preventDefault();
            }
        });

        document.addEventListener('dragenter', (e) => {
            const trashBin = e.target.closest('#globalTrashBin');
            if (trashBin) trashBin.classList.add('hovered');
        });

        document.addEventListener('dragleave', (e) => {
            const trashBin = e.target.closest('#globalTrashBin');
            if (trashBin && !e.relatedTarget?.closest('#globalTrashBin')) {
                trashBin.classList.remove('hovered');
            }
        });

        document.addEventListener('drop', (e) => {
            const dropzone = e.target.closest('.dropzone');
            const trashBin = e.target.closest('#globalTrashBin');
            const cardId = e.dataTransfer.getData('text/plain');
            
            if (!cardId) return;
            const card = state.cards.find(c => c.id === cardId);
            if (!card) return;

            if (trashBin) {
                e.preventDefault();
                trashBin.classList.remove('hovered');
                state.cards = state.cards.filter(c => c.id !== cardId);
                playCrunchSound();
                saveState();
                return;
            }

            if (dropzone) {
                e.preventDefault();
                let targetContainer = dropzone.getAttribute('data-container');
                
                // Dynamic tab route mappings conversion adaptations
                if (targetContainer === 'boardly-active-tab') targetContainer = `boardly-${state.boardlyActiveTab}`;
                if (targetContainer === 'timely-sched' || targetContainer === 'timely-plan') {
                    targetContainer = `timely-${state.timelyMode}-${state.timelySubTab}`;
                }

                card.container = targetContainer;
                // Auto track root tool contextual mappings
                card.tool = targetContainer.split('-')[0];
                card.updatedAt = new Date().toISOString();
                saveState();
            }
        });
    },

// ==========================================================================
// JS-ZONE-10: MODAL CARD EDITOR CONTROLLER
// Purpose: Handles opening modal dialogs, updating card fields, and persisting state.
// ==========================================================================
    openCardModal(cardId) {
        const card = state.cards.find(c => c.id === cardId);
        if (!card) return;
        document.getElementById('modalCardTitle').value = card.title;
        document.getElementById('modalCardDesc').value = card.description || '';
        document.getElementById('modalCardId').value = card.id;
        document.getElementById('cardModal').classList.add('open');
    },

    saveModalCard() {
        const id = document.getElementById('modalCardId').value;
        const card = state.cards.find(c => c.id === id);
        if (card) {
            card.title = document.getElementById('modalCardTitle').value.trim();
            card.description = document.getElementById('modalCardDesc').value;
            card.updatedAt = new Date().toISOString();
            
            // Auto folder categorizer mapping adapter for notes view if explicitly filtered
            if (card.tool === 'brainly' && state.brainlyActiveFolder && !card.description.includes('[Folder:')) {
                card.description += `\n\n[Folder: ${state.brainlyActiveFolder}]`;
            }
            
            saveState();
        }
        document.getElementById('cardModal').classList.remove('open');
    },

// ==========================================================================
// JS-ZONE-11: INTELLIGENCE ENGINE / VOICE ASSISTANT MODULE
// Purpose: Simulates AI text parsing, command execution (e.g. "create task ..."),
//          and voice streaming UI toggles.
// ==========================================================================
    toggleVoiceStream() {
        const btn = document.getElementById('assistantVoiceBtn');
        const body = document.getElementById('assistantOutput');
        
        state.voiceActive = !state.voiceActive;
        
        if (state.voiceActive) {
            btn.style.backgroundColor = "rgba(255, 59, 48, 0.15)";
            btn.style.color = "#ff3b30";
            body.innerHTML += `<div class="system-msg" id="voice-listening-prompt">🎙️ Voice channel pipeline listening active... Speak your system command.</div>`;
        } else {
            btn.style.backgroundColor = "";
            btn.style.color = "";
            const promptNode = document.getElementById('voice-listening-prompt');
            if (promptNode) promptNode.remove();
            
            // Auto complete simulated audio text transfer chunk payload
            document.getElementById('assistantInput').value = "Create task Sync with Vancouver builders network";
            body.innerHTML += `<div class="system-msg">Voice codec feed processed cleanly. Hit Send to route pipeline.</div>`;
        }
        body.scrollTop = body.scrollHeight;
    },

    processAssistantInput() {
        const inputNode = document.getElementById('assistantInput');
        const text = inputNode.value.trim();
        if (!text) return;

        const body = document.getElementById('assistantOutput');
        body.innerHTML += `<div class="user-msg">➔ ${text}</div>`;
        
        const lower = text.toLowerCase();
        
        // Command Routing Automation Engine Match
        if (lower.startsWith('create task ') || lower.startsWith('create card ')) {
            const extractedTitle = text.replace(/^(create task |create card )/i, '');
            const newCard = {
                id: 'card_' + Date.now(),
                type: 'task',
                title: extractedTitle || 'AI Automated Process Task',
                description: 'Generated instantly via context routing intelligence engine pipeline parsing.',
                tool: 'taskly',
                container: 'taskly-todo',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            state.cards.push(newCard);
            body.innerHTML += `<p class="system-msg">✅ Pipeline action intercepted: Created Taskly card titled "${extractedTitle}" inside To Do index stack.</p>`;
        } else if (lower === 'clear') {
            body.innerHTML = `<p class="system-msg">Terminal console display cache buffers flushed cleanly.</p>`;
        } else {
            body.innerHTML += `<p class="system-msg">Processing via Local Context Routing Vectors: Analysis complete. Strategy metrics updated perfectly inside your workspace state arrays.</p>`;
        }
        
        inputNode.value = '';
        body.scrollTop = body.scrollHeight;
    },

// ==========================================================================
// JS-ZONE-12: DATA MANAGEMENT & STORAGE UTILITIES
// Purpose: JSON state exporter and client database purge functions.
// ==========================================================================
    exportData() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `lifeos_production_state_${Date.now()}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
    },

    clearStorage() {
        if (confirm("CRITICAL OVERWRITE EXCLUSION WARNING: Are you certain you want to erase your entire physical client database? All layout parameters will restore to zero values.")) {
            localStorage.removeItem('lifeos_state');
            window.location.reload();
        }
    }
};

// ==========================================================================
// JS-ZONE-13: BOOTSTRAPPER ENTRY POINT
// Purpose: Triggers full lifecycle init upon complete DOM load.
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => lifecycle.init());
