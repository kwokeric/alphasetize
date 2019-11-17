import assign from 'lodash/assign';

import KeyConstants from './KeyConstants';
import PathConstants from './PathConstants';

const constants = assign({}, KeyConstants, PathConstants);

export default constants;
