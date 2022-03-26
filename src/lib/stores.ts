import type { Node } from './types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const nodes: Writable<Node[]> = writable([]);