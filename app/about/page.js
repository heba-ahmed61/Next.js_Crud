'use client'
import { useEffect, useState } from "react";
const about = () => {
    const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/posts?_page=$1", {
        method: "GET",
        //  credentials: "include", // Ensures cookies are sent i add this because if the i make request to api at domain or protocol or port differnt from my domain , port and protocol cookies will net send automatically 
      });
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, []);
  console.log(data)
    return(
        <div>hii</div>
    )
}
export default about