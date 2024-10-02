import { IPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

interface IProps {
  post: IPost;
}
const PostCard = ({ post }: IProps) => {
  const { title, images, userId } = post || {};
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">
            {/* userName */}
        </p>
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={userId.profilePhoto} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{userId?.name}</h4>
            <h5 className="text-small tracking-tight text-default-400">{userId.email}</h5>
          </div>
        </div>
        <h4 className="font-bold text-large mt-3">{title}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={images[0]}
          width={270}
        />
      </CardBody>
      <CardFooter>
      <Button className="text-tiny" color="primary" radius="full" size="sm">
          See Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
