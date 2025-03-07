"use client";

import ItemCard from "@/app/searchresult/components/ItemCard";
import LoginNoticeModal from "@/components/LoginNoticeModal";

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
import axios from "@/lib/axios";

const Favourite = () => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<HealthFoodInfo[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/user/FavHF", {
        params: { page: currentPage },
      });
      console.log(result);
      setItems(result.data.results);
      setTotalPages(result.data.count);
    };
    fetchData();
  }, [dispatch, currentPage]);

  return (
    <>
      {isAuthenticated && (
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
                        setCurrentPage(currentPage - 1);
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
                            setCurrentPage(currentPage + page - 3);
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
                        setCurrentPage(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">
            Please login to view your favourite items
          </h1>
        </div>
      )}
      <LoginNoticeModal
        isOpen={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
      />
    </>
  );
};

export default Favourite;
