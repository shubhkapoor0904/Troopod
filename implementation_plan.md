# Implementation Plan — Mobile-Friendly Gallery Carousel & Arrows

Enhance the product gallery in [ProductHero.tsx](file:///d:/Troopod/src/components/ProductHero.tsx) to feature previous/next chevron buttons on the main image and active dot pagination indicators on mobile.

## Proposed Flow

*   **Arrows Overlay**: Add `ChevronLeft` and `ChevronRight` overlay buttons positioned absolutely on the sides of the main hero image.
*   **Lightbox Compatibility**: Clicking overlay arrows must call `e.stopPropagation()` to avoid triggering the lightbox zoom click handler.
*   **Dot Indicators**: Display horizontal navigation dot indicators underneath the main image container on mobile viewports.

---

## Proposed Changes

### Component Modifications

#### [MODIFY] [ProductHero.tsx](file:///d:/Troopod/src/components/ProductHero.tsx)
*   Import `ChevronLeft` and `ChevronRight` from `lucide-react`.
*   Update main gallery wrapper layout:
    ```typescript
    // Left Overlay Arrow
    <button 
      onClick={(e) => {
        e.stopPropagation();
        setActiveGalleryImage(prev => (prev - 1 + gallery.length) % gallery.length);
      }}
      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 rounded-full shadow-md text-primary hover:bg-white transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 hidden md:block"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
    ```
    *(And identical logic for the mobile block using permanent visibility, plus Right Chevron).*
*   Below the main image container, render dynamic dots matching `gallery.length` styled with active indicators:
    ```typescript
    <div className="flex justify-center gap-1.5 mt-2 md:hidden">
      {gallery.map((_, i) => (
        <span 
          key={i} 
          className={`h-1.5 rounded-full transition-all duration-300 ${i === activeGalleryImage ? 'w-4 bg-primary' : 'w-1.5 bg-muted-foreground/30'}`}
        />
      ))}
    </div>
    ```

---

## Verification Plan

### Manual Verification
*   Confirm chevron arrows render correctly on desktop when hovering over the main product image.
*   Test clicking the chevrons on desktop to verify that the active photo changes, but the Lightbox zoom modal does NOT open.
*   Verify that clicking outside the arrows (the core body of the photo) still correctly launches the Lightbox modal.
*   Resize window to mobile viewport and confirm the paging dots show up below the image, and that the pagination dots reflect index transitions.
