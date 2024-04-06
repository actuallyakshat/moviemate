import { Button } from "../ui/button";

const FindMateModal = ({ setModal, movie }) => {
  const dummyData = [
    {
      name: "Akshat Dubey",
      age: 20,
      gender: "Male",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Akshat Dubey",
      age: 20,
      gender: "Male",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Akshat Dubey",
      age: 20,
      gender: "Male",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  ];
  //   const dummyData = null;

  return (
    <div
      onClick={() => setModal(false)}
      className="w-full h-full fixed top-0 left-0 bg-black/50 z-[1000] flex items-center justify-center modal"
    >
      <div
        className="max-w-2xl max-h-[90vh] w-full bg-background border border-foreground/20 p-6 rounded-xl overflow-y-scroll no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl font-semibold text-center">
          Users interested to watch {movie.title}
        </h1>
        {dummyData && (
          <div className="py-4 space-y-2">
            {dummyData.map((data) => {
              return (
                <div
                  key={data.index}
                  className="flex items-center gap-3 bg-secondary rounded-lg px-4 p-2 w-full"
                >
                  <img
                    src={data.image}
                    alt="pfp"
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{data.name}</p>
                    <div className="flex items-center gap-2 font-medium dark:text-zinc-300 text-zinc-500">
                      <p>{data.age}, </p>
                      <p>{data.gender}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!dummyData && (
          <p className="dark:text-zinc-300 py-12 text-center font-semibold text-zinc-500">
            Oops! No users found. <br /> Be the first one to show interest 🍿
          </p>
        )}
        <div className="w-fit mx-auto space-y-2">
          {dummyData && (
            <p className="dark:text-zinc-300 text-zinc-500">
              Didn&apos;t find your mate?
            </p>
          )}
          <Button className="w-full">Add me on the list!</Button>
        </div>
      </div>
    </div>
  );
};

export default FindMateModal;
