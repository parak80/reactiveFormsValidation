import { hasChanges } from './utils';

describe('hasChanges function', () => {
    const target: any = {
        description: 'test',
        contact: {
            name: 'kalle'
        }
    };
    it('should return true when simple property diff', () => {
        const source: any = {
            description: 'testing'
        };
        const result = hasChanges(source, target);
        expect(result).toBe(true);
    });
    it('should return false on simple property no diff', () => {
        const source: any = {
            description: 'test'
        };
        const result = hasChanges(source, target);
        expect(result).toBe(false);
    });
    it('should return true when nested object property diff', () => {
        const source: any = {
            contact: {
                name: 'olle'
            }
        };
        const result = hasChanges(source, target);
        expect(result).toBe(true);
    });
    it('should return false when nested object property no diff', () => {
        const source: any = {
            contact: {
                name: 'kalle'
            }
        };
        const result = hasChanges(source, target);
        expect(result).toBe(false);
    });
    it('should return true when target propert is undefined', () => {
        const source: any = {
            note: 'jadda'
        };
        const result = hasChanges(source, target);
        expect(result).toBe(true);
    });
    it('should return true when target propert is undefined and source is empty', () => {
        const source: any = {
            note: ''
        };
        const result = hasChanges(source, target);
        expect(result).toBe(false);
    });
});
