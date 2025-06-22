"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/pokemon");
    return null;
  }

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Welcome to Pokémon App</h1>

      <button
        onClick={() => signIn("google")}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded mr-4"
      >
        Sign in with Google
      </button>

      <button
        onClick={() => signIn("github")}
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
