import React, { JSX } from 'react';
import { useSynthState, HoleState } from '../state/synth';
import { sizer } from '../utils/sizing';


// TODO: make this reusable, reuse from knob
export function Hole({ x, y, r, washerSize }: HoleState): JSX.Element {
  const synthState = useSynthState().state;
  const { vz } = sizer();
  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;


  return <g>
      {synthState.showHoles && synthState.print && <circle cx={vz(cx)} cy={vz(cy)} r={vz(r)} fill={'silver'} stroke="none" />}
      {synthState.showHoles && <circle cx={vz(cx)} cy={vz(cy)} r={vz(synthState.print ? 0.5 : r)} fill={synthState.print ? 'black' : 'white'} stroke="none" />}
    </g>
}
