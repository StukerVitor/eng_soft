
import { FaTasks, FaUser, FaSignOutAlt, FaCommentDots } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

interface Props {
  taskId: number;
  token: string;
  user: any;
  onBack: () => void;
}

function TaskView({ taskId, token, user, onBack }: Props) {
  const [task, setTask] = useState<any>(null);
  const [comment, setComment] = useState('');

  const loadTask = async () => {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTask(data);
  };

  const postComment = async () => {
    await fetch(`http://localhost:3000/tasks/${taskId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: comment }),
    });
    setComment('');
    loadTask();
  };

  const deleteComment = async (commentId: number) => {
    await fetch(`http://localhost:3000/tasks/${taskId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    loadTask();
  };

  useEffect(() => {
    loadTask();
  }, []);

  if (!task) return <p>Carregando tarefa...</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <button onClick={onBack} className="text-blue-500 underline mb-4">← Voltar</button>
      <h2 className="text-xl font-bold">{task.title}</h2>
      <p className="mb-4">{task.description}</p>

      <h3 className="font-semibold mb-2">Comentários:</h3>
      <ul className="mb-2">
        {(task.comments || []).map((c: any) => (
          <li key={c.id} className="mb-1 flex justify-between items-center text-sm bg-gray-100 px-2 py-1 rounded">
            <span>
              <strong>{c.author?.name || 'Desconhecido'}:</strong> {c.content}
            </span>
            {(c.userId === user.id || user.role === 'ADMIN') && (
              <button onClick={() => deleteComment(c.id)} className="text-red-600 hover:text-red-700 transition text-xs ml-2">
                Excluir
              </button>
            )}
          </li>
        ))}
      </ul>

      <input className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Novo comentário" />
      <button onClick={postComment} className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-1 rounded">Comentar</button>
    </div>
  );
}

export default TaskView;
