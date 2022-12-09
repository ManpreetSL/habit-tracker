import { useRouter } from 'next/router';

const PostPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return <h1>{id}</h1>;
};

export default PostPage;
