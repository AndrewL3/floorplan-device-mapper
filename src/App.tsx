import { useRef } from "react";
import styled from "@emotion/styled";
import { Sidebar } from "./components/Layout/Sidebar";
import {
  CanvasArea,
  type CanvasAreaHandle,
} from "./components/Canvas/CanvasArea";
import { InspectorPanel } from "./components/Layout/InspectorPanel";

const Shell = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export default function App() {
  const canvasRef = useRef<CanvasAreaHandle>(null);

  return (
    <Shell>
      <Sidebar onUpload={() => canvasRef.current?.openFilePicker()} />
      <CanvasArea ref={canvasRef} />
      <InspectorPanel />
    </Shell>
  );
}
