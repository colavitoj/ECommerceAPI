import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import ContactPage from "../../features/contact/ContactPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import CartPage from "../../features/cart/CartPage";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../store/configureStore";
import { fetchCartAsync, setCart } from "../../features/cart/cartSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";

function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = useCallback(async () => {
        try {

            await dispatch(fetchCurrentUser());
            await dispatch(fetchCartAsync());

        } catch (error) {
            console.log(error);
        }
    }, [dispatch])

    useEffect(() => {
        initApp().then(() => setLoading(false));

    }, [initApp])

    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? 'dark' : 'light'
    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    })

    function handleThemeChange() {
        setDarkMode(!darkMode);
    }

    if (loading) return <LoadingComponent message="Initializing application..." />

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position='bottom-right' hideProgressBar />
            <CssBaseline />
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
            <Container>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/catalog" component={Catalog} />
                    <Route path="/contact" component={ContactPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/catalog/:id" component={ProductDetails} />
                    <Route path="/server-error" component={ServerError} />
                    <Route path='/cart' component={CartPage} />
                    <PrivateRoute path='/checkout' component={CheckoutPage} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />


                    <Route component={NotFound} />
                </Switch>



            </Container>

        </ThemeProvider>
    );
}

export default App;
