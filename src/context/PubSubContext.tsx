import { createContext, useContext, type ReactNode } from 'react';

import { PsbPubSub as PsbPubSub } from '../utils/PsbPubSub/PsbPubSub.ts';

type PsbEventTypes = string;
type PsbPayloads = Record<string, unknown>;

const pubSubSingleton = new PsbPubSub<PsbEventTypes, PsbPayloads>();

const PubSubContext = createContext<PsbPubSub<PsbEventTypes, PsbPayloads> | null>(null);

/** Провайдер PubSub */
export function PsbProvider({ children }: { children: ReactNode; }) {
  return (
    <PubSubContext.Provider value={pubSubSingleton}>
      {children}
    </PubSubContext.Provider>
  );
}

/** Получение синглтона PubSub */
export function usePsbPubSub() {
  const context = useContext(PubSubContext);

  if (!context) {
    throw new Error('useGb3bPubSub должен использоваться внутри Gb1bPubSubProvider');
  }

  return context;
}

