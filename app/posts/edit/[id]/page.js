import { getPostDetails } from '../../../actions/apis';
import Header from '../../../components/Header/Header';
import PostForm from '../../../components/PostForm/PostForm';
const EditPost = async ({ params }) => {
  const postItem = await getPostDetails(params?.id);
  return (
    <div>
      <Header />
      <PostForm itemData={postItem} />
    </div>
  );
};
export default EditPost;
