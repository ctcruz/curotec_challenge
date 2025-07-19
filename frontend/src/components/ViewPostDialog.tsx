import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { usePostDialogContext } from "../context/PostDialogContext";
import { format, parseISO } from "date-fns";

export const ViewPostDialog: React.FC = () => {
  const { viewingPost: post, setViewingPost } = usePostDialogContext();

  if (!post) {
    return null; // If no post is being viewed, return null
  }

  return (
    <Dialog open={!!post} onClose={() => setViewingPost(null)} fullWidth>
      <DialogTitle>View Post</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Typography>
            <strong>Title:</strong> {post.title}
          </Typography>
          <Typography>
            <strong>Published At:</strong>{" "}
            {format(parseISO(post.publishedAt), "yyyy-MM-dd")}
          </Typography>
          <Typography>
            <strong>Status:</strong> {post.published ? "Published" : "Draft"}
          </Typography>
          <Typography>
            <strong>Content:</strong>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: 1,
              padding: 1,
              whiteSpace: "pre-wrap",
            }}
          >
            {post.content}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setViewingPost(null)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
