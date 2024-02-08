import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [productAll, setproductAll] = useState([]);
  const [page, setpage] = useState(1);
  const productFecher = async () => {
    try {
      const product = await fetch("https://dummyjson.com/products").then(
        (res) => res.json()
      );
      setproductAll(product.products);
    } catch (error) {
      console.log(error);
    }
  };

  // call the productFecher function
  useEffect(() => {
    productFecher();
  }, []);

  // HandlePageItem fucntion defination and working procedure
  const HandlePageItem = (indexNumber) => {
    if (
      indexNumber > 0 &&
      indexNumber <= productAll.length / 10 &&
      indexNumber !== page
    ) {
      setpage(indexNumber);
    }
  };

  return (
    <>
      <div>
        <div className="proudct__list">
          {productAll.slice(page * 10 - 10, page * 10).map((item) => (
            <span className="each__item" key={item.id}>
              <h2>{item.title}</h2>
              <img src={item.images[0]} alt="" />
            </span>
          ))}
        </div>
      </div>
      {productAll.length > 0 && (
        <div className="pagination">
          <span className="lefrArrow" onClick={() => HandlePageItem(page - 1)}>
            {"<"}
          </span>
          <span>
            {[...Array(productAll.length / 10)].map((item, index) => (
              <span
                key={index}
                className={page === index + 1 ? "selceditem" : "pageitem"}
                onClick={() => HandlePageItem(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </span>
          <span className="rightArrow" onClick={() => HandlePageItem(page + 1)}>
            {">"}
          </span>
        </div>
      )}
    </>
  );
}

export default App;
