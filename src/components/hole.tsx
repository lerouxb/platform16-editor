import React, { JSX } from 'react';
import { useSynthState, HoleState } from '../state/synth';


// TODO: make this reusable, reuse from knob
export function Hole({ x, y, r, washerSize }: HoleState): JSX.Element {
  const synthState = useSynthState().state;
  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;


  return <g>
      {synthState.showHoles && synthState.print && <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${r}mm`} fill={'silver'} stroke="none" />}
      {synthState.showHoles && <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${synthState.print ? 0.5 : r}mm`} fill={synthState.print ? 'black' : 'red'} stroke="none" />}
    </g>
}
