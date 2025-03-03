"use client";

import SearchTabs from "@/app/components/SearchTabs";
import { useEffect, useState } from "react";
import { SelectData } from "@/lib/types/search";
import { useAppDispatch } from "@/lib/store/hooks";
import axios from "@/lib/axios";
import { clearSearchCondition } from "@/lib/store/features/searchSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const [selectData, setSelectData] = useState<SelectData>({
    applicant: [],
    certification: [],
    ingredient: [],
    benefit: [],
  });

  useEffect(() => {
    // 當路徑是首頁時，清空搜尋條件
    dispatch(clearSearchCondition());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingredient = await axios.get("/searchsetting/ingredient");
        const benefit = await axios.get("/searchsetting/benefit");
        const certification = await axios.get("/searchsetting/certification");
        const applicant = await axios.get("/searchsetting/applicant");

        setSelectData({
          ingredient: ingredient.data.data,
          benefit: benefit.data.data,
          certification: certification.data.data,
          applicant: applicant.data.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <SearchTabs selectData={selectData} />
    </div>
  );
}
