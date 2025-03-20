import { Outlet} from "react-router-dom"

const VendorLayout = () => {
     return (
    <div>
      <div className="container p-4 mx-auto">
        <Outlet />
      </div>
    </div>
  );
 
}

export default VendorLayout
