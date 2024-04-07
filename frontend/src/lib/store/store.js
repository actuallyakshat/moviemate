import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const userAtom = atom(null);
const currentMovieAtom = atomWithStorage("currentMovie", null);

export { userAtom, currentMovieAtom };
