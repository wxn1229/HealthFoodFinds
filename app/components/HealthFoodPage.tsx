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
export interface Product {
  id: string;
  name: string;
  applicant: string;
  claim: string;
  warning?: string;
  precautions?: string;
  accessDate: string;
  cf: string;
  website?: string;
  curPoint: number;
  curCommentNum: number;
  isFavorite?: boolean;
  imageUrl?: string; // 添加產品圖片URL
}

interface ProductCardDetailedProps {
  product: Product;
  onAddToFavorites?: (id: string) => void;
  onAddToList?: (id: string) => void;
}

export default function ProductCardDetailed({
  product,
  onAddToFavorites = () => {},
  onAddToList = () => {},
}: ProductCardDetailedProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden">
      <div className="md:flex">
        {/* 產品照片區域 */}
        <div className="md:w-1/3 h-[240px] md:h-auto relative">
          <div className="w-full h-full relative">
            <Image
              src={product.imageUrl || "/placeholder.svg?height=400&width=300"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:w-2/3">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p className="text-muted-foreground">{product.applicant}</p>
              </div>
              <div className="flex items-center gap-2 self-start">
                <Badge variant="outline" className="font-medium">
                  {product.cf}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">
                    {product.curPoint.toFixed(1)}
                  </span>
                </div>
                <Badge variant="secondary">{product.curCommentNum} 討論</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">聲稱功效</h3>
              <p>{product.claim}</p>
            </div>

            {product.warning && (
              <div>
                <h3 className="font-semibold mb-1 text-destructive">警告</h3>
                <p className="text-destructive-foreground">{product.warning}</p>
              </div>
            )}

            {product.precautions && (
              <div>
                <h3 className="font-semibold mb-1">注意事項</h3>
                <p>{product.precautions}</p>
              </div>
            )}

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1">通過認證日期</h3>
                <p>{product.accessDate}</p>
              </div>

              {product.website && (
                <div>
                  <h3 className="font-semibold mb-1">認證證明網站</h3>
                  <a
                    href={product.website}
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
              onClick={() => onAddToFavorites(product.id)}
              className={product.isFavorite ? "text-primary" : ""}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${
                  product.isFavorite ? "fill-primary" : ""
                }`}
              />
              我的最愛
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onAddToList(product.id)}
            >
              <Plus className="h-4 w-4 mr-2" />
              加入清單
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
