import { useAuth } from "../context/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Bem-vindo, {user?.username}</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
