import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[100vh]">
      <div className="w-[400px] h-full m-auto flex flex-col justify-center items-center">
        <h1 className="font-bold font-[family-name:var(--font-geist-mono)]">
          Welcome From KVin's Auth Feature
        </h1>
        <Link href="/sign-up">
          <button className="mt-8 p-2 w-[100px] bg-black hover:bg-white hover:text-black hover:border text-white font-[family-name:var(--font-geist-mono)] transition">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
