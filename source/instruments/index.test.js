
import { delay, getUniqueID, sum } from './';

describe('instruments:', () => {
    test('sum should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum should throw with non-number 1st arg', () => {
        expect(() => sum('2', 2)).toThrow();
    });

    test('sum should throw with non-number 2nd arg', () => {
        expect(() => sum(2, '')).toThrow();
    });

    test('sum should return addition', () => {
        expect(sum(2, 2)).toBe(2 + 2);
        expect(sum(4, 7)).toMatchSnapshot();
    });

    test('delay should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('getUniqueID should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID throws with non-number arg', () => {
        expect(() => getUniqueID('20')).toThrow();
    });

    test('getUniqueID returns a string of desired length', () => {
        const res = getUniqueID(20);
        expect(typeof res).toBe('string');
        expect(res).toHaveLength(20);
    });
});
