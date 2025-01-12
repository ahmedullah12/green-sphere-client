"use client";

import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import {
  useGetSingleGroup,
  useJoinGroup,
  useLeaveGroup,
} from "@/src/hooks/group.hooks";
import { useGetGroupPosts } from "@/src/hooks/posts.hooks";
import { IUser } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar, Users } from "lucide-react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import GroupPosts from "../../_components/page/group/GroupPosts";

const GroupPage = () => {
  const params = useParams();
  const groupId = params.groupId as string;
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: groupData, isLoading: groupLoading } =
    useGetSingleGroup(groupId);
  const { data: postsData, isLoading: postsLoading } =
    useGetGroupPosts(groupId);
  const { mutate: joinGroup, isPending: joinPending } = useJoinGroup();
  const { mutate: leaveGroup, isPending: leavePending } = useLeaveGroup();

  // Check if user is member or creator
  const isCreator = user?._id === groupData?.data?.creator._id;
  const isMember = groupData?.data?.members.some(
    (member: IUser) => member._id === user?._id
  );

  const handleJoinGroup = async () => {
    try {
      joinGroup(groupId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["GET_SINGLE_GROUP"] });
        },
      });
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  const handleLeaveGroup = async () => {
    if (isCreator) {
      toast.error("Group creator cannot leave the group!");
      return;
    }

    try {
      leaveGroup(groupId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["GET_SINGLE_GROUP"] });
        },
      });
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };

  if (groupLoading || postsLoading) return <Loading />;
  if (!groupData?.data) return null;

  const { name, description, avatar, creator, members, createdAt } =
    groupData.data;
  const posts = postsData || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <img src={avatar} alt={name} className="w-full h-full object-cover" />

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={name[0]} src={avatar} />
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{members.length} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>
                    Created {new Date(createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {user &&
            !isCreator &&
            (isMember ? (
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleLeaveGroup}
                isLoading={leavePending}
              >
                Leave Group
              </Button>
            ) : (
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleJoinGroup}
                isLoading={joinPending}
              >
                Join Group
              </Button>
            ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="max-w-[400px] space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">About</h2>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">{description}</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-semibold">Members</h2>
              <Button variant="ghost" size="sm">
                See All
              </Button>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {members.map((member: IUser) => (
                  <div key={member._id} className="flex items-center gap-3">
                    <Avatar src={member.profilePhoto} name={member.name[0]} />
                    <div>
                      <p className="font-medium">{member.name}</p>
                      {member._id === creator._id && (
                        <span className="text-xs text-green-600">Admin</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="w-full">
        <GroupPosts
          posts={posts}
          isMember={isMember}
          isCreator={isCreator}
          groupId={groupId}
        />
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
