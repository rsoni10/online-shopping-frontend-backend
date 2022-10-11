import React from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import ProductsList from './list/ProductList'
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Products = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeaders>
        <h2>Products</h2>
        <PrimaryButton onClick={()=>navigate("/admin/products/create-product")}> Create </PrimaryButton>
      </AdminHeaders>
      <ProductsList />
      <Outlet />
    </>
  );
};

export default Products;