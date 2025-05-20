import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

function TaskList({ tasks, onCheck, onUpdate, onDelete, API_URL }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const [fileName, setFileName] = useState("");

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task._id}
          sx={{
            backgroundColor: task.checked ? "#f5f5f5" : "white",
            mb: 1,
            borderRadius: 1,
            border: "1px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Checkbox
            checked={task.checked}
            onClick={() => {
              if (task.checked) {
                onCheck(task._id);
              } else {
                setDialogOpen(true);
              }
            }}
          />

          <Dialog
            open={dialogOpen}
            onClose={() => setOpenDialog(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Complete Task</DialogTitle>

            <DialogContent>
              <input
                accept="*"
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setProofFile(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                  }
                }}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                    Escolher arquivo
                </Button>
              </label>
              {fileName && (
                <Typography variant="body2" mt={1}>
                    Arquivo selecionado: {fileName}
                </Typography>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  if (!proofFile) {
                    Toastify({
                      text: "You need to add a document to complete",
                      duration: 3000,
                      close: true,
                      gravity: "bottom",
                      position: "right",
                      stopOnFocus: true,
                      style: {
                        background: "red",
                      },
                    }).showToast();
                  } else {
                    onCheck(task._id, proofFile, fileName)
                    setDialogOpen(false);
                  }
                }}
                variant="contained"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <div>
            <ListItemText
              primary={task.task}
              secondary={task.description}
              sx={{
                textDecoration: task.checked ? "line-through" : "none",
                opacity: task.checked ? 0.6 : 1,
              }}
            />
          </div>
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              onClick={() => {
                onUpdate(task, true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => onDelete(task._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
          {task.checked && (
            <Button variant="outlined" size="small" sx={{ ml: 2 }} onClick={() => {
                window.open(`${API_URL}/tasks/${task._id}/proof`, "_blank");
            }}>
                Baixar comprovante
            </Button>
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
