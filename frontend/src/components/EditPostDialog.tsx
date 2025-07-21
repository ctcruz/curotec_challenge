import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  FormGroup,
} from "@mui/material";
import { usePostDialogContext } from "../context/PostDialogContext";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const editPostSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().min(1, "Content is required"),
  published: z.boolean().optional(),
});

type EditPostForm = z.infer<typeof editPostSchema>;

export const EditPostDialog: React.FC = () => {
  const { editingPost, setEditingPost, handleUpdate } = usePostDialogContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditPostForm>({
    resolver: zodResolver(editPostSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (editingPost) {
      reset({
        title: editingPost.title,
        content: editingPost.content,
        published: editingPost.published,
      });
    }
  }, [editingPost, reset]);

  const onSubmit = (data: EditPostForm) => {
    if (editingPost) {
      handleUpdate({ ...editingPost, ...data });
      setEditingPost(null);
    }
  };

  return (
    <Dialog open={!!editingPost} onClose={() => setEditingPost(null)} fullWidth>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>Edit Post</DialogTitle>
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
                multiline
                rows={3}
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />
          <Controller
            name="published"
            control={control}
            render={({ field }) => (
              <FormControl component="fieldset" variant="outlined">
                <FormGroup>
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value} />}
                    label={field.value ? "Published" : "Draft"}
                  />
                </FormGroup>
              </FormControl>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingPost(null)}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
