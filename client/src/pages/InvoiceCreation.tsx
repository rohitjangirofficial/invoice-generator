import React, { useEffect, useState } from "react";
import AdminMenu from "@/components/AdminMenu/AdminMenu";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
// import axios from "axios";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Controller, useForm } from "react-hook-form";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import API from "@/api";

interface ICustomer {
  _id: string;
  name: string;
  mobile: string;
  gstNumber: string;
  currentReading: number;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IInvoiceForm {
  invoiceNumber: string;
  date: Date;
  customer: string;
  currentReading: number;
  previousReading: number;
  rentAmount: number;
  freeCopiesCount: number;
  ratePerReading: number;
  gstType: "IGST" | "CGST_SGST";
}

const InvoiceCreation = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null,
  );

  console.log(selectedCustomer);

  //Loading state for generating invoice
  const [generatingInvoice, setGeneratingInvoice] = useState<boolean>(false);
  const [fetchingCustomers, setFetchingCustomers] = useState<boolean>(false);

  //Select cusomter pop up state
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const generateInvoiceNumber = () => {
    const randomNum = Math.floor(10000000 + Math.random() * 90000000);
    const newInvoiceNumber = `INV-${randomNum}`;
    setFormValue("invoiceNumber", newInvoiceNumber, { shouldValidate: true });
  };

  const fetchCustomer = async () => {
    try {
      setFetchingCustomers(true);
      const resp = await API.get("/customers");
      setFetchingCustomers(false);
      setCustomers(resp.data?.customers);
    } catch (error) {
      setFetchingCustomers(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue: setFormValue,
    reset,
  } = useForm<IInvoiceForm>({});

  useEffect(() => {
    if (selectedCustomer) {
      setFormValue("previousReading", selectedCustomer.currentReading, {
        shouldValidate: true,
      });
    }
  }, [selectedCustomer]);

  const handleGenerateInvoice = async (data: IInvoiceForm) => {
    try {
      // Calculations
      const netPayableReading =
        data.currentReading - data.previousReading - data.freeCopiesCount;
      const total = netPayableReading * data.ratePerReading + data.rentAmount;
      const IGST = parseFloat((total * 0.18).toFixed(2));
      const CGST = parseFloat((total * 0.09).toFixed(2));
      const SGST = parseFloat((total * 0.09).toFixed(2));

      // Initialize jsPDF
      const doc = new jsPDF();

      // Company Details
      doc.addImage("logo.jpg", "JPEG", 20, 10, 30, 30);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("ANDi Software Solutions", 180, 20, { align: "right" });
      doc.text("Panipat, Haryana 132103", 180, 25, {
        align: "right",
      });
      doc.text("Phone: +91-7015574125", 180, 30, { align: "right" });
      doc.text("Email: andisoftwaresolutions@gmail.com", 180, 35, {
        align: "right",
      });

      // Invoice Title
      doc.setFontSize(12);
      doc.text("Invoice", 20, 50);

      // Invoice Details
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Invoice No: ${data.invoiceNumber}`, 20, 60);
      doc.text(`Date: ${data.date}`, 20, 65);
      doc.text(
        `Customer: ${selectedCustomer?.name || "Unknown Customer"}`,
        20,
        70,
      );
      doc.text(
        `GST Number: ${selectedCustomer?.gstNumber || "Unknown GST Number"}`,
        20,
        75,
      );

      // Items Table (using autoTable for clarity)
      autoTable(doc, {
        startY: 85,
        head: [["Description", "Value"]],
        body: [
          ["Current Reading", data.currentReading],
          ["Previous Reading", data.previousReading],
          ["Free Copies", data.freeCopiesCount],
          ["Net Payable Reading", netPayableReading],
          ["Rate Per Reading", data.ratePerReading.toFixed(2)],
          ["Rent Amount", data.rentAmount.toFixed(2)],
          ["Total (Before Tax)", total.toFixed(2)],
        ],
        theme: "striped",
        headStyles: {
          fillColor: [60, 60, 60],
          textColor: [255, 255, 255],
        },
        bodyStyles: {
          fontSize: 10,
        },
        columnStyles: {
          0: { cellWidth: 100 },
          1: { cellWidth: 80, halign: "right" },
        },
      });

      // Taxes and Grand Total
      doc.setFontSize(12);
      if (data.gstType === "CGST_SGST") {
        doc.text(`CGST (9%): ${CGST.toFixed(2)}`, 20, 160);
        doc.text(`SGST (9%): ${SGST.toFixed(2)}`, 20, 170);
        doc.setFontSize(14);
        doc.text(`Grand Total: ${(total + SGST + CGST).toFixed(2)}`, 20, 182);
      } else {
        doc.text(`IGST (18%): ${IGST.toFixed(2)}`, 20, 160);
        doc.setFontSize(14);
        doc.text(`Grand Total: ${(total + IGST).toFixed(2)}`, 20, 172);
      }

      // Save PDF
      doc.save(`invoice_${data.invoiceNumber}.pdf`);

      setGeneratingInvoice(true);

      const resp = await API.post("/invoices", {
        ...data,
        customer: data.customer,
        calculations: {
          netPayableReading,
          igst: data.gstType === "IGST" ? `IGST: ${IGST} (18%)` : undefined,
          cgst: data.gstType === "CGST_SGST" ? `CGST: ${CGST} (9%)` : undefined,
          sgst: data.gstType === "CGST_SGST" ? `SGST: ${SGST} (9%)` : undefined,
          total: parseFloat(total.toFixed(2)),
          grandTotal:
            data.gstType === "IGST"
              ? parseFloat((total + IGST).toFixed(2))
              : parseFloat((total + CGST + SGST).toFixed(2)),
        },
      });

      reset(); // Reset form after successful submission
      setGeneratingInvoice(false);

      if (resp.status === 201) {
        toast.success("Invoice generated successfully");
      }

      console.log(resp);
    } catch (error) {
      setGeneratingInvoice(false);
      console.error("Error generating invoice:", error);
    }
  };

  return (
    <AdminMenu>
      <section>
        <h3 className="mb-6 border-b-[1px] border-slate-200 pb-4 text-xl font-semibold text-black">
          Generate Invoice
        </h3>
        <div className="max-w-[768px] rounded-sm border-[1px] border-slate-200 bg-[#F8F8FF]/30 p-4">
          <form
            onSubmit={handleSubmit(handleGenerateInvoice)}
            className="grid gap-6 border-0 border-green-400 sm:grid-cols-2"
          >
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="invoiceNumber" className="text-sm font-semibold">
                Invoice Number
              </Label>

              <div className="flex w-full items-start space-x-2">
                <div className="w-full">
                  <Input
                    className="text-sm font-medium"
                    type="text"
                    id="invoiceNumber"
                    placeholder="e.g., INV001"
                    {...register("invoiceNumber", {
                      required: "Invoice number is required",
                    })}
                  />
                  {errors.invoiceNumber && (
                    <p className="mt-1 text-xs font-semibold text-red-400">
                      {errors.invoiceNumber.message}
                    </p>
                  )}
                </div>
                <Button type="button" onClick={generateInvoiceNumber}>
                  <RefreshCcw />
                </Button>
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="date" className="text-sm font-semibold">
                Date
              </Label>
              <div className="w-full">
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-medium !text-black",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.date && (
                  <p className="mt-1 text-xs font-semibold text-red-400">
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label
                htmlFor="selectCustomers"
                className="text-sm font-semibold"
              >
                Select Customer
              </Label>

              <div className="w-full">
                {fetchingCustomers ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <p className="text-sm font-medium">Loading Customers</p>
                  </div>
                ) : (
                  <Controller
                    control={control}
                    name="customer"
                    rules={{ required: "Customer selection is required" }}
                    render={({ field }) => (
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="selectCustomers"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {field.value
                              ? customers.find(
                                  (customer) => customer._id === field.value,
                                )?.name
                              : "Select customer..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search customer..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No customer found.</CommandEmpty>
                              <CommandGroup>
                                {customers.map((customer) => (
                                  <CommandItem
                                    className="font-medium"
                                    key={customer._id}
                                    value={customer.name}
                                    onSelect={() => {
                                      const newValue =
                                        field.value === customer._id
                                          ? ""
                                          : customer._id;
                                      field.onChange(newValue);
                                      setSelectedCustomer(
                                        customers.find(
                                          (customer) =>
                                            customer._id === newValue,
                                        ) || null,
                                      );
                                      setValue(newValue ? customer.name : "");
                                      setOpen(false);
                                    }}
                                  >
                                    {customer.name}
                                    <Check
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        field.value === customer._id
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                )}
                {errors.customer && (
                  <p className="mt-1 text-xs font-semibold text-red-400">
                    {errors.customer.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="currentReading" className="text-sm font-semibold">
                Current Reading
              </Label>
              <div className="w-full">
                <Input
                  className="text-sm font-medium"
                  type="number"
                  id="currentReading"
                  placeholder="e.g., 1500"
                  {...register("currentReading", {
                    required: "Current reading is required",
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
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label
                htmlFor="previousReading"
                className="text-sm font-semibold"
              >
                Previous Reading
              </Label>
              <div className="w-full">
                <Input
                  className="text-sm font-medium"
                  type="number"
                  id="previousReading"
                  placeholder="e.g., 1200"
                  {...register("previousReading", {
                    required: "Previous reading is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Previous reading cannot be negative",
                    },
                  })}
                />
                {errors.previousReading && (
                  <p className="mt-1 text-xs font-semibold text-red-400">
                    {errors.previousReading.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="rentAmount" className="text-sm font-semibold">
                Rent Amount
              </Label>
              <div className="w-full">
                <Input
                  className="text-sm font-medium"
                  type="number"
                  id="rentAmount"
                  placeholder="e.g., 500"
                  {...register("rentAmount", {
                    required: "Rent amount is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Rent amount cannot be negative",
                    },
                  })}
                />
                {errors.rentAmount && (
                  <p className="mt-1 text-xs font-semibold text-red-400">
                    {errors.rentAmount.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label
                htmlFor="freeCopiesCount"
                className="text-sm font-semibold"
              >
                Free Copies Count
              </Label>
              <div className="w-full">
                <Input
                  className="text-sm font-medium"
                  type="number"
                  id="freeCopiesCount"
                  placeholder="e.g., 100"
                  {...register("freeCopiesCount", {
                    required: "Free copies count is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Free copies count cannot be negative",
                    },
                  })}
                />
                {errors.freeCopiesCount && (
                  <p className="mt-1 text-xs font-semibold text-red-400">
                    {errors.freeCopiesCount.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="ratePerReading" className="text-sm font-semibold">
                Rate Per Reading
              </Label>
              <div className="w-full">
                <Input
                  className="text-sm font-medium"
                  type="number"
                  step="0.01"
                  id="ratePerReading"
                  placeholder="e.g., 2.00"
                  {...register("ratePerReading", {
                    required: "Rate per reading is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Rate per reading cannot be negative",
                    },
                  })}
                />
                {errors.ratePerReading && (
                  <p className="mt-1 text-xs font-semibold text-red-400">
                    {errors.ratePerReading.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-1 grid w-full items-center gap-2 sm:col-span-2">
              <Label htmlFor="gstType" className="text-sm font-semibold">
                Select GST Type
              </Label>

              <div className="w-full">
                <Controller
                  control={control}
                  name="gstType"
                  rules={{ required: "GST type is required" }}
                  render={({ field }) => (
                    <Select
                      key={field.value}
                      onValueChange={(value: "IGST" | "CGST_SGST") =>
                        field.onChange(value)
                      }
                      value={field.value}
                    >
                      <SelectTrigger className="w-full font-medium text-black">
                        <SelectValue placeholder="GST Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="font-medium">
                          <SelectLabel>GST Type</SelectLabel>
                          <SelectItem value="IGST">IGST</SelectItem>
                          <SelectItem value="CGST_SGST">CGST_SGST</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gstType && (
                  <p className="mt-1 text-xs font-semibold text-red-400">
                    {errors.gstType.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              disabled={generatingInvoice}
              variant="default"
              className="mt-2 w-full sm:col-span-2"
            >
              {generatingInvoice && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Generate Invoice
            </Button>
          </form>
        </div>
      </section>
    </AdminMenu>
  );
};

export default InvoiceCreation;
