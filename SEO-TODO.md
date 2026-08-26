# Steps from the Beach — Site Feedback & Running To-Do

Last updated: 2026-08-26

This tracks the aesthetic/functional/SEO/monetization feedback Claude gave on
2026-08-26, and what's been done vs. still open. Update this file as items
are finished or new feedback comes in.

## SEO

- [x] Add meta description tags to index.html and kiawah.html
- [x] Add Open Graph (og:title, og:description, og:image) + Twitter Card tags
      to index.html and kiawah.html
- [x] Add robots.txt (disallow /admin.html)
- [x] Add sitemap.xml listing index.html and kiawah.html
- [x] Add rel=canonical tags to each page
- [x] Add structured data (LodgingBusiness/ItemList JSON-LD) to property
      cards on kiawah.html — regenerates automatically as real properties
      are added/edited
- [x] Compress/convert the 3 static homepage/beach photos to WebP (648KB →
      230KB hero, 345KB → 111KB Kiawah dock, 739KB → 312KB Seabrook — roughly
      a 65-70% size cut on each)
- [x] Add width/height attributes + loading="lazy" to static img tags;
      loading="lazy" also added to property card images
- [ ] Longer-term: consider a blog/content section (guides, "best of" lists)
      for long-tail SEO and more internal linking depth — only 2 pages exist
      today

## Security / Privacy

- [x] Added `noindex, nofollow` meta tag + robots.txt disallow to
      /admin.html so it won't show up in search results
- [ ] Consider Cloudflare Access in front of /admin.html for real access
      control (this needs to be set up in the Cloudflare dashboard —
      not something doable from a file edit; ask if you'd like walkthrough
      steps)

## Aesthetic / Functional

- [ ] Property cards scroll horizontally even on wide desktop — consider a
      responsive grid (3-4 across) on desktop, keeping horizontal scroll for
      mobile only
- [ ] Add a loading skeleton/shimmer for property cards while they fetch from
      the database, instead of a blank gap
- [ ] Homepage beaches grid feels sparse with only 1 live + 1 "coming soon"
      card — consider a short "how we pick" / "why trust us" section to add
      substance until more beaches are live

## Monetization

- [ ] Add an email capture (e.g. "get notified when we add a new beach") to
      start building an owned audience — high leverage, not urgent
- [ ] Consider display ads (AdThrive or similar) once there's meaningful
      traffic — later-stage, not urgent now
- [x] Already in good shape: affiliate disclosure is live, links use
      rel="sponsored" correctly

## Done (2026-08-26)

- Added meta description, canonical, Open Graph, and Twitter Card tags to
  both pages
- Created robots.txt and sitemap.xml
- Added noindex to admin.html
- Added JSON-LD structured data for Kiawah property listings
- Converted the 3 static site images to WebP and updated all references
  (old .jpg originals left in place on disk, just no longer linked — safe
  to delete once you've confirmed everything looks right)
- Added lazy loading to below-the-fold images; width/height on static beach
  card images to reduce layout shift
