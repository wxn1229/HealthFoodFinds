"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import NormalSearch from "@/app/components/NormalSearch";
import AdvancedSearch from "@/app/components/AdvancedSearch";
import { SelectData } from "@/lib/types/search";

export default function SearchTabs({ selectData }: { selectData: SelectData }) {
  const [searchTab, setSearchTab] = useState("normal");

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Tabs
        defaultValue="normal"
        value={searchTab}
        onValueChange={setSearchTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="normal">普通搜尋</TabsTrigger>
          <TabsTrigger value="advanced">進階搜尋</TabsTrigger>
        </TabsList>

        {/* Normal Search */}
        <TabsContent value="normal">
          <NormalSearch selectData={selectData} />
        </TabsContent>

        {/* Advanced Search */}
        <TabsContent value="advanced">
          <AdvancedSearch selectData={selectData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
