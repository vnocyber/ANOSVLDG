
import makeWASocket from 'baileys';

export * from 'baileys';
export { default } from 'baileys';
export { makeWASocket };

export declare const ANOSVLDG_NAME: 'ANOSVLDG';
export declare const ANOSVLDG_VERSION: '1.0.0';

export declare function createAnosvldgSocket(
  options?: Parameters<typeof makeWASocket>[0]
): ReturnType<typeof makeWASocket>;
