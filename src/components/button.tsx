import React, { JSX } from "react";
import { useSynthState, ButtonState } from "../state/synth";
import { Label } from "./label";

const fg = '#fff';
const bg = '#000';

export function Button({ id, x, y, label, angle, dx, dy }: ButtonState): JSX.Element {
  const synthState = useSynthState().state;
  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;

  const textStyles: React.CSSProperties = {
    fontFamily: '"Roboto"',
    fontWeight: '600',
    fontSize: '2.8mm',
    fill: synthState.inverted ? bg : fg,
    textTransform: 'uppercase'
  };

  const rectStyles: React.CSSProperties = {
    fill: synthState.inverted ? fg : bg
  };

  return (
    <g>
      {<circle cx={`${cx}mm`} cy={`${cy}mm`} r="3.4mm" fill={synthState.inverted ? 'white' : 'black'} />}
      <Label  {...{ id: `${id}-label`, x, y, dx, dy, label, angle, textStyles, rectStyles }} />
      <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${3.5/2 + synthState.drillTolerance}mm`} fill={synthState.inverted ? 'black' : 'white'} />
    </g>
  );
}