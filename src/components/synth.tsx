
import React, { JSX } from 'react';
import { useSynthState } from '../state/synth';
import { Connection } from './connection';
import { Knob } from './knob';
import { Label } from './label';
import { Hole } from './hole';
import { Button } from './button';
import { sizer } from '../utils/sizing';

const borderWidth = 0.5;

export function Synth(): JSX.Element {
  const synthState = useSynthState().state;
  const { vz } = sizer();

  return (
    <div style={synthState.print ? {
      width: `${synthState.width}mm`,
      height: `${synthState.height}mm`
    } : {
      width: '80vw',
      maxWidth: `${synthState.width}mm`,
    }}>
    <svg
      viewBox={`0 0 ${synthState.width} ${synthState.height}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      >
      <rect
        width={vz(synthState.width-borderWidth*2)}
        height={vz(synthState.height-borderWidth*2)}
        x={vz(borderWidth)}
        y={vz(borderWidth)}
        rx={vz(5)}
        ry={vz(5)}
        fill={synthState.print ? 'none' : 'WhiteSmoke'}
        strokeWidth={vz(borderWidth)}
        stroke={synthState.showHoles ? 'grey' : 'none'}
        />
      {synthState.connections.map((connection, i) => <Connection key={`connection-${i}`} n={i} {...connection} from={synthState.knobs[connection.from]} to={synthState.knobs[connection.to]} />)}
      {synthState.knobs.map((knob, i) => <Knob key={`knob-${i}`} {...knob} />)}
      {synthState.mountingHoles && synthState.holes.map((hole, i) => <Hole key={`hole-${i}`} {...hole} />)}
      {synthState.labels.map((label, i) => <Label key={`label-${i}`} {...label} />)}
      {synthState.buttons.map((button, i) => <Button key={`button-${i}`} {...button} />)}
    </svg>
    </div>
  );
}

/*
      <image href={'/wave.svg'} x={vz(synthState.width/2 - 8)} y={vz(synthState.height/2 - 4 - 4)} width={vz(16)} />
      */
