# Implementation Plan — Customizable Subscription Intervals

Adding customizable delivery intervals (30, 45, or 60 days) to the "Subscribe & Save" purchase tier. Selecting an interval updates the product details dynamically and flows straight into the cart drawer.

## Proposed Flow

```
+-------------------------------------------------+
|  ProductHero: Selects Subscription Tiers       |
|  - Renders Interval Selector (30, 45, 60 days)  |
+-------------------------------------------------+
                        |
                        v (Passes interval param)
+-------------------------------------------------+
|  App.tsx: Appends collagen-subscription-45days  |
|  as separate items if intervals differ           |
+-------------------------------------------------+
                        |
                        v
+-------------------------------------------------+
|  CartDrawer: Displays "Subscribe (Every 45 days)"|
+-------------------------------------------------+
```

---

## Proposed Changes

### Core Types

#### [MODIFY] [index.ts](file:///d:/Troopod/src/types/index.ts)
Extend `CartItem` to support `interval` value:
```typescript
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type?: 'subscription' | 'onetime';
  interval?: string;
}
```

---

### Component Modifications

#### [MODIFY] [ProductHero.tsx](file:///d:/Troopod/src/components/ProductHero.tsx)
*   Add `interval` to the `onAddToCart` parameters: `onAddToCart: (interval?: string) => void`.
*   Maintain local state `subscriptionInterval: string` (defaults to `"30 days"`).
*   Under the subscription pricing tier option card, render a custom, inline dropdown selector or horizontal tab button set (30 days, 45 days, 60 days).
*   When "Add to Cart" is clicked and `purchaseType` is `subscription`, call `onAddToCart(subscriptionInterval)`.

#### [MODIFY] [CartDrawer.tsx](file:///d:/Troopod/src/components/CartDrawer.tsx)
*   In the card rendering logic, if `item.type === 'subscription'`, display `"Subscribe & Save (Every " + item.interval + ")"` instead of just `"Subscribe & Save"`.

---

### Core Controller

#### [MODIFY] [App.tsx](file:///d:/Troopod/src/App.tsx)
*   Modify `handleAddToCart` signature to accept `interval?: string`.
*   Set unique item ID: `collagen-${purchaseType}-${interval || ''}`. This ensures that adding a 30-day and a 45-day delivery registers them as separate lines in the cart.
*   Map `interval` to the new `CartItem` added.

---

## Verification Plan

### Manual Verification
*   Open Figma Make preview, select "Subscribe & Save", and choose "45 days" interval. Add to cart.
*   The cart drawer should open showing Collagen with tag: `"Subscribe & Save (Every 45 days)"`.
*   Close drawer, change interval to "60 days", and add to cart again.
*   The drawer should display **two separate line items** (one for 45 days, one for 60 days), each with their own quantity counters and totals.
