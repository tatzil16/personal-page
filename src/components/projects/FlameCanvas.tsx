"use client";

import { useEffect, useRef } from "react";

// Smooth noise for organic flow
function noise(x: number, y: number, t: number): number {
  const s1 = Math.sin(x * 0.8 + t * 0.7) * Math.cos(y * 0.6 + t * 0.5);
  const s2 = Math.sin(x * 1.3 - t * 0.4) * Math.cos(y * 1.1 + t * 0.3);
  const s3 = Math.sin((x + y) * 0.5 + t * 0.6) * 0.5;
  const s4 = Math.cos(x * 0.3 - y * 0.7 + t * 0.8) * Math.sin(x * 0.9 + t * 0.2);
  return (s1 + s2 + s3 + s4) * 0.25;
}

export default function FlameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? -(window.scrollY / maxScroll) : 0;
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const scroll = scrollRef.current;
      const scrollAbs = Math.abs(scroll);
      const brightness = 0.35 + scrollAbs * 1.65;

      // Clear
      ctx!.fillStyle = "#06060f";
      ctx!.fillRect(0, 0, w, h);

      // Draw smooth flowing layers using wide horizontal gradient bands
      const layerCount = 6;
      for (let l = 0; l < layerCount; l++) {
        const speed = 0.3 + l * 0.12;
        const t = time * speed;
        const scrollShift = scroll * h * 1.2 * (speed * 0.8);
        const baseHue = 255 + l * 8;

        // Each layer is a series of smooth horizontal bands
        for (let y = 0; y < h; y += 2) {
          const ny = (y + scrollShift) / h;

          // Multiple noise octaves for smoother look
          const n1 = noise(ny * 3, l * 1.7, t);
          const n2 = noise(ny * 5, l * 2.3, t * 1.4) * 0.5;
          const n3 = noise(ny * 8, l * 0.5, t * 0.7) * 0.25;
          const val = (n1 + n2 + n3) / 1.75;

          if (val < 0.02) continue;

          const intensity = Math.pow(val, 1.2);
          const alpha = intensity * 0.18 * brightness;
          if (alpha < 0.005) continue;

          const hue = baseHue + scroll * 50 + n1 * 20;
          const sat = 65 + intensity * 35;
          const light = 35 + intensity * 40;

          // Horizontal variation - the band shimmers across x
          const xWarp1 = noise(ny * 2, l, t * 0.5) * w * 0.3;
          const xWarp2 = noise(ny * 4, l + 5, t * 0.8) * w * 0.15;
          const bandWidth = w * (0.4 + intensity * 0.6);
          const bandCenter = w * 0.5 + xWarp1 + xWarp2;

          const grad = ctx!.createLinearGradient(
            bandCenter - bandWidth / 2, y,
            bandCenter + bandWidth / 2, y
          );
          grad.addColorStop(0, `hsla(${hue}, ${sat}%, ${light}%, 0)`);
          grad.addColorStop(0.2, `hsla(${hue}, ${sat}%, ${light}%, ${alpha * 0.4})`);
          grad.addColorStop(0.5, `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`);
          grad.addColorStop(0.8, `hsla(${hue}, ${sat}%, ${light}%, ${alpha * 0.4})`);
          grad.addColorStop(1, `hsla(${hue}, ${sat}%, ${light}%, 0)`);

          ctx!.fillStyle = grad;
          ctx!.fillRect(0, y, w, 3);
        }
      }

      // Floating embers
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const seed = i * 137.508;
        const px = (seed * 7.31) % w;
        const baseYp = (seed * 13.17) % h;
        const py = (baseYp - time * (15 + (i % 5) * 6) + scroll * h * 0.5) % h;
        const adjustedPy = py < 0 ? py + h : py;

        const flicker = 0.5 + 0.5 * Math.sin(time * 2 + seed);
        const size = 1 + flicker * 1.5;
        const alpha = (0.1 + flicker * 0.2) * brightness;

        ctx!.beginPath();
        ctx!.arc(px + Math.sin(time + seed) * 12, adjustedPy, size, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(270, 70%, 75%, ${alpha})`;
        ctx!.fill();
      }

      // Soft vignette
      const vigGrad = ctx!.createRadialGradient(w / 2, h / 2, h * 0.25, w / 2, h / 2, h * 0.85);
      vigGrad.addColorStop(0, "rgba(6, 6, 15, 0)");
      vigGrad.addColorStop(1, "rgba(6, 6, 15, 0.5)");
      ctx!.fillStyle = vigGrad;
      ctx!.fillRect(0, 0, w, h);

      time += 0.016;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
