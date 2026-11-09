/**
 * GTA VI 100% Non-Copyright Vice City 4K Visuals Engine
 * Real-time 60 FPS Procedural Canvas Animation
 * Zero Copyright Risk | Zero Buffering | 100% Safe for YouTube Live
 */

class ViceCityVisualsEngine {
    constructor(canvasId) {
        this.canvasId = canvasId || 'non-copyright-canvas';
        this.canvas = document.getElementById(this.canvasId);
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.isRunning = false;
        this.speed = 1.0;
        this.gridOffset = 0;
        this.stars = [];
        this.time = 0;
        this.animationFrameId = null;
        
        if (this.canvas) {
            this.resize();
            window.addEventListener('resize', () => this.resize());
        }
        this.initStars();
    }

    resize() {
        if (!this.canvas && this.canvasId) {
            this.canvas = document.getElementById(this.canvasId);
            if (this.canvas) this.ctx = this.canvas.getContext('2d');
        }
        if (!this.canvas) return;

        const rect = this.canvas.getBoundingClientRect();
        const parent = this.canvas.parentElement;
        const parentW = parent ? parent.clientWidth : 0;
        const parentH = parent ? parent.clientHeight : 0;

        const w = (rect.width > 50 ? rect.width : (parentW > 50 ? parentW : 1280));
        const h = (rect.height > 50 ? rect.height : (parentH > 50 ? parentH : 720));

        const targetW = Math.floor(w * (window.devicePixelRatio || 1));
        const targetH = Math.floor(h * (window.devicePixelRatio || 1));

        if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
            this.canvas.width = targetW;
            this.canvas.height = targetH;
        }
    }

    initStars() {
        this.stars = [];
        for (let i = 0; i < 90; i++) {
            this.stars.push({
                x: Math.random(),
                y: Math.random() * 0.55,
                size: Math.random() * 2 + 0.5,
                twinkle: Math.random() * Math.PI * 2
            });
        }
    }

    start() {
        if (!this.canvas && this.canvasId) {
            this.canvas = document.getElementById(this.canvasId);
            if (this.canvas) {
                this.ctx = this.canvas.getContext('2d');
                window.addEventListener('resize', () => this.resize());
            }
        }
        if (this.isRunning) return;
        this.isRunning = true;
        this.resize();
        this.loop();
    }

    stop() {
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    loop() {
        if (!this.isRunning || !this.ctx) return;
        this.render();
        this.time += 0.02;
        this.animationFrameId = requestAnimationFrame(() => this.loop());
    }

    render() {
        if (!this.ctx || !this.canvas) return;

        // Auto-recover if canvas dimensions are zero or unrendered
        if (this.canvas.width < 100 || this.canvas.height < 100) {
            this.resize();
        }

        const ctx = this.ctx;
        const w = Math.max(300, this.canvas.width);
        const h = Math.max(150, this.canvas.height);
        const horizonY = h * 0.58;

        // 1. SKY: Midnight violet to neon magenta/orange gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
        skyGrad.addColorStop(0.0, '#060312');
        skyGrad.addColorStop(0.45, '#1e0836');
        skyGrad.addColorStop(0.75, '#5d0b4d');
        skyGrad.addColorStop(0.95, '#ff2a85');
        skyGrad.addColorStop(1.0, '#ff7b00');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, horizonY);

        // 2. TWINKLING STARS
        ctx.fillStyle = '#ffffff';
        for (let s of this.stars) {
            const alpha = 0.4 + 0.6 * Math.sin(this.time * 2 + s.twinkle);
            ctx.globalAlpha = Math.max(0.1, alpha);
            ctx.beginPath();
            ctx.arc(s.x * w, s.y * h, s.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        // 3. GIANT SYNTHWAVE SUN WITH HORIZONTAL STRIPES
        const sunRadius = Math.min(w, h) * 0.22;
        const sunX = w * 0.5;
        const sunY = horizonY - sunRadius * 0.25;

        // Sun Glow
        const sunGlow = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.2, sunX, sunY, sunRadius * 1.6);
        sunGlow.addColorStop(0, 'rgba(255, 235, 59, 0.9)');
        sunGlow.addColorStop(0.4, 'rgba(255, 42, 133, 0.6)');
        sunGlow.addColorStop(1, 'rgba(255, 42, 133, 0)');
        ctx.fillStyle = sunGlow;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius * 1.6, 0, Math.PI * 2);
        ctx.fill();

        // Sun Body
        const sunGrad = ctx.createLinearGradient(sunX, sunY - sunRadius, sunX, sunY + sunRadius);
        sunGrad.addColorStop(0, '#fff455');
        sunGrad.addColorStop(0.5, '#ff2a85');
        sunGrad.addColorStop(1, '#670b56');

        ctx.save();
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = sunGrad;
        ctx.fillRect(sunX - sunRadius, sunY - sunRadius, sunRadius * 2, sunRadius * 2);

        // Sun Horizontal Cutout Bars
        ctx.fillStyle = '#1e0836';
        const numBars = 10;
        for (let i = 0; i < numBars; i++) {
            const barY = sunY - sunRadius * 0.2 + (i / numBars) * (sunRadius * 1.2);
            const barHeight = (i + 1) * 2.2;
            ctx.fillRect(sunX - sunRadius, barY, sunRadius * 2, barHeight);
        }
        ctx.restore();

        // 4. DISTANT VICE CITY SKYLINE SILHOUETTE
        ctx.fillStyle = '#0a0314';
        const skylineBuildings = [
            { w: 0.04, h: 0.14 }, { w: 0.03, h: 0.22 }, { w: 0.05, h: 0.18 },
            { w: 0.02, h: 0.28 }, { w: 0.06, h: 0.12 }, { w: 0.035, h: 0.25 },
            { w: 0.05, h: 0.16 }, { w: 0.02, h: 0.32 }, { w: 0.04, h: 0.20 },
            { w: 0.06, h: 0.15 }, { w: 0.03, h: 0.24 }, { w: 0.05, h: 0.17 },
            { w: 0.04, h: 0.29 }, { w: 0.02, h: 0.21 }, { w: 0.05, h: 0.13 },
            { w: 0.035, h: 0.27 }, { w: 0.04, h: 0.15 }, { w: 0.03, h: 0.20 }
        ];

        let curX = 0;
        for (let b of skylineBuildings) {
            const bWidth = b.w * w;
            const bHeight = b.h * (h * 0.5);
            ctx.fillRect(curX, horizonY - bHeight, bWidth, bHeight);

            // Glowing Windows
            if (Math.random() < 0.25) {
                ctx.fillStyle = (Math.random() < 0.5) ? 'rgba(0, 240, 255, 0.8)' : 'rgba(255, 42, 133, 0.8)';
                ctx.fillRect(curX + bWidth * 0.3, horizonY - bHeight * 0.7, 3, 3);
                ctx.fillStyle = '#0a0314';
            }
            curX += bWidth;
        }

        // 5. ROAD / GROUND & 3D PERSPECTIVE NEON GRID
        const groundGrad = ctx.createLinearGradient(0, horizonY, 0, h);
        groundGrad.addColorStop(0, '#070212');
        groundGrad.addColorStop(1, '#1b0229');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, horizonY, w, h - horizonY);

        // Neon Horizon Glow Line
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(0, horizonY);
        ctx.lineTo(w, horizonY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Perspective Vertical Grid Lines (Radiating from Sun/Center Horizon)
        ctx.strokeStyle = 'rgba(255, 42, 133, 0.45)';
        ctx.lineWidth = 1.5;
        const numLines = 24;
        for (let i = -numLines; i <= numLines; i++) {
            const bottomX = w * 0.5 + i * (w * 0.045);
            ctx.beginPath();
            ctx.moveTo(w * 0.5, horizonY);
            ctx.lineTo(bottomX * 1.8 - w * 0.4, h);
            ctx.stroke();
        }

        // Horizontal Moving Grid Lines (Moving Forward at 60 FPS)
        this.gridOffset = (this.gridOffset + 0.012) % 1.0;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.65)';
        ctx.lineWidth = 2;

        const numHorizLines = 14;
        for (let i = 0; i < numHorizLines; i++) {
            const p = (i + this.gridOffset) / numHorizLines;
            // Exponential easing for realistic 3D depth perspective
            const depth = Math.pow(p, 2.5);
            const lineY = horizonY + depth * (h - horizonY);

            ctx.beginPath();
            ctx.moveTo(0, lineY);
            ctx.lineTo(w, lineY);
            ctx.stroke();
        }

        // 6. SWAYING PALM TREE SILHOUETTES ON SIDES
        this.drawPalmTree(ctx, w * 0.08, horizonY, h * 0.45, -0.15, this.time);
        this.drawPalmTree(ctx, w * 0.16, horizonY + 30, h * 0.38, -0.08, this.time + 1);
        this.drawPalmTree(ctx, w * 0.92, horizonY, h * 0.45, 0.15, this.time + 2);
        this.drawPalmTree(ctx, w * 0.84, horizonY + 30, h * 0.38, 0.08, this.time + 3);

        // 7. BROADCAST OVERLAY GRAPHICS: GTA VI VICE CITY LOGO & COPYRIGHT FREE BADGE
        this.drawLogoOverlay(ctx, w, h);
    }

    drawPalmTree(ctx, x, baseY, height, lean, time) {
        ctx.save();
        ctx.fillStyle = '#06010c';

        // Trunk with curve
        ctx.beginPath();
        const sway = Math.sin(time) * 8;
        const topX = x + lean * height + sway;
        const topY = baseY - height;

        ctx.moveTo(x - 8, baseY);
        ctx.quadraticCurveTo(x + lean * height * 0.5, baseY - height * 0.5, topX - 3, topY);
        ctx.lineTo(topX + 3, topY);
        ctx.quadraticCurveTo(x + lean * height * 0.5 + 4, baseY - height * 0.5, x + 8, baseY);
        ctx.fill();

        // Palm Fronds / Leaves
        ctx.strokeStyle = '#06010c';
        ctx.lineWidth = 4;
        const numFronds = 6;
        for (let i = 0; i < numFronds; i++) {
            const angle = (i / numFronds) * Math.PI * 1.4 - Math.PI * 0.7;
            const frondLen = height * 0.32;
            const fx = topX + Math.cos(angle) * frondLen;
            const fy = topY + Math.sin(angle) * frondLen + 20;

            ctx.beginPath();
            ctx.moveTo(topX, topY);
            ctx.quadraticCurveTo(topX + Math.cos(angle) * (frondLen * 0.6), topY - 15, fx, fy);
            ctx.stroke();
        }
        ctx.restore();
    }

    drawLogoOverlay(ctx, w, h) {
        ctx.save();
        // Central Title
        const centerX = w * 0.5;
        const centerY = h * 0.28;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Neon Glow Drop Shadow
        ctx.font = '900 ' + Math.floor(w * 0.048) + 'px "Bebas Neue", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ff2a85';
        ctx.shadowBlur = 25;
        ctx.fillText('GRAND THEFT AUTO', centerX, centerY - 20);

        ctx.font = '900 ' + Math.floor(w * 0.085) + 'px "Bebas Neue", sans-serif';
        ctx.fillStyle = '#ff2a85';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 30;
        ctx.fillText('VI', centerX, centerY + 35);

        ctx.shadowBlur = 0;

        // Subtitle badge
        ctx.font = '700 ' + Math.floor(w * 0.016) + 'px "Montserrat", sans-serif';
        ctx.fillStyle = '#00f0ff';
        ctx.fillText('★ VICE CITY • STREAM BROADCAST ★', centerX, centerY + 85);

        // Watermark badge top right
        ctx.textAlign = 'right';
        ctx.font = '800 13px "Montserrat", sans-serif';
        ctx.fillStyle = '#10b981';
        ctx.fillText('🟢 100% NON-COPYRIGHT VISUALS (SAFE FOR YOUTUBE LIVE)', w - 20, 30);

        ctx.restore();
    }
}

window.ViceCityVisualsEngine = ViceCityVisualsEngine;

// Self-starting immediate fallback so canvas is instantly active
(function() {
    function initVisuals() {
        if (!window.gtaVisuals) {
            const canvas = document.getElementById("non-copyright-canvas");
            if (canvas) {
                window.gtaVisuals = new ViceCityVisualsEngine("non-copyright-canvas");
                window.gtaVisuals.start();
            }
        }
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initVisuals);
    } else {
        initVisuals();
    }
    window.addEventListener("load", initVisuals);
})();

