import { atom } from 'jotai';
import { FilterVal, Task } from '../types';

export const tasksAtom = atom<Task[]>([]);
export const filterAtom = atom<FilterVal>('all');
