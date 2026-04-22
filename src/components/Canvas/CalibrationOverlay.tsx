import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { useStore } from "../../store";
import { stageToContainer } from "../../utils/coords";

const Popover = styled.div<{ $left: number; $top: number }>`
  position: absolute;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.space.md};
  width: 180px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSize.label};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.outline};
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const InputRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  background: ${({ theme }) => theme.colors.surfaceLowest};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 0;
  padding: 6px 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.body};
  font-family: ${({ theme }) => theme.fonts.mono};
  outline: none;
  width: 80px;

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Unit = styled.span`
  font-size: ${({ theme }) => theme.fontSize.body};
  color: ${({ theme }) => theme.colors.outline};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: ${({ theme }) => theme.space.sm};
`;

const Button = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 5px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  border: 1px solid
    ${({ theme, $primary }) =>
      $primary ? theme.colors.primaryContainer : theme.colors.outlineVariant};
  background: ${({ theme, $primary }) =>
    $primary ? theme.colors.primaryContainer : "transparent"};
  color: ${({ theme, $primary }) =>
    $primary ? "#FFFFFF" : theme.colors.outline};
`;

export function CalibrationOverlay() {
  const showInput = useStore((s) => s.showCalibrationInput);
  const calibrationPoints = useStore((s) => s.calibrationPoints);
  const submitCalibration = useStore((s) => s.submitCalibration);
  const cancelInteraction = useStore((s) => s.cancelInteraction);
  const pan = useStore((s) => s.pan);
  const zoom = useStore((s) => s.zoom);

  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showInput) {
      setValue("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [showInput]);

  if (!showInput || calibrationPoints.length !== 2) return null;

  const midpoint = {
    x: (calibrationPoints[0].x + calibrationPoints[1].x) / 2,
    y: (calibrationPoints[0].y + calibrationPoints[1].y) / 2,
  };
  const containerPos = stageToContainer(midpoint, pan, zoom);

  const handleSubmit = () => {
    const meters = parseFloat(value);
    if (meters > 0) submitCalibration(meters);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") cancelInteraction();
  };

  return (
    <Popover $left={containerPos.x - 90} $top={containerPos.y + 20}>
      <Label>Reference distance</Label>
      <InputRow>
        <Input
          ref={inputRef}
          type="number"
          step="0.1"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Unit>m</Unit>
      </InputRow>
      <ButtonRow>
        <Button onClick={cancelInteraction}>Cancel</Button>
        <Button $primary onClick={handleSubmit}>
          Apply
        </Button>
      </ButtonRow>
    </Popover>
  );
}
