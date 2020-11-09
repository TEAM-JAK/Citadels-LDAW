const {protocol, hostname} = window.location;

export const GAME_NAME = 'citadels';
export const DEFAULT_PORT = '8000';
export const BGIO_SERVER_URL = `${protocol}//${hostname}:${DEFAULT_PORT}`;
