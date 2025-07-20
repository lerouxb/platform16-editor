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

export function Knob({ id, x, y, label, numSpokes, color, left, right, center, leftStart = 150, leftSize = 65, rightStart = 325, rightSize = 65 }: KnobState): JSX.Element {
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


  const tr = 7;
  //const left_start_angle = 150;
  //const left_end_angle = left_start_angle + 65;
  const left_start_angle = leftStart;
  const left_end_angle = left_start_angle + leftSize;
  const left_x1 = cx + tr * Math.cos(left_start_angle * Math.PI / 180);
  const left_y1 = cy + tr * Math.sin(left_start_angle * Math.PI / 180);

  const left_x2 = cx + tr * Math.cos(left_end_angle * Math.PI / 180);
  const left_y2 = cy + tr * Math.sin(left_end_angle * Math.PI / 180);

  //const right_start_angle = 325;
  //const right_end_angle = right_start_angle + 65;
  const right_start_angle = rightStart;
  const right_end_angle = right_start_angle + rightSize;
  const right_x1 = cx + tr * Math.cos(right_start_angle * Math.PI / 180);
  const right_y1 = cy + tr * Math.sin(right_start_angle * Math.PI / 180);

  const right_x2 = cx + tr * Math.cos(right_end_angle * Math.PI / 180);
  const right_y2 = cy + tr * Math.sin(right_end_angle * Math.PI / 180);

  console.log({numSpokes});

  let holeFill = 'none';
  let holeRadius = synthState.holeSize/2;
  let holeStroke = 'none';
  if (synthState.mode === 'print') {
    holeFill = 'black';
    holeRadius = 0.5;
  }
  if (synthState.mode === 'preview') {
    holeFill = 'white';
  }
  if (synthState.mode === 'cut') {
    holeStroke = 'black';
    //holeFill = 'white'; // just for cricut
    holeRadius = 10/2;
  }

  return (
    <g>
      {synthState.mode !== 'cut' && <Label  {...{ id: `${id}-label`, x, y: y+8.5, label: label.toUpperCase(), textStyles, rectStyles }} />}
      {synthState.mode !== 'cut' && numSpokes && Array.from(Array(numSpokes).keys()).map((spokeNumber) => {
        const sl = numSpokes < 10 || spokeNumber % 2 === 0 ? spokeLength : spokeLength - 0.5;
        const sw = numSpokes < 10 || spokeNumber % 2 === 0 ? 1 : 0.75;
        return <Spoke key={`spoke-${spokeNumber}`} {...{x, y, r1: synthState.holeSize/2+1, r2: synthState.holeSize/2 + sl, angle: getSpokeAngle(spokeNumber, numSpokes), width: sw}} />;
      })}
      {left && synthState.mode !== 'cut' && <path
        key={`${id}-leftpath`}
        id={`${id}-leftpath`}
        fill="none"
        stroke="none"
        d={`M ${vz(left_x1)} ${vz(left_y1)} A ${vz(tr)} ${vz(tr)} 0 0 1 ${vz(left_x2)} ${vz(left_y2)}`} />}
      {right && synthState.mode !== 'cut' && <path
        key={`${id}-rightpath`}
        id={`${id}-rightpath`}
        fill="none"
        stroke="none"
        d={`M ${vz(right_x1)} ${vz(right_y1)} A ${vz(tr)} ${vz(tr)} 0 0 1 ${vz(right_x2)} ${vz(right_y2)}`} />}
      {synthState.showHoles && synthState.mode === 'print' && <circle cx={vz(cx)} cy={vz(cy)} r={vz((synthState.holeSize)/2)} fill={'silver'} stroke="none" />}
      {(synthState.showHoles || synthState.mode === 'cut') && <circle cx={vz(cx)} cy={vz(cy)} r={vz(holeRadius)} fill={holeFill} stroke={holeStroke} strokeWidth={vz(0.5)} />}
      {synthState.washers && synthState.mode === 'preview' && <circle cx={vz(cx)} cy={vz(cy)} r={vz(14/2-2.5/2)} fill="none" stroke="lightsteelblue" strokeWidth={vz(2.5)} className="no-print" />}
      {synthState.showKnobs && synthState.mode === 'preview' && <circle cx={vz(cx)} cy={vz(cy)} r={vz(5.5)} fill="black" stroke="black" strokeWidth={vz(0.75)} strokeDasharray={`${sd} ${sd}`} strokeLinecap="round" />}
      {synthState.showKnobs && synthState.mode === 'preview' && <line x1={vz(cx)} y1={vz(cy)} x2={vz(cx)} y2={vz(cy-5.75)} stroke={color} strokeWidth={vz(1)} strokeLinecap="round"/>}
      {synthState.mode !== 'cut' && center && <circle cx={vz(cx)} cy={vz(cy-7.5)} r={vz(0.75)} fill="black" stroke="none" />}
      {left && synthState.mode !== 'cut' && <text style={textStyles}><textPath href={`#${id}-leftpath`}>{left}</textPath></text>}
      {right && synthState.mode !== 'cut' && <text style={textStyles}><textPath href={`#${id}-rightpath`}>{right}</textPath></text>}


    </g>
  );
}
