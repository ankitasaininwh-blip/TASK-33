import { useCallback, useEffect, useState } from "react";
import {
  getTasks,
  addTask,
  editTask,
  changeTaskStatus,
  removeTask
} from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getTasks(search);
      setTasks(data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Could not connect to the backend."
      );
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(loadTasks, 300);
    return () => clearTimeout(timer);
  }, [loadTasks]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    setError("");

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        completed: false
      };

      if (editingId) {
        const existing = tasks.find(
          (task) => task._id === editingId
        );

        await editTask(editingId, {
          ...taskData,
          completed: existing?.completed ?? false
        });
      } else {
        await addTask(taskData);
      }

      setTitle("");
      setDescription("");
      setEditingId(null);

      await loadTasks();
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Could not save the task."
      );
    }
  }

  function startEdit(task) {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description || "");
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setDescription("");
  }

  async function toggleTask(task) {
    try {
      await changeTaskStatus(
        task._id,
        !task.completed
      );

      await loadTasks();
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Could not update task status."
      );
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this task?")) return;

    try {
      await removeTask(id);
      await loadTasks();
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Could not delete task."
      );
    }
  }

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
          <h1>TaskFlow<span>.</span></h1>
          <p className="subtitle">
            Plan less in your head. Get more done.
          </p>
        </div>

        <div className="summary">
          <div>
            <span>Total</span>
            <strong>{tasks.length}</strong>
          </div>
          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
        </div>
      </header>

      <section className="content">
        <section className="panel form-panel">
          <p className="eyebrow">
            {editingId ? "UPDATE TASK" : "GET STARTED"}
          </p>

          <h2>{editingId ? "Edit task" : "Add a new task"}</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Task title</label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs to be done?"
              maxLength={120}
              required
            />

            <label htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Add some details..."
              rows="4"
              maxLength={1000}
            />

            <button className="primary" type="submit">
              {editingId ? "Save changes" : "Add task"} →
            </button>

            {editingId && (
              <button
                className="secondary"
                type="button"
                onClick={cancelEdit}
              >
                Cancel editing
              </button>
            )}
          </form>
        </section>

        <section className="panel tasks-panel">
          <div className="tasks-heading">
            <div>
              <p className="eyebrow">YOUR WORKLOAD</p>
              <h2>My tasks</h2>
            </div>

            <span className="task-count">
              {tasks.length} items
            </span>
          </div>

          <input
            className="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
          />

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          {loading ? (
            <p className="empty">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="empty">
              No tasks found. Add your first task!
            </p>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <article className="task" key={task._id}>
                  <input
                    className="task-check"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                    aria-label={`Complete ${task.title}`}
                  />

                  <div className="task-info">
                    <h3 className={task.completed ? "done" : ""}>
                      {task.title}
                    </h3>

                    {task.description && (
                      <p>{task.description}</p>
                    )}

                    <span
                      className={
                        task.completed
                          ? "badge completed"
                          : "badge pending"
                      }
                    >
                      {task.completed
                        ? "COMPLETED"
                        : "IN PROGRESS"}
                    </span>
                  </div>

                  <div className="actions">
                    <button
                      type="button"
                      onClick={() => startEdit(task)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>

      <footer>
        React · Express.js · MongoDB
      </footer>
    </main>
  );
}

export default App;