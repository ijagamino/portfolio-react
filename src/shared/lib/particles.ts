export interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
}

export function setupCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function generateParticleTargets(count: number) {
  return Array.from({ length: count }, () => ({
    targetX: Math.random() * window.innerWidth,
    targetY: Math.random() * window.innerHeight,
  }));
}

export function createParticlesFromPoint(
  element: HTMLElement,
  targets: { targetX: number; targetY: number }[],
): Particle[] {
  const rect = element.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  return targets.map(({ targetX, targetY }) => ({
    x: originX,
    y: originY,
    size: Math.random() * 3 + 1,
    vx: targetX - originX,
    vy: targetY - originY,
    alpha: 1,
  }));
}

export function createParticlesFromText(
  element: HTMLElement,
  reductionFactor = 3,
): Particle[] {
  const particles: Particle[] = [];

  const offscreen = document.createElement("canvas");
  const rect = element.getBoundingClientRect();
  offscreen.width = rect.width;
  offscreen.height = rect.height;

  const offCtx = offscreen.getContext("2d");
  if (!offCtx) return particles;

  const style = getComputedStyle(element);
  offCtx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  offCtx.fillStyle = style.color;
  offCtx.textBaseline = "top";
  offCtx.fillText(element.innerText, 0, 0);

  const imageData = offCtx.getImageData(
    0,
    0,
    offscreen.width,
    offscreen.height,
  );
  const pixels = imageData.data;

  for (let y = 0; y < offscreen.height; y += reductionFactor) {
    for (let x = 0; x < offscreen.width; x += reductionFactor) {
      const idx = (y * offscreen.width + x) * 4;
      const alpha = pixels[idx + 3];

      if (alpha < 128) continue;

      particles.push({
        x: rect.left + x,
        y: rect.top + y,
        vx: Math.random() * window.innerWidth - (rect.left + x),
        vy: Math.random() * window.innerHeight - (rect.top + y),
        alpha: 1,
        size: Math.random() * 2 + 1,
      });
    }
  }

  return particles;
}

export function renderParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  color: string,
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  particles.forEach((p) => {
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
}
