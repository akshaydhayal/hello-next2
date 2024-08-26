import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [products, setProducts] = useState([]); 
  const [result, setResult] = useState<{name:string,url:string}>(); 
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`https://dummyjson.com/products?limit=15&skip=0`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data.products);
      setProducts(data.products);
    }
    fetchProducts();
  }, []);

  
  useEffect(() => {
    async function fetchResult() {
      const response = await fetch(`api/hello`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setResult(data);
    }
    fetchResult();
  }, []);

  

  return (
    <div>
      <h1>Home</h1>
      <p>{result?.name}</p>
      <img className="h-40 w-40 border-2 border-red-700" src={result?.url}/>
      <div className="flex flex-col gap-4 p-4">
        {products &&
          products.map((p: any, ind: number) => {
            return (
              <div className="border" key={ind}>
                <p className="text-white">{p.title}</p>
                <p className="text-yellow-500">{p.description}</p>
                <p>{p.category}</p>
                <img src={p.images[0]} className="w-48 h-40" />
              </div>
            );
          })}
      </div>
    </div>
  );
}
