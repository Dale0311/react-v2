import { useState } from "react";

// acivity:
// 1. create a ui breakdown of the given example
// 2. using the ui breakdown create a static version of the example

// 1.
// components:
// 1. filterableProductTable
//   1.1 filterAndSearch
//   1.2 ProductsTable
//  1.2.1 ProductDetail
//     1.2.1 ProductHeader
//     1.2.2 Products
const products = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

// 2.
function FilterableProductTable({ products }) {
  const [searchProduct, setSearchProduct] = useState("");
  const [inStock, setInStock] = useState(false);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/2 lg:w-1/4 rounded space-y-5">
        <FilteraAndSearch
          searchProduct={searchProduct}
          inStock={inStock}
          setSearchProduct={setSearchProduct}
          setInStock={setInStock}
        />
        <ProductTable
          products={products}
          searchProduct={searchProduct}
          inStock={inStock}
        />
      </div>
    </div>
  );
}

// affected by those state
function FilteraAndSearch({
  searchProduct,
  inStock,
  setSearchProduct,
  setInStock,
}) {
  function handleClickSearch(e) {
    setSearchProduct(e.target.value);
  }
  function handleClickInStock(e) {
    setInStock((oldVal) => !oldVal);
  }
  return (
    <>
      <input
        type="text"
        name="search"
        id="search"
        value={searchProduct}
        className="border border-black rounded p-1"
        onChange={(e) => {
          handleClickSearch(e);
        }}
        placeholder="Search..."
      />
      <div className="space-x-2 mt-1">
        <input
          type="checkbox"
          name="onlyInStocks"
          checked={inStock}
          id="onlyInStocks"
          onChange={(e) => {
            handleClickInStock(e);
          }}
          className="cursor-pointer"
        />
        <label htmlFor="onlyInStocks" className="cursor-pointer">
          Only show products in stock
        </label>
      </div>
    </>
  );
}

// affected by those state
function ProductTable({ products, searchProduct, inStock }) {
  return (
    <div className="w-4/5 mx-auto">
      <div className="flex justify-between">
        <p className="font-bold text-lg">Name</p>
        <p className="font-bold text-lg">Price</p>
      </div>
      {/* side quest: creaate a way for these two to be a one call component */}
      <Products
        searchProduct={searchProduct}
        inStock={inStock}
        products={products}
      />
      {/* <Products searchProduct={searchProduct} inStock={inStock} products={products} /> */}
    </div>
  );
}

function Products({ products, searchProduct, inStock }) {
  let category = null;
  // products that are rendered
  let toRenderProducts = [];
  products.forEach((product, index) => {
    if (
      searchProduct &&
      product.name.toLowerCase().indexOf(searchProduct.toLowerCase()) === -1
    ) {
      // if the product goes inside this scope it simply say validate the next product
      // it will not continue to the rest of condition or code
      return;
    }
    if (inStock && !product.stocked) {
      // same as here
      return;
    }

    if (product.category !== category) {
      toRenderProducts.push(
        <ProductHeader category={product.category} key={product.category} />
      );
    }

    toRenderProducts.push(
      <ProductRow
        stocked={product.stocked}
        name={product.name}
        price={product.price}
        key={index}
      />
    );
    category = product.category;
  });

  return <div className="my-2">{toRenderProducts}</div>;
}

// products header
function ProductHeader({ category }) {
  return <h1 className="text-lg font-semibold block">{category}</h1>;
}

// ProductsRow
function ProductRow({ stocked, name, price, index }) {
  return (
    <div className="flex justify-between" key={index}>
      <p
        style={{
          color: stocked ? "red" : "black",
        }}
      >
        {name}
      </p>
      <p>{price}</p>
    </div>
  );
}

function App() {
  return (
    <>
      <FilterableProductTable products={products} />
    </>
  );
}

export default App;
