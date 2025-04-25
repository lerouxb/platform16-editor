
import React from 'react';

import { synthReducer, defaultSynthState, SynthStateContext } from './synth';

type SynthProviderProps = { children: React.ReactNode };

export function SynthProvider({ children }: SynthProviderProps) {
	const [state, dispatch] = React.useReducer(synthReducer, defaultSynthState);
	// NOTE: you *might* need to memoize this value
	// Learn more in http://kcd.im/optimize-context
	const value = { state, dispatch };
	return (
		<SynthStateContext.Provider value={value}>
			{children}
		</SynthStateContext.Provider>
  );
}
