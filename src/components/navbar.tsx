import { useAssistant } from "../context/assistantProvider";

export const Navbar = () => {
  const { id, setAssistantId, removeAssistant } = useAssistant();

  const handleDeleteAndRoute = async () => {
    if (!id) {
      if (window.location.pathname === "/" || window.location.pathname === "")
        return;
      else {
        window.location.href = "/";
      }
    } else {
      removeAssistant(id);
      window.location.href = "/";
    }
  };

  return (
    <div
      className="w-screen h-16 flex flex-row justify-end items-center sticky top-0
     bg-white shadow-lg dark:bg-zinc-800 dark:text-gray-200 dark:shadow-black"
    >
      <nav
        className={`flex flex-row justify-between ${
          id ? "w-full mx-5" : "w-2/4 mr-5"
        } text-xl font-semibold`}
      >
        {id && (
          <button
            className="px-4 py-3 ml-4 w-fit rounded-md
          bg-gradient-to-r from-violet-700 to-red-600 text-white font-semibold
          hover:shadow-md hover:shadow-gray-400 hover:text-black transition-all duration-200
         disabled:text-black dark:border dark:border-zinc-700 dark:hover:shadow-zinc-800"
            onClick={() => removeAssistant(id)}
          >
            New chat +
          </button>
        )}
        <a
          className="px-4 py-3 w-fit cursor-pointer hover:text-white transition-all duration-150"
          onClick={() => handleDeleteAndRoute()}
        >
          Home
        </a>
        <a
          href="https://github.com/Handduk"
          target="_blank"
          rel="noreferrer noopener"
          className="px-4 py-3 w-fit cursor-pointer hover:text-white transition-all duration-150"
        >
          Source code
        </a>
      </nav>
    </div>
  );
};
