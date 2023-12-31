"use client";

// Hooks / Packages
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { onOpen } from "@/redux/modal/productModalSlice";
import { addToCart } from "@/redux/cart/cartSlice";

// Components
import IconButton from "@/components/ui/IconButton";
import Currency from "@/components/ui/Currency";

// Types
import { ProductCardProps } from "@/types/props";

// Icons
import { Expand, ShoppingCart } from "lucide-react";
import { MouseEventHandler } from "react";

const ProductCard = ({ data }: ProductCardProps) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  // Actions
  const onModalOpen: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();

    dispatch(onOpen({ product: data }));
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();

    dispatch(addToCart({ item: data }));
  };

  return (
    <article
      onClick={() => router.push(`/product/${data.id}`)}
      className="group bg-white cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Images & Actions */}
      <figure className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          fill
          src={data.images[0].url}
          alt={data.name}
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 w-full px-6 transition">
          <div className="flex gap-x-6 justify-center">
            {/* Modal */}
            <IconButton
              onClick={onModalOpen}
              icon={<Expand size={20} />}
              className="text-gray-600"
            />
            {/* Add to cart */}
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} />}
              className="text-gray-600"
            />
          </div>
        </div>
      </figure>
      {/* Description */}
      <div>
        <h6 className="font-semibold text-lg">{data.name}</h6>
        <p className="text-sm text-gray-500">{data.category.name}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between ">
        <Currency value={data.price} />
      </div>
    </article>
  );
};

export default ProductCard;
