"use client";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, resetForm } from "../app/store";
import { RootState, AppDispatch } from "../app/store";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IDprops{
    id:number;
    dialogVisiblity:boolean;
}

export default function DialogFormUpdate({id,dialogVisiblity}:IDprops) {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.form);
  const [response, setResponse] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setFormData({"id":id}))                         //id goes to 0 if not set during handleChange
    dispatch(setFormData({ [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `http://localhost:5000/books/`+id || process.env.BACKEND_URL + "/"+ id
    try {
      const res = await fetch(`${url}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setResponse("Form submitted successfully!");
        dispatch(resetForm());
        window.location.reload();
      } else {
        setResponse("Error while submitting.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error while submitting.");
    }
  };
  return (
        <Dialog open={dialogVisiblity}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
          <DialogDescription>Update this book.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="AI for Web Devs"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author
              </Label>
              <Input
                id="author"
                type="text"
                onChange={handleChange}
                placeholder="Yogyaa Varma"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right">
                Language
              </Label>
              <Input
                id="language"
                type="text"
                onChange={handleChange}
                placeholder="English"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">
                Country
              </Label>
              <Input
                id="country"
                type="text"
                onChange={handleChange}
                placeholder="India"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">
                Link
              </Label>
              <Input
                id="link"
                type="text"
                onChange={handleChange}
                placeholder="https://www.amazon.in/AI-Web-Devs-Yogyaa-Varma-ebook/dp/B0DNTMRGXD/ref=sr_1_1?crid=385NQZ7S80059&dib=eyJ2IjoiMSJ9.ZNFZGnv-zNrfeE5WmhXzScqFudKUivHiUSnD0m-c7OSJhmap5WVNO-IuHic2ZHCfrA-h1zTCJMz8orvkXn4i9g.XyLee00iITBX5tdhW-naMxBMLfxg4GUHWzexdBJoV_E&dib_tag=se&keywords=yogyaa+varma&qid=1740337129&s=digital-text&sprefix=yogyaa+varma%2Cdigital-text%2C255&sr=1-1"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pages" className="text-right">
                Pages
              </Label>
              <Input
                type="number"
                id="pages"
                onChange={handleChange}
                placeholder="121"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Input
                type="number"
                id="year"
                onChange={handleChange}
                placeholder="2024"
                className="col-span-3"
                required
              />
            </div>
            <DialogClose asChild>
              <Button type="submit">Update book</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

