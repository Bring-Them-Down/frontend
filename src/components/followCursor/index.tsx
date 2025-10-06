import { useRef, useEffect } from "react";
import { DroneIcon } from "../droneIcon";

export function FollowCursor({
  size = 48,
  smoothing = 0.12,
  offsetCenter = true,
  className = "",
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const posRef = useRef({ x: targetRef.current.x, y: targetRef.current.y });
  const lastRef = useRef({ x: posRef.current.x, y: posRef.current.y });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function onMove(e: any) {
      const x =
        e.clientX ??
        (e.touches && e.touches[0]?.clientX) ??
        targetRef.current.x;
      const y =
        e.clientY ??
        (e.touches && e.touches[0]?.clientY) ??
        targetRef.current.y;
      const offset = 40;
      targetRef.current.x = x - offset;
      targetRef.current.y = y - offset;
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });

    function update() {
      const t = targetRef.current;
      const p = posRef.current;
      p.x += (t.x - p.x) * smoothing;
      p.y += (t.y - p.y) * smoothing;

      const last = lastRef.current;
      const dx = p.x - last.x;
      const dy = p.y - last.y;
      let angle = 0;
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      }

      if (elRef.current) {
        const translateX = Math.round(p.x);
        const translateY = Math.round(p.y);
        const centerOffset = offsetCenter ? "translate(-50%, -50%)" : "";
        elRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) ${centerOffset} rotate(${
          angle + 90
        }deg)`;
      }

      last.x = p.x;
      last.y = p.y;

      rafRef.current = requestAnimationFrame(update);
    }

    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [smoothing, offsetCenter]);

  return (
    <div
      ref={elRef}
      className={`pointer-events-none fixed left-0 top-0 z-[9999] ${className}`}
      style={{
        width: size,
        height: size,
        transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`,
        willChange: "transform",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DroneIcon />
    </div>
  );
}
