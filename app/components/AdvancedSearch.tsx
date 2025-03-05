"use client";

import { useState } from "react";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSearchCondition } from "@/lib/store/features/searchSlice";
import { SelectData } from "@/lib/types/search";
import { useRouter } from "next/navigation";

const AdvancedSearch = ({ selectData }: { selectData: SelectData }) => {
  // Advanced search state
  const dispatch = useAppDispatch();
  const searchCondition = useAppSelector((state) => state.search);
  const router = useRouter();
  // Open states for advanced comboboxes
  const [openAdvApplicant, setOpenAdvApplicant] = useState(false);
  const [openAdvCertification, setOpenAdvCertification] = useState(false);
  const [openAdvIngredient, setOpenAdvIngredient] = useState(false);
  const [openAdvBenefit, setOpenAdvBenefit] = useState(false);

  const handleAdvancedSearch = () => {
    console.log("Advanced Search:", searchCondition);
    // Implement your search logic here

    router.push("/searchresult");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>進階搜尋</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="advanced-keypoint">關鍵字搜尋</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="advanced-keypoint"
              placeholder="輸入關鍵字..."
              className="pl-8"
              value={searchCondition.keypoint}
              onChange={(e) =>
                dispatch(
                  setSearchCondition({
                    ...searchCondition,
                    keypoint: e.target.value,
                  })
                )
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="advanced-id">ID</Label>
          <Input
            id="advanced-id"
            placeholder="輸入ID..."
            value={searchCondition.id}
            onChange={(e) =>
              dispatch(
                setSearchCondition({
                  ...searchCondition,
                  id: e.target.value,
                })
              )
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">開始日期</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="start-date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !searchCondition.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {searchCondition.startDate
                    ? format(new Date(searchCondition.startDate), "PPP")
                    : "選擇日期"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    searchCondition.startDate
                      ? new Date(searchCondition.startDate)
                      : undefined
                  }
                  onSelect={(date) => {
                    dispatch(
                      setSearchCondition({
                        ...searchCondition,
                        startDate: date ? date.toISOString() : undefined,
                      })
                    );
                  }}
                  initialFocus
                  month={
                    searchCondition.startDate
                      ? new Date(searchCondition.startDate)
                      : new Date()
                  }
                  onMonthChange={(month) => {
                    dispatch(
                      setSearchCondition({
                        ...searchCondition,
                        startDate: month.toISOString(),
                      })
                    );
                  }}
                  components={{
                    Caption: ({ displayMonth }) => {
                      const years = Array.from(
                        { length: 100 },
                        (_, i) => new Date().getFullYear() - i
                      );
                      const months = [
                        "一月",
                        "二月",
                        "三月",
                        "四月",
                        "五月",
                        "六月",
                        "七月",
                        "八月",
                        "九月",
                        "十月",
                        "十一月",
                        "十二月",
                      ];

                      return (
                        <div className="flex justify-center gap-1 items-center py-1">
                          <select
                            value={displayMonth.getFullYear()}
                            onChange={(e) => {
                              const newDate = new Date(displayMonth);
                              newDate.setFullYear(
                                Number.parseInt(e.target.value)
                              );
                              dispatch(
                                setSearchCondition({
                                  ...searchCondition,
                                  startDate: newDate.toISOString(),
                                })
                              );
                            }}
                            className="z-10 px-2 py-1 text-sm rounded border border-input bg-background"
                          >
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            value={displayMonth.getMonth()}
                            onChange={(e) => {
                              const newDate = new Date(displayMonth);
                              newDate.setMonth(Number.parseInt(e.target.value));
                              dispatch(
                                setSearchCondition({
                                  ...searchCondition,
                                  startDate: newDate.toISOString(),
                                })
                              );
                            }}
                            className="z-10 px-2 py-1 text-sm rounded border border-input bg-background"
                          >
                            {months.map((month, index) => (
                              <option key={month} value={index}>
                                {month}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    },
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">結束日期</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="end-date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !searchCondition.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {searchCondition.endDate
                    ? format(new Date(searchCondition.endDate), "PPP")
                    : "選擇日期"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    searchCondition.endDate
                      ? new Date(searchCondition.endDate)
                      : undefined
                  }
                  onSelect={(date) =>
                    dispatch(
                      setSearchCondition({
                        ...searchCondition,
                        endDate: date ? date.toISOString() : undefined,
                      })
                    )
                  }
                  initialFocus
                  month={
                    searchCondition.endDate
                      ? new Date(searchCondition.endDate)
                      : new Date()
                  }
                  onMonthChange={(month) => {
                    dispatch(
                      setSearchCondition({
                        ...searchCondition,
                        endDate: month.toISOString(),
                      })
                    );
                  }}
                  components={{
                    Caption: ({ displayMonth }) => {
                      const years = Array.from(
                        { length: 100 },
                        (_, i) => new Date().getFullYear() - i
                      );
                      const months = [
                        "一月",
                        "二月",
                        "三月",
                        "四月",
                        "五月",
                        "六月",
                        "七月",
                        "八月",
                        "九月",
                        "十月",
                        "十一月",
                        "十二月",
                      ];

                      return (
                        <div className="flex justify-center gap-1 items-center py-1">
                          <select
                            value={displayMonth.getFullYear()}
                            onChange={(e) => {
                              const newDate = new Date(displayMonth);
                              newDate.setFullYear(
                                Number.parseInt(e.target.value)
                              );
                              dispatch(
                                setSearchCondition({
                                  ...searchCondition,
                                  endDate: newDate.toISOString(),
                                })
                              );
                            }}
                            className="z-10 px-2 py-1 text-sm rounded border border-input bg-background"
                          >
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            value={displayMonth.getMonth()}
                            onChange={(e) => {
                              const newDate = new Date(displayMonth);
                              newDate.setMonth(Number.parseInt(e.target.value));
                              dispatch(
                                setSearchCondition({
                                  ...searchCondition,
                                  endDate: newDate.toISOString(),
                                })
                              );
                            }}
                            className="z-10 px-2 py-1 text-sm rounded border border-input bg-background"
                          >
                            {months.map((month, index) => (
                              <option key={month} value={index}>
                                {month}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    },
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="advanced-applicant">公司</Label>
          <Popover open={openAdvApplicant} onOpenChange={setOpenAdvApplicant}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openAdvApplicant}
                className="w-full justify-between"
              >
                {searchCondition.applicant
                  ? selectData.applicant.find(
                      (applicant) => applicant.Id === searchCondition.applicant
                    )?.Name
                  : "選擇公司..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="搜尋公司..." />
                <CommandList>
                  <CommandEmpty>找不到公司</CommandEmpty>
                  <CommandGroup>
                    {selectData.applicant.map((applicant) => (
                      <CommandItem
                        key={applicant.Id}
                        value={applicant.Id}
                        onSelect={(currentValue) => {
                          dispatch(
                            setSearchCondition({
                              ...searchCondition,
                              applicant: currentValue,
                            })
                          );
                          setOpenAdvApplicant(false);
                        }}
                      >
                        {applicant.Name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="advanced-certification">認證狀況</Label>
          <Popover
            open={openAdvCertification}
            onOpenChange={setOpenAdvCertification}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openAdvCertification}
                className="w-full justify-between"
              >
                {searchCondition.certification
                  ? selectData.certification.find(
                      (cert) => cert.Id === searchCondition.certification
                    )?.Name
                  : "選擇認證狀況..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="搜尋認證狀況..." />
                <CommandList>
                  <CommandEmpty>找不到認證狀況</CommandEmpty>
                  <CommandGroup>
                    {selectData.certification.map((cert) => (
                      <CommandItem
                        key={cert.Id}
                        value={cert.Id}
                        onSelect={(currentValue) => {
                          dispatch(
                            setSearchCondition({
                              ...searchCondition,
                              certification: currentValue,
                            })
                          );
                          setOpenAdvCertification(false);
                        }}
                      >
                        {cert.Name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="advanced-ingredient">成分</Label>
          <Popover open={openAdvIngredient} onOpenChange={setOpenAdvIngredient}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openAdvIngredient}
                className="w-full justify-between"
              >
                {searchCondition.ingredient
                  ? selectData.ingredient.find(
                      (ingredient) =>
                        ingredient.Id === searchCondition.ingredient
                    )?.Name
                  : "選擇成分..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="搜尋成分..." />
                <CommandList>
                  <CommandEmpty>找不到成分</CommandEmpty>
                  <CommandGroup>
                    {selectData.ingredient.map((ingredient) => (
                      <CommandItem
                        key={ingredient.Id}
                        value={ingredient.Id}
                        onSelect={(currentValue) => {
                          dispatch(
                            setSearchCondition({
                              ...searchCondition,
                              ingredient: currentValue,
                            })
                          );
                          setOpenAdvIngredient(false);
                        }}
                      >
                        {ingredient.Name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="advanced-benefit">功效</Label>
          <Popover open={openAdvBenefit} onOpenChange={setOpenAdvBenefit}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openAdvBenefit}
                className="w-full justify-between"
              >
                {searchCondition.benefit
                  ? selectData.benefit.find(
                      (benefit) => benefit.Id === searchCondition.benefit
                    )?.Name
                  : "選擇功效..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="搜尋功效..." />
                <CommandList>
                  <CommandEmpty>找不到功效</CommandEmpty>
                  <CommandGroup>
                    {selectData.benefit.map((benefit) => (
                      <CommandItem
                        key={benefit.Id}
                        value={benefit.Id}
                        onSelect={(currentValue) => {
                          dispatch(
                            setSearchCondition({
                              ...searchCondition,
                              benefit: currentValue,
                            })
                          );
                          setOpenAdvBenefit(false);
                        }}
                      >
                        {benefit.Name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAdvancedSearch}>
          搜尋
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdvancedSearch;
