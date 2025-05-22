import React, { JSX, useEffect, useRef, useState } from "react";
import { useSynthState, LabelState } from "../state/synth";

export function Label({ id, x, y, label, dx, dy, includeRect, textStyles, rectStyles  }: LabelState): JSX.Element {
  includeRect = includeRect ?? true;
  const maskTextRef = useRef<SVGTextElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const rectRef = useRef<SVGRectElement>(null);

  const synthState = useSynthState().state;

  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;


  //const [origin, setOrigin] = useState({ x: 0, y: 0 });
  //const [dragging, setDragging] = useState(false);
  //const [coordinates, setCoordinates] = useState({ x: dx ?? 0, y: dy ?? 0 });                                                                                                                                                  

  const transformTextStyles: React.CSSProperties = {
    ...textStyles,
    //transform: `translate(${coordinates.x}px, ${coordinates.y}px) rotate(${angle}deg)`,
    //transform: `translate(${dx}px, ${dy}px)`,
    //transformOrigin: `${cx}mm ${cy}mm`,
  };

  useEffect(() => {
    if (textRef.current) {
      const textRect = textRef.current.getBoundingClientRect();
      const svgRect = textRef.current.ownerSVGElement?.getBoundingClientRect();
      if (!svgRect) {
        return;
      }

      console.log(textRect);
      const hPadding = 4;
      const vPadding = 2;

      const rectX = (textRect.left - svgRect.left - hPadding).toString();
      const rectY = (textRect.top - svgRect.top - vPadding).toString();
      //gRef.current?.setAttribute('style', `transform: translate(${rectX}px, ${rectY}px)`);
      rectRef.current?.setAttribute('x', rectX);
      rectRef.current?.setAttribute('y', rectY);
      rectRef.current?.setAttribute('width', (textRect.width + 2*hPadding).toString());
      rectRef.current?.setAttribute('height', (textRect.height + 2*vPadding).toString());

      maskTextRef.current?.setAttribute('x', (textRect.left - svgRect.left).toString());
      maskTextRef.current?.setAttribute('y', (textRect.top - svgRect.top + 7.5).toString());
      // You can now use rect to position other elements or for any other purpose
      //console.log(id, textRect);
    }
  }, [id/*, coordinates*/]);

  
  /*

  TODO: Rather than move the mask around and keeping it in a group, have the
  mast be the whole screen and the text positioned in there exactly like the
  source text. Then we can address it from the knob too.

  */


  return (
    <g>
      {includeRect && (<g>
        <rect ref={rectRef} style={rectStyles} x="0" y="0" rx="5" ry="5" />
      </g>)}
      <text
        ref={textRef}
        x={`${cx+(dx ?? 0)}mm`}
        y={`${cy+(dy ?? 0)}mm`}
        textAnchor="middle"
        dominantBaseline="middle"
        style={transformTextStyles}
        >{label}</text>
    </g>
  );
}

/*
        <mask id={`label-mask-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <rect width="1000px" height="1000px" fill="white" />
          <text
            ref={maskTextRef}
            style={{...textStyles, fill: 'black'}}
            >{label}</text>
        </mask>
 mask={`url(#label-mask-${id})`}
*/

    /*
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
    </g>
        */