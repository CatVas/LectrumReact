// Core
import { getFullApiUrl } from 'instruments';

const GROUP_ID = 'muigd1gnahf3';
const TOKEN = 'f6l6b8h9u4';
const url = 'https://lab.lectrum.io/react/api';
const api = getFullApiUrl(url, GROUP_ID);

export { GROUP_ID, TOKEN, api, url };
