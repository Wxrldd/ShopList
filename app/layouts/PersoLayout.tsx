import { Outlet } from "react-router";
import PersoProvider from "~/shared/contexts/PersoContext";


export default function PersoLayout(){
  return(<>
    <PersoProvider children={<Outlet/>}/>
  </>);
}