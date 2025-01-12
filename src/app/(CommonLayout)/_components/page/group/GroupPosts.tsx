import CreateGroupPostModal from "@/src/components/modals/CreateGroupPostModal";
import Post from "@/src/components/UI/Post/Post";
import { useUser } from "@/src/context/user.provider";
import { IPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Scroll } from "lucide-react";

interface TGroupPostsParams {
  posts: IPost[];
  isMember: boolean;
  isCreator: boolean;
  groupId: string
}

const GroupPosts = ({ posts, isMember, isCreator, groupId }: TGroupPostsParams) => {
  const { user } = useUser();
  console.log(posts);
  return (
    <div className="max-w-[500px] mx-auto space-y-4">
      {/* Post Creation Card */}
      {user && (isMember || isCreator) && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4 w-full">
              <Avatar name={user.name[0]} src={user.profilePhoto} />
             <CreateGroupPostModal groupId={groupId}/>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Posts Feed */}
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post: IPost) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <Card>
          <CardBody>
            <div className="text-center py-8 text-gray-500">
              <Scroll className="mx-auto h-12 w-12 mb-4" />
              <p>
                No posts yet.
                {isMember || isCreator
                  ? "Be the first to share in this group!"
                  : "Join the group to start sharing!"}
              </p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default GroupPosts;
