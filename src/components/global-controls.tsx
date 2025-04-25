import React, { JSX } from 'react';
import { useSynthState } from '../state/synth';

const fieldStyles: React.CSSProperties = {
  marginTop: '10px'
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

  function click6mm() {
    synthDispatch({ type: '6mmClicked' });
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

  function toggleGiantKnobs() {
    if (synthState.giantKnobs) {
      synthDispatch({ type: 'hideGiantKnobsClicked' });
    } else {
      synthDispatch({ type: 'showGiantKnobsClicked' });
    }
  }

  function toggleLargeKnobs() {
    if (synthState.largeKnobs) {
      synthDispatch({ type: 'hideLargeKnobsClicked' });
    } else {
      synthDispatch({ type: 'showLargeKnobsClicked' });
    }
  }

  function toggleSmallKnobs() {
    if (synthState.smallKnobs) {
      synthDispatch({ type: 'hideSmallKnobsClicked' });
    } else {
      synthDispatch({ type: 'showSmallKnobsClicked' });
    }
  }

  function toggleMountingHoles() {
    if (synthState.mountingHoles) {
      synthDispatch({ type: 'hideMountingHolesClicked' });
    } else {
      synthDispatch({ type: 'showMountingHolesClicked' });
    }
  }

  function clickInverted() {
    synthDispatch({ type: 'toggleInvertedClicked' });
  }

  return (
    <div className="no-print">
      <div style={fieldStyles}>
        <input type="radio" id="preview" name="print" checked={!synthState.print} onChange={() => {}} onClick={() => clickPreview()}/>
        <label htmlFor="preview">Preview</label>
        <input type="radio" id="print" name="print" checked={!!synthState.print} onChange={() => {}} onClick={(e) => clickPrint()}/>
        <label htmlFor="print">Print</label>
      </div>
      <div style={fieldStyles}>
        <input type="checkbox" id="inverted" name="inverted" checked={synthState.inverted} onChange={() => {}} onClick={() => clickInverted()}/>
        <label htmlFor="preview">Inverted</label>
      </div>
      <div style={fieldStyles}>
        pot holes:
        <input type="radio" id="hole-6mm" name="holeSize" checked={synthState.holeSize === 6} onChange={() => {}} onClick={() => click6mm()}/>
        <label htmlFor="hole-6mm">6mm</label>
        <input type="radio" id="hole-9mm" name="holeSize" checked={synthState.holeSize === 9} onChange={() => {}} onClick={(e) => click9mm()}/>
        <label htmlFor="hole-9mm">9mm</label>
      </div>
      <div style={fieldStyles}>
        <input type="checkbox" id="washers" name="washers" checked={synthState.washers} onChange={() => toggleShowWashers()}/>
        <label htmlFor="washers">Washers</label>
      </div>
      <div style={fieldStyles}>
        <input type="checkbox" id="smallKnobs" name="smallKnobs" checked={synthState.smallKnobs} onChange={() => toggleSmallKnobs()}/>
        <label htmlFor="smallKnobs">Small knobs</label>
      </div>
      <div style={fieldStyles}>
        <input type="checkbox" id="largeKnobs" name="largeKnobs" checked={synthState.largeKnobs} onChange={() => toggleLargeKnobs()}/>
        <label htmlFor="largeKnobs">Large knobs</label>
      </div>
      <div style={fieldStyles}>
        <input type="checkbox" id="giantKnobs" name="giantKnobs" checked={synthState.giantKnobs} onChange={() => toggleGiantKnobs()}/>
        <label htmlFor="giantKnobs">Giant knobs</label>
      </div>
      <div style={fieldStyles}>
        <input type="checkbox" id="mountingHoles" name="mountingHoles" checked={synthState.mountingHoles} onChange={() => toggleMountingHoles()}/>
        <label htmlFor="mountingHoles">Mounting holes</label>
      </div>
    </div>
  );
}