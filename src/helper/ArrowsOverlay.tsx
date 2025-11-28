/* eslint-disable react-hooks/set-state-in-effect */
import { useLayoutEffect, useRef, useState } from "react";

export const ArrowsOverlay: React.FC<{ step: number }> = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [lines, setLines] = useState<
    { from: { x: number; y: number }; to: { x: number; y: number } }[]
  >([]);

  useLayoutEffect(() => {
    const container = svgRef.current?.parentElement;
    if (!container) return;

    const refs = Array.from(
      container.querySelectorAll<HTMLElement>("[data-ref-id]")
    );
    const heaps = Array.from(
      container.querySelectorAll<HTMLElement>("[data-heap-id]")
    );

    const heapMap = new Map(
      heaps.map((el) => [el.dataset.heapId as string, el])
    );

    const newLines: typeof lines = [];

    refs.forEach((refEl) => {
      const id = refEl.dataset.refId!;
      const target = heapMap.get(id);
      if (!target) return;

      const cRect = container.getBoundingClientRect();
      const rRect = refEl.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();

      const from = {
        x: rRect.right - cRect.left,
        y: rRect.top + rRect.height / 2 - cRect.top,
      };
      const to = {
        x: tRect.left - cRect.left,
        y: tRect.top + tRect.height / 2 - cRect.top,
      };
      newLines.push({ from, to });
    });

    setLines(newLines);
  }, []);

  return (
    <svg ref={svgRef} className="pointer-events-none absolute inset-0">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="4"
          refX="6"
          refY="2"
          orient="auto"
        >
          <polygon points="0 0, 6 2, 0 4" fill="hsl(var(--primary))" />
        </marker>
      </defs>
      {lines.map((line, idx) => (
        <line
          key={idx}
          x1={line.from.x}
          y1={line.from.y}
          x2={line.to.x}
          y2={line.to.y}
          stroke="hsl(var(--primary))"
          strokeWidth={1}
          markerEnd="url(#arrowhead)"
          strokeDasharray="4 3"
        />
      ))}
    </svg>
  );
};
