export type AssetStatus = "active" | "sold";
export type ConditionLevel = "excellent" | "good" | "fair";

export type PurchasedAsset = {
  id: string;
  category: "tablet";
  brand: string;
  model: string;
  storage: string;
  color: string;
  purchasedAt: string;
  paidPrice: number;
  status: AssetStatus;
  ecosystem: string;
  estimateMin: number;
  estimateMax: number;
  forecast90: number;
  image?: string;
};

export type CartItem = {
  id: string;
  category: "tablet" | "accessory";
  title: string;
  spec: string;
  price: number;
  quantity: number;
  selected: boolean;
  ecosystem: string;
  image: string;
};

export type ConditionAssessment = {
  appearance: ConditionLevel;
  functionality: ConditionLevel;
  battery: ConditionLevel;
  accessories: ConditionLevel;
  photoName?: string;
};

export type ResaleQuote = {
  assetId: string;
  estimateMin: number;
  estimateMax: number;
  forecast30: number;
  forecast90: number;
  tradeInBonus: number;
  confidence: "medium" | "high";
  asOf: string;
};

export type UpgradePlan = {
  assetId: string;
  cartItemId: string;
  tabletPrice: number;
  accessoryTotal: number;
  cartTotal: number;
  currentOffset: number;
  netTabletToday: number;
  cartPayableToday: number;
  netTablet90: number;
  delayLoss90: number;
};

export type PrototypeEventName =
  | "cart_asset_entry_impression"
  | "context_recommendation_impression"
  | "asset_entry_clicked"
  | "diagnosis_started"
  | "diagnosis_completed"
  | "reminder_set"
  | "tradein_applied"
  | "tradein_checkout_completed"
  | "regular_checkout_started";

export type PrototypeEvent = {
  id: string;
  name: PrototypeEventName;
  occurredAt: string;
  assetId?: string;
  cartItemId?: string;
  variant: "smart-renewal";
};
