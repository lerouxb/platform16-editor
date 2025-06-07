import React, { JSX } from "react";
import { useSynthState, KnobState } from "../state/synth";
import { Label } from "./label";
import { sizer } from "../utils/sizing";

const fg = 'black';

export function Knob({ id, x, y, label, angle, dx, dy }: KnobState): JSX.Element {
  const synthState = useSynthState().state;
  const { vz } = sizer();
  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;
  const r = 10/2 + 3.5/2;

  const textStyles: React.CSSProperties = {
    fontFamily: '"Roboto"',
    fontWeight: 800,
    fontSize: vz(3),
    fill: fg,
  };

  const rectStyles: React.CSSProperties = {
    fill: 'none',
    stroke: 'none',
    strokeWidth: vz(0.5),
  };

  return (
    <g>
      <Label  {...{ id: `${id}-label`, x, y: y+8.5, label: label.toUpperCase(), angle, textStyles, rectStyles }} />
      {synthState.showHoles && synthState.print && <circle cx={vz(cx)} cy={vz(cy)} r={vz((synthState.holeSize)/2)} fill={'silver'} stroke="none" />}
      {synthState.showHoles && <circle cx={vz(cx)} cy={vz(cy)} r={vz(synthState.print ? 0.5 : (synthState.holeSize)/2)} fill={synthState.print ? 'black' : 'white'} stroke="none" />}
      {synthState.washers && !synthState.print && <circle cx={vz(cx)} cy={vz(cy)} r={vz(14/2-2.5/2)} fill="none" stroke="lightsteelblue" strokeWidth={vz(2.5)} className="no-print" />}
      {synthState.showKnobs && !synthState.print && <circle cx={vz(cx)} cy={vz(cy)} r={vz(5.5)} fill="none" stroke="black" strokeWidth={vz(0.5)} strokeDasharray="1" />}
    </g>
  );
}
