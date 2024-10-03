'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

const CreatePostButton = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowCreatePost(!showCreatePost)}
        className="bg-primary dark:bg-gray-600 text-white px-4 py-2 rounded-full w-full flex items-center justify-center"
      >
        <Plus size={20} className="mr-2" />
        Create Post
      </button>

      {showCreatePost && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Create a New Post</h3>
          {/* Add form fields for creating a post */}
          <textarea 
            className="w-full p-2 border rounded-md" 
            placeholder="What's on your mind?"
            rows={4}
          />
          <button className="mt-2 bg-primary text-white px-4 py-2 rounded-full">
            Post
          </button>
        </div>
      )}
    </>
  );
};

export default CreatePostButton;