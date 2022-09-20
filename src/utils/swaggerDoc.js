import { readFileSync } from 'fs';

let rawdata = readFileSync('./swagger.json');
let swaggerDocument = JSON.parse(rawdata);

export default swaggerDocument;
