import { ChakraProvider } from "@chakra-ui/react";
import { SidebarProvider } from "../contexts/SidebarContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </ChakraProvider>
  );
}

export default MyApp;
