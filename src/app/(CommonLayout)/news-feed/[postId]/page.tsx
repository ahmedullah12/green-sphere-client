import Container from "@/src/components/UI/Container";
import Post from "@/src/components/UI/Post/Post";
import { getPost } from "@/src/services/Posts";

interface IProps {
  params: {
    postId: string;
  };
}

const ItemDetailPage = async ({ params: { postId } }: IProps) => {
  const { data: post } = await getPost(postId);

  return (
    <Container>
      <div className="mx-auto my-3 max-w-[720px]">
        <Post key={post?._id} post={post} />
      </div>
    </Container>
  );
};

export default ItemDetailPage;
