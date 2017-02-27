import { DISPLAY_SIZE_CHANGED } from '_actions';

export const displaySizeAdjust = size => dispatch => dispatch({ type: DISPLAY_SIZE_CHANGED, size });