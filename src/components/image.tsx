import React, { JSX  } from "react";
import { useSynthState, ImageState } from "../state/synth";
import { sizer } from "../utils/sizing";

export function Image({ id, x, y, href, width, height }: ImageState): JSX.Element {
  const synthState = useSynthState().state;
  const { vz } = sizer();

  const cx = x + synthState.width / 2;
  const cy = y + synthState.height / 2;



  return (
    <g>
      <image
        href={href}
        x={vz(cx - width/2)}
        y={vz(cy - height/2)}
        width={vz(width)}
        height={vz(height)}
        />
    </g>
  );
}
