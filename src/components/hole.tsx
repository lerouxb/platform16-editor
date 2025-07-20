import React, { JSX } from 'react';
import { useSynthState, HoleState } from '../state/synth';
import { sizer } from '../utils/sizing';


// TODO: make this reusable, reuse from knob
export function Hole({ x, y, r, washerSize }: HoleState): JSX.Element {
  const synthState = useSynthState().state;
  const { vz } = sizer();
  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;

  let holeFill = 'none';
  if (synthState.mode === 'print') {
    holeFill = 'black';
   }
  if (synthState.mode === 'preview') {
    holeFill = 'white';
  }
  if (synthState.mode === 'cut') {
    //holeFill = 'white'; // just for cricut
  }

  return <g>
      {synthState.showHoles && synthState.mode === 'print' && <circle cx={vz(cx)} cy={vz(cy)} r={vz(r)} fill={'silver'} stroke="none" />}
      {synthState.showHoles && <circle cx={vz(cx)} cy={vz(cy)} r={vz(synthState.mode === 'print' ? 0.5 : r)} fill={holeFill} stroke="none" />}
    </g>
}
