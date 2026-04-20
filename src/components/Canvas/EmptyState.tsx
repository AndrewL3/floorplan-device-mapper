import styled from "@emotion/styled";

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surfaceLowest};
  background-image: radial-gradient(
    ${({ theme }) => theme.colors.surfaceContainerHigh} 1px,
    transparent 1px
  );
  background-size: 20px 20px;
`;

const Cta = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.xl};
  background: none;
  border: 1px dashed ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.outline};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSize.body};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  cursor: pointer;
  transition:
    border-color ${({ theme }) => theme.transition.default},
    color ${({ theme }) => theme.transition.default};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
  }
`;

const UploadIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

interface EmptyStateProps {
  onUpload: () => void;
}

export function EmptyState({ onUpload }: EmptyStateProps) {
  return (
    <Wrapper>
      <Cta onClick={onUpload}>
        <UploadIcon />
        Drop a floorplan image or click to upload
      </Cta>
    </Wrapper>
  );
}
