
import React, { JSX } from 'react';
import { useSynthState } from '../state/synth';
import { Connection } from './connection';
import { Knob } from './knob';
import { Image } from './image';
import { Label } from './label';
import { Hole } from './hole';
import { Button } from './button';
import { sizer } from '../utils/sizing';

const borderWidth = 0.5;

export function Synth(): JSX.Element {
  const { state, dispatch } = useSynthState();
  const { vz } = sizer();

  let outlineFill = 'none';
  let outlineStroke = 'none';
  if (state.mode === 'preview') {
    outlineFill = 'whiteSmoke';
    outlineStroke = 'grey';
  }
  if (state.mode === 'cut') {
    //outlineFill = 'white'; // just for cricut
    outlineStroke = 'black';
  }
  if (state.mode === 'print') {
    outlineFill = 'white'; // just for cricut
    outlineStroke = 'white'; // just for cricut
  }

  return (
    <div style={state.mode !== 'preview' ? {
      width: `${state.width}mm`,
      height: `${state.height}mm`
    } : {
      width: '70vw',
      //maxWidth: `${state.width}mm`,
    }}
    >
    <svg
      viewBox={`0 0 ${state.width} ${state.height}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      >
      <rect
        width={vz(state.width-borderWidth*2)}
        height={vz(state.height-borderWidth*2)}
        x={vz(borderWidth)}
        y={vz(borderWidth)}
        rx={vz(5)}
        ry={vz(5)}
        fill={outlineFill}
        strokeWidth={vz(borderWidth)}
        stroke={outlineStroke}
        />
      {state.mode !== 'cut' && state.connections.map((connection, i) => <Connection key={`connection-${i}`} n={i} {...connection} from={state.knobs[connection.from]} to={state.knobs[connection.to]} />)}
      {state.knobs.map((knob, i) => <Knob key={`knob-${i}`} {...knob} />)}
      {state.mountingHoles && state.holes.map((hole, i) => <Hole key={`hole-${i}`} {...hole} />)}
      {state.mode !== 'cut' && state.images.map((image, i) => <Image key={`image-${i}`} {...image} />)}
      {state.mode !== 'cut' && state.labels.map((label, i) => <Label key={`label-${i}`} {...label} />)}
      {state.buttons.map((button, i) => <Button key={`button-${i}`} {...button} />)}
    </svg>
    </div>
  );
}

/*
      <image href={'/wave.svg'} x={vz(state.width/2 - 8)} y={vz(state.height/2 - 4 - 4)} width={vz(16)} />
      */
