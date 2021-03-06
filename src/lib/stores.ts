import type { DataHandler, Node } from './types';

import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const nodes: Writable<Node[]> = writable([])
export const selectedNode: Writable<Node> = writable(null)
export const dataHandler: Writable<DataHandler> = writable(null)