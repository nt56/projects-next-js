"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

interface Pokemon {
  name: string;
  url: string;
}

export default function PokemonListPage() {
  const { data: session, status } = useSession();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const getPokemon = async () => {
    setLoading(true);
    const limit = 20;
    const offset = page * limit;

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();
    setPokemonList((prev) => [...prev, ...data.results]);
    setLoading(false);
  };

  useEffect(() => {
    getPokemon();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const getId = (url: string): string | undefined =>
    url.split("/").filter(Boolean).pop();

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center text-indigo-700 text-xl font-medium">
        Checking authentication...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-xl font-bold">
        Unauthorized. Please sign in.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-lg">
          Pokémon List
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pokemonList.map((p, i) => (
          <li key={i}>
            <Link href={`/pokemon/${getId(p.url)}`}>
              <div className="flex items-center space-x-4 bg-white shadow-lg p-5 rounded-xl hover:bg-indigo-50 transition cursor-pointer border border-indigo-100 hover:scale-105 duration-150">
                <div className="flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600 capitalize">
                    {p.name[0]}
                  </span>
                </div>
                <span className="text-lg font-semibold capitalize text-indigo-900">
                  {p.name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-indigo-700 font-medium">Loading...</span>
        </div>
      )}
    </div>
  );
}
