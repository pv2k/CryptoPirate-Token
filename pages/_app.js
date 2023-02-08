import '../styles/globals.css'
import { ERC20ICOContextProvider } from "../context/CryptoPirateToken";
import Navbar from "../components/Navbar";

const MyApp = ({ Component, pageProps }) => (
  <ERC20ICOContextProvider>
    <Navbar />
    <Component {...pageProps} />
  </ERC20ICOContextProvider>
);

export default MyApp;
