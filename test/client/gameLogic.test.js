import {twoOfThree} from '../../src/client/gameLogic.js'

function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('function gets called', () => {
  const line = ['O', null, 'O'];
  expect(twoOfThree(line, 'O')).toBe(1);
});
