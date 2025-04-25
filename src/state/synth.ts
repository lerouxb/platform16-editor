import React, { createContext  } from 'react';

const nameFG = '#000';
const nameBG = 'none';

const nameTextStyles: React.CSSProperties = {
  fontFamily: '"Roboto"',
  fontWeight: '400',
  fontSize: '5mm',
  fill: nameFG,
  textDecoration: 'underline',
};

const nameRectStyles: React.CSSProperties = {
  fill: nameBG,
};

export type KnobState = {
  id: string;
  x: number;
  y: number;
  label: string;
  angle: number;
  dx?: number;
  dy?: number;
};

export type ConnectionState = {
  from: number;
  to: number;
};

export type LabelState = {
  id: string;
  x: number;
  y: number;
  label: string;
  angle: number;
  dx?: number;
  dy?: number;
  includeRect?: boolean;
  rectStyles: React.CSSProperties;
  textStyles: React.CSSProperties;
}

export type HoleState = {
  id: string;
  x: number;
  y: number;
  r: number;
  washerSize?: number;
};

export type SynthState = {
  print: boolean;
  inverted: boolean;
  washers: boolean;
  smallKnobs: boolean;
  largeKnobs: boolean;
  giantKnobs: boolean;
  holeSize: number,
  drillTolerance: number,
  mountingHoles: boolean,
  width: number;
  height: number;
  knobs: KnobState[]
  connections: ConnectionState[],
  labels: LabelState[],
  holes: HoleState[]
};

type SynthAction = {
  type:
    | 'printClicked'
    | 'previewClicked'
    | 'showWashersClicked'
    | 'hideWashersClicked'
    | 'showSmallKnobsClicked'
    | 'hideSmallKnobsClicked'
    | 'showLargeKnobsClicked'
    | 'hideLargeKnobsClicked'
    | 'showGiantKnobsClicked'
    | 'hideGiantKnobsClicked'
    | '6mmClicked'
    | '9mmClicked'
    | 'showMountingHolesClicked'
    | 'hideMountingHolesClicked'
    | 'toggleInvertedClicked'
};
type SynthDispatch = (action: SynthAction) => void

export const defaultSynthState: SynthState = {
  print: false,
  inverted: false,
  washers: true,
  smallKnobs: false,
  largeKnobs: false,
  giantKnobs: false,
  holeSize: 9,
  drillTolerance: 0.5,
  mountingHoles: false,
  width: 117.23,
  height: 91.74,
  knobs: [
    { id: 'k1', x: -23, y: -34.5, label: 'Amount', angle: 0 }, // vol amount
    { id: 'k2', x: 23, y: -34.5, label: 'Decay', angle: 0 }, // vol decay
    { id: 'k3', x: -46, y: -23, label: 'Step', angle: 0 },
    { id: 'k4', x: 0, y: -23, label: 'Volume', angle: 0 },
    { id: 'k5', x: 46, y: -23, label: 'Algorithm', angle: 0 },
    { id: 'k6', x: -23, y: -11.5, label: 'Skip', angle: 0 },
    { id: 'k7', x: 23, y: -11.5, label: 'Tempo', angle: 0 },

    { id: 'k8', x: -46, y: 0, label: 'Decay', angle: 0 }, // pitch decay
    { id: 'k9', x: 46, y: 0, label: 'Decay', angle: 0 }, // pitch decay

    { id: 'k10', x: -23, y: 11.5, label: 'Scale', angle: 0 }, 
    { id: 'k11', x: 23, y: 11.5, label: 'Resonance', angle: 0 },
    { id: 'k12', x: -46, y: 23, label: 'Pitch', angle: 0 },
    { id: 'k13', x: 0, y: 23, label: 'Drive', angle: 0 },
    { id: 'k14', x: 46, y: 23, label: 'Cutoff', angle: 0 },
    { id: 'k15', x: -23, y: 34.5, label: 'Amount', angle: 0 }, // pitch amount
    { id: 'k16', x: 23, y: 34.5, label: 'Amount', angle: 0 }, // filter amount
  ],
  connections: [
   { from: 11, to: 7},
   { from: 11, to: 14},
   
   { from: 13, to: 8},
   { from: 13, to: 15},

   { from: 3, to: 0},
   { from: 3, to: 1},

   { from: 2, to: 5},
   { from: 5, to: 6},
   { from: 6, to: 4},
  ],
  labels: [
    //{ id: 'l5', x: 0, y: -1, label: 'Stochastic', angle: 0, includeRect: false, rectStyles: nameRectStyles, textStyles: nameTextStyles },
    //{ id: 'l5', x: 0, y: 5, label: 'Decay', angle: 0, includeRect: false, rectStyles: nameRectStyles, textStyles: nameTextStyles },
  ],
  holes: [
    { id: 'h1', x: -47.781, y: -35.036, r: 1.5, washerSize: 9 },
    { id: 'h1', x: 47.781, y: -35.036, r: 1.5, washerSize: 9 },
    { id: 'h1', x: -47.781, y: 35.036, r: 1.5, washerSize: 9 },
    { id: 'h1', x: 47.781, y: 35.036, r: 1.5, washerSize: 9 },
  ]
};


type SynthStateDispatch = { state: SynthState; dispatch: SynthDispatch };

export const SynthStateContext = createContext<SynthStateDispatch | undefined>(undefined);

export function synthReducer(state: SynthState, action: SynthAction): SynthState {
  switch (action.type) {
    case 'printClicked':
      return { ...state, print: true };
    case 'previewClicked':
      return { ...state, print: false };
    case 'showWashersClicked':
      return { ...state, washers: true };
    case 'hideWashersClicked':
      return { ...state, washers: false };
    case 'showSmallKnobsClicked':
      return { ...state, smallKnobs: true };
    case 'hideSmallKnobsClicked':
      return { ...state, smallKnobs: false };
    case 'showLargeKnobsClicked':
      return { ...state, largeKnobs: true };
    case 'hideLargeKnobsClicked':
      return { ...state, largeKnobs: false };
    case 'showGiantKnobsClicked':
      return { ...state, giantKnobs: true };
    case 'hideGiantKnobsClicked':
      return { ...state, giantKnobs: false };
    case '6mmClicked':
      return { ...state, holeSize: 6 };
    case '9mmClicked':
      return { ...state, holeSize: 9 };
    case 'showMountingHolesClicked':
      return { ...state, mountingHoles: true };
    case 'hideMountingHolesClicked':
      return { ...state, mountingHoles: false };
    case 'toggleInvertedClicked':
      return { ...state, inverted: !state.inverted };
  }
}

export function useSynthState(): SynthStateDispatch {
	const context = React.useContext(SynthStateContext)
	if (context === undefined) {
		throw new Error('useSynthState must be used within a SynthStateProvider')
	}
	return context
}