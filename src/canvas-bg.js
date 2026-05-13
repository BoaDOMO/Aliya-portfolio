class CanvasBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.mode = this.detectTheme();
    this.animId = null;
    this.lastTime = 0;

    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.observer = new MutationObserver(() => this.onThemeChange());
    this.observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    this.initMode();
    this.start();
  }

  detectTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'constellations' : 'aurora';
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

  initMode() {
    if (!this.auroraLayers) {
      this.auroraLayers = [];
      var count = 3 + Math.floor(Math.random() * 2);
      for (var i = 0; i < count; i++) {
        this.auroraLayers.push({
          amp: 40 + Math.random() * 40,
          speed: 0.5 + Math.random() * 1,
          freq: 0.002 + Math.random() * 0.003,
          offset: Math.random() * 2,
          rays: []
        });
        var last = this.auroraLayers[this.auroraLayers.length - 1];
        for (var r = 0; r < 40 + Math.floor(Math.random() * 30); r++) {
          last.rays.push({ xf: Math.random(), len: 10 + Math.random() * 50 });
        }
      }
    }

    if (this.mode === 'constellations') {
      this.stars = [];
      var w = this.canvas.width;
      var h = this.canvas.height;

      for (var i = 0; i < 15; i++) {
        this.stars.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          size: Math.random() * 1.5 + 2, type: 'core'
        });
      }
      for (var i = 0; i < 30; i++) {
        this.stars.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 0.8 + 1, type: 'medium'
        });
      }
      for (var i = 0; i < 55; i++) {
        this.stars.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 0.5 + 0.3, type: 'field'
        });
      }
    }

    this.auroraPhase = 0;
  }

  start() {
    var self = this;
    function loop(time) {
      var dt = self.lastTime ? time - self.lastTime : 16;
      self.lastTime = time;
      self.update(dt);
      self.draw();
      self.animId = requestAnimationFrame(loop);
    }
    this.animId = requestAnimationFrame(loop);
  }

  update(dt) {
    this.auroraPhase += dt * 0.0002;

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
    }
  }

  draw() {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.mode === 'constellations') {
      this.drawAurora(ctx, false);
      this.drawConstellations(ctx);
    } else {
      this.drawAurora(ctx, true);
    }
  }

  drawAurora(ctx, warm) {
    var w = this.canvas.width;
    var h = this.canvas.height;
    var ah = h * 0.35;
    var palette = warm
      ? ['rgba(220, 170, 80, ', 'rgba(210, 140, 120, ', 'rgba(200, 100, 140, ', 'rgba(230, 190, 100, ']
      : ['rgba(30, 180, 120, ', 'rgba(50, 130, 220, ', 'rgba(140, 60, 200, ', 'rgba(60, 200, 180, '];

    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // Aurora bands
    for (var l = 0; l < this.auroraLayers.length; l++) {
      var lay = this.auroraLayers[l];
      var topBase = ah * (1 + lay.offset * 0.1) + Math.sin(this.auroraPhase * lay.speed) * 20;
      var bottomY = ah * 0.7 + lay.offset * 10;

      ctx.beginPath();
      ctx.moveTo(0, topBase);
      for (var x = 0; x <= w; x += 20) {
        var wave = Math.sin((x + this.auroraPhase * 100 * lay.speed) * lay.freq) * lay.amp
                 + Math.sin((x + this.auroraPhase * 60 * lay.speed) * lay.freq * 2) * lay.amp * 0.4;
        ctx.lineTo(x, topBase + wave);
      }
      ctx.lineTo(w, bottomY);
      ctx.lineTo(0, bottomY);
      ctx.closePath();

      var grad = ctx.createLinearGradient(0, topBase - lay.amp, 0, bottomY);
      var a1 = warm ? '0.10' : '0.06';
      var a2 = warm ? '0.04' : '0.025';
      grad.addColorStop(0, palette[l % palette.length] + a1 + ')');
      grad.addColorStop(0.4, palette[l % palette.length] + a2 + ')');
      grad.addColorStop(1, palette[l % palette.length] + '0)');
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // 3. Vertical rays (aurora curtain)
    ctx.filter = 'none';
    ctx.lineWidth = 1;
    for (var l = 0; l < this.auroraLayers.length; l++) {
      var lay = this.auroraLayers[l];
      var topBase = ah * (1 + lay.offset * 0.1) + Math.sin(this.auroraPhase * lay.speed) * 20;
      ctx.strokeStyle = palette[l % palette.length] + (warm ? '0.035' : '0.025') + ')';
      ctx.beginPath();
      for (var r = 0; r < lay.rays.length; r++) {
        var ray = lay.rays[r];
        var x = ray.xf * w;
        var wave = Math.sin((x + this.auroraPhase * 100 * lay.speed) * lay.freq) * lay.amp
                 + Math.sin((x + this.auroraPhase * 60 * lay.speed) * lay.freq * 2) * lay.amp * 0.4;
        ctx.moveTo(x, topBase + wave);
        ctx.lineTo(x, topBase + wave + ray.len);
      }
      ctx.stroke();
    }

    ctx.restore();
  }

  drawConstellations(ctx) {
    var stars = this.stars;
    var w = this.canvas.width;
    var h = this.canvas.height;
    var cores = [];
    var mediums = [];

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (s.type === 'core') cores.push({ star: s, idx: i });
      else if (s.type === 'medium') mediums.push({ star: s, idx: i });
    }

    // ── Core → Core connections (nearest-2) ──
    for (var i = 0; i < cores.length; i++) {
      var cx1 = cores[i].star.x, cy1 = cores[i].star.y;
      var dists = [];
      for (var j = 0; j < cores.length; j++) {
        if (i === j) continue;
        var dx = cx1 - cores[j].star.x, dy = cy1 - cores[j].star.y;
        dists.push({ d: Math.sqrt(dx * dx + dy * dy), star: cores[j] });
      }
      dists.sort(function(a, b) { return a.d - b.d; });
      for (var k = 0; k < 2 && k < dists.length; k++) {
        ctx.beginPath();
        ctx.moveTo(cx1, cy1);
        ctx.lineTo(dists[k].star.x, dists[k].star.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + (Math.max(0, 1 - dists[k].d / Math.max(w, h)) * 0.3) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // ── Medium → nearest Core (within 150px) ──
    for (var i = 0; i < mediums.length; i++) {
      var mx = mediums[i].star.x, my = mediums[i].star.y;
      var best = null, bestD = 151;
      for (var j = 0; j < cores.length; j++) {
        var dx = mx - cores[j].star.x, dy = my - cores[j].star.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < bestD) { bestD = d; best = cores[j].star; }
      }
      if (best && bestD < 150) {
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(best.x, best.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + ((1 - bestD / 150) * 0.2) + ')';
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }
    }

    // ── Draw stars ──
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (s.type === 'field') continue;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.6 + Math.random() * 0.3) + ')';
      ctx.fill();
    }
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.observer) this.observer.disconnect();
  }
}
