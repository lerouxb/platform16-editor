import React, { JSX } from 'react';
import { useSynthState, HoleState } from '../state/synth';


// TODO: make this reusable, reuse from knob
export function Hole({ x, y, r, washerSize }: HoleState): JSX.Element {
  const synthState = useSynthState().state;
  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;

  const fill = synthState.inverted ? 'white' : 'none';
  const stroke = synthState.inverted ? 'white' : 'black';

  return <g>
      <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${r}mm`} fill={synthState.print ? 'none' : fill} stroke={stroke} />
    </g>
}
