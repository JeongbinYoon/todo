import { atom } from 'jotai';
import { Task } from '../types';

export const tasksAtom = atom<Task[]>([]);
export const filterAtom = atom('all');
