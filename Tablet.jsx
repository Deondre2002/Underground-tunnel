import { useContext } from "react";
import { AuthProvider } from "./AuthContext";

export default function Tablet() {
  const { authenticate } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticate();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section>
      <p>
        The sound of your name thuds against the gate as the two badgers furrow
        their brows. The badger on the right beckons you to approach.
      </p>
      <p>"Only those who are pure of heart may pass."</p>
      <p>
        "Place your hand upon this stone tablet, and thus will your true self be
        revealed."
      </p>
      <p>
        It holds out a rectangular stone tablet carved with an intricate design.
      </p>
      <form onSubmit={handleSubmit}>
        <button type="submit">Place your palm upon the tablet.</button>
      </form>
    </section>
  );
}
