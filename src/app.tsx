import { SynthProvider } from './state/synth-provider';
import { Synth } from './components/synth';
import { GlobalControls } from './components/global-controls';
import { ConnectedKnobEditor } from './components/knob-editor';

import './app.css';

function App() {
  return (
    <SynthProvider>
      <Synth />
      <GlobalControls />
      <ConnectedKnobEditor />
    </SynthProvider>
  );
}

export default App;
