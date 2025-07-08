import React, { JSX } from "react";
import { useSynthState, ButtonState } from "../state/synth";
import { Label } from "./label";
import { sizer } from "../utils/sizing";

const fg = 'black';

export function Button({ id, x, y, label, dx, dy }: ButtonState): JSX.Element {
  const synthState = useSynthState().state;
  const { vz } = sizer();
  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;

  const textStyles: React.CSSProperties = {
    fontFamily: '"Roboto"',
    fontWeight: 'bold',
    fontSize: vz(2.5),
    fill: fg,
  };

  const rectStyles: React.CSSProperties = {
    fill: 'none'
  };

  return (
    <g>
      {label && <Label  {...{ id: `${id}-label`, x, y, dx, dy, label: label.toUpperCase(), textStyles, rectStyles }} />}
      {synthState.showHoles && synthState.print && <circle cx={vz(cx)} cy={vz(cy)} r={vz(4.5/2)} fill={'silver'} stroke="none" />}
      {synthState.showHoles && <circle cx={vz(cx)} cy={vz(cy)} r={vz(synthState.print ? 0.5 : 4.5/2)} fill={synthState.print ? 'black' : 'white'} stroke="none" />}
      {synthState.showHoles && !synthState.print && <circle cx={vz(cx)} cy={vz(cy)} r={vz(3/2)} fill={'black' } stroke="none" className="no-print"/>}
    </g>
  );
}