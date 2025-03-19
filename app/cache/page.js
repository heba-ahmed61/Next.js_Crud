import { fetchPosts } from '../actions/apis';

const CacheTestPage = async () => {
  const posts = await fetchPosts(1);
  console.log(posts?.data);
  return (
    <>
      <div>test no store and force cache</div>
      {posts?.data?.map((item, index) => (
        <p key={item?.id}>
          {index + 1} - {item?.title}
        </p>
      ))}
    </>
  );
};
export default CacheTestPage;
