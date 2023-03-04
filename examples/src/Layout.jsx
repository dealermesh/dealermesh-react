import { DMProvider, DMDRProvider } from "@dealermesh/react";

export default function Layout(props) {
    
  return <DMProvider config={props.props}>
    { props.children }    
  </DMProvider>
  
}