import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AuthContextProvider from "./contexts/AuthContextProvider";
import MainContextProvider from "./contexts/MainContextProvider";
import MainPage from "./Pages/MainPage";
import MainRoutes from "./Routes/MainRoutes";

function App() {
  return (
    <>
      <AuthContextProvider>
      <MainContextProvider>
        <Header />
        <MainRoutes />
        <Footer />
      </MainContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
