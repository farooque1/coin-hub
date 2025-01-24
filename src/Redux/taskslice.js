import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMarketsInfo, fetchAssetInfo } from "../Api/api";

export const loadTasks = createAsyncThunk("tasks/loadTasks", async () => {
  const localTasks = JSON.parse(localStorage.getItem("tasks"));
  if (localTasks && localTasks.length > 0) {
    return localTasks;
  }
  const response = await fetchMarketsInfo();
  const tasks = response.data.map((task) => ({
    id: task.id,
    title: task.title,
    status: task.completed ? "completed" : "pending",
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return tasks;
});

export const saveTask = createAsyncThunk(
  "tasks/saveTask",
  async (task, { getState }) => {
    let savedTask;
    if (task.id) {
      const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = localTasks.map((t) =>
        t.id === task.id ? { ...t, title: task.title, status: task.status } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      savedTask = { ...task };
    } else {
      const response = await fetchAssetInfo({
        title: task.title,
        completed: task.status === "completed",
      });
      savedTask = {
        id: Date.now(),
        title: response.data.title,
        status: response.data.completed ? "completed" : "pending",
      };
    }
    const currentTasks = getState().tasks.tasks;
    const updatedTasks = task.id
      ? currentTasks.map((t) => (t.id === savedTask.id ? savedTask : t))
      : [savedTask, ...currentTasks];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    return savedTask;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    filter: "all",
    loading: false,
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index >= 0) {
          state.tasks[index] = action.payload;
        } else {
          state.tasks.unshift(action.payload);
        }
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      });
  },
});

export const { setFilter } = taskSlice.actions;
export default taskSlice.reducer;
