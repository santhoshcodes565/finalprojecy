import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import p1_p8 from './p1_p8.js';
import p9_p15 from './p9_p15.js';
import p16_p20 from './p16_p20.js';
import p21_p25 from './p21_p25.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allPackages = [...p1_p8, ...p9_p15, ...p16_p20, ...p21_p25];

const mockDataPath = path.resolve(__dirname, '../src/data/mockData.js');
const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

const packagesStartIndex = mockDataContent.indexOf('export const packages = [');
if (packagesStartIndex === -1) {
    throw new Error('Could not find "export const packages = [" in mockData.js');
}

const beforePackages = mockDataContent.substring(0, packagesStartIndex);

const newPackagesStr = "export const packages = " + JSON.stringify(allPackages, null, 2) + ";\n";

fs.writeFileSync(mockDataPath, beforePackages + newPackagesStr);

console.log('Successfully merged all 25 packages into mockData.js');
