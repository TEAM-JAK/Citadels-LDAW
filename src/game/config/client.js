import {DEFAULT_PORT} from '.';

const {protocol, hostname} = window.location;
export const BGIO_SERVER_URL = `${protocol}//${hostname}:${DEFAULT_PORT}`;
