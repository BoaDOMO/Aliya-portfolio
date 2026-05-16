class CanvasBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.mode = this.detectTheme();
    this.animId = null;
    this.lastTime = 0;
    this.lightComboIndex = -1;

    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.lightPhase = 0;

    this.observer = new MutationObserver(() => this.onThemeChange());
    this.observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    this.LIGHT_COMBOS = [
      { label: 'Diagonal Split', gx: 0, gy: 0, gx2: 1, gy2: 1, stops: [{ pos: 0, color: 'rgba(156,175,136,0.4)' }, { pos: 1, color: 'rgba(255,235,200,0.5)' }] },
      { label: 'Top Blend', gx: 0.5, gy: 0, gx2: 0.5, gy2: 1, stops: [{ pos: 0, color: 'rgba(156,175,136,0.35)' }, { pos: 0.5, color: 'rgba(255,235,200,0.3)' }, { pos: 1, color: 'transparent' }] },
      { label: 'Bottom Glow', gx: 0.5, gy: 1, gx2: 0.5, gy2: 0, stops: [{ pos: 0, color: 'rgba(156,175,136,0.3)' }, { pos: 0.5, color: 'rgba(255,235,200,0.4)' }, { pos: 1, color: 'transparent' }] },
      { label: 'Corner Overlap', gx: 1, gy: 0, gx2: 0, gy2: 1, stops: [{ pos: 0, color: 'rgba(255,235,200,0.3)' }, { pos: 0.6, color: 'rgba(255,235,200,0.06)' }, { pos: 1, color: 'transparent' }] },
      { label: 'Cascade', gx: 0.5, gy: 0, gx2: 0.5, gy2: 1, stops: [{ pos: 0, color: 'rgba(156,175,136,0.3)' }, { pos: 0.4, color: 'rgba(255,235,200,0.4)' }, { pos: 0.7, color: 'rgba(156,175,136,0.15)' }, { pos: 1, color: 'transparent' }] }
    ];

    this.initMode();
    this.start();
  }

  detectTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'constellations' : 'empty';
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  onThemeChange() {
    var newMode = this.detectTheme();
    if (newMode === this.mode) return;
    this.mode = newMode;
    this.initMode();
  }

  setLightCombo(index) {
    if (index >= 0 && index < this.LIGHT_COMBOS.length) {
      this.lightComboIndex = index;
      this.lightCombo = this.LIGHT_COMBOS[index];
    }
  }

  initMode() {
    if (this.mode === 'constellations') {
      this.stars = [];
      var w = this.canvas.width;
      var h = this.canvas.height;
      var total = Math.min(200, Math.floor(w * h / 13000));
      var coreCount = Math.floor(total * 0.15);
      var mediumCount = Math.floor(total * 0.3);
      var fieldCount = total - coreCount - mediumCount;

      for (var i = 0; i < coreCount; i++) {
        this.stars.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          size: Math.random() * 1.5 + 2, type: 'core',
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinklePhase: Math.random() * 6,
          hue: Math.random() < 0.5 ? 200 + Math.random() * 40 : 30 + Math.random() * 30
        });
      }
      for (var i = 0; i < mediumCount; i++) {
        this.stars.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 0.8 + 1, type: 'medium',
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinklePhase: Math.random() * 6,
          hue: Math.random() < 0.5 ? 200 + Math.random() * 40 : 30 + Math.random() * 30
        });
      }
      for (var i = 0; i < fieldCount; i++) {
        this.stars.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 0.5 + 0.3, type: 'field'
        });
      }

      this.shootingStar = null;
      this.nextShootTimer = 5000 + Math.random() * 5000;

      this.skyGradient = ['rgba(30,10,45,0.5)', 'rgba(18,12,30,0.3)', 'transparent'];
    } else if (this.lightComboIndex < 0) {
      this.lightComboIndex = 3;
      this.lightCombo = this.LIGHT_COMBOS[3];
    }
  }

  start() {
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    var self = this;
    function loop(time) {
      if (self.paused) return;
      var dt = self.lastTime ? time - self.lastTime : 16;
      self.lastTime = time;
      self.update(dt);
      self.draw();
      self.animId = requestAnimationFrame(loop);
    }
    this.animId = requestAnimationFrame(loop);
    this.paused = false;
    var onVis = function () {
      if (document.hidden) {
        self.paused = true;
        if (self.animId) cancelAnimationFrame(self.animId);
      } else {
        self.paused = false;
        self.lastTime = 0;
        self.animId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    this._visHandler = onVis;
    this._rmHandler = function () { self.stop(); };
    mq.addEventListener('change', this._rmHandler);
  }

  stop() {
    this.paused = true;
    if (this.animId) cancelAnimationFrame(this.animId);
    this.animId = null;
  }

  update(dt) {
    if (this.mode === 'constellations') {
      for (var i = 0; i < this.stars.length; i++) {
        var s = this.stars[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x += this.canvas.width;
        if (s.x > this.canvas.width) s.x -= this.canvas.width;
        if (s.y < 0) s.y += this.canvas.height;
        if (s.y > this.canvas.height) s.y -= this.canvas.height;
      }

      if (this.shootingStar) {
        this.shootingStar.x += this.shootingStar.dx;
        this.shootingStar.y += this.shootingStar.dy;
        this.shootingStar.life -= dt * 0.001;
        if (this.shootingStar.life <= 0) {
          this.shootingStar = null;
          this.nextShootTimer = 5000 + Math.random() * 8000;
        }
      } else {
        this.nextShootTimer -= dt;
        if (this.nextShootTimer <= 0) {
          var angle = (Math.random() - 0.5) * 0.7;
          var fromRight = Math.random() < 0.5;
          var angle = fromRight
            ? Math.PI + (Math.random() - 0.5) * 0.7
            : (Math.random() - 0.5) * 0.7;
          var speed = 3 + Math.random() * 4;
          var colors = [
            '255, 245, 220', '255, 230, 120', '255, 190, 100',
            '200, 220, 255', '255, 255, 255'
          ];
          this.shootingStar = {
            x: fromRight ? this.canvas.width + 10 : -10,
            y: 0.05 + Math.random() * 0.9 * this.canvas.height,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            life: 0.8 + Math.random() * 1.7,
            maxLife: 0.8 + Math.random() * 1.7,
            width: 1.5 + Math.random() * 2.5,
            alpha: 0.5 + Math.random() * 0.5,
            trail: speed * (15 + Math.random() * 10),
            color: colors[Math.floor(Math.random() * colors.length)]
          };
        }
      }
    } else {
      this.lightPhase += dt * 0.001;
    }
  }

  draw() {
    var ctx = this.ctx;
    var w = this.canvas.width;
    var h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (this.mode === 'constellations') {
      if (this.skyGradient) {
        var grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, this.skyGradient[0]);
        grad.addColorStop(0.25, this.skyGradient[1]);
        grad.addColorStop(1, this.skyGradient[2]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
      this.drawConstellations(ctx);
      this.drawShootingStar(ctx);
    } else if (this.lightCombo) {
      ctx.globalCompositeOperation = 'multiply';
      var g = ctx.createLinearGradient(this.lightCombo.gx * w, this.lightCombo.gy * h, this.lightCombo.gx2 * w, this.lightCombo.gy2 * h);
      for (var i = 0; i < this.lightCombo.stops.length; i++) {
        g.addColorStop(this.lightCombo.stops[i].pos, this.lightCombo.stops[i].color);
      }
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      // Subtle vignette
      var pulse = 0.85 + Math.sin(this.lightPhase) * 0.15;
      var vig = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, Math.max(w, h) * 0.7);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(0.6, 'transparent');
      vig.addColorStop(1, 'rgba(100, 70, 50, ' + (0.06 + 0.03 * pulse) + ')');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      // Pulse overlay
      ctx.fillStyle = 'rgba(255, 220, 180, ' + (0.015 + 0.015 * pulse) + ')';
      ctx.fillRect(0, 0, w, h);
    }
  }

  drawConstellations(ctx) {
    var stars = this.stars;
    var w = this.canvas.width;

    // ── Draw stars ──
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (s.type === 'field') continue;
      var twinkle = 0.5 + Math.sin(this.lastTime * 0.002 * s.twinkleSpeed + s.twinklePhase) * 0.25;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + s.hue + ', 30%, 80%, ' + (0.5 + twinkle * 0.4) + ')';
      ctx.fill();
    }
  }

  drawShootingStar(ctx) {
    var ss = this.shootingStar;
    if (!ss) return;
    var t = ss.life / ss.maxLife;
    ctx.beginPath();
    ctx.moveTo(ss.x, ss.y);
    ctx.lineTo(ss.x - ss.dx * ss.trail * t, ss.y - ss.dy * ss.trail * t);
    ctx.strokeStyle = 'rgba(' + ss.color + ', ' + (t * ss.alpha) + ')';
    ctx.lineWidth = ss.width;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  destroy() {
    this.stop();
    if (this.observer) this.observer.disconnect();
    if (this._visHandler) document.removeEventListener('visibilitychange', this._visHandler);
    if (this._rmHandler) window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', this._rmHandler);
  }
}
