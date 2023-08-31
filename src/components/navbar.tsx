"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Navbar = () => {
  const searchParams = useSearchParams();
  const todosState = searchParams.get("todos");

  return (
    <>
      <nav>
        <Link href={"/"} className={todosState === null ? "active" : ""}>
          All
        </Link>
        <Link
          href={"/?todos=active"}
          className={todosState === "active" ? "active" : ""}
        >
          Active
        </Link>
        <Link
          href={"/?todos=completed"}
          className={todosState === "completed" ? "active" : ""}
        >
          Completed
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
