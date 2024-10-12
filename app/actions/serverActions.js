"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
// Adding Post Function Starts
export const addPost = async (values) => {
   const res = await fetch(`http://localhost:5000/posts`,
     {
       method:"POST",
       body:JSON.stringify(values),
     });
     if(res?.ok){
        revalidateTag("posts");   
      }
      return{
        data :await res.json(),
        ok:res?.ok
      }
}
// Adding Post Function Ends

// Editing Post Function Starts
export const editPost = async (values,id) => {
  const res = await fetch(`http://localhost:5000/posts/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(values),
    });
    if(res?.ok){
       revalidateTag("posts");   
     }
     return{
       data :await res.json(),
       ok:res?.ok
     }
}
// Editing Post Function Ends

// Deleteing post Function Starts
export const deletePost = async (id) => {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "Delete",
      },    
  );
  if(res?.ok){
    revalidateTag("posts");
  } 
  return{
    data :await res.json(),
    ok:res?.ok
  }
  };
  // Deleteing post Function Ends