
import makeWASocket from 'baileys';

export * from 'baileys';

export { makeWASocket };

export const ANOSVLDG_NAME = 'ANOSVLDG';
export const ANOSVLDG_VERSION = '1.0.0';

export function createAnosvldgSocket(options = {}) {
  return makeWASocket(options);
}

export default makeWASocket;
