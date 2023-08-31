import AddTodo from "@/components/add-todo";
import Todos from "@/components/Todos";
import Navbar from "@/components/navbar";

const Page = () => {
  return (
    <main>
      <h2>TODO Next + Typescript</h2>
      <Navbar />
      <AddTodo />
      <Todos />
    </main>
  );
};

export default Page;
