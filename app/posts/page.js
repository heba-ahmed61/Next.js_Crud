import Link from "next/link";
import PostCard from "../components/PostCard/PostCard";
import { fetchPosts } from "../actions/apis";
import  './page.css'
import PaginationComponent from "../components/Pagination/Pagination";
const Posts = async ({searchParams}) => {
  const posts = await fetchPosts(searchParams?.page);
  return (
    <>
    <div className="posts_wrapper">
      <div>
        <h1 className="posts_wrapper_title">Bolg Posts</h1>
        <Link className="create_post_title" href="/posts/create">Add New Post</Link>
      </div>
      {/* Listing Posts Starts*/}
      <div className="posts_listing">
      {posts?.data?.map((post) => (
        <div className="posts_item" key={post?.id}>
          <PostCard postItem={post} classes={"w-hvr"}/>
        </div>
      ))}
      </div>
      {/* Listing Posts Ends*/}

      {/* Pagination Component Starts*/}
      <PaginationComponent totalPages={posts?.pages} currentPage={Number(searchParams?.page) || 1} lastPage={posts?.last} />
      {/* Pagination Component Ends*/}
    </div>
    </>
  );
};
export default Posts;
