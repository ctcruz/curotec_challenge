import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Post } from "../components/PostTable";
import Swal from "sweetalert2";
import { deletePostsId, patchPostsId, postPosts } from "../api";

interface PostDialogContextType {
  editingPost: Post | null;
  setEditingPost: (post: Post | null) => void;
  creating: boolean;
  setCreating: (creating: boolean) => void;
  handleUpdate: (updatedPost: Post) => void;
  handleDelete: (postId: number) => void;
  handleCreate: (newPost: Post) => void;
  setRefetch: (fn: () => void) => void;
}

const PostDialogContext = createContext<PostDialogContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const usePostDialogContext = () => {
  const context = useContext(PostDialogContext);
  if (!context)
    throw new Error(
      "usePostDialogContext must be used within a PostDialogProvider"
    );
  return context;
};

export const PostDialogProvider = ({ children }: { children: ReactNode }) => {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [creating, setCreating] = useState(false);
  const [refetch, setRefetchState] = useState<() => void>(() => () => {});
  const setRefetch = (fn: () => void) => setRefetchState(() => fn);

  const handleUpdate = useCallback(
    (updatedPost: Post) => {
      patchPostsId(updatedPost.id, {
        title: updatedPost.title,
        content: updatedPost.content,
        published: updatedPost.published,
      })
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Post updated successfully!",
            icon: "success",
            confirmButtonText: "Ok!",
          });
          refetch();
        })
        .catch(() => {
          Swal.fire({
            title: "Ops!",
            text: "Something went wrong, please try again!",
            icon: "error",
            confirmButtonText: "Ok!",
          });
        });
    },
    [refetch]
  );

  const handleDelete = useCallback(
    (postId: number) => {
      deletePostsId(postId)
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Post deleted successfully!",
            icon: "success",
            confirmButtonText: "Ok!",
          });
          refetch();
        })
        .catch(() => {
          Swal.fire({
            title: "Ops!",
            text: "Something went wrong, please try again!",
            icon: "error",
            confirmButtonText: "Ok!",
          });
        });
    },
    [refetch]
  );

  const handleCreate = useCallback(
    (newPost: Post) => {
      postPosts({
        title: newPost.title,
        content: newPost.content,
      })
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Post created successfully!",
            icon: "success",
            confirmButtonText: "Ok!",
          });
          refetch();
        })
        .catch(() => {
          Swal.fire({
            title: "Ops!",
            text: "Something went wrong, please try again!",
            icon: "error",
            confirmButtonText: "Ok!",
          });
        });
    },
    [refetch]
  );

  return (
    <PostDialogContext.Provider
      value={{
        editingPost,
        setEditingPost,
        creating,
        setCreating,
        handleUpdate,
        handleDelete,
        handleCreate,
        setRefetch,
      }}
    >
      {children}
    </PostDialogContext.Provider>
  );
};
