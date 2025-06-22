import React, { JSX } from "react";
import { useSynthState, KnobState } from "../state/synth";
import { Label } from "./label";
import { Spoke } from "./spoke";
import { sizer } from "../utils/sizing";

const fg = 'black';

const zeroAngle = -240;
const maxAngle = 300;
const spokeLength = 3.5;

function getSpokeAngle(spokeNumber: number, numSpokes: number): number {
  const rangePerSpoke = (maxAngle / numSpokes);
  const angle = rangePerSpoke * (spokeNumber+0.5);
  return zeroAngle + angle;
}

export function Knob({ id, x, y, label, numSpokes }: KnobState): JSX.Element {
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

  const sd = 2 * Math.PI * 5.5 / 14;

  return (
    <g>
      <Label  {...{ id: `${id}-label`, x, y: y+8.5, label: label.toUpperCase(), textStyles, rectStyles }} />
      {numSpokes && Array.from(Array(numSpokes).keys()).map((spokeNumber) => {
        const sl = numSpokes < 10 || spokeNumber % 2 === 0 ? spokeLength : spokeLength - 0.5;
        const sw = numSpokes < 10 || spokeNumber % 2 === 0 ? 1 : 0.75;
        return <Spoke {...{x, y, r1: synthState.holeSize/2+1, r2: synthState.holeSize/2 + sl, angle: getSpokeAngle(spokeNumber, numSpokes), width: sw}} />;
      })}
      {synthState.showHoles && synthState.print && <circle cx={vz(cx)} cy={vz(cy)} r={vz((synthState.holeSize)/2)} fill={'silver'} stroke="none" />}
      {synthState.showHoles && <circle cx={vz(cx)} cy={vz(cy)} r={vz(synthState.print ? 0.5 : (synthState.holeSize)/2)} fill={synthState.print ? 'black' : 'white'} stroke="none" />}
      {synthState.washers && !synthState.print && <circle cx={vz(cx)} cy={vz(cy)} r={vz(14/2-2.5/2)} fill="none" stroke="lightsteelblue" strokeWidth={vz(2.5)} className="no-print" />}
      {synthState.showKnobs && !synthState.print && <circle cx={vz(cx)} cy={vz(cy)} r={vz(5.5)} fill="black" stroke="black" strokeWidth={vz(0.75)} strokeDasharray={`${sd} ${sd}`} strokeLinecap="round" />}
      {synthState.showKnobs && !synthState.print && <line x1={vz(cx)} y1={vz(cy)} x2={vz(cx)} y2={vz(cy-5.75)} stroke="white" strokeWidth={vz(1)} strokeLinecap="round"/>}
    </g>
  );
}
