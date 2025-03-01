"use client";

import SearchTabs from "@/app/components/SearchTabs";
import { useEffect, useState } from "react";
import { SelectData } from "@/lib/types/search";

import axios from "@/lib/axios";

export default function Home() {
  const [selectData, setSelectData] = useState<SelectData>({
    applicant: [],
    certification: [],
    ingredient: [],
    benefit: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingredient = await axios.get("/searchsetting/ingredient");
        console.log("🚀 ~ fetchData ~ ingredient:", ingredient);
        console.log("🚀 ~ fetchData ~ ingredient:", ingredient.data.data[0].Id);

        const benefit = await axios.get("/searchsetting/benefit");
        console.log("🚀 ~ fetchData ~ benefit:", benefit);
        const certification = await axios.get("/searchsetting/certification");
        console.log("🚀 ~ fetchData ~ certification:", certification);
        const applicant = await axios.get("/searchsetting/applicant");
        console.log("🚀 ~ fetchData ~ applicant:", applicant);

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
  useEffect(() => {}, [selectData]);

  return (
    <div>
      <SearchTabs selectData={selectData} />
    </div>
  );
}
