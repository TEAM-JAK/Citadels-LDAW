import {isProduction, DEFAULT_PORT} from '.';

const {origin, protocol, hostname} = window.location;
export const BGIO_SERVER_URL = isProduction
  ? origin
  : `${protocol}//${hostname}:${DEFAULT_PORT}`;
