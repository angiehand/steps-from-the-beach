# Steps from the Beach — Site Feedback & Running To-Do

Last updated: 2026-08-27

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
- [x] Set up Cloudflare Access in front of /admin.html — scoped to just
      that path (stepsfromthebeach.com/admin.html), policy restricts access
      to Angie's email only, login via one-time emailed code. Configured in
      Cloudflare Zero Trust dashboard on 2026-08-26.

## Domain / DNS

- [x] Fixed www.stepsfromthebeach.com — it had no DNS record at all and
      failed to resolve. Added it as a custom domain on the Worker, then
      added a Redirect Rule (301, "Redirect from WWW to root" template) so
      www now forwards cleanly to the non-www version instead of serving a
      duplicate copy of the site. Fixed and deployed 2026-08-26.

## Aesthetic / Functional

- [x] Property cards now show as a responsive grid (3 across desktop, 2 on
      tablet, 1 on mobile) instead of horizontal scroll
- [x] Built an About / "How We Choose" page explaining the curation
      standard, redesigned per feedback: bigger "About" eyebrow, pull-quote
      for "Thoughtful beats expensive every time," a 3-column "What Makes
      the Cut" grid, and a closing CTA back to the beaches. Deployed
      2026-08-27. Still open: a real interior/porch photo for the hero once
      Angie has one to use.
- [ ] Add a loading skeleton/shimmer for property cards while they fetch from
      the database, instead of a blank gap
- [ ] Homepage beaches grid feels sparse with only 1 live + 1 "coming soon"
      card — consider a short "how we pick" / "why trust us" section to add
      substance until more beaches are live

## Monetization

- [ ] Add a shoppable "beach essentials" list using ShopMy's embeddable
      list widget — diversifies revenue beyond per-property affiliate
      links; revisit once Kiawah's property list is further along

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
- Set up Cloudflare Access on /admin.html (email + one-time code, Angie only)
- Fixed www.stepsfromthebeach.com DNS and added a 301 redirect to the
  non-www domain
