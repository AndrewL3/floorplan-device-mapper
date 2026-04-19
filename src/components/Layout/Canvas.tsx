import styled from "@emotion/styled";

const Main = styled.main`
  flex: 1;
  background: ${({ theme }) => theme.colors.surfaceLowest};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Placeholder = styled.div`
  color: ${({ theme }) => theme.colors.outline};
  opacity: 0.5;
  font-size: ${({ theme }) => theme.fontSize.body};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  text-transform: uppercase;
`;

export function Canvas() {
    return (
        <Main>
            <Placeholder>Canvas &middot;</Placeholder>
        </Main>
    );
}