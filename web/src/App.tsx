import { FaTasks, FaUser, FaSignOutAlt, FaCommentDots } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import TaskView from "./TaskView";

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [viewTaskId, setViewTaskId] = useState<number | null>(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [comments, setComments] = useState<{ [key: number]: string }>({});
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔧 força a tela de login ao iniciar
  useEffect(() => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfile();
    }
  }, [token]);

  const login = async () => {
    setError("");
    setSuccess("");

    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Erro ao fazer login");
      return;
    }

    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    }
  };

  const logout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    setToken("");
    window.location.reload();
    localStorage.clear();
    setTasks([]);
    setUser(null);
  };

  const loadUserProfile = async () => {
    setError("");
    setSuccess("");
    const res = await fetch("http://localhost:3000/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Erro ao carregar perfil");
      return;
    }
    setUser(data);
    loadTasks(data);
  };

  const updateUser = async () => {
    setError("");
    setSuccess("");
    const res = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      setSuccess("Perfil atualizado!");
      loadUserProfile();
    } else {
      setError("Erro ao atualizar perfil");
    }
  };

  const loadTasks = async (currentUser = user) => {
    const query =
      currentUser?.role === "ADMIN" ? "" : `?assignedTo=${currentUser.id}`;
    const res = await fetch(`http://localhost:3000/tasks${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Erro ao buscar tarefas");
      return;
    }

    setTasks(data);
  };

  const createTask = async () => {
    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newTask, assignedTo: user.id }),
    });
    setNewTask({ title: "", description: "" });
    loadTasks();
  };

  const postComment = async (taskId: number) => {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comments[taskId] }),
    });
    setComments((prev) => ({ ...prev, [taskId]: "" }));
    loadTasks();
  };

  const deleteTask = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;
    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadTasks();
  };

  const completeTask = async (id: number) => {
    await fetch(`http://localhost:3000/tasks/${id}/complete`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    loadTasks();
  };

  const deleteUser = async () => {
    if (
      !confirm(
        "Tem certeza que deseja excluir sua conta? Esta ação é irreversível."
      )
    )
      return;
    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    logout();
  };

  const startEditing = (task: any) => {
    setEditingTaskId(task.id);
    setEditTaskData({ title: task.title, description: task.description });
  };

  const saveEdit = async () => {
    const res = await fetch(`http://localhost:3000/tasks/${editingTaskId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editTaskData),
    });
    setEditingTaskId(null);
    loadTasks();
  };

  const deleteComment = async (taskId: number, commentId: number) => {
    if (!confirm("Deseja mesmo excluir este comentário?")) return;
    await fetch(`http://localhost:3000/tasks/${taskId}/comments/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadTasks();
  };

  return (
    <div className="p-6 font-sans">
      {!token ? (
        showSignup ? (
          <Signup onBack={() => setShowSignup(false)} />
        ) : (
          <div className="max-w-md mx-auto bg-white p-6 rounded shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
            <button
              onClick={login}
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Entrar
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="text-sm text-blue-600 underline hover:text-blue-700 block mt-2"
            >
              Criar nova conta
            </button>
          </div>
        )
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-800 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-400 text-green-800 px-4 py-2 rounded mb-4">
              {success}
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Painel de Tarefas</h2>
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-700 transition hover:underline"
            >
              <FaSignOutAlt className="inline mr-1" /> Sair
            </button>
          </div>

          {user && (
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h3 className="font-bold mb-2">Perfil</h3>
              <input
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <input
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <p className="text-sm text-gray-600 italic mb-2">
                Papel: {user.role}
              </p>
              <p
                className={`text-xs mb-2 ${
                  user.role === "ADMIN"
                    ? "text-yellow-600"
                    : user.role === "USER"
                    ? "text-orange-600"
                    : "text-gray-500"
                }`}
              >
                Você está em modo {user.role}
              </p>
              <button
                onClick={updateUser}
                className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-3 py-1 rounded mr-2"
              >
                <FaUser className="inline mr-1" /> Atualizar
              </button>
              {user.role === "ADMIN" && (
                <button
                  onClick={deleteUser}
                  className="bg-red-600 hover:bg-red-700 transition-colors text-white px-3 py-1 rounded"
                >
                  Remover Conta
                </button>
              )}
            </div>
          )}

          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="font-bold mb-2">
              <FaTasks className="inline mr-1" /> Nova Tarefa
            </h3>
            <input
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder="Título"
            />
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Descrição"
            />
            <button
              onClick={createTask}
              className="bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Criar Tarefa
            </button>
          </div>

          {viewTaskId ? (
            <TaskView
              taskId={viewTaskId}
              token={token}
              user={user}
              onBack={() => setViewTaskId(null)}
            />
          ) : (
            <ul className="space-y-6">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-white p-5 rounded-lg shadow-sm border"
                >
                  {editingTaskId === task.id ? (
                    <div>
                      <input
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                        value={editTaskData.title}
                        onChange={(e) =>
                          setEditTaskData({
                            ...editTaskData,
                            title: e.target.value,
                          })
                        }
                      />
                      <textarea
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                        value={editTaskData.description}
                        onChange={(e) =>
                          setEditTaskData({
                            ...editTaskData,
                            description: e.target.value,
                          })
                        }
                      />
                      <button
                        onClick={saveEdit}
                        className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-1 rounded mr-2"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditingTaskId(null)}
                        className="text-gray-600 underline"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        {/* ESQUERDA ─ título + status + botão Completar */}
                        <div className="flex items-center space-x-3">
                          <h3
                            onClick={() => setViewTaskId(task.id)}
                            className="font-semibold cursor-pointer text-blue-600 hover:underline"
                          >
                            {task.title} — {task.user?.name}
                          </h3>

                          {/* status */}
                          <span
                            className={`text-sm font-medium ${
                              task.status === "DONE"
                                ? "text-green-600"
                                : "text-yellow-600"
                            } flex items-center`}
                          >
                            {task.status === "DONE"
                              ? "✅ Concluída"
                              : "⏳ Pendente"}
                          </span>

                          {/* botão Completar (exibe só se ainda estiver pendente) */}
                          {task.status === "PENDING" && (
                            <button
                              onClick={() => completeTask(task.id)}
                              className="bg-green-600 hover:bg-green-700 transition-colors text-white px-3 py-1 rounded"
                            >
                              Completar
                            </button>
                          )}
                        </div>

                        {/* DIREITA ─ botão Excluir (quando permitido) */}
                        {(user?.role === "ADMIN" ||
                          task.assignedTo === user?.id) && (
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-sm text-red-600 hover:text-red-700 transition underline"
                          >
                            Excluir
                          </button>
                        )}
                      </div>

                      <p>{task.description}</p>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-1">
                          Comentários:
                        </p>
                        <ul className="text-sm pl-4 list-disc">
                          {task.comments?.length === 0 && (
                            <li className="text-gray-500">
                              Sem comentários ainda
                            </li>
                          )}
                          {task.comments?.map((c: any, i: number) => (
                            <li key={i} className="mb-1">
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="font-semibold">
                                    {c.author?.name || "Desconhecido"}:
                                  </span>{" "}
                                  {c.content}
                                  <span className="ml-2 text-xs text-gray-500">
                                    ({new Date(c.createdAt).toLocaleString()})
                                  </span>
                                </div>
                                {(user?.role === "ADMIN" ||
                                  user?.id === c.authorId) && (
                                  <button
                                    onClick={() => deleteComment(task.id, c.id)}
                                    className="text-xs text-red-500 hover:underline ml-2"
                                  >
                                    Remover
                                  </button>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                        <input
                          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
                          value={comments[task.id] || ""}
                          onChange={(e) =>
                            setComments((prev) => ({
                              ...prev,
                              [task.id]: e.target.value,
                            }))
                          }
                          placeholder="Adicionar comentário..."
                        />
                        <button
                          onClick={() => postComment(task.id)}
                          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-3 py-1 mt-2 rounded hover:bg-blue-600"
                        >
                          Comentar
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
