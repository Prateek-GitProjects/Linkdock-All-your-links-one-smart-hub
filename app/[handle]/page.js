import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const handle = (await params).handle;
  const client = await clientPromise;
  const db = client.db("Linkdock");
  const collection = db.collection("links");

  // If the handle is already claimed, you cannot create the Linkdock
  const item = await collection.findOne({ handle: handle });
  if (!item) {
    return notFound();
  }

  // Example fallback data (can remove later)
  const item2 = {
    "_id": { "$oid": "68b0b446380b264b6313a606" },
    "links": [
      { "link": "https://www.instagram.com/codewithharry/?hl=en", "linktext": "Instagram" },
      { "link": "https://www.codewithharry.com", "linktext": "Website" },
      { "link": "https://www.YouTube.com/codewithharry/?hl=en", "linktext": "YouTube" }
    ],
    "handle": "PrateekYadav",
    "pic": "https://avatars.githubusercontent.com/u/48705673?v=4"
  };

  return (
    <div className="flex min-h-screen justify-center items-start py-10 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
      {item && (
        <div className="flex flex-col items-center w-[90%] max-w-md bg-white rounded-2xl shadow-xl p-6 gap-5">
          {/* Profile pic */}
          <img
            src={item.pic}
            alt={item.handle}
            className="w-24 h-24 rounded-full shadow-md border border-gray-200"
          />

          {/* Handle */}
          <span className="font-bold text-2xl text-gray-800">@{item.handle}</span>

          {/* Description */}
          <span className="text-center text-gray-600 text-sm px-4">
            {item.desc || "Welcome to my Linkdock 🚀"}
          </span>

          {/* Links */}
          <div className="w-full flex flex-col gap-3 mt-4">
            {item.links.map((link, index) => (
              <Link key={index} href={link.link} target="_blank">
                <div className="flex items-center justify-center w-full py-3 px-4 rounded-xl bg-gray-50 border border-gray-200 shadow hover:shadow-md hover:bg-gray-100 transition cursor-pointer">
                  <span className="font-medium text-gray-800">{link.linktext}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
