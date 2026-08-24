// Steps from the Beach — Cloudflare Worker
//
// Serves the static site (public/) and a small JSON API backed by D1
// (property data) and R2 (photos). Admin write routes are protected by
// a single shared password, set as a secret: ADMIN_PASSWORD.
//
// Routes:
//   GET    /api/properties?beach=kiawah-island   → list properties for a beach
//   POST   /api/properties                        → create a property (admin)
//   DELETE /api/properties/:id                     → delete a property (admin)
//   POST   /api/upload                             → upload a photo to R2 (admin)
//   GET    /api/photos/:key                         → serve a photo from R2
//   *                                               → fall through to static assets

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function isAuthed(request, env) {
  const provided = request.headers.get('x-admin-password') || '';
  return env.ADMIN_PASSWORD && provided === env.ADMIN_PASSWORD;
}

async function handleListProperties(request, env, url) {
  const beach = url.searchParams.get('beach');
  if (!beach) return json({ error: 'missing beach param' }, 400);
  const { results } = await env.DB.prepare(
    'SELECT * FROM properties WHERE beach = ? ORDER BY sort_order ASC, sleeps ASC'
  ).bind(beach).all();
  const mapped = results.map(r => ({
    id: r.id,
    beach: r.beach,
    name: r.name,
    oceanfront: !!r.oceanfront,
    lat: r.lat,
    lng: r.lng,
    beds: r.beds,
    baths: r.baths,
    sleeps: r.sleeps,
    vibe: r.vibe,
    tag: r.tag,
    desc: r.description,
    features: r.features ? JSON.parse(r.features) : [],
    img: r.img_key ? `/api/photos/${r.img_key}` : null,
    affiliateLink: r.affiliate_link,
  }));
  return json(mapped);
}

async function handleCreateProperty(request, env) {
  if (!isAuthed(request, env)) return json({ error: 'unauthorized' }, 401);
  const body = await request.json();
  const {
    beach, name, oceanfront, lat, lng, beds, baths, sleeps,
    vibe, tag, desc, features, imgKey, affiliateLink, sortOrder,
  } = body;
  if (!beach || !name) return json({ error: 'beach and name are required' }, 400);

  const result = await env.DB.prepare(
    `INSERT INTO properties
      (beach, name, oceanfront, lat, lng, beds, baths, sleeps, vibe, tag, description, features, img_key, affiliate_link, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    beach, name, oceanfront ? 1 : 0,
    lat ?? null, lng ?? null, beds ?? null, baths ?? null, sleeps ?? null,
    vibe ?? '', tag ?? '', desc ?? '',
    JSON.stringify(features || []),
    imgKey ?? null, affiliateLink ?? '#', sortOrder ?? 0
  ).run();

  return json({ ok: true, id: result.meta.last_row_id });
}

async function handleDeleteProperty(request, env, id) {
  if (!isAuthed(request, env)) return json({ error: 'unauthorized' }, 401);
  await env.DB.prepare('DELETE FROM properties WHERE id = ?').bind(id).run();
  return json({ ok: true });
}

async function handleUpload(request, env) {
  if (!isAuthed(request, env)) return json({ error: 'unauthorized' }, 401);
  const form = await request.formData();
  const file = form.get('photo');
  if (!file || typeof file === 'string') return json({ error: 'no photo provided' }, 400);

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  const key = `${crypto.randomUUID()}.${ext}`;
  await env.PHOTOS.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type || 'image/jpeg' },
  });
  return json({ ok: true, key, url: `/api/photos/${key}` });
}

async function handleServePhoto(env, key) {
  const obj = await env.PHOTOS.get(key);
  if (!obj) return new Response('Not found', { status: 404 });
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set('etag', obj.httpEtag);
  headers.set('cache-control', 'public, max-age=31536000, immutable');
  return new Response(obj.body, { headers });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === '/api/properties' && request.method === 'GET') {
      return handleListProperties(request, env, url);
    }
    if (pathname === '/api/properties' && request.method === 'POST') {
      return handleCreateProperty(request, env);
    }
    const deleteMatch = pathname.match(/^\/api\/properties\/(\d+)$/);
    if (deleteMatch && request.method === 'DELETE') {
      return handleDeleteProperty(request, env, deleteMatch[1]);
    }
    if (pathname === '/api/upload' && request.method === 'POST') {
      return handleUpload(request, env);
    }
    const photoMatch = pathname.match(/^\/api\/photos\/(.+)$/);
    if (photoMatch && request.method === 'GET') {
      return handleServePhoto(env, photoMatch[1]);
    }

    // Everything else: serve the static site (homepage, kiawah.html, admin.html, images/)
    return env.ASSETS.fetch(request);
  },
};
