import AdminMenu from "../components/AdminMenu/AdminMenu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <AdminMenu>
      <div>
        <h2 className="text-2xl font-semibold text-black">
          Welcome To Admin Panel
        </h2>
        <p className="text-md font-medium">
          Manage your customers and generate invoices with ease.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-black">Quick Actions</h2>
        <div className="mt-5 flex gap-4">
          <Link to="/add-customers">
            <Button className="rounded-sm">Add New Customer</Button>
          </Link>
          <Link to="/invoice-creation">
            <Button className="rounded-sm">Create Invoice</Button>
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-black">What You Can Do</h2>
        <div className="mt-5 flex flex-col gap-4">
          <div className="rounded-md border-[1px] border-gray-200 p-4">
            <h3 className="font-medium">Customer Management</h3>
            <p className="text-sm">
              Add and manage customer details like name, mobile, and GST number.
            </p>
          </div>
          <div className="rounded-md border-[1px] border-gray-200 p-4">
            <h3 className="font-medium">Invoice Generation</h3>
            <p className="text-sm">
              Create invoices with rent, readings, and tax calculations, and
              download as PDF.
            </p>
          </div>
        </div>
      </div>
    </AdminMenu>
  );
};

export default HomePage;
