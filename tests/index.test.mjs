import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('parses simple fields', () => {
  assert.deepEqual(api.parseCsvLine('a,b,c'), ['a', 'b', 'c']);
});
test('parses a quoted comma', () => {
  assert.deepEqual(api.parseCsvLine('a,"b,c"'), ['a', 'b,c']);
});
test('unescapes doubled quotes', () => {
  assert.deepEqual(api.parseCsvLine('"a""b"'), ['a"b']);
});
test('retains empty fields', () => {
  assert.deepEqual(api.parseCsvLine(',b,'), ['', 'b', '']);
});
test('parses one empty field', () => {
  assert.deepEqual(api.parseCsvLine(''), ['']);
});
test('rejects unclosed quotes', () => {
  assert.throws(() => api.parseCsvLine('"abc'), SyntaxError);
});
