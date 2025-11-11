import React, { JSX } from 'react';
import { useSynthState } from '../state/synth';
import { sizer } from '../utils/sizing';
import type { IconState, TriangleIconState } from '../state/synth';

type SpokeState = {
  x: number,
  y: number,
  r1: number,
  r2: number,
  angle: number,
  width: number,
  icon?: IconState,
  iconSpacing?: number
}

function TriangleIcon({ x, y, triangles = 1, up = true, bold = false, two=false }: TriangleIconState & { x: number, y: number, bold?: boolean }): JSX.Element {
  const points = [];
  const { vz } = sizer();

  if (bold) {
    x -= 0.1;
  }

  y -= 0.5;

  const width = triangles === 4 ? 2.5 : 1.25;
  const height = 1.25;

  let cx = x - width/2;
  let cytop = y - height/2;
  let cybottom = cytop + height;
  let cy = up ? cybottom : cytop;

  let cw = width/triangles;
  points.push(`${vz(cx)},${vz(cy)}`); 
  for (let i=0; i < triangles; i++) {
    const cx2 = cx + cw/2;
    const cx3 = cx + cw;
    const cy2 = cy === cytop ? cybottom : cytop; 
    const cy3 = cy;
    cx = cx3;
    points.push(`${vz(cx2)},${vz(cy2)}`, `${vz(cx3)},${vz(cy3)}`);
  }

  console.log({ points });

  const strokeWidth = bold ? 0.4 : 0.25;
  
  return <polyline points={points.join(' ')} fill="none" stroke="black" strokeWidth={vz(strokeWidth)}/>;
}

export function Spoke({ x, y, r1, r2, angle, width, icon, iconSpacing = 1.75 }: SpokeState): JSX.Element {
  const synthState = useSynthState().state;
  const { vz } = sizer();

  const textStyles: React.CSSProperties = {
    fontFamily: '"Roboto"',
    fontWeight: 800,
    fontSize: vz(typeof icon === 'string' && icon.length === 1 ? 3 : 1.75),
    fill: 'black',
  };

  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;

  const x1 = cx + r1 * Math.cos(angle * Math.PI / 180);
  const y1 = cy + r1 * Math.sin(angle * Math.PI / 180);

  const x2 = cx + r2 * Math.cos(angle * Math.PI / 180);
  const y2 = cy + r2 * Math.sin(angle * Math.PI / 180);

  const r3 = r2 + iconSpacing;

  const x3 = cx + r3 * Math.cos(angle * Math.PI / 180);
  const y3 = cy + r3 * Math.sin(angle * Math.PI / 180) + (0.6/1.75 * iconSpacing);

 return <g>
  <line x1={vz(x1)} x2={vz(x2)} y1={vz(y1)} y2={vz(y2)} stroke="black" strokeWidth={vz(width)} strokeLinecap="round" />
  {icon && typeof icon === 'string' && <text x={vz(x3)} y={vz(y3)} style={textStyles} text-anchor="middle">{icon}</text>}
  {icon && typeof icon !== 'string' && <TriangleIcon x={x3} y={y3} {...icon} />}
  {icon && typeof icon !== 'string' && icon.two && <TriangleIcon x={x3} y={y3} {...icon}  up={!icon.up} bold={true} />}
  </g>;
}
