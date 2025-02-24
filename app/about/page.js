//to force static route
//  export const dynamic = "force-static";
// import {customFetch} from '../api/customFetch'
// const About = async () => {
//   const data = await customFetch('https://jsonplaceholder.typicode.com/posts', {method: 'GET'})
//     return(
//          <div>{data?.map(item => (<h3 key={item.id}>{item.title}</h3>))} </div>
        
//     )
// }
// export default About 


"use client";

import { useEffect, useState } from "react";
import { customFetch } from "../api/customFetch";


const About =  () => {
  const [data, setData] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await customFetch("https://jsonplaceholder.typicode.com/posts", {
          method: "GET",
        });
         setData(result);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        data.map((item) => <h3 key={item.id}>{item.title}</h3>)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default About;



