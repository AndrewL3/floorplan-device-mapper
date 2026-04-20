import styled from "@emotion/styled";

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary}18;
  border: 2px dashed ${({ theme }) => theme.colors.primaryContainer};
  pointer-events: none;
  z-index: 10;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSize.body};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
`;

interface DropOverlayProps {
  visible: boolean;
}

export function DropOverlay({ visible }: DropOverlayProps) {
  if (!visible) return null;
  return (
    <Overlay>
      <Label>Drop image</Label>
    </Overlay>
  );
}
