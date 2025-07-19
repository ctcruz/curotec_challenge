import { Container } from "@mui/material";
import { PostTable, type Post } from "../components/PostTable";
import { useGetPosts } from "../api";
import { format, parseISO } from "date-fns";
import { useEffect, useMemo } from "react";
import {
  PostDialogProvider,
  usePostDialogContext,
} from "../context/PostDialogContext";
import { EditPostDialog } from "../components/EditPostDialog";
import { NewPostDialog } from "../components/NewPostDialog";
import { ViewPostDialog } from "../components/ViewPostDialog";

function DashboardContent() {
  const { data: dataPosts, refetch } = useGetPosts();
  const { setRefetch, handleDelete } = usePostDialogContext();

  useEffect(() => {
    setRefetch(refetch);
  }, [refetch, setRefetch]);

  const posts: Post[] = useMemo(() => {
    return (
      dataPosts?.map((post) => ({
        id: post.id!,
        title: post.title!,
        content: post.content!,
        published: post.published!,
        author: post.authorId!.toString(),
        publishedAt: format(parseISO(post.createdAt!), "yyyy-MM-dd"),
      })) || []
    );
  }, [dataPosts]);

  return (
    <>
      <PostTable posts={posts} onDelete={handleDelete} />
      <EditPostDialog />
      <NewPostDialog />
      <ViewPostDialog />
    </>
  );
}

export default function PostsPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <PostDialogProvider>
        <DashboardContent />
      </PostDialogProvider>
    </Container>
  );
}
