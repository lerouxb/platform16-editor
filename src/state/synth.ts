import React, { createContext  } from 'react';

const nameFG = 'black';
const nameBG = '#fff';

const nameTextStyles: React.CSSProperties = {
  //fontFamily: "Darumadrop One",
  //fontFamily: '"Love Ya Like A Sister"',
  fontFamily: "Roboto",
  fontWeight: '700',
  fontSize: 2.6,
  fill: nameFG,
};

/*
const nameTextStyles1: React.CSSProperties = {
  fontFamily: "Roboto",
  fontWeight: '900',
  fontSize: 4,
  fill: nameFG,
  textTransform: 'uppercase',
};
const nameTextStyles2: React.CSSProperties = {
  fontFamily: "Roboto",
  fontWeight: '900',
  fontSize: 8,
  fill: nameFG,
  textTransform: 'uppercase',
};
*/

const nameRectStyles: React.CSSProperties = {
  fill: 'none',
  stroke: nameBG,
  strokeWidth: 0.5,
};

export type KnobState = {
  id: string;
  x: number;
  y: number;
  label: string;
  numSpokes?: number;
};

export type ButtonState = {
  id: string;
  x: number;
  y: number;
  label: string;
  dx?: number;
  dy?: number;
}

export type ConnectionState = {
  from: number;
  to: number;
  shortenStart?: number;
  shortenEnd?: number;
};

export type LabelState = {
  id: string;
  x: number;
  y: number;
  label: string;
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
  showHoles: boolean;
  washers: boolean;
  showKnobs: boolean;
  holeSize: number,
  drillTolerance: number,
  mountingHoles: boolean,
  width: number;
  height: number;
  knobs: KnobState[]
  connections: ConnectionState[],
  labels: LabelState[],
  holes: HoleState[],
  buttons: ButtonState[]
};

type SynthAction = {
  type:
    | 'printClicked'
    | 'previewClicked'
    | 'showWashersClicked'
    | 'hideWashersClicked'
    | 'showKnobsClicked'
    | 'hideKnobsClicked'
    | '6mmClicked'
    | '9mmClicked'
    | 'showMountingHolesClicked'
    | 'hideMountingHolesClicked'
    | 'showHolesClicked'
    | 'hideHolesClicked'
};
type SynthDispatch = (action: SynthAction) => void

export const defaultSynthState: SynthState = {
  print: false,
  showHoles: true,
  washers: true,
  showKnobs: false,
  holeSize: 9,
  drillTolerance: 0.5,
  mountingHoles: false,
  width: 117.23,
  height: 91.74,
  knobs: [
    { id: 'k1', x: -23, y: -34.5, label: 'Amount' }, // vol amount
    { id: 'k2', x: 23, y: -34.5, label: 'Decay' }, // vol decay
    { id: 'k3', x: -46, y: -23, label: 'Step' }, // 32+1 or 16+1. lots of spokes..
    { id: 'k4', x: 0, y: -23, label: 'Volume' },
    { id: 'k5', x: 46, y: -23, label: 'Algorithm', numSpokes: 13 },
    { id: 'k6', x: -23, y: -11.5, label: 'Skip' },
    { id: 'k7', x: 23, y: -11.5, label: 'Tempo' },

    { id: 'k8', x: -46, y: 0, label: 'Decay' }, // pitch decay
    { id: 'k9', x: 46, y: 0, label: 'Decay' }, // pitch decay

    { id: 'k10', x: -23, y: 11.5, label: 'Scale', numSpokes: 7 }, 
    { id: 'k11', x: 23, y: 11.5, label: 'Resonance' },
    { id: 'k12', x: -46, y: 23, label: 'Pitch' },
    { id: 'k13', x: 0, y: 23, label: 'Evolve' },
    { id: 'k14', x: 46, y: 23, label: 'Filter' },
    { id: 'k15', x: -23, y: 34.5, label: 'Amount' }, // pitch amount
    { id: 'k16', x: 23, y: 34.5, label: 'Amount' }, // filter amount
  ],
  connections: [
   { from: 11, to: 7, shortenEnd: 10},
   { from: 11, to: 14},
   
   { from: 13, to: 8, shortenEnd: 10},
   { from: 13, to: 15},

   { from: 3, to: 0},
   { from: 3, to: 1},

   /*
   { from: 2, to: 5},
   { from: 5, to: 6},
   { from: 6, to: 4},
    */
  ],
  labels: [
    //{ id: 'l1', x: 0, y: -3.5, label: 'Stochastic', includeRect: false, rectStyles: nameRectStyles, textStyles: nameTextStyles1 },
    //{ id: 'l2', x: 0, y: 3.5, label: 'Decay', includeRect: false, rectStyles: nameRectStyles, textStyles: nameTextStyles2 },
    //{ id: 'l1', x: 0, y: -3.5, label: 'Stochastic Decay', includeRect: false, rectStyles: nameRectStyles, textStyles: nameTextStyles },
    { id: 'l2', x: 0, y: 7, label: 'Stochastic Decay', includeRect: false, rectStyles: nameRectStyles, textStyles: {... nameTextStyles } },
    { id: 'l3', x: -40.5, y: -41, label: '▼', includeRect: false, rectStyles: nameRectStyles, textStyles: {... nameTextStyles, fontFamily: 'Roboto' } },
    { id: 'l4', x: 40.5, y: -41, label: '▲', includeRect: false, rectStyles: nameRectStyles, textStyles: {... nameTextStyles, fontFamily: 'Roboto' } },
  ],
  holes: [
    { id: 'h1', x: -48.908, y: -36.958, r: 1.6, washerSize: 9 },
    { id: 'h2', x: 48.908, y: -36.958, r: 1.6, washerSize: 9 },
    { id: 'h3', x: -48.908, y: 36.958, r: 1.6, washerSize: 9 },
    { id: 'h4', x: 48.908, y: 36.958, r: 1.6, washerSize: 9 },
  ],
  buttons: [
    { id: 'b1', x: -38.4, y: 40, label: 'Boot', dx: -7, dy: 0.25 },
    { id: 'b2', x: 38.4, y: 40, label: 'Reset', dx: 7.5, dy: 0.25 },
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
    case 'showKnobsClicked':
      return { ...state, showKnobs: true };
    case 'hideKnobsClicked':
      return { ...state, showKnobs: false };
    case '6mmClicked':
      return { ...state, holeSize: 6 };
    case '9mmClicked':
      return { ...state, holeSize: 9 };
    case 'showMountingHolesClicked':
      return { ...state, mountingHoles: true };
    case 'hideMountingHolesClicked':
      return { ...state, mountingHoles: false };
    case 'showHolesClicked':
      return { ...state, showHoles: true };
    case 'hideHolesClicked':
      return { ...state, showHoles: false };
  }
}

export function useSynthState(): SynthStateDispatch {
	const context = React.useContext(SynthStateContext)
	if (context === undefined) {
		throw new Error('useSynthState must be used within a SynthStateProvider')
	}
	return context
}