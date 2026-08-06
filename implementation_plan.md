# Implementation Plan — Interactive Cart Drawer & Checkout Flow

Adding a fully operational shopping cart drawer and checkout simulator. This connects the store buttons (Add to Cart, Quick Add) with a cohesive, state-driven cart drawer sliding in from the right.

## Proposed State & Layout Flow

We will store `cartItems` in [App.tsx](file:///d:/Troopod/src/App.tsx) and pass state management callbacks down to the new [CartDrawer.tsx](file:///d:/Troopod/src/components/CartDrawer.tsx) component.

```
+------------------------------------------+
|  Navbar (Clicks Bag) -> Toggles isCartOpen |
+------------------------------------------+
                      |
                      v
+------------------------------------------+
|  App.tsx (Shares cartItems & handlers)    |
+------------------------------------------+
      |                   |
      v                   v
+-------------------+ +--------------------+
|  ProductHero      | |  CartDrawer        |
|  (Adds Collagen)  | |  (Slide overlay)   |
+-------------------+ |  - Modify Qty      |
                      |  - Remove items    |
                      |  - Checkout Form   |
                      |  - Success Screen  |
                      +--------------------+
```

---

## Proposed Changes

### Core Types

#### [MODIFY] [index.ts](file:///d:/Troopod/src/types/index.ts)
Add the `CartItem` model:
```typescript
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type?: 'subscription' | 'onetime';
}
```

---

### Component Modifications & Additions

#### [MODIFY] [Navbar.tsx](file:///d:/Troopod/src/components/Navbar.tsx)
*   Add `onCartClick: () => void` prop.
*   Trigger `onCartClick` when user clicks the shopping bag button.

#### [NEW] [CartDrawer.tsx](file:///d:/Troopod/src/components/CartDrawer.tsx)
Create a new component containing:
*   A slide-out drawer container (`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white`).
*   Scrollable itemized list displaying thumbnails, pricing, and quantity manipulators (`+` / `-`).
*   Empty-state layout prompting the user to continue shopping.
*   Subtotal, Shipping (Free over $50, else $4.99), and estimated tax calculator.
*   **Checkout Simulator**: Opens a modal overlay inside the drawer with fields for name, shipping address, card details, and a dynamic "Pay" button. Submitting places a mock order and shows a success checkmark before clearing the cart.

---

### Core Controller Integration

#### [MODIFY] [App.tsx](file:///d:/Troopod/src/App.tsx)
*   Replace number state `cartCount` with array state `cartItems: CartItem[]`.
*   Maintain `isCartOpen: boolean` state.
*   Implement `onAddToCart` to append/merge Collagen with the selected quantity and subscription tier.
*   Implement `onQuickAdd` to map related product index to its details and add/merge it into `cartItems`.
*   Implement `updateCartItemQuantity` and `removeCartItem` methods.
*   Render the `<CartDrawer />` component.

---

## Verification Plan

### Manual Verification
*   Open Figma Make preview and add Collagen. The Cart Drawer should slide open showing the added product.
*   Test increasing/decreasing quantity in the cart drawer. Subtotal must update instantly.
*   Add a related product via "Quick Add". It should merge or add as a separate item in the drawer.
*   Test mock checkout by filling in the details. Form should validate fields and show an order confirmation.
