import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Assuming you have this

function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* This renders the child routes */}
      </main>
    </div>
  );
}

export default Layout;
