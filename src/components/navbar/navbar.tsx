"use client"

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Expense tracking application</div>
        <Button
          variant="destructive"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;