  import styled from '@emotion/styled';                                                                                              
  import { Sidebar } from './components/Layout/Sidebar';                                                                             
  import { Canvas } from './components/Layout/Canvas';
  import { InspectorPanel } from './components/Layout/InspectorPanel';                                                               
                                                                                                                                     
  const Shell = styled.div`
    display: flex;                                                                                                                   
    height: 100vh;                                                                                         
    width: 100vw;
  `;

  export default function App() {
    return (
      <Shell>                                                                                                                        
        <Sidebar />
        <Canvas />                                                                                                                   
        <InspectorPanel />                                                                                 
      </Shell>
    );
  }
