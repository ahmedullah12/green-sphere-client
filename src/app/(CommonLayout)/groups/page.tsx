"use client";

import CreateGroupModal from "@/src/components/modals/CreateGroupModal";
import Loading from "@/src/components/UI/Loading";
import { useGetGroups } from "@/src/hooks/group.hooks";
import { IGroup } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Users } from "lucide-react";
import Link from "next/link";
import { PiUsersThreeFill } from "react-icons/pi";

const Groups = () => {
  const { data: groups, isLoading } = useGetGroups();

  {
    isLoading && <Loading />;
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 mb-8">
          <PiUsersThreeFill className="w-8 h-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Groups</h1>
        </div>
        <div>
          <CreateGroupModal />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups?.map((group: IGroup) => (
          <Card key={group._id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src={group.avatar}
                  alt={group.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p>{group.name}</p>
                  <p className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {group.members.length} members
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-600">
                {group.description.slice(0, 200)}...
              </p>
            </CardBody>
            <CardFooter>
              <Link href={`/groups/${group._id}`}>
                <Button variant="ghost">View Group</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Groups;
