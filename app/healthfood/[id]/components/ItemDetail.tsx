import { Heart, Plus, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { HealthFoodDetail } from "@/lib/types/search";
const ItemDetail = ({
  id,
  setIsOpen,
}: {
  id: string;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const [item, setItem] = useState<HealthFoodDetail | null>(null);

  useEffect(() => {
    const checkFavorite = async () => {
      if (isAuthenticated) {
        const result = await axios.post(`/user/isFavourite`, { hfId: id });
        setIsFavorite(result.data.isFav);
      }
    };

    checkFavorite();
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios.get(`/searching/searchById/${id}`);
      setItem(result.data.result);
    };

    fetchItem();
  }, []);

  const handleAddFavorite = async () => {
    try {
      await axios.post(`/user/addFavourite`, { hfId: id });
      setIsFavorite(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await axios.post(`/user/deleteFavourite`, { hfId: id });
      setIsFavorite(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card className="w-[70%] max-w-7xl mx-auto overflow-hidden p-4 mt-10">
      <div className="md:flex">
        {/* 產品照片區域 */}
        <div className="md:w-1/3 h-[240px] md:h-auto relative">
          <div className="w-full h-full relative">
            {item ? (
              <Image
                src={`/HF_img/${item.Id}.jpg`}
                alt={item.Name || ""}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <p className="text-muted-foreground">加載中...</p>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-2/3">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{item?.Name}</h2>
                <p className="text-muted-foreground">{item?.Applicant.Name}</p>
              </div>
              <div className="flex items-center gap-2 self-start">
                <Badge variant="outline" className="font-medium">
                  {item?.CF.Name}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">
                    {item?.CurPoint.toFixed(1)}
                  </span>
                </div>
                <Badge variant="secondary">{item?.CurCommentNum} 討論</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">聲稱功效</h3>
              <p>{item?.Claims}</p>
            </div>

            {item?.Warning && (
              <div>
                <h3 className="font-semibold mb-1 text-destructive">警告</h3>
                <p className="text-destructive-foreground">{item?.Warning}</p>
              </div>
            )}

            {item?.Precautions && (
              <div>
                <h3 className="font-semibold mb-1">注意事項</h3>
                <p>{item?.Precautions}</p>
              </div>
            )}

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1">通過認證日期</h3>
                <p>{item?.AcessDate}</p>
              </div>

              {item?.Website && (
                <div>
                  <h3 className="font-semibold mb-1">認證證明網站</h3>
                  <a
                    href={item?.Website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    查看認證 <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (isAuthenticated) {
                  if (isFavorite) {
                    handleRemoveFavorite();
                  } else {
                    handleAddFavorite();
                  }
                } else {
                  setIsOpen(true);
                }
              }}
              className={isFavorite ? "text-primary" : ""}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${isFavorite ? "fill-primary" : ""}`}
              />
              我的最愛
            </Button>
            <Button variant="default" size="sm" onClick={() => {}}>
              <Plus className="h-4 w-4 mr-2" />
              加入清單
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ItemDetail;
