import { cleanInput } from './cliUtils';
import { describe, test, expect } from 'vitest';

describe.each([
    {
        input: '  hello world  ',
        expected: ['hello', 'world']
    },
    {
        input: 'HELLO, world!',
        expected: ['hello', 'world']
    },
    {
        input: 'hello-world',
        expected: ['hello-world']
    },
    {
        input: 'hello_world',
        expected: ['hello', 'world']
    },
    {
        input: 'hello 123 world',
        expected: ['hello', '123', 'world']
    },
    {
        input: 'hello 123 world!@#$%^&*()',
        expected: ['hello', '123', 'world']
    },
    {
        input: '!@#$%^&*()',
        expected: []
    },
    {
        input: '',
        expected: []
    }
])('cleanInput', ({ input, expected }) => {
    test(`should clean input "${input}"`, () => {
        expect(cleanInput(input)).toEqual(expected);
    });

    test(`should return an array of strings`, () => {
        expect(Array.isArray(cleanInput(input))).toBe(true);
    });

    test(`should return an array of strings with length ${expected.length}`, () => {
        expect(cleanInput(input).length).toBe(expected.length);
    });

    test(`should return an array of strings with elements "${expected.join(', ')}"`, () => {
        expect(cleanInput(input)).toEqual(expected);
    });

    test(`should lowercase all elements`, () => {
        expect(cleanInput(input).every((el) => el === el.toLowerCase())).toBe(true);
    });
});
