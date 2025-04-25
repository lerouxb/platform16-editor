import React, { JSX, useEffect, useRef, useState } from "react";
import { useSynthState, LabelState } from "../state/synth";

export function Label({ id, x, y, label, angle, dx, dy, includeRect, textStyles, rectStyles  }: LabelState): JSX.Element {
  includeRect = includeRect ?? true;
  const textRef = useRef<SVGTextElement>(null);
  const rectRef = useRef<SVGRectElement>(null);

  const synthState = useSynthState().state;

  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;


  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: dx ?? 0, y: dy ?? 0 });                                                                                                                                                  

  const transformTextStyles: React.CSSProperties = {
    ...textStyles,
    transform: `translate(${coordinates.x}px, ${coordinates.y}px) rotate(${angle}deg)`,
    transformOrigin: `${cx}mm ${cy}mm`,
  };

  useEffect(() => {
    if (textRef.current) {
      const textRect = textRef.current.getBoundingClientRect();
      const svgRect = textRef.current.ownerSVGElement?.getBoundingClientRect();
      if (!svgRect) {
        return;
      }
      const hPadding = 5;
      const vPadding = 2;

      rectRef.current?.setAttribute('x', (textRect.left - svgRect.left - hPadding).toString());
      rectRef.current?.setAttribute('y', (textRect.top - svgRect.top - vPadding).toString());
      rectRef.current?.setAttribute('width', (textRect.width + 2*hPadding).toString());
      rectRef.current?.setAttribute('height', (textRect.height + 2*vPadding).toString());
      // You can now use rect to position other elements or for any other purpose
      console.log(id, textRect);
    }
  }, [id, coordinates]);

  return (
    <g>
      {includeRect && <rect ref={rectRef} style={rectStyles} rx="5" ry="5" />}
      <g
        onPointerDown={e => {
          const el = e.currentTarget;
          el.setPointerCapture(e.pointerId);
          const bbox = (e.target as HTMLElement).getBoundingClientRect();
          const x = e.clientX - bbox.left;
          const y = e.clientY - bbox.top;
          // Record our starting point.
          setOrigin({ x, y });
          setDragging(true);
        }}
        onPointerMove={e => {
          if (dragging) {
            const bbox = (e.target as HTMLElement).getBoundingClientRect();
            const x = e.clientX - bbox.left;
            const y = e.clientY - bbox.top;
            // Set state for the change in coordinates.
            console.log(id, label, `dx: ${coordinates.x- (origin.x - x)}, dy: ${coordinates.y - (origin.y - y)}`);
            setCoordinates({
              x: coordinates.x - (origin.x - x),
              y: coordinates.y - (origin.y - y),
            });
          }
        }}
        onPointerUp={() => {
          setDragging(false);
        }}
      >
      <text
        ref={textRef}
        x={`${cx}mm`}
        y={`${cy}mm`}
        textAnchor="middle"
        dominantBaseline="middle"
        style={transformTextStyles}
        >{label}</text>
      </g>
    </g>
  );
}