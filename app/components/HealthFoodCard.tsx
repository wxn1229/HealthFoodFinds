import { Heart, Plus, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface Product {
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

interface ProductCardSimpleProps {
  product: Product;
  onAddToFavorites?: (id: string) => void;
  onAddToList?: (id: string) => void;
}

export default function ProductCardSimple({
  product,
  onAddToFavorites = () => {},
  onAddToList = () => {},
}: ProductCardSimpleProps) {
  return (
    <Card className="w-full h-full flex flex-col overflow-hidden">
      {/* 產品照片區域 */}
      <div className="relative w-full h-48">
        <Image
          src={product.imageUrl || "/placeholder.svg?height=300&width=400"}
          alt={product.name}
          fill
          className="object-cover"
        />
        <Badge
          variant="outline"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
        >
          {product.cf}
        </Badge>
      </div>

      <CardContent className="flex-grow p-4">
        <div className="mb-2">
          <h3 className="font-semibold line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.applicant}</p>
        </div>

        <p className="text-sm line-clamp-2 mb-3">{product.claim}</p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary mr-1" />
              <span>{product.curPoint.toFixed(1)}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {product.curCommentNum} 討論
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            {product.accessDate}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 pt-0 pb-4 px-4">
        <Button
          variant="outline"
          size="sm"
          className={`px-2 ${product.isFavorite ? "text-primary" : ""}`}
          onClick={() => onAddToFavorites(product.id)}
        >
          <Heart
            className={`h-4 w-4 ${product.isFavorite ? "fill-primary" : ""}`}
          />
          <span className="sr-only">我的最愛</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="px-2"
          onClick={() => onAddToList(product.id)}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">加入清單</span>
        </Button>
        <Button variant="default" size="sm" className="ml-auto" asChild>
          <Link href={`/products/${product.id}`}>
            詳細內容 <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
