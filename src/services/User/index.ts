import axios from "axios";

export const getUserData = async (postId: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/user/${postId}`
    );

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
