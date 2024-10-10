"use client";

import DeleteUserModal from "@/src/components/modals/DeleteUserModal";
import Loading from "@/src/components/UI/Loading";
import GSTable from "@/src/components/UI/Table";
import { useGetAllUsers, useMakeAdmin } from "@/src/hooks/user.hooks";
import { IUser } from "@/src/types";
import Link from "next/link";
import toast from "react-hot-toast";

const UsersPage = () => {
  const { data: users, isLoading, refetch } = useGetAllUsers();

  const { mutate: makeAdmin } = useMakeAdmin();

  const handleMakeAdmin = (userId: string) => {
    makeAdmin(userId, {
      onSuccess: () => {
        toast.success("Admin Created Successfully!!!");
        refetch();
      },
    });
  };

  const columns = [
    { key: "image", label: "" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "CreatedAt" },
    { key: "actions", label: "" },
  ];

  // Define rows by mapping posts data
  const rows = users?.data?.map((user: IUser) => ({
    key: user._id,
    image: (
      <img
        src={user.profilePhoto}
        alt={"post"}
        className="w-10 h-10 object-cover rounded-md"
      />
    ),
    name: (
      <Link
        href={`/profile/${user._id}`}
        className="hover:underline text-blue-600"
      >
        <span>{user.name}</span>
      </Link>
    ),
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
    actions: (
      <>
        <button
          className=" me-2 px-4 py-2 bg-primary dark:bg-default text-xs text-white rounded-md hover:opacity-80 disabled:bg-gray-200 disabled:dark:bg-gray-200"
          disabled={user.role === "ADMIN"}
          onClick={() => handleMakeAdmin(user._id)}
        >
          Make Admin
        </button>
        <DeleteUserModal disabled={user.role === "ADMIN"} userId={user._id} />
      </>
    ),
  }));

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">All Posts</h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>
      <GSTable columns={columns} rows={rows || []} />
    </div>
  );
};

export default UsersPage;
