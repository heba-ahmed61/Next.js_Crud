import React from 'react';
import { addPost } from '../actions/serverActions';

const SsgPage = async () => {
  try {
    // Fetch data from your API or external source adding no cahe or no store will make it dynamic route and
    const res = await fetch('http://localhost:5000/posts');
    
    // Ensure the fetch was successful
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    // Parse the JSON data
    const posts = await res.json();
    const addAction= addPost.bind(null,{userId: 111,
        id: new Date(),
        title:'new titleee ya heba' ,
        body:'new description ya heba'})
    // Return JSX after data has been fetched
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
        <form action={addAction}>
            <button type='submit'>add new item</button>
        </form>
      </div>
    );
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
};

export default SsgPage;
