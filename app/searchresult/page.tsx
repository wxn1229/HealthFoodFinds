"use client";

import ItemCard from "@/app/searchresult/components/ItemCard";
import LoginNoticeModal from "@/components/LoginNoticeModal";
import { fetchSearchResults } from "@/lib/store/features/searchSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { HealthFoodInfo } from "@/lib/types/search";
import { useEffect, useState } from "react";

interface SearchResponse {
  code: number;
  results: HealthFoodInfo[];
  count: number;
}

const SearchResult = () => {
  const [items, setItems] = useState<HealthFoodInfo[]>([]);
  const dispatch = useAppDispatch();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(fetchSearchResults());
      if (result.payload) {
        const payload = result.payload as SearchResponse;
        setItems(payload.results);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className=" px-20 py-10 overflow-y-auto max-h-screen ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item.Id}
              item={item}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          ))}
        </div>
      </div>
      <LoginNoticeModal
        isOpen={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
      />
    </>
  );
};

export default SearchResult;
