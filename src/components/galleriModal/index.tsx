import { Modal } from "../modal";
import { useEffect, useState } from "react";

type Image = {
  id: string;
  name: string;
  url: string;
};

const images: Image[] = [
  {
    id: "1",
    name: "Image 1",
    url: "https://morfars.dk/cdn/shop/files/DJI-Mini-5-PRO-_-_30_22_-20250617.jpg?v=1758889541&width=2000",
  },
  {
    id: "2",
    name: "Image 2",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdt1o0TgtfhOm_T39k6P4FzeZz4TSIB5vKOA&s",
  },
  {
    id: "3",
    name: "Image 3",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdt1o0TgtfhOm_T39k6P4FzeZz4TSIB5vKOA&s",
  },
];

export default function GalleriModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    setSelectedImages([]);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setItems(images);
    }, 2000);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='relative flex items-center justify-center font-["Special_Elite"] 
                 text-white rounded-lg cursor-pointer min-w-[10rem] min-h-[3rem] border-2 hover:bg-stone-950/35'
    >
        <span className="p-2 pt-3">Gallery</span>
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        styles={{ height: "80%", width: "80%" }}
      >
        {loading ? (
          <div className="p-2.5 w-full h-[90%] flex items-center justify-center flex-col gap-3">
            <span className="inline-block w-12 h-12 rounded-full border-4 border-gray-300 border-b-transparent animate-spin"></span>
            <p className="text-gray-700">Loading devices...</p>
          </div>
        ) : (
          <div className="p-6 w-full h-[90%] overflow-y-auto">
            {items && items.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={
                      "group relative flex flex-col items-center gap-3 border-2 p-4 rounded-lg cursor-pointer transition-all duration-200 " +
                      (selectedImages.includes(item.id)
                        ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:scale-102")
                    }
                    onClick={() => {
                      setSelectedImages((prev) =>
                        prev.includes(item.id)
                          ? prev.filter((id) => id !== item.id)
                          : [...prev, item.id]
                      );
                    }}
                  >
                    {selectedImages.includes(item.id) && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-md">
                        <svg
                          viewBox="0 0 20 20"
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#ffffff"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <g id="layer1">
                              <path
                                d="M 18.837891 3.2832031 L 6.8183594 15.302734 L 1.1621094 9.6464844 L 0.453125 10.353516 L 6.8183594 16.716797 L 19.546875 3.9902344 L 18.837891 3.2832031 z "
                                fill="#ffffff"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </div>
                    )}
                    <div className="w-full aspect-square overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-xs text-gray-600 font-medium text-center truncate w-full">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>
        )}
        <div className="p-2.5 w-full h-[10%] flex flex-row justify-end items-center gap-2">
          <button
            title="Select All"
            onClick={() => {
              setSelectedImages(items.map((item) => item.id));
            }}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-100 text-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || selectedImages.length === items.length}
          >
            Select All
          </button>
          <button
            title="Accept"
            onClick={() => {
              setIsOpen(false);
            }}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-100 text-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedImages.length === 0 || loading}
          >
            Delete
          </button>
          <button
            title="Close"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-100 text-gray-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
