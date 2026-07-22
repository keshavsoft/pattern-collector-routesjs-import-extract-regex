import fs from 'fs';
import path from 'path';

import defaultFunc from '../../index.js';

const filePath = path.join(process.cwd(), "routes.js");

const fileContent = fs.readFileSync(filePath, 'utf8');

const k1 = defaultFunc({
    matchLine: "import { router as routerFromv1 } from './v1/routes.js'",
    showLog: true,
    showLogStep1: true
});

console.log("ssssssssss : ", k1);

