import { DMProvider, DMDRProvider } from "@dealermesh/react";

export default function Layout(props) {
  
  const config = {
    server: "http://localhost:3002",
    accessToken: "YzdmMjM5YzItODhhZS00MDhjLWExZGMtMGMzZTFiYjYxNjYyLS1TYXVyYXZBcHAtLTIwMjMtMDMtMDFUMDk6MDY6MTItMDU6MDAtODNiNDRlNTUtMDFhYy00YjQxLTg5YWItN2Q5NDVkMmNmNGVlLTE=",
    accessKey: "4iLbplwCsjnkLbeF",
    vin: "5XYK6CAF3PG075033",
    car: { vin: "5XYK6CAF3PG075033" }
  }
  
  return <DMProvider config={config}>
    { props.children }    
  </DMProvider>
  
}