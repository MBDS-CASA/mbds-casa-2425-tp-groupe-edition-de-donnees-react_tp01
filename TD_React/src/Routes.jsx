import {Route, Routes} from "react-router";
import ShowData from "./ShowData";
import data from "./../../data.json";

function AppRoute({menuItem}) {
    return (
        <Routes>
            <Route path="/:menuItem" element={<ShowData data={data} menuItem={menuItem}/>} />
        </Routes>
    )
}
export default AppRoute