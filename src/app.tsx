import { SynthProvider } from './state/synth-provider';
import { Synth } from './components/synth';
import { GlobalControls } from './components/global-controls';

import './app.css';

function App() {
  return (
    <SynthProvider>
      <Synth />
      <GlobalControls />
    </SynthProvider>
  );
}

export default App;
