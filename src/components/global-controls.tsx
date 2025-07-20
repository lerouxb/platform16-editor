import React, { JSX } from 'react';
import { useSynthState } from '../state/synth';

const groupStyles: React.CSSProperties = {
  marginTop: '10px',
};

const fieldStyles: React.CSSProperties = {
  display: 'inline-block',
  marginLeft: '8px',
};

const inputStyles: React.CSSProperties = {
  verticalAlign: 'textTop',
};

export function GlobalControls(): JSX.Element {
  const synthState = useSynthState().state;
  const synthDispatch = useSynthState().dispatch;

  console.log(synthState);

  function clickPreview() {
    synthDispatch({ type: 'previewClicked' });
  }
  function clickPrint() {
    synthDispatch({ type: 'printClicked' });
  }
  function clickCut() {
    synthDispatch({ type: 'cutClicked' });
  }

  function click7mm() {
    synthDispatch({ type: '7mmClicked' });
  }
  function click9mm() {
    synthDispatch({ type: '9mmClicked' });
  }

  function toggleShowWashers() {
    if (synthState.washers) {
      synthDispatch({ type: 'hideWashersClicked' });
    } else {
      synthDispatch({ type: 'showWashersClicked' });
    }
  }

  function toggleKnobs() {
    if (synthState.showKnobs) {
      synthDispatch({ type: 'hideKnobsClicked' });
    } else {
      synthDispatch({ type: 'showKnobsClicked' });
    }
  }

  function toggleMountingHoles() {
    if (synthState.mountingHoles) {
      synthDispatch({ type: 'hideMountingHolesClicked' });
    } else {
      synthDispatch({ type: 'showMountingHolesClicked' });
    }
  }

  function clickShowHoles() {
    if (synthState.showHoles) {
      synthDispatch({ type: 'hideHolesClicked' });
    } else {
      synthDispatch({ type: 'showHolesClicked' });
    }
  }

  return (
    <div className="no-print">
      <div style={groupStyles}>
        <input type="radio" id="preview" name="print" style={inputStyles} checked={synthState.mode === 'preview'} onChange={() => {}} onClick={() => clickPreview()}/>
        <label htmlFor="preview">Preview</label>
        <input type="radio" id="print" name="print" style={inputStyles} checked={synthState.mode === 'print'} onChange={() => {}} onClick={(e) => clickPrint()}/>
        <label htmlFor="print">Print</label>
        <input type="radio" id="cut" name="cut" style={inputStyles} checked={synthState.mode === 'cut'} onChange={() => {}} onClick={(e) => clickCut()}/>
        <label htmlFor="print">Cut</label>
      </div>
      <div style={groupStyles}>
        <input type="checkbox" id="holes" name="showHoles" style={inputStyles} checked={synthState.showHoles} onChange={() => {}} onClick={() => clickShowHoles()}/>
        <label htmlFor="preview">Holes</label>
      {synthState.showHoles && <div style={fieldStyles}>
          <input type="radio" id="hole-6mm" name="holeSize" style={inputStyles} checked={synthState.holeSize === 7} onChange={() => {}} onClick={() => click7mm()}/>
          <label htmlFor="hole-6mm">6mm</label>
          <input type="radio" id="hole-9mm" name="holeSize" style={inputStyles} checked={synthState.holeSize === 9} onChange={() => {}} onClick={(e) => click9mm()}/>
          <label htmlFor="hole-9mm">9mm</label>
        </div>}
      {synthState.showHoles && <div style={fieldStyles}>
          <input type="checkbox" id="mountingHoles" name="mountingHoles" style={inputStyles} checked={synthState.mountingHoles} onChange={() => toggleMountingHoles()}/>
          <label htmlFor="mountingHoles">Mounting holes</label>
        </div>}
      </div>
      <div style={groupStyles}>
        <input type="checkbox" id="washers" name="washers" style={inputStyles} checked={synthState.washers} onChange={() => toggleShowWashers()}/>
        <label htmlFor="washers">Washers</label>
      </div>
      <div style={groupStyles}>
        <input type="checkbox" id="showKnobs" name="showKnobs" style={inputStyles} checked={synthState.showKnobs} onChange={() => toggleKnobs()}/>
        <label htmlFor="showKnobs">Knobs</label>
      </div>
    </div>
  );
}
