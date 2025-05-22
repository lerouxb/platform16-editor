import React, { JSX } from "react";
import { useSynthState, ButtonState } from "../state/synth";
import { Label } from "./label";

const fg = '#000';
const bg = '#000';

export function Button({ id, x, y, label, angle, dx, dy }: ButtonState): JSX.Element {
  const synthState = useSynthState().state;
  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;

  const textStyles: React.CSSProperties = {
    fontFamily: '"Roboto"',
    fontWeight: 'bold',
    fontSize: '2.5mm',
    fill: fg,
  };

  const rectStyles: React.CSSProperties = {
    //stroke: bg,
    //strokeWidth: '0.5mm',
    fill: 'none'
  };

  return (
    <g>
      <Label  {...{ id: `${id}-label`, x, y, dx, dy, label: label.toUpperCase(), angle, textStyles, rectStyles }} />
      {synthState.showHoles && synthState.print && <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${4.5/2}mm`} fill={'silver'} stroke="none" />}
      {synthState.showHoles && <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${synthState.print ? 0.5 : 4.5/2}mm`} fill={synthState.print ? 'black' : 'red'} stroke="none" />}
    </g>
  );
}
//       <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${4.5/2+1.25/2}mm`} fill="none" stroke={'black'} strokeWidth="1.25mm" />

//<circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${4.5/2}mm`} fill="red" stroke="none" />

//<circle cx={`${cx}mm`} cy={`${cy}mm`} r={'1mm'} fill={'black'} stroke={'none'} />