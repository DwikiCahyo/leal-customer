import Layout from "@/components/layout";
import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

const theme = extendTheme({
  colors: {
    leal: {
      primary: "#AC11B3",
      900: "#1a202c",
    },
  },
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLayout =
    router.asPath === "/login" || router.asPath == "/register" ? false : true;

  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        {isLayout ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </SessionProvider>
  );
}
