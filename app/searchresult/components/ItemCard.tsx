"use client";

import { Heart, Plus, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { HealthFoodInfo } from "@/lib/types/search";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useAppSelector } from "@/lib/store/hooks";

const ItemCard = ({
  item,
  setIsLoginModalOpen,
}: {
  item: HealthFoodInfo;
  setIsLoginModalOpen: (open: boolean) => void;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const checkFavorite = async () => {
      if (isAuthenticated) {
        const result = await axios.post(`/user/isFavourite`, { hfId: item.Id });
        setIsFavorite(result.data.isFav);
      }
    };

    checkFavorite();
  }, []);

  const handleAddFavorite = async () => {
    try {
      await axios.post(`/user/addFavourite`, { hfId: item.Id });
      setIsFavorite(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await axios.post(`/user/deleteFavourite`, { hfId: item.Id });
      setIsFavorite(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden">
      {/* 產品照片區域 */}
      <div className="relative w-full h-48">
        <Image
          src={`/HF_img/${item.Id}.jpg`}
          alt={item.Name}
          fill
          className="object-cover"
        />
        <Badge
          variant="outline"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
        >
          {item.CF.Name}
        </Badge>
      </div>

      <CardContent className="flex-grow p-4">
        <div className="mb-2">
          <h3 className="font-semibold line-clamp-1">{item.Name}</h3>
          <p className="text-sm text-muted-foreground">{item.Applicant.Name}</p>
        </div>

        <p className="text-sm line-clamp-2 mb-3">{item.Claims}</p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary mr-1" />
              <span>{item.CurPoint.toFixed(1)}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {item.CurCommentNum} 討論
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">{item.AcessDate}</div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 pt-0 pb-4 px-4">
        <Button
          variant="outline"
          size="sm"
          className={`px-2 ${isFavorite ? "text-primary" : ""}`}
          onClick={() => {
            if (!isAuthenticated) {
              setIsLoginModalOpen(true);
            } else {
              if (isFavorite) {
                // 取消收藏
                handleRemoveFavorite();
              } else {
                // 加入收藏
                handleAddFavorite();
              }
            }
          }}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-primary" : ""}`} />
          <span className="sr-only">我的最愛</span>
        </Button>
        <Button variant="outline" size="sm" className="px-2" onClick={() => {}}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">加入清單</span>
        </Button>
        <Button variant="default" size="sm" className="ml-auto" asChild>
          <Link href={`/healthfood/${item.Id}`}>
            詳細內容 <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
