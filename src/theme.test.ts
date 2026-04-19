import { describe, it, expect } from 'vitest';
import { theme } from './theme';

describe('theme', () => {
    it('exports all required color tokens', () => {
        expect(theme.colors.surfaceLowest).toBe('#0E0E0F');
        expect(theme.colors.surface).toBe('#131314');
        expect(theme.colors.primary).toBe('#ABC7FF');
        expect(theme.colors.primaryContainer).toBe('#448FFD');
        expect(theme.colors.dead).toBe('#FF6B6B');
    });

    it('exports fonts and layout dimensions', () => {
        expect(theme.fonts.sans).toContain('Plus Jakarta Sans');
        expect(theme.fonts.mono).toContain('JetBrains Mono');
        expect(theme.layout.sidebarWidth).toBe('248px');
        expect(theme.layout.panelWidth).toBe('264px');
    });

    it('exports a spacing scale', () => {
        expect(theme.space.xs).toBe('4px');
        expect(theme.space.lg).toBe('16px');
        expect(theme.space.xxxl).toBe('32px');
    });
});