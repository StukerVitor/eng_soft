
import { FaTasks, FaUser, FaSignOutAlt, FaCommentDots } from 'react-icons/fa';
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
}

const Signup: React.FC<Props> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [message, setMessage] = useState('');

  const signup = async () => {
    setMessage('');
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    if (res.ok) {
      setMessage('Usuário criado com sucesso! Faça login.');
    } else {
      const data = await res.json();
      setMessage(data.message || 'Erro ao criar usuário.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-300">
      <h2 className="text-xl font-bold mb-4"><FaUser className="inline mr-2" /> Criar Conta</h2>
      {message && <div className="mb-4 text-sm text-center text-blue-700 font-medium">{message}</div>}
      <input className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
      <input className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2" placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <select className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4" value={role} onChange={e => setRole(e.target.value)}>
        <option value="USER">Usuário</option>
        <option value="ADMIN">Administrador</option>
        <option value="GUEST">Convidado</option>
      </select>
      <button onClick={signup} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Criar</button>
      <button onClick={onBack} className="text-sm text-blue-600 underline hover:text-blue-700 block mt-2">Voltar ao login</button>
    </div>
  );
};

export default Signup;
