/**
 * GTA VI Trailer Stream Overlay & Global Countdown Engine
 * Full YouTube Live & OBS Studio Optimization
 */

// Default Configurations
const DEFAULT_CONFIG = {
    channelName: "YOUR CHANNEL LIVE",
    tickerText: "🔥 GTA VI PRE-DOWNLOAD & RELEASE COUNTDOWN | SUBSCRIBE & DROP A LIKE! | 100% NON-COPYRIGHT STREAM VISUALS & AUDIO ACTIVE",
    targetLaunchDate: "2026-11-20T00:00:00Z", // Fall 2026 Anchor
    predownloadLeadHours: 48, // Pre-download usually unlocks 48h before launch
    currentTrailerSource: "non-copyright", // 'non-copyright', 'youtube', or 'local'
    youtubeVideoId: "QdBZY2fkU-0", // Official GTA VI Trailer 1 (Rockstar Games)
    audioMode: "safe-synth", // 'safe-synth', 'silent', 'original'
    synthVolume: 0.45,
    trailerVolume: 0.70,
    crtEffect: false, // Default off for razor-sharp stream readability
    obsMode: false
};

// Global Country & Timezone Dataset (39 Major Worldwide Streaming Territories)
const COUNTRIES = [
    // North America
    { id: "us-east", name: "United States (East)", city: "New York", flag: "🇺🇸", timeZone: "America/New_York", code: "EST/EDT", pinned: true, region: "americas" },
    { id: "us-west", name: "United States (West)", city: "Los Angeles", flag: "🇺🇸", timeZone: "America/Los_Angeles", code: "PST/PDT", pinned: true, region: "americas" },
    { id: "us-central", name: "United States (Central)", city: "Chicago", flag: "🇺🇸", timeZone: "America/Chicago", code: "CST/CDT", pinned: false, region: "americas" },
    { id: "ca-east", name: "Canada (East)", city: "Toronto / Montreal", flag: "🇨🇦", timeZone: "America/Toronto", code: "EDT/EST", pinned: false, region: "americas" },
    { id: "ca-west", name: "Canada (West)", city: "Vancouver", flag: "🇨🇦", timeZone: "America/Vancouver", code: "PDT/PST", pinned: false, region: "americas" },
    { id: "mx", name: "Mexico", city: "Mexico City", flag: "🇲🇽", timeZone: "America/Mexico_City", code: "CST", pinned: false, region: "americas" },

    // South America
    { id: "br", name: "Brazil", city: "São Paulo / Rio", flag: "🇧🇷", timeZone: "America/Sao_Paulo", code: "BRT", pinned: true, region: "americas" },
    { id: "ar", name: "Argentina", city: "Buenos Aires", flag: "🇦🇷", timeZone: "America/Argentina/Buenos_Aires", code: "ART", pinned: false, region: "americas" },
    { id: "cl", name: "Chile", city: "Santiago", flag: "🇨🇱", timeZone: "America/Santiago", code: "CLT", pinned: false, region: "americas" },
    { id: "co", name: "Colombia", city: "Bogotá", flag: "🇨🇴", timeZone: "America/Bogota", code: "COT", pinned: false, region: "americas" },

    // Europe
    { id: "uk", name: "United Kingdom", city: "London", flag: "🇬🇧", timeZone: "Europe/London", code: "GMT/BST", pinned: true, region: "europe" },
    { id: "de", name: "Germany", city: "Berlin / Frankfurt", flag: "🇩🇪", timeZone: "Europe/Berlin", code: "CET/CEST", pinned: true, region: "europe" },
    { id: "fr", name: "France", city: "Paris", flag: "🇫🇷", timeZone: "Europe/Paris", code: "CET/CEST", pinned: false, region: "europe" },
    { id: "es", name: "Spain", city: "Madrid / Barcelona", flag: "🇪🇸", timeZone: "Europe/Madrid", code: "CET/CEST", pinned: false, region: "europe" },
    { id: "it", name: "Italy", city: "Rome / Milan", flag: "🇮🇹", timeZone: "Europe/Rome", code: "CET/CEST", pinned: false, region: "europe" },
    { id: "nl", name: "Netherlands", city: "Amsterdam", flag: "🇳🇱", timeZone: "Europe/Amsterdam", code: "CET/CEST", pinned: false, region: "europe" },
    { id: "pl", name: "Poland", city: "Warsaw", flag: "🇵🇱", timeZone: "Europe/Warsaw", code: "CET/CEST", pinned: false, region: "europe" },
    { id: "se", name: "Sweden", city: "Stockholm", flag: "🇸🇪", timeZone: "Europe/Stockholm", code: "CET/CEST", pinned: false, region: "europe" },
    { id: "pt", name: "Portugal", city: "Lisbon", flag: "🇵🇹", timeZone: "Europe/Lisbon", code: "WET/WEST", pinned: false, region: "europe" },
    { id: "tr", name: "Turkey", city: "Istanbul", flag: "🇹🇷", timeZone: "Europe/Istanbul", code: "TRT", pinned: false, region: "europe" },

    // Asia & South Asia
    { id: "in", name: "India", city: "New Delhi / Mumbai", flag: "🇮🇳", timeZone: "Asia/Kolkata", code: "IST", pinned: true, region: "apac" },
    { id: "pk", name: "Pakistan", city: "Islamabad / Karachi", flag: "🇵🇰", timeZone: "Asia/Karachi", code: "PKT", pinned: false, region: "apac" },
    { id: "bd", name: "Bangladesh", city: "Dhaka", flag: "🇧🇩", timeZone: "Asia/Dhaka", code: "BST", pinned: false, region: "apac" },
    { id: "jp", name: "Japan", city: "Tokyo", flag: "🇯🇵", timeZone: "Asia/Tokyo", code: "JST", pinned: true, region: "apac" },
    { id: "kr", name: "South Korea", city: "Seoul", flag: "🇰🇷", timeZone: "Asia/Seoul", code: "KST", pinned: false, region: "apac" },
    { id: "ph", name: "Philippines", city: "Manila", flag: "🇵🇭", timeZone: "Asia/Manila", code: "PST", pinned: false, region: "apac" },
    { id: "id", name: "Indonesia", city: "Jakarta", flag: "🇮🇩", timeZone: "Asia/Jakarta", code: "WIB", pinned: false, region: "apac" },
    { id: "vn", name: "Vietnam", city: "Ho Chi Minh City", flag: "🇻🇳", timeZone: "Asia/Ho_Chi_Minh", code: "ICT", pinned: false, region: "apac" },
    { id: "th", name: "Thailand", city: "Bangkok", flag: "🇹🇭", timeZone: "Asia/Bangkok", code: "ICT", pinned: false, region: "apac" },
    { id: "my", name: "Malaysia", city: "Kuala Lumpur", flag: "🇲🇾", timeZone: "Asia/Kuala_Lumpur", code: "MYT", pinned: false, region: "apac" },
    { id: "sg", name: "Singapore", city: "Singapore", flag: "🇸🇬", timeZone: "Asia/Singapore", code: "SGT", pinned: false, region: "apac" },

    // Middle East
    { id: "ae", name: "UAE / Middle East", city: "Dubai / Abu Dhabi", flag: "🇦🇪", timeZone: "Asia/Dubai", code: "GST", pinned: false, region: "apac" },
    { id: "sa", name: "Saudi Arabia", city: "Riyadh", flag: "🇸🇦", timeZone: "Asia/Riyadh", code: "AST", pinned: false, region: "apac" },

    // Africa
    { id: "za", name: "South Africa", city: "Johannesburg / Cape Town", flag: "🇿🇦", timeZone: "Africa/Johannesburg", code: "SAST", pinned: false, region: "europe" },
    { id: "ng", name: "Nigeria", city: "Lagos", flag: "🇳🇬", timeZone: "Africa/Lagos", code: "WAT", pinned: false, region: "europe" },
    { id: "eg", name: "Egypt", city: "Cairo", flag: "🇪🇬", timeZone: "Africa/Cairo", code: "EET", pinned: false, region: "europe" },

    // Oceania
    { id: "au-east", name: "Australia (East)", city: "Sydney / Melbourne", flag: "🇦🇺", timeZone: "Australia/Sydney", code: "AEDT/AEST", pinned: true, region: "apac" },
    { id: "au-west", name: "Australia (West)", city: "Perth", flag: "🇦🇺", timeZone: "Australia/Perth", code: "AWST", pinned: false, region: "apac" },
    { id: "nz", name: "New Zealand", city: "Auckland", flag: "🇳🇿", timeZone: "Pacific/Auckland", code: "NZDT/NZST", pinned: false, region: "apac" }
];

class GTAStreamApp {
    constructor() {
        this.config = this.loadConfig();
        this.synth = new window.SynthwaveAudioEngine();
        this.ytPlayer = null;
        this.searchQuery = "";
        this.activeFilter = "all"; // 'all', 'pinned'
        this.predownloadTargetDate = this.calculatePredownloadDate();
        this.customVideoUrl = null;
        
        this.initElements();
        this.initTimezoneList();
        this.initEventListeners();
        this.initYouTubeAPI();
        this.startCountdownLoop();
        this.startVisualizerLoop();
        this.applyAudioMode(this.config.audioMode, false);

        // Auto-Scroll Engine for All Countries Continuous Display
        this.autoScrollEnabled = true;
        this.autoScrollSpeed = 0.8; // Smooth 60 FPS crawl
        this.isUserHovering = false;
        this.startAutoScrollLoop();

        // Initialize 100% Non-Copyright 4K Visuals Engine
        this.visualsEngine = null;
        if (window.ViceCityVisualsEngine) {
            this.visualsEngine = new window.ViceCityVisualsEngine("non-copyright-canvas");
        }
        this.switchVisualSource(this.config.currentTrailerSource || "non-copyright");
    }

    loadConfig() {
        let conf = { ...DEFAULT_CONFIG };
        try {
            const saved = localStorage.getItem("gta6_overlay_config");
            if (saved) conf = { ...conf, ...JSON.parse(saved) };
        } catch (e) {}

        // URL Query Parameters support for OBS Studio & Vercel
        try {
            const params = new URLSearchParams(window.location.search);
            if (params.has("obs")) conf.obsMode = params.get("obs") === "1" || params.get("obs") === "true";
            if (params.has("channel")) conf.channelName = params.get("channel");
            if (params.has("ticker")) conf.tickerText = params.get("ticker");
            if (params.has("audio")) conf.audioMode = params.get("audio");
            if (params.has("video")) conf.currentTrailerSource = params.get("video");
            if (params.has("crt")) conf.crtEffect = params.get("crt") === "1" || params.get("crt") === "true";
            if (params.has("lead")) conf.predownloadLeadHours = parseInt(params.get("lead"), 10) || 48;
            if (params.has("platform")) {
                const p = params.get("platform").toLowerCase();
                if (p === "ps5") conf.predownloadLeadHours = 48;
                else if (p === "xbox") conf.predownloadLeadHours = 72;
                else if (p === "universal") conf.predownloadLeadHours = 24;
            }
        } catch (e) {}

        return conf;
    }

    saveConfig() {
        localStorage.setItem("gta6_overlay_config", JSON.stringify(this.config));
    }

    calculatePredownloadDate() {
        const launch = new Date(this.config.targetLaunchDate).getTime();
        const predownloadMs = this.config.predownloadLeadHours * 60 * 60 * 1000;
        return new Date(launch - predownloadMs);
    }

    initElements() {
        // Core containers
        this.dom = {
            appContainer: document.getElementById("app-container"),
            obsModeBanner: document.getElementById("obs-mode-banner"),
            topNav: document.getElementById("top-nav"),
            bottomTicker: document.getElementById("bottom-ticker"),
            channelNameDisplay: document.getElementById("channel-name-display"),
            tickerTextDisplay: document.getElementById("ticker-text-display"),
            crtOverlay: document.getElementById("crt-overlay"),
            
            // Video elements
            ytContainer: document.getElementById("yt-player-container"),
            localVideoPlayer: document.getElementById("local-video-player"),
            videoSourceBadge: document.getElementById("video-source-badge"),
            
            // Audio Safety elements
            copyrightBanner: document.getElementById("copyright-banner"),
            copyrightStatusBadge: document.getElementById("copyright-status-badge"),
            audioModeSelect: document.getElementById("audio-mode-select"),
            synthVolSlider: document.getElementById("synth-volume-slider"),
            synthVolValue: document.getElementById("synth-volume-value"),
            
            // Master Countdown
            masterDays: document.getElementById("master-days"),
            masterHours: document.getElementById("master-hours"),
            masterMins: document.getElementById("master-mins"),
            masterSecs: document.getElementById("master-secs"),
            masterMillis: document.getElementById("master-millis"),
            targetDateLabel: document.getElementById("target-date-label"),
            targetTypeBadge: document.getElementById("target-type-badge"),

            // Country List
            countryGrid: document.getElementById("country-grid"),
            countrySearch: document.getElementById("country-search"),
            pinnedOnlyBtn: document.getElementById("filter-pinned-btn"),

            // Modals
            settingsModal: document.getElementById("settings-modal"),
            copyrightModal: document.getElementById("copyright-modal"),
            obsModal: document.getElementById("obs-modal"),

            // Settings Inputs
            inputChannelName: document.getElementById("setting-channel-name"),
            inputTickerText: document.getElementById("setting-ticker-text"),
            inputTargetDate: document.getElementById("setting-target-date"),
            inputLeadHours: document.getElementById("setting-lead-hours"),
            inputCrtToggle: document.getElementById("setting-crt-toggle")
        };

        // Populate initial settings
        if (this.dom.channelNameDisplay) this.dom.channelNameDisplay.textContent = this.config.channelName;
        if (this.dom.tickerTextDisplay) this.dom.tickerTextDisplay.textContent = this.config.tickerText;
        if (this.dom.inputChannelName) this.dom.inputChannelName.value = this.config.channelName;
        if (this.dom.inputTickerText) this.dom.inputTickerText.value = this.config.tickerText;
        if (this.dom.inputLeadHours) this.dom.inputLeadHours.value = this.config.predownloadLeadHours;
        if (this.dom.inputCrtToggle) this.dom.inputCrtToggle.checked = this.config.crtEffect;

        const dateIsoLocal = new Date(this.config.targetLaunchDate).toISOString().slice(0, 16);
        if (this.dom.inputTargetDate) this.dom.inputTargetDate.value = dateIsoLocal;

        this.applyCrtEffect(this.config.crtEffect);
        this.applyObsMode(this.config.obsMode);
    }

    initEventListeners() {
        // Audio mode change
        if (this.dom.audioModeSelect) {
            this.dom.audioModeSelect.value = this.config.audioMode;
            this.dom.audioModeSelect.addEventListener("change", (e) => {
                this.applyAudioMode(e.target.value, true);
            });
        }

        // Synth Volume Slider
        if (this.dom.synthVolSlider) {
            this.dom.synthVolSlider.value = this.config.synthVolume * 100;
            this.dom.synthVolSlider.addEventListener("input", (e) => {
                const vol = parseFloat(e.target.value) / 100;
                this.config.synthVolume = vol;
                this.synth.setVolume(vol);
                if (this.dom.synthVolValue) this.dom.synthVolValue.textContent = `${Math.round(vol * 100)}%`;
                this.saveConfig();
            });
        }

        // Safe Audio Quick Fix Button
        document.querySelectorAll(".btn-make-safe").forEach(btn => {
            btn.addEventListener("click", () => {
                this.applyAudioMode("safe-synth", true);
            });
        });

        // Search Countries
        if (this.dom.countrySearch) {
            this.dom.countrySearch.addEventListener("input", (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.renderCountryList();
            });
        }

        // Pinned filter toggle
        if (this.dom.pinnedOnlyBtn) {
            this.dom.pinnedOnlyBtn.addEventListener("click", () => {
                this.activeFilter = this.activeFilter === "all" ? "pinned" : "all";
                this.dom.pinnedOnlyBtn.classList.toggle("bg-pink-600", this.activeFilter === "pinned");
                this.renderCountryList();
            });
        }

        // Modals Toggles
        document.getElementById("btn-open-settings")?.addEventListener("click", () => this.toggleModal("settings", true));
        document.getElementById("btn-close-settings")?.addEventListener("click", () => this.toggleModal("settings", false));
        document.getElementById("btn-save-settings")?.addEventListener("click", () => this.saveSettingsFromModal());

        document.getElementById("btn-open-copyright")?.addEventListener("click", () => this.toggleModal("copyright", true));
        document.getElementById("btn-close-copyright")?.addEventListener("click", () => this.toggleModal("copyright", false));

        document.getElementById("btn-open-obs-guide")?.addEventListener("click", () => this.toggleModal("obs", true));
        document.getElementById("btn-close-obs-guide")?.addEventListener("click", () => this.toggleModal("obs", false));

        // Toggle OBS Mode
        document.getElementById("btn-toggle-obs")?.addEventListener("click", () => this.toggleObsMode());
        document.getElementById("btn-exit-obs")?.addEventListener("click", () => this.toggleObsMode());

        // Visual & Trailer Switchers
        document.getElementById("btn-non-copyright-visuals")?.addEventListener("click", () => this.switchVisualSource("non-copyright"));
        document.getElementById("btn-trailer-1")?.addEventListener("click", () => this.switchVisualSource("youtube", "QdBZY2fkU-0", "Official Trailer 1"));
        document.getElementById("btn-trailer-custom")?.addEventListener("click", () => this.promptCustomTrailer());
        document.getElementById("btn-local-file")?.addEventListener("click", () => document.getElementById("local-file-input")?.click());
        document.getElementById("local-file-input")?.addEventListener("change", (e) => this.handleLocalVideo(e));

        // Platform Presets (PS5, Xbox, Universal)
        const setPlatformLead = (hours, activeBtnId) => {
            this.config.predownloadLeadHours = hours;
            this.predownloadTargetDate = this.calculatePredownloadDate();
            this.saveConfig();
            this.renderCountryList();
            document.querySelectorAll(".platform-btn").forEach(btn => {
                btn.className = "platform-btn px-2.5 py-1 rounded-md text-xs font-black bg-slate-800 text-slate-300 hover:text-white transition";
            });
            const active = document.getElementById(activeBtnId);
            if (active) active.className = "platform-btn px-2.5 py-1 rounded-md text-xs font-black bg-pink-600 text-white transition shadow-sm";
        };

        document.getElementById("platform-ps5")?.addEventListener("click", () => setPlatformLead(48, "platform-ps5"));
        document.getElementById("platform-xbox")?.addEventListener("click", () => setPlatformLead(72, "platform-xbox"));
        document.getElementById("platform-all")?.addEventListener("click", () => setPlatformLead(24, "platform-all"));

        // Auto-Scroll Toggle Controls
        const toggleBtn = document.getElementById("toggle-autoscroll-btn");
        const scrollText = document.getElementById("autoscroll-text");
        const scrollIcon = document.getElementById("autoscroll-icon");

        toggleBtn?.addEventListener("click", () => {
            this.autoScrollEnabled = !this.autoScrollEnabled;
            if (scrollText) scrollText.textContent = this.autoScrollEnabled ? "Auto-Scroll: ON" : "Auto-Scroll: OFF";
            if (scrollIcon) scrollIcon.textContent = this.autoScrollEnabled ? "▶" : "⏸";
            toggleBtn.className = this.autoScrollEnabled
                ? "px-2.5 py-1 rounded-lg bg-pink-600 hover:bg-pink-500 text-xs text-white font-black transition flex items-center gap-1 shadow-sm"
                : "px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-bold transition flex items-center gap-1";
        });

        // Hover pause on country list (pauses continuous scroll when streamer or user hovers)
        if (this.dom.countryGrid) {
            this.dom.countryGrid.addEventListener("mouseenter", () => { this.isUserHovering = true; });
            this.dom.countryGrid.addEventListener("mouseleave", () => { this.isUserHovering = false; });
            this.dom.countryGrid.addEventListener("touchstart", () => { this.isUserHovering = true; }, { passive: true });
            this.dom.countryGrid.addEventListener("touchend", () => {
                setTimeout(() => { this.isUserHovering = false; }, 2000);
            }, { passive: true });
        }

        // Speed buttons (Slow, Normal, Fast)
        document.getElementById("speed-slow")?.addEventListener("click", () => this.setAutoScrollSpeed(0.4, "speed-slow"));
        document.getElementById("speed-med")?.addEventListener("click", () => this.setAutoScrollSpeed(0.8, "speed-med"));
        document.getElementById("speed-fast")?.addEventListener("click", () => this.setAutoScrollSpeed(1.6, "speed-fast"));

        // Regional filter buttons (All, Americas, Europe, Asia-Pac)
        document.querySelectorAll(".region-filter-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const reg = e.target.getAttribute("data-region");
                this.activeFilter = reg;
                document.querySelectorAll(".region-filter-btn").forEach(b => {
                    b.className = "region-filter-btn px-2 py-0.5 rounded bg-slate-900 text-slate-400 hover:text-white transition";
                });
                e.target.className = "region-filter-btn px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold transition";
                this.renderCountryList();
            });
        });

        // Global Hotkeys for Streamer
        window.addEventListener("keydown", (e) => {
            // Ignore keystrokes when typing inside inputs
            if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

            if (e.key.toLowerCase() === "o") {
                this.toggleObsMode();
            } else if (e.key.toLowerCase() === "s") {
                const nextMode = this.config.audioMode === "safe-synth" ? "silent" : "safe-synth";
                this.applyAudioMode(nextMode, true);
            } else if (e.key.toLowerCase() === "c") {
                this.applyCrtEffect(!this.config.crtEffect);
            } else if (e.key === " ") {
                e.preventDefault();
                this.togglePlayPause();
            }
        });
    }

    initYouTubeAPI() {
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScript = document.getElementsByTagName("script")[0];
            firstScript.parentNode.insertBefore(tag, firstScript);
        }

        window.onYouTubeIframeAPIReady = () => {
            this.createYTPlayer(this.config.youtubeVideoId);
        };

        if (window.YT && window.YT.Player) {
            this.createYTPlayer(this.config.youtubeVideoId);
        }
    }

    createYTPlayer(videoId) {
        if (this.ytPlayer) {
            try { this.ytPlayer.destroy(); } catch (e) {}
        }

        this.ytPlayer = new YT.Player("yt-player", {
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                controls: 0,
                loop: 1,
                playlist: videoId,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                mute: this.config.audioMode !== "original" ? 1 : 0
            },
            events: {
                onReady: (evt) => {
                    evt.target.playVideo();
                    if (this.config.audioMode !== "original") {
                        evt.target.mute();
                    } else {
                        evt.target.unMute();
                        evt.target.setVolume(this.config.trailerVolume * 100);
                    }
                },
                onStateChange: (evt) => {
                    // Loop on finish
                    if (evt.data === YT.PlayerState.ENDED) {
                        evt.target.playVideo();
                    }
                }
            }
        });
    }

    switchVisualSource(mode, videoId = null, label = null) {
        this.config.currentTrailerSource = mode;
        this.saveConfig();

        const canvas = document.getElementById("non-copyright-canvas");
        const ytContainer = this.dom.ytContainer;
        const localVideo = this.dom.localVideoPlayer;

        if (mode === "non-copyright") {
            if (canvas) canvas.classList.remove("hidden");
            if (ytContainer) ytContainer.classList.add("hidden");
            if (localVideo) localVideo.classList.add("hidden");

            if (this.ytPlayer && this.ytPlayer.pauseVideo) {
                try { this.ytPlayer.pauseVideo(); } catch (e) {}
            }
            if (this.visualsEngine) this.visualsEngine.start();
            if (this.dom.videoSourceBadge) {
                this.dom.videoSourceBadge.textContent = "🛡️ Non-Copyright 4K Loop";
                this.dom.videoSourceBadge.className = "font-mono text-emerald-300 font-black text-xs sm:text-sm bg-emerald-950/90 px-3 py-1 rounded-md border border-emerald-500/50 shadow-sm";
            }
        } else if (mode === "youtube") {
            if (canvas) canvas.classList.add("hidden");
            if (ytContainer) ytContainer.classList.remove("hidden");
            if (localVideo) localVideo.classList.add("hidden");

            if (this.visualsEngine) this.visualsEngine.stop();
            if (this.dom.videoSourceBadge) {
                this.dom.videoSourceBadge.textContent = label || "Official Trailer 1";
                this.dom.videoSourceBadge.className = "font-mono text-cyan-300 font-black text-xs sm:text-sm bg-slate-900 px-3 py-1 rounded-md border border-slate-700 shadow-sm";
            }
            if (videoId) {
                this.config.youtubeVideoId = videoId;
                if (this.ytPlayer && this.ytPlayer.loadVideoById) {
                    this.ytPlayer.loadVideoById({ videoId: videoId, startSeconds: 0 });
                } else {
                    this.createYTPlayer(videoId);
                }
            } else if (this.ytPlayer && this.ytPlayer.playVideo) {
                this.ytPlayer.playVideo();
            }
        } else if (mode === "local") {
            if (canvas) canvas.classList.add("hidden");
            if (ytContainer) ytContainer.classList.add("hidden");
            if (localVideo) localVideo.classList.remove("hidden");

            if (this.visualsEngine) this.visualsEngine.stop();
            if (this.ytPlayer && this.ytPlayer.pauseVideo) {
                try { this.ytPlayer.pauseVideo(); } catch (e) {}
            }
        }
    }

    switchTrailer(videoId, label) {
        this.switchVisualSource("youtube", videoId, label);
    }

    promptCustomTrailer() {
        const url = prompt("Enter YouTube Video URL or ID for GTA VI Trailer / Teaser:", this.config.youtubeVideoId);
        if (!url) return;

        let videoId = url.trim();
        // Match standard youtube.com/watch?v=XYZ or youtu.be/XYZ
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        if (match && match[1]) {
            videoId = match[1];
        }

        this.switchVisualSource("youtube", videoId, "Custom YT Trailer");
    }

    handleLocalVideo(e) {
        const file = e.target.files[0];
        if (!file) return;

        const videoUrl = URL.createObjectURL(file);
        this.switchVisualSource("local");

        if (this.dom.localVideoPlayer) {
            this.dom.localVideoPlayer.src = videoUrl;
            this.dom.localVideoPlayer.loop = true;
            this.dom.localVideoPlayer.muted = this.config.audioMode !== "original";
            this.dom.localVideoPlayer.play();
        }

        if (this.dom.videoSourceBadge) this.dom.videoSourceBadge.textContent = `Local: ${file.name.substring(0, 18)}...`;
    }

    togglePlayPause() {
        if (this.config.currentTrailerSource === "local" && this.dom.localVideoPlayer) {
            if (this.dom.localVideoPlayer.paused) {
                this.dom.localVideoPlayer.play();
            } else {
                this.dom.localVideoPlayer.pause();
            }
        } else if (this.ytPlayer && this.ytPlayer.getPlayerState) {
            const state = this.ytPlayer.getPlayerState();
            if (state === YT.PlayerState.PLAYING) {
                this.ytPlayer.pauseVideo();
            } else {
                this.ytPlayer.playVideo();
            }
        }
    }

    applyAudioMode(mode, userInitiated = true) {
        this.config.audioMode = mode;
        this.saveConfig();

        if (this.dom.audioModeSelect) this.dom.audioModeSelect.value = mode;

        if (mode === "safe-synth") {
            // Mute video audio
            this.setVideoMuted(true);
            // Start procedural royalty-free 80s synthwave
            this.synth.setVolume(this.config.synthVolume);
            this.synth.start();
            this.setCopyrightStatus("safe", "SAFE FOR YOUTUBE (Synthwave BGM)");
        } else if (mode === "silent") {
            // Mute video and synth
            this.setVideoMuted(true);
            this.synth.stop();
            this.setCopyrightStatus("safe", "SAFE FOR YOUTUBE (Silent / Mic Only)");
        } else if (mode === "original") {
            // Original trailer audio (Tom Petty)
            this.synth.stop();
            this.setVideoMuted(false);
            this.setCopyrightStatus("danger", "HIGH RISK (Tom Petty - Content ID)");
        }
    }

    setVideoMuted(muted) {
        if (this.ytPlayer) {
            if (muted) {
                try { this.ytPlayer.mute(); } catch (e) {}
            } else {
                try {
                    this.ytPlayer.unMute();
                    this.ytPlayer.setVolume(this.config.trailerVolume * 100);
                } catch (e) {}
            }
        }
        if (this.dom.localVideoPlayer) {
            this.dom.localVideoPlayer.muted = muted;
        }
    }

    setCopyrightStatus(type, label) {
        if (!this.dom.copyrightStatusBadge) return;

        if (type === "safe") {
            this.dom.copyrightStatusBadge.className = "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/20";
            this.dom.copyrightStatusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ${label}`;
            if (this.dom.copyrightBanner) this.dom.copyrightBanner.classList.add("hidden");
        } else {
            this.dom.copyrightStatusBadge.className = "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-rose-950 text-rose-300 border border-rose-500/50 shadow-sm shadow-rose-500/30 animate-pulse";
            this.dom.copyrightStatusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-rose-500"></span> ${label}`;
            if (this.dom.copyrightBanner) this.dom.copyrightBanner.classList.remove("hidden");
        }
    }

    toggleObsMode() {
        this.applyObsMode(!this.config.obsMode);
    }

    applyObsMode(enabled) {
        this.config.obsMode = enabled;
        this.saveConfig();

        if (enabled) {
            this.dom.topNav?.classList.add("hidden");
            this.dom.obsModeBanner?.classList.remove("hidden");
            document.body.classList.add("obs-clean-canvas");
        } else {
            this.dom.topNav?.classList.remove("hidden");
            this.dom.obsModeBanner?.classList.add("hidden");
            document.body.classList.remove("obs-clean-canvas");
        }
    }

    applyCrtEffect(enabled) {
        this.config.crtEffect = enabled;
        this.saveConfig();
        if (this.dom.crtOverlay) {
            this.dom.crtOverlay.classList.toggle("hidden", !enabled);
        }
    }

    toggleModal(type, show) {
        const modal = type === "settings" ? this.dom.settingsModal :
                      type === "copyright" ? this.dom.copyrightModal :
                      type === "obs" ? this.dom.obsModal : null;
        if (!modal) return;
        modal.classList.toggle("hidden", !show);
    }

    saveSettingsFromModal() {
        if (this.dom.inputChannelName) this.config.channelName = this.dom.inputChannelName.value.trim() || DEFAULT_CONFIG.channelName;
        if (this.dom.inputTickerText) this.config.tickerText = this.dom.inputTickerText.value.trim() || DEFAULT_CONFIG.tickerText;
        if (this.dom.inputTargetDate && this.dom.inputTargetDate.value) {
            this.config.targetLaunchDate = new Date(this.dom.inputTargetDate.value).toISOString();
        }
        if (this.dom.inputLeadHours) {
            this.config.predownloadLeadHours = parseInt(this.dom.inputLeadHours.value, 10) || 48;
        }
        if (this.dom.inputCrtToggle) {
            this.applyCrtEffect(this.dom.inputCrtToggle.checked);
        }

        this.predownloadTargetDate = this.calculatePredownloadDate();
        this.saveConfig();

        if (this.dom.channelNameDisplay) this.dom.channelNameDisplay.textContent = this.config.channelName;
        if (this.dom.tickerTextDisplay) this.dom.tickerTextDisplay.textContent = this.config.tickerText;

        this.toggleModal("settings", false);
    }

    initTimezoneList() {
        this.renderCountryList();
    }

    renderCountryList() {
        if (!this.dom.countryGrid) return;
        this.dom.countryGrid.innerHTML = "";

        const filtered = COUNTRIES.filter(c => {
            const matchesQuery = c.name.toLowerCase().includes(this.searchQuery) ||
                                 c.city.toLowerCase().includes(this.searchQuery) ||
                                 c.code.toLowerCase().includes(this.searchQuery);
            const matchesFilter = this.activeFilter === "all" || 
                                 (this.activeFilter === "pinned" && c.pinned) ||
                                 (c.region === this.activeFilter);
            return matchesQuery && matchesFilter;
        });

        // Sort: pinned first
        filtered.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

        const now = new Date();
        const targetTime = this.predownloadTargetDate.getTime();

        const renderCardGroup = (isClone = false) => {
            filtered.forEach(country => {
                const card = document.createElement("div");
                card.className = `p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-200 relative overflow-hidden ${
                    country.pinned 
                        ? "bg-slate-900 border-pink-500/70 shadow-md shadow-pink-500/20" 
                        : "bg-slate-950/95 border-slate-800 hover:border-slate-700"
                }`;

                // Format country's local time & date
                let localTimeStr = "";
                let localDateStr = "";
                let targetLocalStr = "";
                try {
                    const timeFormatter = new Intl.DateTimeFormat("en-US", {
                        timeZone: country.timeZone,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true
                    });
                    const dateFormatter = new Intl.DateTimeFormat("en-US", {
                        timeZone: country.timeZone,
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    });
                    localTimeStr = timeFormatter.format(now);
                    localDateStr = dateFormatter.format(now);

                    targetLocalStr = new Intl.DateTimeFormat("en-US", {
                        timeZone: country.timeZone,
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true
                    }).format(this.predownloadTargetDate);
                } catch (e) {
                    localTimeStr = "UTC";
                }

                const isUnlocked = now.getTime() >= targetTime;

                card.innerHTML = `
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2.5">
                            <span class="text-2xl sm:text-3xl">${country.flag}</span>
                            <div>
                                <div class="font-black text-white text-base sm:text-lg flex items-center gap-2">
                                    ${country.name}
                                    <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-pink-300 border border-pink-500/30">${country.code}</span>
                                </div>
                                <div class="text-xs sm:text-sm text-slate-300 font-semibold">${country.city}</div>
                            </div>
                        </div>
                        <button class="pin-toggle text-sm p-1.5 rounded-lg hover:bg-slate-800 transition ${country.pinned ? "text-pink-400 font-black" : "text-slate-500"}" data-id="${country.id}" title="${country.pinned ? 'Unpin' : 'Pin to top'}">
                            ★
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-3 mt-2.5 pt-2.5 border-t border-slate-800">
                        <div>
                            <div class="text-xs uppercase font-extrabold text-cyan-400 tracking-wider">Local Clock</div>
                            <div class="country-clock-time text-base sm:text-xl font-mono font-black text-cyan-300 drop-shadow-sm mt-0.5" data-tz="${country.timeZone}">${localTimeStr}</div>
                            <div class="text-xs text-slate-300 font-semibold mt-0.5">${localDateStr}</div>
                        </div>
                        <div>
                            <div class="text-xs uppercase font-extrabold text-pink-400 tracking-wider">Pre-Download Start</div>
                            <div class="text-sm sm:text-base font-mono font-black text-pink-300 drop-shadow-sm truncate mt-0.5">${targetLocalStr}</div>
                            <div class="text-xs font-black uppercase tracking-wide mt-0.5 ${isUnlocked ? 'text-emerald-400 font-bold' : 'text-slate-300'}">
                                ${isUnlocked ? '🟢 UNLOCKED NOW' : '⏳ Auto-Calculated'}
                            </div>
                        </div>
                    </div>
                `;

                // Pin toggle event
                card.querySelector(".pin-toggle").addEventListener("click", (e) => {
                    e.stopPropagation();
                    country.pinned = !country.pinned;
                    this.renderCountryList();
                });

                this.dom.countryGrid.appendChild(card);
            });
        };

        renderCardGroup(false);
        renderCardGroup(true); // Duplicate set for infinite seamless wrap
    }
    }

    startCountdownLoop() {
        const updateTick = () => {
            const now = new Date();
            const targetTime = this.predownloadTargetDate.getTime();
            let diff = targetTime - now.getTime();

            let isPreDownloadActive = false;
            if (diff <= 0) {
                // If pre-download time reached, calculate diff to full release
                const launchTime = new Date(this.config.targetLaunchDate).getTime();
                diff = launchTime - now.getTime();
                isPreDownloadActive = true;
            }

            if (diff < 0) diff = 0;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            const millis = Math.floor((diff % 1000) / 10);

            if (this.dom.masterDays) this.dom.masterDays.textContent = String(days).padStart(2, "0");
            if (this.dom.masterHours) this.dom.masterHours.textContent = String(hours).padStart(2, "0");
            if (this.dom.masterMins) this.dom.masterMins.textContent = String(minutes).padStart(2, "0");
            if (this.dom.masterSecs) this.dom.masterSecs.textContent = String(seconds).padStart(2, "0");
            if (this.dom.masterMillis) this.dom.masterMillis.textContent = String(millis).padStart(2, "0");

            if (this.dom.targetTypeBadge) {
                if (isPreDownloadActive) {
                    this.dom.targetTypeBadge.textContent = "PRE-DOWNLOAD LIVE | COUNTDOWN TO UNLOCK";
                    this.dom.targetTypeBadge.className = "px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse";
                } else {
                    this.dom.targetTypeBadge.textContent = `PRE-DOWNLOAD OPENS (${this.config.predownloadLeadHours}h PRIOR)`;
                    this.dom.targetTypeBadge.className = "px-2 py-0.5 rounded text-[11px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40";
                }
            }

            if (this.dom.targetDateLabel) {
                this.dom.targetDateLabel.textContent = this.predownloadTargetDate.toUTCString();
            }

            // Refresh clocks smoothly every second without resetting scroll position
            if (this.lastClockTickSec !== now.getSeconds()) {
                this.lastClockTickSec = now.getSeconds();
                this.updateCountryClocks();
            }

            requestAnimationFrame(updateTick);
        };

        requestAnimationFrame(updateTick);
    }

    updateCountryClocks() {
        if (!this.dom.countryGrid) return;
        const now = new Date();
        const timeElements = this.dom.countryGrid.querySelectorAll(".country-clock-time");
        timeElements.forEach(el => {
            const tz = el.getAttribute("data-tz");
            if (!tz) return;
            try {
                const timeFormatter = new Intl.DateTimeFormat("en-US", {
                    timeZone: tz,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                });
                el.textContent = timeFormatter.format(now);
            } catch (e) {}
        });
    }

    startVisualizerLoop() {
        const canvas = document.getElementById("audio-visualizer-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const render = () => {
            const freqData = this.synth ? this.synth.getFrequencyData() : new Uint8Array(0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barCount = 32;
            const barWidth = canvas.width / barCount;
            const now = Date.now();

            for (let i = 0; i < barCount; i++) {
                let val = 0;
                if (this.synth && this.synth.isPlaying && freqData.length > 0) {
                    val = freqData[i % freqData.length] / 255;
                } else {
                    val = 0.08 + Math.sin(now / 400 + i * 0.35) * 0.04;
                }
                const barHeight = Math.max(2, val * (canvas.height - 4));

                const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
                grad.addColorStop(0, '#ff2a85');
                grad.addColorStop(1, '#00f0ff');

                ctx.fillStyle = grad;
                ctx.fillRect(i * barWidth + 1, canvas.height - barHeight, barWidth - 2, barHeight);
            }
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }

    setAutoScrollSpeed(speed, btnId) {
        this.autoScrollSpeed = speed;
        document.querySelectorAll(".speed-btn").forEach(b => {
            b.className = "speed-btn px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 hover:text-white transition";
        });
        const active = document.getElementById(btnId);
        if (active) active.className = "speed-btn px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800 transition";
    }

    startAutoScrollLoop() {
        const step = () => {
            if (this.autoScrollEnabled && !this.isUserHovering && this.dom.countryGrid) {
                const grid = this.dom.countryGrid;
                grid.scrollTop += this.autoScrollSpeed;

                // Infinite seamless loop: wrap around when past the midpoint of duplicated cards
                const halfHeight = grid.scrollHeight / 2;
                if (halfHeight > 50 && grid.scrollTop >= halfHeight) {
                    grid.scrollTop -= halfHeight;
                }
            }
            requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }
}

// Instantiate on document load
document.addEventListener("DOMContentLoaded", () => {
    window.gtaApp = new GTAStreamApp();
});

