
# BariLagbe — Full Frontend Interactivity Upgrade

Keep the existing Teal/Green/Gold design, Hind Siliguri typography, and all current layouts. Rename brand text from "বাড়িবন্ধু" to "বাড়িলাগবে" (BariLagbe) everywhere. Nothing gets redesigned — every existing page gets richer content, working interactions, and connections to sibling pages via a shared mock-data store.

## Scope (single build pass)

### 1. Shared foundation
- `src/lib/mock-data.ts` — realistic Bangla mock data: 50 properties, 20 owners, 100 tenants, 30 applications, 40 visits, rent history, notifications, advocates, staff, divisions/districts/thanas.
- `src/lib/store.ts` — lightweight Zustand store for favorites, saved searches, notifications read-state, current session role (guest / tenant / owner / admin), applications, visits, bookings. Persists to localStorage.
- `src/components/ui/*` — add only the shadcn primitives we actually use (dialog, sheet, tabs, select, slider, checkbox, badge, skeleton, table, breadcrumb, calendar, popover, form, toast/sonner). Reuse existing tokens.
- Toaster mounted in `__root.tsx`; global confirm dialog helper.
- Update `SiteNav` to add: Search, FAQ, Dashboard, Notifications, Profile; mobile drawer stays. Rename brand to বাড়িলাগবে. Add breadcrumb component and use on inner pages.

### 2. Routes (create/upgrade)
```
/                        Home — hero CTAs wired, featured cards with working actions
/properties              Search — filters, sort, grid/list, map toggle, pagination, save
/properties/$id          Details — gallery, map placeholder, owner card, action buttons
/owners                  Owner landing — CTA to /owners/register
/owners/register         Multi-step owner registration
/services                Services (existing content, polished)
/about                   About (real content)
/contact                 Contact form with validation + toast
/faq                     FAQ accordion
/login                   Role-select mock login (tenant/owner/admin)
/register                Signup form (mock)
/profile                 Editable profile
/notifications           Notification center
/apply/$propertyId       6-step rent application
/dashboard               Redirects based on role
/dashboard/tenant        Tenant dashboard (rent, agreement, payments, docs)
/dashboard/owner         Owner dashboard (properties, income, visits, notifications)
/dashboard/admin         Admin dashboard (owners, tenants, applications, visits, rent, legal, advocates, tickets, analytics)
/legal/$tenantId         Legal notice workflow (3-month pending → notice → advocate)
/visits                  House visit calendar with assign/reschedule/cancel
/privacy, /terms         Keep
```

### 3. Interactive behaviors
- **Home**: hero buttons scroll or navigate; property card actions (View, Save, Share, Book Visit, Apply) all fire — Save toggles favorite in store, Share uses `navigator.share` fallback to clipboard, Book Visit opens modal, Apply routes to `/apply/$id`.
- **Search**: filters (division/district/thana/area/rent slider/beds/baths/type/parking/sqft/verified/available) derive from URL search params via `validateSearch`; typing debounced; sort + grid/list + map toggle + save search + pagination all reactive; result counter + empty state + skeletons.
- **Property Details**: image slider with fullscreen modal, amenities grid, rules, owner card, map placeholder, action bar (Book Visit modal, Apply → route, Call/WhatsApp `tel:`/`wa.me:`, Favorite, Share, Report modal).
- **Book Visit modal**: date (calendar) + time + name + phone, validated with zod, writes to visits store, success toast.
- **Rent Application**: 6 steps (Personal, Employment, Income, Documents mock upload, 2 References, Review), progress bar, per-step zod validation, submit → toast + push to store + redirect to tenant dashboard.
- **Owner Registration**: 4 steps (Owner info, Property, Bank, Agreement upload), zod, success page.
- **Dashboards**: sidebar layout (shadcn), cards with counts derived from mock store, sortable/filterable tables, notification bell, chart placeholders (simple SVG bars — no new chart dep needed), everything clickable to detail routes.
- **Admin**: tabbed sections; search + filters + CSV export (client-side blob download).
- **Legal Notice**: computes tenants with ≥3 months pending, warning badge, "Generate Notice" creates a mock PDF-style download (text blob), assign advocate select, status timeline.
- **Visits**: calendar view + list, assign staff select, reschedule/cancel with confirm dialog.
- **Notifications**: list from store, mark read/all read, filter by type, deep-links.
- **Profile**: editable fields, change password form (mock), avatar upload preview, language toggle (bn/en placeholder).

### 4. UX polish
- Skeleton components on every data-loaded page (simulated 300ms delay).
- Empty states with illustration icon + CTA.
- Error boundary per route (already required).
- Sonner toasts for all mutations.
- Confirmation dialogs for destructive actions.
- Framer-motion-free micro-animations via Tailwind transitions.
- Responsive: nav drawer already present; tables switch to card list under `md`; filter panel becomes a Sheet under `lg`.

### 5. Technical notes
- All state is client-side; no backend, no Lovable Cloud enable.
- Uses TanStack Router search params for shareable search state.
- Zustand + `persist` middleware for local mock DB.
- Mock role switcher in navbar footer to preview tenant/owner/admin dashboards without real auth.
- Every `createFileRoute` gets proper `head()` meta + `errorComponent` + `notFoundComponent`.

## Out of scope
- Real authentication, real payments, real maps, real file storage.
- Backend / database wiring (mock only, per your instructions).
- Redesign of colors, typography, or existing section layouts.

Proceeding to build in one pass on approval.
