import RoutesController from "./RoutesController.jsx";
import classes from './style/App.module.css'
import Header from "./components/Header.jsx";
import PageStateProvider from "./context/PageStateProvider.jsx";

function App() {
    return (
        <>
            <PageStateProvider>
                <div className={classes.All}>
                    <Header/>
                    <div className={classes.Container}>
                        <RoutesController/>
                    </div>
                </div>
            </PageStateProvider>
        </>
    )
}

export default App
