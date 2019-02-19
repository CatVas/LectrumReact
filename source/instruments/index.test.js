
import { delay, getFullApiUrl, getUniqueID, sum } from './';

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

    test('getUniqueID defaults to a string with length 15', () => {
        const res = getUniqueID();
        expect(res).toHaveProperty('length', 15);
    });

    test('getUniqueID throws with non-number arg', () => {
        expect(() => getUniqueID('20')).toThrow();
    });

    test('getUniqueID returns a string of desired length', () => {
        const res = getUniqueID(20);
        expect(typeof res).toBe('string');
        expect(res).toHaveLength(20);
    });

    describe('getFullApiUrl', () => {
        test('should be a function', () => {
            expect(getFullApiUrl).toBeInstanceOf(Function);
        });

        test('should throw on 1st arg non-string', () => {
            expect(() => getFullApiUrl(null, 'groupId'))
                .toThrow();
        });

        test('should throw on 2nd arg non-string', () => {
            expect(() => getFullApiUrl('api', null))
                .toThrow();
        });

        test('should return result', () => {
            const api = 'api';
            const groupId = 'groupId';
            const res = getFullApiUrl(api, groupId);
            expect(res).toBe(`${api}/${groupId}`);
        });
    });
});
