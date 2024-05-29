import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[calc(100vh-4rem)] p-10 bg-gray-50 flex flex-row items-center dark:bg-zinc-800">
      <div className="w-2/6 p-4 mb-40">
        <div className="flex flex-row text-xl">
          <div className="mr-3 self-center text-3xl font-semibold dark:text-zinc-200">
            Chat with your pdf.
          </div>
          <div
            className="pl-5 pr-5 pt-1 pb-2 rounded-full 
          bg-gradient-to-r from-violet-700 to-red-600 text-white
          flex flex-col items-start font-semibold"
          >
            Powered by OpenAI.
          </div>
        </div>
        <div className="w-10/12 mt-10 mb-8 text-lg dark:text-zinc-200">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
          facilis debitis necessitatibus fugit quod dolorum eum praesentium
          suscipit asperiores alias possimus quo sequi explicabo aliquam
          exercitationem temporibus atque, eius quam.
        </div>
        <button
          className="pt-2 pb-2 pl-5 pr-5 text-lg rounded-md
        bg-gradient-to-r from-violet-700 to-red-600 text-white font-semibold
        hover:shadow-md hover:shadow-gray-400 hover:text-zinc-950 transition-all duration-150
        dark:hover:shadow-zinc-950"
          onClick={() => navigate("/chat")}
        >
          Chat with pdf
        </button>
      </div>
      <div className="w-4/6 p-4 ">
        <img
          className="object-cover"
          src="https://images.hipdf.com/images2023/ai-features/chat-with-pdf-banner.png"
          alt="placeholder"
        />
      </div>
    </div>
  );
};
