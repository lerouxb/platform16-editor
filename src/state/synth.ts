import React, { createContext  } from 'react';

const nameFG = 'black';
const nameBG = '#fff';

const nameTextStyles: React.CSSProperties = {
  //fontFamily: "Darumadrop One",
  //fontFamily: '"Love Ya Like A Sister"',
  fontFamily: "Roboto",
  fontWeight: '700',
  fontSize: 3,
  fill: nameFG,
};

const nameTextStyles1: React.CSSProperties = {
  fontFamily: "Roboto",
  fontWeight: '700',
  fontSize: 2,
  fill: nameFG,
  textTransform: 'uppercase',
};
const nameTextStyles2: React.CSSProperties = {
  fontFamily: "Roboto",
  fontWeight: '700',
  fontStyle: 'normal',
  fontSize: 4,
  fill: nameFG,
  textTransform: 'uppercase',
};

const nameTextStylesBracket: React.CSSProperties = {
  fontFamily: "Roboto",
  fontWeight: '500',
  fontSize: 8,
  fill: nameFG,
};


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
  color: string;
  center?: boolean;
  left?: string;
  right?: string; 
  leftStart?: number;
  leftSize?: number;
  rightStart?: number;
  rightSize?: number;
};

export type ButtonState = {
  id: string;
  x: number;
  y: number;
  label?: string;
  dx?: number;
  dy?: number;
}

export type ConnectionState = {
  from: number;
  to: number;
  shortenStart?: number;
  shortenEnd?: number;
};

export type ImageState = {
  id: string;
  x: number;
  y: number;
  href: string;
  width: number;
  height: number;
}

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
  mode: 'preview'|'print'|'cut';
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
  images: ImageState[],
  labels: LabelState[],
  holes: HoleState[],
  buttons: ButtonState[]
};

type SynthAction = {
  type:
    | 'printClicked'
    | 'previewClicked'
    | 'cutClicked'
    | 'showWashersClicked'
    | 'hideWashersClicked'
    | 'showKnobsClicked'
    | 'hideKnobsClicked'
    | '7mmClicked'
    | '9mmClicked'
    | 'showMountingHolesClicked'
    | 'hideMountingHolesClicked'
    | 'showHolesClicked'
    | 'hideHolesClicked'
};
type SynthDispatch = (action: SynthAction) => void

const envelopeProps = {
  center: true,
  right: 'decay',
  left: 'attack',
  leftStart: 150,
  leftSize: 65,
  rightStart: 325,
  rightSize: 65
};

export const defaultSynthState: SynthState = {
  mode: 'cut',
  showHoles: false,
  washers: false,
  showKnobs: true,
  holeSize: 7,
  drillTolerance: 0.5,
  mountingHoles: false,
  width: 117.23,
  height: 91.74,
  knobs: [
    { id: 'k1', x: -23, y: -34.5, label: 'Bzzt', color: 'limegreen' },
    { id: 'k2', x: 23, y: -34.5, label: 'Envelope', color: 'limegreen', ...envelopeProps }, // vol decay
    { id: 'k3', x: -46, y: -23, label: 'Length', color: 'white' }, // 32+1 or 16+1. lots of spokes..
    { id: 'k4', x: 0, y: -23, label: 'Volume', color: 'limegreen' },
    { id: 'k5', x: 46, y: -23, label: 'Algorithm', numSpokes: 13, color: 'white' },
    { id: 'k6', x: -23, y: -11.5, label: 'Skip', color: 'white' },
    { id: 'k7', x: 23, y: -11.5, label: 'Tempo', color: 'white' },

    { id: 'k8', x: -46, y: 0, label: 'Noise', color: 'orangered', }, 
    { id: 'k9', x: 46, y: 0, label: 'Envelope', color: 'cornflowerblue', ...envelopeProps }, // filter decay

    { id: 'k10', x: -23, y: 11.5, label: 'Scale', numSpokes: 7, color: 'orangered' }, 
    { id: 'k11', x: 23, y: 11.5, label: 'Resonance', color: 'cornflowerblue' },
    { id: 'k12', x: -46, y: 23, label: 'Pitch', color: 'orangered' }, 
    { id: 'k13', x: 0, y: 23, label: 'Evolve', color: 'white', center: true, right: 'mod', left: 'skip', 

  leftStart: 160,
  leftSize: 50,
  rightStart: 330,
  rightSize: 50

    },
    { id: 'k14', x: 46, y: 23, label: 'Filter', color: 'cornflowerblue' },
    { id: 'k15', x: -23, y: 34.5, label: 'Amount', color: 'orangered' }, // pitch amount
    { id: 'k16', x: 23, y: 34.5, label: 'Amount', color: 'cornflowerblue' }, // filter amount
  ],
  connections: [
   /*
   { from: 11, to: 7, shortenEnd: 9.75},
   { from: 11, to: 14},
   
   { from: 13, to: 8, shortenEnd: 9.75},
   { from: 13, to: 15},

   { from: 3, to: 0},
   { from: 3, to: 1},
   */
  ],
  images: [
    { id: 'i1', x: -40.5, y: -41, href: '/down-arrow.svg', width: 3, height: 3 },
    { id: 'i2', x: 40.5, y: -41, href: '/up-arrow.svg', width: 3, height: 3  },
  ],
  labels: [
    //{ id: 'l1', x: 0, y: -43, label: 'Stochastic Decay by Aleator', includeRect: false, rectStyles: nameRectStyles, textStyles: nameTextStyles1 },

    //{ id: 'l1', x: 0, y: -1, label: 'Stochastic', includeRect: false, rectStyles: nameRectStyles, textStyles: nameTextStyles1 },
    //{ id: 'l2', x: 0, y: 2, label: 'Decay', includeRect: false, rectStyles: nameRectStyles, textStyles: nameTextStyles2 },

    //{ id: 'l5', x: -8, y: 1, label: '(', includeRect: false, rectStyles: nameRectStyles, textStyles: nameTextStylesBracket },
    //{ id: 'l6', x: 8, y: 1, label: ')', includeRect: false, rectStyles: nameRectStyles, textStyles: nameTextStylesBracket },
  ],
  holes: [
  ],
  buttons: [
    { id: 'b1', x: -34.5, y: 34.5, /*label: 'Boot', dx: 0, dy: 4.5 */},
    { id: 'b2', x: 34.5, y: 34.5, /*label: 'Reset', dx: 0, dy: 4.5 */},
  ]
};


type SynthStateDispatch = { state: SynthState; dispatch: SynthDispatch };

export const SynthStateContext = createContext<SynthStateDispatch | undefined>(undefined);

export function synthReducer(state: SynthState, action: SynthAction): SynthState {
  switch (action.type) {
    case 'printClicked':
      return { ...state, mode: 'print' };
    case 'previewClicked':
      return { ...state, mode: 'preview' };
    case 'cutClicked':
      return { ...state, mode: 'cut' };
    case 'showWashersClicked':
      return { ...state, washers: true };
    case 'hideWashersClicked':
      return { ...state, washers: false };
    case 'showKnobsClicked':
      return { ...state, showKnobs: true };
    case 'hideKnobsClicked':
      return { ...state, showKnobs: false };
    case '7mmClicked':
      return { ...state, holeSize: 7 };
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