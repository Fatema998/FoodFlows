import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "../components/Pagination";
import ProductTable from "./product-table";
import { PaginatedResponse, Product } from "@/types/product";

interface Props {
  products: PaginatedResponse<Product>;
}

const GetAllProducts: React.FC<Props> = ({ products }) => {
  return (
    <AppLayout>
      <Head title="Products" />
      <div className="p-6">
        <PageBreadcrumb pageTitle="All Products" />
        <ProductTable products={products.data} />
        <Pagination
          links={products.links}
          meta={products.meta}
          pageTitle="All Products"
        />
      </div>
    </AppLayout>
  );
};

export default GetAllProducts;
