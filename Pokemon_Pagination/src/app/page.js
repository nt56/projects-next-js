"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const getPokemon = async () => {
    setLoading(true);
    const limit = 20;
    const offset = page * limit;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    setPokemonList((prevList) => [...prevList, ...data.results]);
    setLoading(false);
  };

  useEffect(() => {
    getPokemon();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;

      if (scrollPosition >= pageHeight - 200 && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const getPokemonId = (url) => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 mt-10">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700 drop-shadow-lg tracking-tight">
          Pokemon List
        </h1>
        <ul className="flex flex-col gap-4">
          {pokemonList.map((pokemon, index) => {
            const id = getPokemonId(pokemon.url);
            return (
              <Link key={index} href={`/pokemon/${id}`}>
                <li className="group bg-white border border-indigo-100 rounded-xl shadow hover:shadow-lg px-6 py-4 capitalize font-semibold text-gray-800 hover:bg-indigo-50 transition-all duration-200 cursor-pointer flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full text-indigo-700 font-bold text-lg group-hover:bg-indigo-200 transition">
                    {id}
                  </span>
                  <span className="text-lg group-hover:text-indigo-700 transition">
                    {pokemon.name}
                  </span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition text-indigo-400">
                    &rarr;
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
        {loading && (
          <p className="text-center mt-8 animate-pulse font-semibold text-indigo-700 text-lg">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
}
