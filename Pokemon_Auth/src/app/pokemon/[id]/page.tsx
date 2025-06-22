import Image from "next/image";

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type PokemonMove = {
  move: {
    name: string;
    url: string;
  };
};

type PokemonSprites = {
  front_default: string;
};

type Pokemon = {
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  sprites: PokemonSprites;
};

type Params = {
  params: {
    id: string;
  };
};

async function getPokemonData(id: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon");
  }
  return res.json();
}

export default async function PokemonDetail({ params }: Params) {
  const { id } = params;
  const pokemon = await getPokemonData(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-10">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-8 max-w-xl w-full border-4 border-indigo-300 relative overflow-hidden">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={160}
            height={160}
            className="drop-shadow-xl rounded-full border-4 border-white bg-gradient-to-tr from-pink-200 to-indigo-200"
          />
        </div>
        <div className="mt-25 text-center">
          <h1 className="text-4xl font-extrabold capitalize text-indigo-700 mb-2 tracking-wide drop-shadow">
            {pokemon.name}
          </h1>
          <div className="flex justify-center gap-2 mb-4">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-400 to-pink-400 text-white text-xs font-semibold shadow"
              >
                {t.type.name}
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-6 mb-6">
            <div className="bg-indigo-100 rounded-xl px-4 py-2">
              <span className="block text-xs text-indigo-500 font-bold">
                Height
              </span>
              <span className="block text-black text-lg font-semibold">
                {pokemon.height}
              </span>
            </div>
            <div className="bg-pink-100 rounded-xl px-4 py-2">
              <span className="block text-xs text-pink-500 font-bold">
                Weight
              </span>
              <span className="block text-lg text-black font-semibold">
                {pokemon.weight}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-indigo-600">Abilities:</span>{" "}
            <span className="text-gray-700">
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-bold text-pink-600">Moves:</span>{" "}
            <span className="text-gray-700">
              {pokemon.moves
                .slice(0, 10)
                .map((m) => m.move.name)
                .join(", ")}
              {pokemon.moves.length > 10 && " ..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
