
import { columns } from "@/components/books/columns";
import { DataTable } from "@/components/books/data-table";

export async function NavBar() {
  const url = "http://localhost:5000/books" || process.env.BACKEND_URL
  const books = await fetch(`${url}`).then((res)=>res.json()).then((json)=> {return json})
  return <DataTable data={books} columns={columns} />;
}
