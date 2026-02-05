import React, { createContext } from 'react';

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

export type TriangleIconState = {
  triangles: number,
  up: boolean,
  two: boolean;
};

export type IconState = string | TriangleIconState;

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

  leftUnderline?: boolean;
  rightUnderline?: boolean;

  icons?: IconState[];
  iconSpacing?: number;

  hilight?: boolean;
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
  mode: 'preview' | 'print' | 'cut';
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
  selectedKnobId?: string;
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
} | {
  type: 'updateKnobLabel',
  id: string,
  label: string
} | {
  type: 'updateKnobColor',
  id: string,
  color: string
} | {
  type: 'selectKnob',
  id?: string
};
type SynthDispatch = (action: SynthAction) => void

const envelopeProps = {
  center: true,
  left: 'ATTACK',
  right: 'DECAY',
  leftStart: 150,
  leftSize: 60,
  rightStart: 335,
  rightSize: 50,
  rightUnderline: true
};


const amountProps = {
  center: true,
  left: 'REDUCE',
  right: 'INCREASE',
  leftStart: 150,
  leftSize: 60,
  rightStart: 320,
  rightSize: 75,
  rightUnderline: true
};

const rectStyles: React.CSSProperties = {
  fill: 'none', 
  stroke: '#fff',
  strokeWidth: 0.5
};

const textStyles: React.CSSProperties = {
  fontFamily: 'Roboto',
  fontWeight: '700',
  fontSize: 2,
  fill: 'black',
  textTransform: 'uppercase'
};

export const defaultSynthState: SynthState =
{
  mode: 'preview',
  showHoles: false,
  washers: false,
  showKnobs: true,
  holeSize: 7,
  drillTolerance: 0.5,
  mountingHoles: false,
  width: 114.73,
  height: 89.24,
  knobs: [
    {
      id: 'k1',
      x: -23,
      y: -34.5,
      label: 'Pattern',
      color: 'limegreen'
    },
    { id: 'k2', x: 23, y: -34.5, label: 'Glide', color: 'orange', hilight: true },
    { id: 'k3', x: -46, y: -23, label: 'Distortion', color: 'limegreen', hilight: true },
    { id: 'k4', x: 0, y: -23, label: 'Tempo', color: 'white', hilight: true },
    { id: 'k5', x: 46, y: -23, label: 'Volume', color: 'orange', hilight: true },
    { id: 'k6', x: -23, y: -11.5, label: 'Accent', color: 'limegreen' },
    { id: 'k7', x: 23, y: -11.5, label: 'Detune', color: 'orange', hilight: true },
    { id: 'k8', x: -46, y: 0, label: 'Resonance', color: 'white', hilight: true },
    { id: 'k9', x: 46, y: 0, label: 'Octave', color: 'white', hilight: true },
    {
      id: 'k10',
      x: -23,
      y: 11.5,
      label: 'Accent',
      color: 'cornflowerblue'
    },
    { id: 'k11', x: 23, y: 11.5, label: 'Accent', color: 'orangered' },
    {
      id: 'k12',
      x: -46,
      y: 23,
      label: 'Cutoff',
      color: 'cornflowerblue',
      hilight: true
    },
    { id: 'k13', x: 0, y: 23, label: 'Rotate', color: 'white', hilight: true },
    { id: 'k14', x: 46, y: 23, label: 'Degree', color: 'orangered', hilight: true },
    {
      id: 'k15',
      x: -23,
      y: 34.5,
      label: 'Pattern',
      color: 'cornflowerblue'
    },
    { id: 'k16', x: 23, y: 34.5, label: 'Pattern', color: 'orangered' }
  ],
  connections: [
    //{ from: 5, to: 0, shortenEnd: 9.75 },
    { from: 5, to: 2 },
    { from: 0, to: 2 },

    /*
    { from: 6, to: 1, shortenEnd: 9.75 },
    { from: 6, to: 4 },
    { from: 1, to: 4 },
    */

    { from: 9, to: 11 },
    //{ from: 14, to: 9, shortenEnd: 9.75 },
    { from: 14, to: 11 },

    { from: 10, to: 13 },
    //{ from: 15, to: 10, shortenEnd: 9.75 },
    { from: 15, to: 13 },
  ],
  images: [
    {
      id: 'i1',
      x: -40.5,
      y: -41,
      href: '/down-arrow.svg',
      width: 3,
      height: 3
    },
    {
      id: 'i2',
      x: 40.5,
      y: -41,
      href: '/up-arrow.svg',
      width: 3,
      height: 3
    }
  ],
  labels: [
    {
      id: 'l1',
      x: 0,
      y: -41,
      label: 'Euclidian Polymeters',
      includeRect: false,
      rectStyles: { fill: 'none', stroke: '#fff', strokeWidth: 0.5 },
      textStyles: {
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 2,
        fill: 'black',
        textTransform: 'uppercase'
      }
    }
  ],
  holes: [],
  buttons: [ { id: 'b1', x: -34.5, y: 34.5 }, { id: 'b2', x: 34.5, y: 34.5 } ]
}
/*
{
  mode: 'preview',
  showHoles: false,
  washers: false,
  showKnobs: true,
  holeSize: 7,
  drillTolerance: 0.5,
  mountingHoles: false,
  width: 117.23 - 2.5,
  height: 91.74 - 2.5,
  knobs: [
    { id: 'k1', x: -23, y: -34.5, label: '1', color: 'white' },
    { id: 'k2', x: 23, y: -34.5, label: '2', color: 'white' },
    { id: 'k3', x: -46, y: -23, label: '3', color: 'white' },
    { id: 'k4', x: 0, y: -23, label: '4', color: 'white' },
    {
      id: 'k5', x: 46, y: -23, label: '5', color: 'white',
    },
    { id: 'k6', x: -23, y: -11.5, label: '6', color: 'white' },
    {
      id: 'k7', x: 23, y: -11.5, label: '7', color: 'white',
    },

    {
      id: 'k8', x: -46, y: 0, label: '8', color: 'white' },
    { id: 'k9', x: 46, y: 0, label: '9', color: 'white' },

    {
      id: 'k10', x: -23, y: 11.5, label: '10', color: 'white'    },
    { id: 'k11', x: 23, y: 11.5, label: '11', color: 'white' },
    { id: 'k12', x: -46, y: 23, label: '12', color: 'white' },
    { id: 'k13', x: 0, y: 23, label: '13', color: 'white', },
    {
      id: 'k14', x: 46, y: 23, label: '14', color: 'white' },
    { id: 'k15', x: -23, y: 34.5, label: '15', color: 'white' },
    { id: 'k16', x: 23, y: 34.5, label: '16', color: 'white' },
  ],
  connections: [
    { from: 11, to: 7, shortenEnd: 9.75},
    { from: 11, to: 14},
    
    { from: 13, to: 8, shortenEnd: 9.75},
    { from: 13, to: 15},
 
    { from: 3, to: 0},
    { from: 3, to: 1},
  ],
  images: [
    { id: 'i1', x: -40.5, y: -41, href: '/down-arrow.svg', width: 3, height: 3 },
    { id: 'i2', x: 40.5, y: -41, href: '/up-arrow.svg', width: 3, height: 3 },
  ],
  labels: [
    { id: 'l1', x: 0, y: -41, label: 'Euclidian Polymeters', includeRect: false, rectStyles: nameRectStyles, textStyles: nameTextStyles1 },
  ],
  holes: [
  ],
  buttons: [
    { id: 'b1', x: -34.5, y: 34.5,  }, // label: 'Boot', dx: 0, dy: 4.5
{ id: 'b2', x: 34.5, y: 34.5, }, // label: 'Reset', dx: 0, dy: 4.5
  ]
};
*/


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

    case 'updateKnobLabel':
      return {
        ...state,
        knobs: state.knobs.map(k => k.id === action.id ? { ...k, label: action.label } : k),
      };

    case 'updateKnobColor':
      return {
        ...state,
        knobs: state.knobs.map(k => k.id === action.id ? { ...k, color: action.color } : k),
      };

    case 'selectKnob':
      return { ...state, selectedKnobId: action.id };
  }
}

export function useSynthState(): SynthStateDispatch {
  const context = React.useContext(SynthStateContext)
  if (context === undefined) {
    throw new Error('useSynthState must be used within a SynthStateProvider')
  }
  return context
}