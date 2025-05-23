import { getPostDetails } from '../../../actions/apis';
import PostCard from '../../../components/PostCard/PostCard';
import Link from 'next/link';
import './details.css';
import BackBtn from '../../../components/BackBtn/BackBtn';
import Header from '../../../components/Header/Header';
export async function generateMetadata({ params }) {
  const postItem = await getPostDetails(params?.id);
  return {
    title: postItem?.title,
  };
}
const PostDetails = async ({ params }) => {
  const postItem = await getPostDetails(params?.id);
  return (
    <>
      {' '}
      <Header />
      <div className="post_details">
        <BackBtn />
        <PostCard postItem={postItem} />
      </div>
    </>
  );
};
export default PostDetails;
