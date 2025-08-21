"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
}

export default function MyListingPage({ params }: { params: { userId: string } }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("/api/mylisting");
        setListings(res.data.listings);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [params.userId]);

  if (loading) return <p className="p-6 text-white">Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">My Listings</h1>
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <ul className="space-y-4">
          {listings.map((listing) => (
            <li key={listing._id} className="border border-gray-600 rounded-lg p-4">
              <h2 className="text-lg font-semibold">{listing.title}</h2>
              <p>{listing.description}</p>
              <p className="text-sm text-gray-400">Price: ${listing.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
