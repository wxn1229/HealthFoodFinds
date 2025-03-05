"use client";

import ItemCard from "@/app/searchresult/components/ItemCard";
import LoginNoticeModal from "@/components/LoginNoticeModal";
import {
  fetchSearchResults,
  setSearchPage,
} from "@/lib/store/features/searchSlice";
import { HealthFoodInfo } from "@/lib/types/search";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

interface SearchResponse {
  code: number;
  results: HealthFoodInfo[];
  count: number;
}

const SearchResult = () => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<HealthFoodInfo[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const currentPage = useAppSelector((state) => state.search.page);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(fetchSearchResults());
      if (result.payload) {
        const payload = result.payload as SearchResponse;
        setItems(payload.results);
        setTotalPages(payload.count);
      }
    };

    fetchData();
  }, [dispatch, currentPage]);

  return (
    <>
      <div className=" px-20 py-10 overflow-y-auto max-h-screen ">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard
                key={item.Id}
                item={item}
                setIsLoginModalOpen={setIsLoginModalOpen}
              />
            ))}
          </div>
          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      if (currentPage === 1) {
                        return;
                      }
                      dispatch(setSearchPage(currentPage - 1));
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: 5 }, (_, index) => {
                  const page = index + 1;

                  if (
                    currentPage + page - 3 > totalPages ||
                    currentPage + page - 3 < 1
                  ) {
                    return null;
                  }
                  return (
                    <PaginationItem key={currentPage + page - 3}>
                      <PaginationLink
                        isActive={currentPage === currentPage + page - 3}
                        onClick={() => {
                          dispatch(setSearchPage(currentPage + page - 3));
                        }}
                      >
                        {currentPage + page - 3}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (currentPage === totalPages) {
                        return;
                      }
                      dispatch(setSearchPage(currentPage + 1));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
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
