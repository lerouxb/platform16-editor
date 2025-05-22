
import React, { JSX } from 'react';
import { useSynthState } from '../state/synth';
import { Connection } from './connection';
import { Knob } from './knob';
import { Label } from './label';
import { Hole } from './hole';
import { Button } from './button';
import { connect } from 'http2';

const textStyle: React.CSSProperties = {
  fontSize: '10mm',
  textAnchor: 'middle',
  dominantBaseline: 'middle',
  fill: 'black',
  fontFamily: '"Roboto"',
};

const borderWidth = 0.5;

export function Synth(): JSX.Element {
  const synthState = useSynthState().state;

  return (
    <svg
      version="1.1"
      width={`${synthState.width}mm`}
      height={`${synthState.height}mm`}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        //userSelect: 'none',
        //transform: `scale(1.5)`,
      }}>
      <rect
        width={`${synthState.width-borderWidth*2}mm`}
        height={`${synthState.height-borderWidth*2}mm`}
        x={`${borderWidth}mm`}
        y={`${borderWidth}mm`}
        rx="5mm"
        ry="5mm"
        fill={synthState.print ? 'none' : 'aliceblue'}
        strokeWidth={`${borderWidth}mm`}
        stroke={synthState.showHoles ? 'grey' : 'none'}
        />
      <image href={'/wave.svg'} x={`${synthState.width/2 - 11}mm`} y={`${synthState.height/2 - 8}mm`} width="22mm" />
      {synthState.connections.map((connection, i) => <Connection key={`connection-${i}`} n={i} {...connection} from={synthState.knobs[connection.from]} to={synthState.knobs[connection.to]} />)}
      {synthState.knobs.map((knob, i) => <Knob key={`knob-${i}`} {...knob} />)}
      {synthState.mountingHoles && synthState.holes.map((hole, i) => <Hole key={`hole-${i}`} {...hole} />)}
      {synthState.labels.map((label, i) => <Label key={`label-${i}`} {...label} />)}
      {synthState.buttons.map((button, i) => <Button key={`button-${i}`} {...button} />)}
    </svg>
  );
}

/*

*/

/*
        <mask id="label-mask" x="0" y="0" width="100%" height="100%">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <text x="50%" y="50%" style={textStyle}>moo</text>
        </mask>

        <rect x="0" y="0" width="100%" height="100%" fill="black" mask="url(#label-mask)" />
        */