import { IPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

interface IProps {
  post: IPost;
}
const PostCard = ({ post }: IProps) => {
  const { title, images, userId, description } = post || {};
  const hasImage = images && images.length > 0;


  const truncateText = (text: string, length: number) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={userId?.profilePhoto} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{userId?.name}</h4>
            {/* <h5 className="text-small tracking-tight text-default-400">{userId?.email}</h5> */}
          </div>
        </div>
        <h4 className="font-bold text-large mt-3">{title}</h4>
      </CardHeader>


      {/* if has images showing image otherwise showing some text from description */}
      {hasImage ? (
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={images[0]} 
            width={270}
            height={180}
          />
        </CardBody>
      ) : (
        <CardBody className="py-2">
          <p className="text-gray-700 text-sm">
            {truncateText(description, 100)} 
          </p>
        </CardBody>
      )}

      <CardFooter className="flex justify-end">
        <Button className="text-tiny" color="primary" radius="lg" size="sm">
          See Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
