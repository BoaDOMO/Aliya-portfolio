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
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'constellations' : 'lsystem';
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
    if (this.mode === 'constellations') {
      this.stars = [];
      for (var i = 0; i < 100; i++) {
        this.stars.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5
        });
      }
    } else {
      this.calcLSystem();
      this.growth = 0;
    }
  }

  calcLSystem() {
    var iterations = 4;
    var axiom = 'F';
    var rules = { F: 'FF+[+F-F-F]-[-F+F+F]' };
    var result = axiom;
    for (var i = 0; i < iterations; i++) {
      var next = '';
      for (var j = 0; j < result.length; j++) {
        var c = result[j];
        next += rules[c] || c;
      }
      result = next;
    }

    var len = 3;
    var angle = 25 * Math.PI / 180;
    var segments = [];
    var stack = [];
    var x = this.canvas.width * 0.5;
    var y = this.canvas.height * 0.75;
    var dir = -Math.PI / 2;

    for (var i = 0; i < result.length; i++) {
      var c = result[i];
      if (c === 'F') {
        var x2 = x + Math.cos(dir) * len;
        var y2 = y + Math.sin(dir) * len;
        segments.push({ x1: x, y1: y, x2: x2, y2: y2 });
        x = x2;
        y = y2;
      } else if (c === '+') {
        dir += angle;
      } else if (c === '-') {
        dir -= angle;
      } else if (c === '[') {
        stack.push({ x: x, y: y, dir: dir });
      } else if (c === ']') {
        var s = stack.pop();
        x = s.x; y = s.y; dir = s.dir;
      }
    }

    this.branches = segments;
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
    } else {
      this.growth = Math.min(1, this.growth + dt * 0.00008);
      if (this.growth >= 1) this.growth = 0;
    }
  }

  draw() {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.mode === 'constellations') {
      this.drawConstellations(ctx);
    } else {
      this.drawLSystem(ctx);
    }
  }

  drawConstellations(ctx) {
    var stars = this.stars;
    var w = this.canvas.width;
    var h = this.canvas.height;
    var maxDist = 150;

    for (var i = 0; i < stars.length; i++) {
      for (var j = i + 1; j < stars.length; j++) {
        var dx = stars[i].x - stars[j].x;
        var dy = stars[i].y - stars[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = 'rgba(255, 255, 255, ' + ((1 - dist / maxDist) * 0.25) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.5 + Math.random() * 0.3) + ')';
      ctx.fill();
    }
  }

  drawLSystem(ctx) {
    var count = Math.floor(this.growth * this.branches.length);
    ctx.strokeStyle = 'rgba(180, 180, 180, 0.1)';
    ctx.lineCap = 'round';

    for (var i = 0; i < count && i < this.branches.length; i++) {
      var b = this.branches[i];
      var t = Math.min(1, this.growth * this.branches.length - i);
      if (t <= 0) continue;

      var x2 = b.x1 + (b.x2 - b.x1) * t;
      var y2 = b.y1 + (b.y2 - b.y1) * t;

      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.observer) this.observer.disconnect();
  }
}
