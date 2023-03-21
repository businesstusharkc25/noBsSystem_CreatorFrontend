import { useRouter } from "next/navigation";
import { addNewChannelRoute } from "../../constants/appRoutes";

const AddNewChannel = () => {
  const router = useRouter();

  return (
    <div className="w-screen text-white h-screen flex items-center justify-center">
      <button
        onClick={() => router.push(addNewChannelRoute)}
        className="p-3 bg-gray-800 rounded-lg drop-shadow-xl"
      >
        Add Channel
      </button>
    </div>
  );
};

export default AddNewChannel;
