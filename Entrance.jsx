import { useState } from "react";
import { AuthProvider } from "./AuthContext";

export default function Entrance() {
  const { signup } = useAuth();
  const [username, setUsername] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup({ username });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <h1>Cave Entrance</h1>
      <p>Your journey has brought you to the base of a rocky mountain.</p>
      <p>
        The quickest path forward is through the mountain's winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>
      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        rumbling voice, it asks, "Who approaches? Speak your name."
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Name{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit">Respond</button>
      </form>
    </>
  );
}
