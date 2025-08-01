import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { usePostDialogContext } from "../context/PostDialogContext";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Post } from "./PostTable";

const newPostSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().min(1, "Content is required"),
});

type NewPostForm = z.infer<typeof newPostSchema>;

export const NewPostDialog: React.FC = () => {
  const { creating, setCreating, handleCreate } = usePostDialogContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewPostForm>({
    resolver: zodResolver(newPostSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (!creating) reset();
  }, [creating, reset]);

  const onSubmit = (data: NewPostForm) => {
    handleCreate(data as Post);
    setCreating(false);
    reset();
  };

  return (
    <Dialog open={creating} onClose={() => setCreating(false)}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>New Post</DialogTitle>
        <DialogContent>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                label="Title"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                label="Content"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreating(false)}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
