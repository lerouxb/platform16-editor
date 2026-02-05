import React, { JSX, useLayoutEffect } from 'react';
import { KnobState, useSynthState } from '../state/synth';

type OnChange = (newValue: string) => void;

const colors: string[] = [
  'white',
  'limegreen',
  'orange',
  'orangered',
  'cornflowerblue'
]

const fieldStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  marginBottom: '8px',
};

const labelStyles: React.CSSProperties = {
  minWidth: '50px',
  textTransform: 'uppercase',
  fontSize: '13px',
  fontWeight: '600',
  lineHeight: '21px'
};

const inputStyles: React.CSSProperties = {
  flex: '1',
};

const selectStyles: React.CSSProperties = {
  flex: '1',
};

function TextField({ label, value, onChange, autoFocus }: { label: string; value: string, onChange: OnChange, autoFocus?: boolean }): JSX.Element {
  return <div style={fieldStyles}>
    <label style={labelStyles}>{label}</label>
    <input style={inputStyles} name={label} type="text" value={value} onChange={(e) => onChange(e.target.value)} autoFocus={autoFocus} />
  </div>;
}

function SelectField({ label, value, onChange, options }: { label: string; value: string, onChange: OnChange, options: string[] }): JSX.Element {
  return <div style={fieldStyles}>
    <label style={labelStyles}>{label}</label>
    <select style={selectStyles} name={label} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </div>;
}

const knobEditorStyles: React.CSSProperties = {
  position: 'absolute',
  padding: '10px 10px 2px 10px',
  border: '1px solid black',
  borderRadius: '8px',
  backgroundColor: 'white',
  boxShadow: '2px 2px 0px rgba(0,0,0,0.3)',
};

export function KnobEditor({ knob, onChangeLabel, onChangeColor }: { knob: KnobState, onChangeLabel: OnChange, onChangeColor: OnChange }): JSX.Element {
  // id: 'k1', x: -23, y: -34.5, label: '1', color: 'white'

  const { dispatch } = useSynthState();

  const ref = React.useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const knobElement = document.getElementById(`knob-${knob.id}`);
    if (knobElement && ref.current) {
      const rect = knobElement.getBoundingClientRect();
      const left = `${rect.x}px`;;
      const top = `${rect.y + 140}px`;
      console.log({ rect, left, top});
      ref.current.style.left = left;
      ref.current.style.top = top;
    }

    const onBodyClick = () => {
      dispatch({ type: 'selectKnob', id: undefined });
    }
    document.body.addEventListener('click', onBodyClick);

    const stopPropagation = (e: MouseEvent) => {
      e.stopPropagation();
    }

    ref.current?.addEventListener('click', stopPropagation);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
      ref.current?.removeEventListener('click', stopPropagation);
    }
  });

  return <div style={knobEditorStyles} ref={ref}>
    <TextField label="Label" value={knob.label} onChange={onChangeLabel} autoFocus />
    <SelectField label="Color" value={knob.color} onChange={onChangeColor} options={colors} />
  </div>;
}

export function ConnectedKnobEditor(): JSX.Element | null {
  const { state, dispatch } = useSynthState();
  // For now, just pick the first knob
  if (!state.selectedKnobId) {
    return null;
  }
  const knob = state.knobs.find(k => k.id === state.selectedKnobId);
  if (!knob) {
    return null;
  }
  return <KnobEditor
    knob={knob}
    onChangeLabel={(newLabel) => dispatch({ type: 'updateKnobLabel', id: knob.id, label: newLabel })}
    onChangeColor={(newColor) => dispatch({ type: 'updateKnobColor', id: knob.id, color: newColor })}
  />;
}