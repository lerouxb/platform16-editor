
import React, { useEffect, useReducer} from 'react';

import { synthReducer, defaultSynthState, SynthStateContext } from './synth';

type SynthProviderProps = { children: React.ReactNode };

export function SynthProvider({ children }: SynthProviderProps) {
	const [state, dispatch] = useReducer(synthReducer, defaultSynthState, (initial) => {
		try {
			const stored = localStorage.getItem('synthState');
			return stored ? JSON.parse(stored) : initial;
		} catch {
			return initial;
		}
	});

	useEffect(() => {
    localStorage.setItem('synthState', JSON.stringify(state));
  }, [state]);
	
	// NOTE: you *might* need to memoize this value
	// Learn more in http://kcd.im/optimize-context
	const value = { state, dispatch };
	return (
		<SynthStateContext.Provider value={value}>
			{children}
		</SynthStateContext.Provider>
  );
}
