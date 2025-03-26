import { useState } from "react";
import AdminMenu from "@/components/AdminMenu/AdminMenu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import API from "@/api";

interface ICustomerForm {
  name: string;
  mobile: string;
  gstNumber: string;
  currentReading: string;
  address: string;
}

const AddCustomers = () => {
  const [addingCustomer, setAddingCustomer] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICustomerForm>({});

  const handleAddCustomer = async (data: ICustomerForm) => {
    try {
      setAddingCustomer(true);
      const resp = await API.post("/customers", data);

      reset(); // Reset form after successful submission

      setAddingCustomer(false);

      if (resp.status === 201) {
        toast.success("Customer added successfully");
      }

      console.log(resp);
    } catch (error) {
      setAddingCustomer(false);
      console.log(error);
    }
  };

  return (
    <AdminMenu>
      <section>
        <h3 className="mb-6 border-b-[1px] border-slate-200 pb-4 text-xl font-semibold text-black">
          Add Customer
        </h3>
        <div className="max-w-[768px] rounded-sm border-[1px] border-slate-200 bg-[#F8F8FF]/30 p-4">
          <form
            onSubmit={handleSubmit(handleAddCustomer)}
            className="grid gap-6 border-0 border-green-400 sm:grid-cols-2"
          >
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="customerName" className="text-sm font-semibold">
                Customer Name
              </Label>
              <div>
                <Input
                  className="text-sm font-medium"
                  type="text"
                  id="customerName"
                  placeholder="e.g., John Doe"
                  {...register("name", {
                    required: "Customer name is required",
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs font-semibold text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="mobileNumber" className="text-sm font-semibold">
                Mobile Number
              </Label>
              <div>
                <Input
                  className="text-sm font-medium"
                  type="text"
                  id="mobileNumber"
                  placeholder="e.g., 9876543210"
                  {...register("mobile", {
                    required: "Mobile number is required",
                    minLength: {
                      value: 10,
                      message: "Mobile number must be exactly 10 digits",
                    },
                    maxLength: {
                      value: 10,
                      message: "Mobile number must be exactly 10 digits",
                    },
                  })}
                />
                {errors.mobile && (
                  <p className="mt-1 text-xs font-semibold text-red-400">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="gstNumber" className="text-sm font-semibold">
                GST Number
              </Label>
              <div>
                <Input
                  className="text-sm font-medium"
                  type="text"
                  id="gstNumber"
                  placeholder="e.g., 22AAAAA0000A1Z5"
                  {...register("gstNumber", {
                    required: "GST Number is required",
                  })}
                />
                {errors.gstNumber && (
                  <p className="mt-1 text-xs font-semibold text-red-400">
                    {errors.gstNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="currentReading" className="text-sm font-semibold">
                Current Reading
              </Label>
              <>
                <Input
                  className="text-sm font-medium"
                  type="number"
                  id="currentReading"
                  placeholder="e.g., 1234"
                  {...register("currentReading", {
                    required: "Current Reading is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Current reading cannot be negative",
                    },
                  })}
                />
                {errors.currentReading && (
                  <p className="mt-1 text-xs font-semibold text-red-400">
                    {errors.currentReading.message}
                  </p>
                )}
              </>
            </div>

            <div className="grid w-full items-center gap-2 sm:col-span-2">
              <Label htmlFor="address" className="text-sm font-semibold">
                Address
              </Label>
              <div>
                <Textarea
                  className="text-sm font-medium"
                  id="address"
                  placeholder="e.g., 123 Main Street, Pilani, Rajasthan 333031"
                  style={{
                    height: "100px",
                  }}
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && (
                  <p className="mt-1 text-xs font-semibold text-red-400">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              disabled={addingCustomer}
              variant="default"
              className="mt-2 w-full sm:col-span-2"
            >
              {addingCustomer && <Loader2 className="h-4 w-4 animate-spin" />}
              Add Customer
            </Button>
          </form>
        </div>
      </section>
    </AdminMenu>
  );
};

export default AddCustomers;
