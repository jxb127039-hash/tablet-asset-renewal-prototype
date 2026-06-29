import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import type { CartItem } from "../types";
import { formatMoney } from "../logic";
import { SelectMark } from "./Shell";

export function ProductRow({
  item,
  onToggle,
  onQuantityChange,
}: {
  item: CartItem;
  onToggle: () => void;
  onQuantityChange: (quantity: number) => void;
}) {
  return (
    <article className="product-row">
      <SelectMark selected={item.selected} onClick={onToggle} label={`选择${item.title}`} />
      <img className="product-image" src={item.image} alt={item.title} />
      <div className="product-copy">
        <h2>{item.title}</h2>
        <p>{item.spec}</p>
        <div className="service-tags">
          <span>12期免息</span>
          <span>7天无理由退货</span>
        </div>
        <div className="product-price-row">
          <strong>¥{formatMoney(item.price)}</strong>
          <div className="quantity" aria-label="商品数量">
            <button aria-label="减少数量" onClick={() => onQuantityChange(Math.max(1, item.quantity - 1))}><MinusOutlined /></button>
            <span>{item.quantity}</span>
            <button aria-label="增加数量" onClick={() => onQuantityChange(item.quantity + 1)}><PlusOutlined /></button>
          </div>
        </div>
      </div>
    </article>
  );
}
