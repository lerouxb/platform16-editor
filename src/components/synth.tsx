
import React, { JSX } from 'react';
import { useSynthState } from '../state/synth';
import { Connection } from './connection';
import { Knob } from './knob';
import { Label } from './label';
import { Hole } from './hole';

export function Synth(): JSX.Element {
  const synthState = useSynthState().state;

  return (
    <svg
      version="1.1"
      width={`${synthState.width}mm`}
      height={`${synthState.height}mm`}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        userSelect: 'none',
      }}>
      <rect width={`${synthState.width-1.25}mm`} height={`${synthState.height-1.25}mm`} x="0.625mm" y="0.625mm" rx="5mm" ry="5mm" fill={synthState.inverted ? 'black' : 'none'} strokeWidth="1.25mm" stroke="grey" />
      {synthState.connections.map((connection, i) => <Connection key={`connection-${i}`} from={synthState.knobs[connection.from]} to={synthState.knobs[connection.to]}/>)}
      {synthState.knobs.map((knob, i) => <Knob key={`knob-${i}`} {...knob} />)}
      {synthState.mountingHoles && synthState.holes.map((hole, i) => <Hole key={`hole-${i}`} {...hole} />)}
      {synthState.labels.map((label, i) => <Label key={`label-${i}`} {...label} />)}
      <image href={synthState.inverted ? '/logo-transparent-inverted.png' : '/logo-transparent.png'} x={`${synthState.width/2 - 18}mm`} y={`${synthState.height/2 - 16}mm`} width="36mm" />
    </svg>
  );
}