"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSearchCondition } from "@/lib/store/features/searchSlice";
import { SelectData } from "@/lib/types/search";
import { useRouter } from "next/navigation";

const NormalSearch = ({ selectData }: { selectData: SelectData }) => {
  // Normal search state
  const dispatch = useAppDispatch();
  const searchCondition = useAppSelector((state) => state.search);
  const router = useRouter();
  // Open states for comboboxes
  const [openApplicant, setOpenApplicant] = useState(false);
  const [openCertification, setOpenCertification] = useState(false);
  const [openIngredient, setOpenIngredient] = useState(false);
  const [openBenefit, setOpenBenefit] = useState(false);

  const handleNormalSearch = () => {
    console.log("Normal Search:");

    router.push("/searchresult");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>普通搜尋</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="normal-keypoint">關鍵字搜尋</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="normal-keypoint"
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
          <Label htmlFor="normal-applicant">公司</Label>
          <Popover open={openApplicant} onOpenChange={setOpenApplicant}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openApplicant}
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
                        value={applicant.Name}
                        onSelect={() => {
                          dispatch(
                            setSearchCondition({
                              ...searchCondition,
                              applicant: applicant.Id,
                            })
                          );
                          setOpenApplicant(false);
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
          <Label htmlFor="normal-certification">認證狀況</Label>
          <Popover open={openCertification} onOpenChange={setOpenCertification}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCertification}
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
                        onSelect={() => {
                          dispatch(
                            setSearchCondition({
                              ...searchCondition,
                              certification: cert.Id,
                            })
                          );
                          setOpenCertification(false);
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
          <Label htmlFor="normal-ingredient">成分</Label>
          <Popover open={openIngredient} onOpenChange={setOpenIngredient}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openIngredient}
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
                        value={ingredient.Name}
                        onSelect={() => {
                          dispatch(
                            setSearchCondition({
                              ...searchCondition,
                              ingredient: ingredient.Id,
                            })
                          );
                          setOpenIngredient(false);
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
          <Label htmlFor="normal-benefit">功效</Label>
          <Popover open={openBenefit} onOpenChange={setOpenBenefit}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openBenefit}
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
                        value={benefit.Name}
                        onSelect={() => {
                          dispatch(
                            setSearchCondition({
                              ...searchCondition,
                              benefit: benefit.Id,
                            })
                          );
                          setOpenBenefit(false);
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
        <Button className="w-full" onClick={handleNormalSearch}>
          搜尋
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NormalSearch;
