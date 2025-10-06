import RoutesController from "./RoutesController.jsx";
import classes from './style/App.module.css'
import Header from "./components/common/Header.jsx";
import PageStateProvider from "./context/PageStateProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Footer from "./components/common/Footer.jsx";

/**
 * Main App component that serves as the root of the application
 * Wraps the entire app with authentication and page state providers
 * Contains the main layout structure with header, body content, and footer
 * 
 * @returns {JSX.Element} The main application component
 */
function App() {
    return (
        <>
            <AuthProvider>
                <PageStateProvider>
                    <div className={classes.All}>
                        <Header/>
                        <div className={classes.Container}>
                            <div className={classes.BodyContent}>
                                <RoutesController/>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </PageStateProvider>
            </AuthProvider>
        </>
    )
}

export default App
