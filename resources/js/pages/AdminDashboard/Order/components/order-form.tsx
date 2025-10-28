import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { X, Search } from "lucide-react";
import { index } from "@/routes/admin/order";

// 🧾 Type Definitions
interface VariantColor {
  id: number;
  name: string;
}

interface Variant {
  color: VariantColor;
}

interface Size {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  product_code: string;
  price: number;
  sale_price: number;
  sizes?: Size[];
  variants?: Variant[];
}

interface ShippingCharge {
  id: number;
  name: string;
  amount: number;
}

interface OrderItem {
  id: number;
  product_name: string;
  product_code: string;
  purchase_price: number;
  sale_price: number;
  qty: number;
  size_id: string | number;
  sizes?: Size[];
  color_id: string | number;
  colors?: VariantColor[];
}

interface ShippingData {
  name: string;
  email: string;
  phone: string;
  address: string;
  shipping_charge_id: string | number;
}

interface OrderFormData {
  shipping: ShippingData;
  items: OrderItem[];
  discount: number;

  shipping_charge: number;
}

interface OrderFormProps {
  products: Product[];
  shippingCharge: ShippingCharge[];
  order?: {
    id: number;
    shipping?: ShippingData;
    orderdetails?: any[];
    discount?: number;
    shipping_charge?: number;
  };
}

export default function OrderForm({
  products,
  shippingCharge,
  order,
}: OrderFormProps) {
  const { data, setData, post, processing } = useForm<OrderFormData>({
    shipping: {
      name: order?.shipping?.name || "",
      email: order?.shipping?.email || "",
      phone: order?.shipping?.phone || "",
      address: order?.shipping?.address || "",
      shipping_charge_id: order?.shipping?.shipping_charge_id || "",
    },
    items:
      order?.orderdetails?.map((orderDetail) => ({
        id: orderDetail.product_id,
        product_name: orderDetail.product_name,
        product_code: orderDetail.product_code,
        purchase_price: orderDetail.purchase_price,
        sale_price: orderDetail.sale_price,
        qty: orderDetail.qty,
        sizes:
          products.find((product) => product.id === orderDetail.product_id)
            ?.sizes || [],
        size_id: orderDetail.size?.id || "",
        color_id: orderDetail.color?.id || "",
        colors:
          products
            .find((product) => product.id === orderDetail.product_id)
            ?.variants?.map((v) => ({
              id: v.color.id,
              name: v.color.name,
            })) || [],
      })) || [],
    discount: order?.discount || 0,
    shipping_charge: order?.shipping_charge || 0,
  });

  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.product_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = (): void => {
    if (!selectedProduct) return;

    const product = products.find((p) => p.id === Number(selectedProduct));
    if (!product) return;

    const exists = data.items.find((item) => item.id === product.id);
    if (exists) {
      setData(
        "items",
        data.items.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + quantity }
            : item
        )
      );
    } else {
      const newItem: OrderItem = {
        id: product.id,
        product_name: product.title,
        product_code: product.product_code,
        purchase_price: product.price,
        sale_price: product.sale_price,
        qty: quantity,
        sizes: product.sizes || [],
        size_id: "",
        color_id: "",
        colors:
          product.variants?.map((variant) => ({
            id: variant.color.id,
            name: variant.color.name,
          })) || [],
      };
      setData("items", [...data.items, newItem]);
    }

    setSelectedProduct("");
    setQuantity(1);
    setLocalErrors((prev) => ({ ...prev, items: "" }));
  };

  const handleRemoveItem = (id: number): void => {
    setData("items", data.items.filter((item) => item.id !== id));
  };

  const handleChangeQty = (id: number, qty: string): void => {
    setData(
      "items",
      data.items.map((item) =>
        item.id === id ? { ...item, qty: Number(qty) } : item
      )
    );
  };

  const handleChangeColor = (id: number, colorId: string): void => {
    setData(
      "items",
      data.items.map((item) =>
        item.id === id ? { ...item, color_id: colorId } : item
      )
    );
  };

  const handleChangeSize = (id: number, sizeId: string): void => {
    setData(
      "items",
      data.items.map((item) =>
        item.id === id ? { ...item, size_id: sizeId } : item
      )
    );
  };

  const handleChangeShipping = (id: string): void => {
    const selected = shippingCharge.find((s) => s.id === Number(id));
    if (selected) {
      setData("shipping.shipping_charge_id", selected.id);
      setData("shipping_charge", selected.amount);
      setLocalErrors((prev) => ({ ...prev, shipping_charge_id: "" }));
    }
  };

  const handleDiscount = (value: string) => {
    setData("discount", Number(value));
  }

  const subtotal: number = data.items.reduce(
    (sum, item) => sum + item.sale_price * item.qty,
    0
  );
  const total: number =
    subtotal + Number(data.shipping_charge || 0) - Number(data.discount || 0);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!data.shipping.name.trim()) errors.name = "Name is required.";
    if (!data.shipping.phone.trim()) errors.phone = "Phone is required.";
    if (!data.shipping.address.trim()) errors.address = "Address is required.";
    if (!data.shipping.shipping_charge_id)
      errors.shipping_charge_id = "Please select a delivery area.";
    if (data.items.length === 0) errors.items = "Please add at least one product.";
    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (order?.id) {
      console.log("✏️ Editing Order:", data);
      // post(route("admin.orders.update", order.id));
    } else {
      console.log("➕ Adding Order:", data);
      // post(route("admin.orders.store"));

      
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <Link
          href={index.url()}
          className="text-green-600 dark:text-green-400 hover:underline text-sm md:text-base"
        >
          ← Back to Orders
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 space-y-6 "
        noValidate
      >
        {/* 🛒 Product Add Section */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
            🛒 Add Products
          </h2>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-end w-full">
            {/* Product Selector */}
            <div className="flex-1 min-w-0 relative w-full md:w-auto">
              <Label>Select Product</Label>
              <div
                onClick={() => setIsProductModalOpen(true)}
                className="border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 w-full p-2 rounded-md cursor-pointer flex justify-between items-center"
              >
                {selectedProduct
                  ? (() => {
                    const product = products.find(
                      (p) => p.id === Number(selectedProduct)
                    );
                    return product
                      ? `${product.title} (${product.product_code})`
                      : "Select Product";
                  })()
                  : "Select Product"}
                <Search size={18} className="text-gray-500" />
              </div>
            </div>

            {/* Quantity Input */}
            <div className="w-full md:w-32 flex-shrink-0">
              <Label>Quantity</Label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuantity(Number(e.target.value))
                }
              />
            </div>

            {/* Add Button */}
            <div className="w-full md:w-auto flex-shrink-0">
              <Button
                size="sm"
                className="w-full md:w-auto mt-2 md:mt-0"
                onClick={handleAddItem}
              >
                + Add
              </Button>
            </div>
          </div>


          {isProductModalOpen && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl shadow-lg w-full max-w-lg relative">
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>

                <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  Search Product
                </h2>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or product code..."
                  className="border w-full p-2 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 mb-3"
                  autoFocus
                />

                <div className="max-h-60 overflow-y-auto divide-y dark:divide-gray-700">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedProduct(String(p.id));
                          setIsProductModalOpen(false);
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-md"
                      >
                        <div className="font-medium text-sm md:text-base">{p.title}</div>
                        <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                          Code: {p.product_code} — ৳{p.sale_price}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-3">
                      No products found.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {localErrors.items && (
            <p className="text-red-600 text-sm mt-2">{localErrors.items}</p>
          )}

          {/* 🧾 Product Table */}
          {data.items.length > 0 && (
            <div className="overflow-x-auto mt-5 rounded-md">
              <table className="w-full text-sm md:text-base border border-gray-200 dark:border-gray-700 min-w-[600px] md:min-w-full">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="p-2 border dark:border-gray-700">SL</th>
                    <th className="p-2 border dark:border-gray-700">Product</th>
                    <th className="p-2 border dark:border-gray-700">Size</th>
                    <th className="p-2 border dark:border-gray-700">Color</th>
                    <th className="p-2 border dark:border-gray-700">Price</th>
                    <th className="p-2 border dark:border-gray-700">Qty</th>
                    <th className="p-2 border dark:border-gray-700">Total</th>
                    <th className="p-2 border dark:border-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, index) => (
                    <tr
                      key={item.id}
                      className="text-center border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <td className="p-2 ">{index + 1}</td>
                      <td className="p-2 text-left">{item.product_name}</td>
                      <td className="p-2 w-32">
                        <select
                          className="border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 w-full p-1 rounded-md text-xs md:text-sm"
                          value={item.size_id}
                          onChange={(e) => handleChangeSize(item.id, e.target.value)}
                        >
                          <option value="">-- Select Size --</option>
                          {item.sizes?.map((size) => (
                            <option key={size.id} value={size.id}>
                              {size.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2 w-32">
                        <select
                          className="border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 w-full p-1 rounded-md text-xs md:text-sm"
                          value={item.color_id}
                          onChange={(e) => handleChangeColor(item.id, e.target.value)}
                        >
                          <option value="">-- Select Color --</option>
                          {item.colors?.map((color) => (
                            <option key={color.id} value={color.id}>
                              {color.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2">৳{item.sale_price}</td>
                      <td className="p-2 w-28">
                        <Input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleChangeQty(item.id, e.target.value)}
                          className="text-xs md:text-sm"
                        />
                      </td>
                      <td className="p-2">৳{(item.sale_price * item.qty).toFixed(0)}</td>
                      <td className="p-2">
                        <span
                          className="bg-rose-500 px-2 md:px-4 py-1 md:py-2 rounded-md cursor-pointer text-white text-xs md:text-sm"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 🚚 Shipping Info & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Shipping Info */}
          <div className="space-y-3">
            <Input
              placeholder="Enter full name"
              value={data.shipping.name}
              onChange={(e) => setData("shipping.name", e.target.value)}
            />
            {localErrors.name && (
              <p className="text-red-600 text-sm">{localErrors.name}</p>
            )}

            <Input
              placeholder="Enter email"
              value={data.shipping.email}
              onChange={(e) => setData("shipping.email", e.target.value)}
            />
            {localErrors.email && (
              <p className="text-red-600 text-sm">{localErrors.email}</p>
            )}

            <Input
              placeholder="Phone number e.g., 017XXXXXXXX"
              value={data.shipping.phone}
              onChange={(e) => setData("shipping.phone", e.target.value)}
            />
            {localErrors.phone && (
              <p className="text-red-600 text-sm">{localErrors.phone}</p>
            )}

            <Input
              placeholder="Enter address"
              value={data.shipping.address}
              onChange={(e) => setData("shipping.address", e.target.value)}
            />
            {localErrors.address && (
              <p className="text-red-600 text-sm">{localErrors.address}</p>
            )}

            <select
              className="border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 w-full p-2 rounded-md text-sm"
              value={data.shipping.shipping_charge_id}
              onChange={(e) => handleChangeShipping(e.target.value)}
            >
              <option value="">-- Select Delivery Area --</option>
              {shippingCharge.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (৳{s.amount})
                </option>
              ))}
            </select>
            {localErrors.shipping_charge_id && (
              <p className="text-red-600 text-sm">{localErrors.shipping_charge_id}</p>
            )}
          </div>

          {/* Right: Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md space-y-3">
            <div className="flex justify-between text-sm md:text-base">
              <span>Subtotal:</span>
              <span>৳{(subtotal).toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span>Shipping:</span>
              <span>৳{data.shipping_charge}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span>Discount:</span>
              {/* <span>৳{data.discount}</span> */}
              <div className="w-24">
                <Input
                  type="number"
                  min="1"
                  value={data.discount}
                  onChange={(e) => handleDiscount(e.target.value)}
                  className="text-xs md:text-sm py-2"
                />
              </div>
            </div>
            <hr className="border-gray-300 dark:border-gray-700" />
            <div className="flex justify-between font-semibold text-lg md:text-xl">
              <span>Total:</span>
              <span>৳{(total).toFixed(0)}</span>
            </div>
            <Button disabled={processing} className="mt-3 w-full font-semibold">
              {order?.id ? "Update Order" : "Place Order"}
            </Button>
          </div>

        </div>
      </form>
    </div>

  );
}
