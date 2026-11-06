import * as api from '@lp-labs/csv-line-parser';
import { parseCsvLine } from '@lp-labs/csv-line-parser';
console.log(parseCsvLine('Ada,42,"hello, world"'));
// @ts-expect-error invalid argument must be rejected by declarations
api.parseCsvLine(12);
