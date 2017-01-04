import { Dimensions } from '../src/interfaces';
import { Tuple2 } from 'sodiumjs';

export type NTuple2<T, A> = number | Tuple2<T, A>;
export type Hash = string;
export type Model = NTuple2<Dimensions, Hash>;
