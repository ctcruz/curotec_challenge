import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { Box, Typography, IconButton, Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { usePostDialogContext } from "../context/PostDialogContext";

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author: string;
  publishedAt: string;
}

interface PostTableProps {
  posts: Post[];
  onDelete: (postId: number) => void;
}

export const PostTable: React.FC<PostTableProps> = ({ posts, onDelete }) => {
  const { setEditingPost, setCreating } = usePostDialogContext();

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "author", headerName: "Author", width: 150 },
    {
      field: "publishedAt",
      headerName: "Published Date",
      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            aria-label="edit"
            onClick={() => setEditingPost(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => onDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Posts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreating(true)}
        >
          New Post
        </Button>
      </Stack>

      <DataGrid rows={posts} columns={columns} disableRowSelectionOnClick />
    </Box>
  );
};
