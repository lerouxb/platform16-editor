import React, { JSX } from 'react';
import { useSynthState } from '../state/synth';
import { sizer } from '../utils/sizing';

type SpokeState = {
  x: number,
  y: number,
  r1: number,
  r2: number,
  angle: number
  width: number
}

export function Spoke({ x, y, r1, r2, angle, width }: SpokeState): JSX.Element {
  const synthState = useSynthState().state;
  const { vz } = sizer();
  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;

  const x1 = cx + r1 * Math.cos(angle * Math.PI / 180);
  const y1 = cy + r1 * Math.sin(angle * Math.PI / 180);

  const x2 = cx + r2 * Math.cos(angle * Math.PI / 180);
  const y2 = cy + r2 * Math.sin(angle * Math.PI / 180);

 return <line x1={vz(x1)} x2={vz(x2)} y1={vz(y1)} y2={vz(y2)} stroke="black" strokeWidth={vz(width)} strokeLinecap="round">
    </line>
}
