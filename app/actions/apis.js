
// Fetching Posts Data From Server Function Starts
export const fetchPosts = async (page) => {
  try {
      const res = await fetch(`http://localhost:5000/posts?_page=${Number(page) || 1}`, {
      cache: "no-cache",
      next:{
        tags:['posts']
      }
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } 
  catch (error) {
    console.log(error);
  }
};
// Fetching Posts Data From Server Function Ends

// Get Post Details Data  Function Starts
export const getPostDetails = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/posts/${id}`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } 
  catch (error) {
    console.log(error);
  }
  } 
// Get Post Details Data  Function Ends


