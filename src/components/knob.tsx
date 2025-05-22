import React, { JSX } from "react";
import { useSynthState, KnobState } from "../state/synth";
import { Label } from "./label";

const fg = '#000';
const bg = '#000';

export function Knob({ id, x, y, label, angle, dx, dy }: KnobState): JSX.Element {
  const synthState = useSynthState().state;
  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;
  const r = 10/2 + 3.5/2;

  const textStyles: React.CSSProperties = {
    fontFamily: '"Roboto"',
    fontWeight: 'bold',
    fontSize: '2.5mm',
    fill: fg,
  };

  const rectStyles: React.CSSProperties = {
    fill: 'none',
    stroke: bg,
    strokeWidth: '0.5mm',
  };


  return (
    <g>
      <Label  {...{ id: `${id}-label`, x, y: y+8.5, label: label.toUpperCase(), angle, textStyles, rectStyles }} />
      {synthState.showHoles && synthState.print && <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${(synthState.holeSize)/2}mm`} fill={'silver'} stroke="none" />}
      {synthState.showHoles && <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${synthState.print ? 0.5 : (synthState.holeSize)/2}mm`} fill={synthState.print ? 'black' : 'red'} stroke="none" />}
      {synthState.washers && !synthState.print && <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${14/2-2.5/2}mm`} fill="none" stroke="lightsteelblue" strokeWidth="2.5mm" className="no-print" />}
      {synthState.smallKnobs && !synthState.print && <circle cx={`${cx}mm`} cy={`${cy}mm`} r="5.5mm" fill="none" stroke="grey" strokeDasharray="4" />}
      {synthState.largeKnobs && !synthState.print && <circle cx={`${cx}mm`} cy={`${cy}mm`} r="9.5mm" fill="none" stroke="grey" strokeDasharray="4" />}
      {synthState.giantKnobs && !synthState.print && <circle cx={`${cx}mm`} cy={`${cy}mm`} r="14.25mm" fill="none" stroke="grey" strokeDasharray="4" />}
    </g>
  );
}

//       <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${r}mm`} fill="none" stroke={'black'} strokeWidth="3.5mm" mask={`url(#label-mask-${id}-label)`} />
//      <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${synthState.holeSize/2 + synthState.drillTolerance}mm`} fill="red" className="no-print" />
//      <circle cx={`${cx}mm`} cy={`${cy}mm`} r={'1mm'} fill={'black'} stroke={'none'} className="no-print" />
// <circle cx={`${cx}mm`} cy={`${cy}mm`} r={`${10/2}mm`} fill="white" stroke="none" className="no-print" />
