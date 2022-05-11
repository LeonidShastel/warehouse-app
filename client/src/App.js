import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import {
    PRODUCT_EDIT_ROUTE,
    PRODUCT_ROUTE,
    SHIPMENT_EDIT_ROUTE,
    SHIPMENTS_ROUTE,
    STAFF_ROUTE,
    STATUSES_ROUTE
} from "./utils/consts";
import Products from "./pages/Products";
import NavBar from "./components/NavBar";
import EditProduct from "./pages/EditProduct";
import Statuses from "./pages/Statuses";
import Shipments from "./pages/Shipments";
import Staff from "./pages/Staff";
import EditShipment from "./pages/EditShipment";


function App() {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route exact path={PRODUCT_ROUTE} element={<Products/>}/>
                <Route exact path={PRODUCT_EDIT_ROUTE} element={<EditProduct/>}/>
                <Route exact path={STATUSES_ROUTE} element={<Statuses/>}/>
                <Route exact path={SHIPMENTS_ROUTE} element={<Shipments/>}/>
                <Route exact path={SHIPMENT_EDIT_ROUTE} element={<EditShipment/>}/>
                <Route exact path={STAFF_ROUTE} element={<Staff/>}/>
                <Route path={PRODUCT_ROUTE} element={<Products/>}/>
            </Routes>
        </Router>
    );
}

export default App;
