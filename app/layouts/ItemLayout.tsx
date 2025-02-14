import { Outlet } from "react-router";
import ItemProvider from "~/shared/contexts/ItemContext";

export default function ItemLayout() {
  return (
    <ItemProvider>
      <Outlet />
    </ItemProvider>
  );
}
