import styled from "@emotion/styled";

const Aside = styled.aside`
  width: ${({ theme }) => theme.layout.panelWidth};
  min-width: ${({ theme }) => theme.layout.panelWidth};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  padding: ${({ theme }) => theme.space.lg} 18px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const AccentBar = styled.div`
  width: 2px;
  height: 14px;
  background: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.widest};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onSurface};
  margin: 0;
`;

const Placeholder = styled.div`
  padding: 0 18px;
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.outline};
  opacity: 0.4;
`;

export function InspectorPanel(){
    return (
        <Aside>
            <Header>
                <AccentBar />
                <Title>Inspector</Title>
            </Header>
            <Placeholder>Mounts on device selection</Placeholder>
        </Aside>
    );
}
