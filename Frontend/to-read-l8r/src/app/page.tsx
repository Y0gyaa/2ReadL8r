import { NavBar } from "@/components/NavBar";

export default function Home() {
  return (
    <div>
      <div className="w-full">
        <h2 className="text-2xl font-bold p-7">2ReadL8r</h2>
        <h6 className="text-sm font-bold px-7">(To Read Later)</h6>
        <NavBar />
      </div>
    </div>
  );
}
