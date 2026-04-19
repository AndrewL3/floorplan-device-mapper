import styled from "@emotion/styled";

const Aside = styled.aside`
  width: ${({ theme }) => theme.layout.sidebarWidth};
  min-width: ${({ theme }) => theme.layout.sidebarWidth};
  background: ${({ theme }) => theme.colors.surfaceLowest};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Section = styled.div<{ raised?: boolean }>`
  padding: ${({ theme }) => theme.space.lg};
  background: ${({ theme, raised }) =>
    raised ? theme.colors.surface : "transparent"};
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSize.label};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.widest};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.outline};
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Placeholder = styled.div`
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.outline};
  opacity: 0.4;
`;

export function Sidebar() {
    return (
        <Aside>
            <Section>
                <Label>Floorplan</Label>
                <Placeholder>Upload</Placeholder>
            </Section>
            <Section raised>
                <Label>Scale</Label>
                <Placeholder>Not calibrated</Placeholder>
            </Section>
            <Section>
                <Label>Tools</Label>
                <Placeholder>Tool buttons</Placeholder>
            </Section>
            <Section raised>
                <Label>Wall Material</Label>
                <Placeholder>Material dropdown</Placeholder>
            </Section>
            <Section style={{ flex: 1}}>
                <Label>Devices</Label>
                <Placeholder>Device palette</Placeholder>
            </Section>
        </Aside>
    );
}
