# Mobile Responsiveness Implementation Plan

This plan details the changes required to make the Troopod Web Application fully responsive and optimized for mobile devices, offering a premium native-app-like user experience.

## Proposed Changes

### 1. Navbar Optimization
- Close the mobile side menu when clicking outside (on the backdrop overlay) in [Navbar.tsx](file:///d:/Troopod/src/components/Navbar.tsx).
- Ensure active drawer transitions are smooth and handle mobile safe-area paddings.

### 2. Product Image Gallery (Swipe Support)
- Integrate horizontal touch swipe handlers (`onTouchStart`, `onTouchEnd`) on the main product image in [ProductHero.tsx](file:///d:/Troopod/src/components/ProductHero.tsx) to allow swipe-to-navigate between product images.
- Provide a utility class `.hide-scrollbar` in [index.css](file:///d:/Troopod/src/index.css) to hide scrollbars elegantly across devices.
- Style the horizontal thumbnails list in [ProductHero.tsx](file:///d:/Troopod/src/components/ProductHero.tsx) to use scroll snapping and scrollbar-hiding.

### 3. Lightbox (Swipe Support)
- Add horizontal touch swipe gestures (`onTouchStart`, `onTouchEnd`) inside [Lightbox.tsx](file:///d:/Troopod/src/components/Lightbox.tsx) for easy mobile navigation of the high-res gallery.

### 4. Comparison Table Stacked Card Layout
- Replace horizontal-scrolling table with stacked feature comparison cards on mobile screens (`md:hidden`) in [App.tsx](file:///d:/Troopod/src/App.tsx).
- Display a clean table layout on larger screens (`hidden md:table`).

### 5. Reviews Carousel
- Refactor the 3-column vertical grid inside [Reviews.tsx](file:///d:/Troopod/src/components/Reviews.tsx) on mobile to be a horizontal swipeable scroll-snap container. This avoids a long vertical scrolling section, saving screen space and improving navigation.
- Desktop layout will remain as a 3-column grid.

### 6. Related Products Touch Optimization
- Refactor related products grid in [App.tsx](file:///d:/Troopod/src/App.tsx) from single column on mobile to 2 columns (`grid-cols-2 md:grid-cols-3`) to fit two cards side-by-side, optimizing space.
- Make the "Quick Add" button always visible on mobile/touch screens in [App.tsx](file:///d:/Troopod/src/App.tsx) since touch screens do not support mouse hover actions.

### 7. Cart Drawer & Checkout Forms
- Add `inputMode="numeric" pattern="[0-9]*"` attributes to card details inputs (Card Number, CVV, Expiry Date) in [CartDrawer.tsx](file:///d:/Troopod/src/components/CartDrawer.tsx) to trigger the numeric virtual keyboard automatically.
- Adjust internal spacing and padding on mobile screens so checkout forms do not overflow the drawer.

### 8. Sticky Bottom Cart
- Make the bottom padding of the body wrapper dynamic in [App.tsx](file:///d:/Troopod/src/App.tsx): add `pb-24` on mobile only when the sticky cart is active.

---

## Verification Plan

### Automated Tests
- Since running terminal commands is disabled on this system due to folder permissions in AppData, we will verify by editing the codebase properly and relying on the active Vite hot reload server.

### Manual Verification
- Resize browser window to verify breakpoint transitions.
- Simulate touch events using Chrome/Firefox DevTools device toolbar to verify swipe gestures on product gallery, lightbox, and reviews carousel.
- Test input forms in checkout to verify numeric keypad triggers correctly.
