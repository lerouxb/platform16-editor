import React, { JSX } from "react";
import { useSynthState } from "../state/synth";
import type { KnobState } from "../state/synth";

export function Connection({ from, to }: { from: KnobState, to: KnobState }): JSX.Element {
  const synthState = useSynthState().state;

  const x1 = from.x + synthState.width / 2;
  const y1 = from.y + synthState.height / 2;
  const x2 = to.x + synthState.width / 2;
  const y2 = to.y + synthState.height / 2;

  return <line x1={`${x1}mm`} y1={`${y1}mm`} x2={`${x2}mm`} y2={`${y2}mm`} stroke={synthState.inverted ? 'white' : 'black'} strokeWidth={'0.75mm'} strokeDasharray="2mm 2mm" />;
}