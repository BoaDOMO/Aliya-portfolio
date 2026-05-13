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
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'constellations' : 'phyllotaxis';
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cx = this.canvas.width * 0.5;
    this.cy = this.canvas.height * 0.5;
  }

  onThemeChange() {
    var newMode = this.detectTheme();
    if (newMode === this.mode) return;
    this.mode = newMode;
    this.initMode();
  }

  initMode() {
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

      this.auroraPhase = 0;
    } else {
      this.phylloCount = 350;
      this.phylloScale = 4.5;
      this.goldenAngle = 137.508 * Math.PI / 180;
      this.phylloTime = 0;

      this.points = [];
      for (var i = 0; i < this.phylloCount; i++) {
        var r = this.phylloScale * Math.sqrt(i);
        this.points.push({ r: r, baseAngle: i * this.goldenAngle });
      }
    }
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
      this.auroraPhase += dt * 0.0002;
    } else {
      this.phylloTime += dt * 0.00015;
    }
  }

  draw() {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.mode === 'constellations') {
      this.drawConstellations(ctx);
    } else {
      this.drawPhyllotaxis(ctx);
    }
  }

  drawPhyllotaxis(ctx) {
    var cx = this.cx;
    var cy = this.cy;
    var w = this.canvas.width;
    var h = this.canvas.height;

    for (var i = 0; i < this.points.length; i++) {
      var p = this.points[i];
      var angle = p.baseAngle + this.phylloTime;
      var x = cx + Math.cos(angle) * p.r;
      var y = cy + Math.sin(angle) * p.r;

      if (x < -20 || x > w + 20 || y < -20 || y > h + 20) continue;

      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(140, 140, 140, 0.45)';
      ctx.fill();

      if (i > 0 && i < this.points.length - 1) {
        var next = this.points[i + 1];
        var na = next.baseAngle + this.phylloTime;
        var nx = cx + Math.cos(na) * next.r;
        var ny = cy + Math.sin(na) * next.r;

        var dx = nx - x;
        var dy = ny - y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 40) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nx, ny);
          ctx.strokeStyle = 'rgba(140, 140, 140, ' + ((1 - dist / 40) * 0.12) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
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

    // ── Aurora ──
    var ah = h * 0.35;
    var layers = [
      { offset: 0, amp: 60, speed: 1, color: 'rgba(30, 180, 120, ' },
      { offset: 0.5, amp: 80, speed: 0.7, color: 'rgba(50, 130, 220, ' },
      { offset: 1.2, amp: 50, speed: 1.3, color: 'rgba(140, 60, 200, ' }
    ];

    for (var l = 0; l < layers.length; l++) {
      var lay = layers[l];
      ctx.beginPath();
      ctx.moveTo(0, ah * (1 + lay.offset * 0.15) + Math.sin(this.auroraPhase * lay.speed) * 20);
      for (var x = 0; x <= w; x += 20) {
        var wave = Math.sin((x + this.auroraPhase * 100 * lay.speed) * 0.003) * lay.amp
                 + Math.sin((x + this.auroraPhase * 60 * lay.speed) * 0.007) * lay.amp * 0.4;
        var y = ah * (1 + lay.offset * 0.15) + wave;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, ah * 0.7 + lay.offset * 20);
      ctx.lineTo(0, ah * 0.7 + lay.offset * 20);
      ctx.closePath();
      ctx.fillStyle = lay.color + '0.04)';
      ctx.fill();
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
