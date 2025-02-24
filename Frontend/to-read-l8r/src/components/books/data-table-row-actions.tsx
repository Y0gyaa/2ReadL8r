"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,  
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DialogFormUpdate from "../dialogFormUpdate";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const id:number = row.getValue("id");
  const [toggle, setToggle] = useState(false);
  function deleteSelected(){
    const url = "http://localhost:5000/books/id/"+id || process.env.BACKEND_URL + "/id/"+ id
    fetch(`${url}`,{method:"DELETE"}).then((res)=>res).then(()=>window.location.reload());
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      {toggle && <DialogFormUpdate id={id} dialogVisiblity={toggle}/>} 
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={()=>setToggle(!toggle)}>Edit</DropdownMenuItem>        
        <DropdownMenuItem>Add to MyList</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deleteSelected}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
  );
}
