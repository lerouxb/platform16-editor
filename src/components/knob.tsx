import React, { JSX } from "react";
import { useSynthState, KnobState } from "../state/synth";
import { Label } from "./label";

const fg = '#fff';
const bg = '#000';

export function Knob({ id, x, y, label, angle, dx, dy }: KnobState): JSX.Element {
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
      {<circle cx={`${cx}mm`} cy={`${cy}mm`} r="8mm" fill={synthState.inverted ? 'white' : 'black'} />}
      <Label  {...{ id: `${id}-label`, x, y: y+8.5, label, angle, textStyles, rectStyles }} />
      {synthState.washers && !synthState.print && <circle cx={`${cx}mm`} cy={`${cy}mm`} r="7mm" fill="lightsteelblue" />}
      {synthState.smallKnobs && !synthState.print && <circle cx={`${cx}mm`} cy={`${cy}mm`} r="5.5mm" fill="none" stroke="grey" strokeDasharray="4" />}
      {synthState.largeKnobs && !synthState.print && <circle cx={`${cx}mm`} cy={`${cy}mm`} r="9.5mm" fill="none" stroke="grey" strokeDasharray="4" />}
      {synthState.giantKnobs && !synthState.print && <circle cx={`${cx}mm`} cy={`${cy}mm`} r="14.25mm" fill="none" stroke="grey" strokeDasharray="4" />}
      <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${synthState.holeSize/2 + synthState.drillTolerance}mm`} fill={synthState.inverted ? 'black' : 'white'} />
    </g>
  );
}