import { useEffect, useState } from "react";

export function usePokemon(pokemonName) {
  const [state, setState] = useState({
    data: null,
    error: null,
    status: "pending",
  });

  useEffect(() => {
    if (!pokemonName) return;

    setState({ data: null, error: null, status: "pending" });

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokemon not found");
        return res.json();
      })
      .then((data) => {
        setState({ data, error: null, status: "resolved" });
      })
      .catch((error) => {
        setState({ data: null, error, status: "rejected" });
      });
  }, [pokemonName]);

  return state;
}
