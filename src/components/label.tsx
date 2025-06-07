import React, { JSX, useEffect, useRef, useState } from "react";
import { useSynthState, LabelState } from "../state/synth";
import { sizer } from "../utils/sizing";

export function Label({ id, x, y, label, dx, dy, includeRect, textStyles, rectStyles  }: LabelState): JSX.Element {
  includeRect = includeRect ?? true;
  const maskTextRef = useRef<SVGTextElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const rectRef = useRef<SVGRectElement>(null);

  const synthState = useSynthState().state;
  const { vz } = sizer();

  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;


  const transformTextStyles: React.CSSProperties = {
    ...textStyles,
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
      rectRef.current?.setAttribute('x', rectX);
      rectRef.current?.setAttribute('y', rectY);
      rectRef.current?.setAttribute('width', (textRect.width + 2*hPadding).toString());
      rectRef.current?.setAttribute('height', (textRect.height + 2*vPadding).toString());

      maskTextRef.current?.setAttribute('x', (textRect.left - svgRect.left).toString());
      maskTextRef.current?.setAttribute('y', (textRect.top - svgRect.top + 7.5).toString());
    }
  }, [id]);

  
  /*

  TODO: Rather than move the mask around and keeping it in a group, have the
  mast be the whole screen and the text positioned in there exactly like the
  source text. Then we can address it from the knob too.

  */

  //const rotate = label.split('').map(() => Math.random()*10 - 10/2).join(' ');
  const rotate = '';

  return (
    <g>
      {includeRect && (<g>
        <rect ref={rectRef} style={rectStyles} x="0" y="0" rx="5" ry="5" />
      </g>)}
      <text
        ref={textRef}
        x={vz(cx+(dx ?? 0))}
        y={vz(cy+(dy ?? 0))}
        textAnchor="middle"
        dominantBaseline="middle"
        style={transformTextStyles}
        rotate={rotate}
        >{label}</text>
    </g>
  );
}
