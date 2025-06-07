import React, { JSX } from "react";
import { useSynthState } from "../state/synth";
import type { KnobState } from "../state/synth";
import { sizer } from "../utils/sizing";

function sortPoints(x1: number, y1: number, x2: number, y2: number): [number, number, number, number] {
  if (x1 > x2) {
    return [x2, y2, x1, y1];
  }
    return [x1, y1, x2, y2];
}

function sign(x: number): boolean {
  return x >= 0;
}

function shorten(id: number, _x1: number, _y1: number, _x2: number, _y2: number, radiusStart: number, radiusEnd: number): [number, number, number, number] {
  const [x1, y1, x2, y2] = sortPoints(_x1, _y1, _x2, _y2);

  const m1 = (y2 - y1) / (x2 - x1);
  const m2 = (y1 - y2) / (x1 - x2);

  let angle1 = Math.atan(m1);
  let angle2 = Math.atan(m2);

  if (sign(angle1) === sign(angle2)) {
    angle2 += Math.PI;
  }

  return [
    Math.cos(angle1) * radiusStart + x1, Math.sin(angle1) * radiusStart + y1,
    Math.cos(angle2) * radiusEnd + x2, Math.sin(angle2) * radiusEnd + y2
  ];
}

export function Connection({ n, from, to, shortenStart, shortenEnd }: { n: number, from: KnobState, to: KnobState, shortenStart?: number, shortenEnd?: number }): JSX.Element {
  shortenStart = shortenStart ?? 10/2;
  shortenEnd = shortenEnd ?? 10/2;

  console.log(shortenStart, shortenEnd);
  const synthState = useSynthState().state;
  const { vz } = sizer();

  const [x1, y1, x2, y2] = shorten(n, from.x + synthState.width / 2, from.y + synthState.height / 2, to.x + synthState.width / 2, to.y + synthState.height / 2, shortenStart, shortenEnd);

  return (<g>
    <line x1={vz(x1)} y1={vz(y1)} x2={vz(x2)} y2={vz(y2)} stroke={'black'} strokeWidth={vz(0.5)} />
  </g>);
}
