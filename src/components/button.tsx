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

  let holeFill = 'none';
  let holeStroke = 'none';
  if (synthState.mode === 'print') {
    holeFill = 'black';
   }
  if (synthState.mode === 'preview') {
    holeFill = 'white';
  }
  if (synthState.mode === 'cut') {
    //holeFill = 'white'; // just for cricut
    holeStroke = 'black';
  }

  return (
    <g>
      {label && <Label  {...{ id: `${id}-label`, x, y, dx, dy, label: label.toUpperCase(), textStyles, rectStyles }} />}
      {synthState.showHoles && synthState.mode === 'print' && <circle cx={vz(cx)} cy={vz(cy)} r={vz(4.5/2)} fill={'silver'} stroke="none" />}
      {(synthState.showHoles || synthState.mode === 'cut') && <circle cx={vz(cx)} cy={vz(cy)} r={vz(synthState.mode === 'print' ? 0.5 : 4.5/2)} fill={holeFill} stroke={holeStroke} strokeWidth={vz(0.5)} />}
      {synthState.mode === 'preview' && <circle cx={vz(cx)} cy={vz(cy)} r={vz(3/2)} fill={'black' } stroke="none" className="no-print"/>}
    </g>
  );
}