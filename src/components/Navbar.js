import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white shadow-xl">
      <h1 className="text-3xl font-semibold">
        <Link href="/">FootBR</Link>
      </h1>
      <ul className="flex justify-around items-center">
        <li className="mr-6 hover:border-b-2 ">
          <Link href="/">Campeonatos</Link>
        </li>
      </ul>
    </nav>
  );
}
