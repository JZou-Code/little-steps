import RoutesController from "./RoutesController.jsx";
import classes from './style/App.module.css'
import Header from "./components/Header.jsx";

function App() {
    return (
        <>
            <Header/>
            <div className={classes.Container}>
                <RoutesController/>
            </div>
        </>
    )
}

export default App
