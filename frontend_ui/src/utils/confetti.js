/**
 * Lightweight canvas confetti burst (dependency-free).
 * Uses an overlay canvas and animates a short particle burst.
 */

/**
 * PUBLIC_INTERFACE
 * Launch a short confetti burst. Safe to call multiple times; it will clean itself up.
 * @param {object} opts
 * @param {number} [opts.durationMs=1200] - Total animation time.
 * @param {number} [opts.particleCount=90] - Number of particles to spawn.
 * @param {number} [opts.spread=80] - Angular spread in degrees.
 * @param {string[]} [opts.colors] - Particle colors.
 */
export function burstConfetti(opts = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const {
    durationMs = 1200,
    particleCount = 90,
    spread = 80,
    colors = ["#2563eb", "#f59e0b", "#0ea5e9", "#22c55e", "#ffffff"],
  } = opts;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Canvas overlay
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
  const resize = () => {
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();

  const cx = window.innerWidth / 2;
  const cy = Math.max(120, window.innerHeight * 0.22);

  const rand = (min, max) => min + Math.random() * (max - min);
  const gravity = 980; // px/s^2
  const drag = 0.995;

  const baseAngle = -Math.PI / 2; // upwards
  const spreadRad = (spread * Math.PI) / 180;

  const particles = Array.from({ length: particleCount }, () => {
    const angle = baseAngle + rand(-spreadRad / 2, spreadRad / 2);
    const speed = rand(420, 920); // px/s
    const size = rand(3, 6);
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      x: cx + rand(-18, 18),
      y: cy + rand(-6, 6),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      rot: rand(0, Math.PI * 2),
      vr: rand(-9, 9),
      color,
      life: rand(0.85, 1.15),
    };
  });

  let raf = 0;
  const start = performance.now();
  let last = start;

  const draw = (now) => {
    const elapsed = now - start;
    const dt = Math.min(0.032, (now - last) / 1000);
    last = now;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Gentle fade near end for a softer exit.
    const t = Math.min(1, elapsed / durationMs);
    const globalAlpha = t < 0.75 ? 1 : Math.max(0, 1 - (t - 0.75) / 0.25);
    ctx.globalAlpha = globalAlpha;

    for (const p of particles) {
      p.vy += gravity * dt;
      p.vx *= drag;
      p.vy *= drag;

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      p.rot += p.vr * dt;

      // draw as a tiny rotated rectangle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.35);
      ctx.restore();
    }

    if (elapsed < durationMs) {
      raf = window.requestAnimationFrame(draw);
      return;
    }
    cleanup();
  };

  const cleanup = () => {
    window.cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  };

  window.addEventListener("resize", resize);
  raf = window.requestAnimationFrame(draw);
}
