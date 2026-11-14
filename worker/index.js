const respond = (data, status=200) => Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if(url.pathname === '/api/health') {
      try { await env.DB.prepare('SELECT 1').first(); return respond({status:'ok',store:'NOBXDY STORE',database:'connected',supplier:'not_configured'}); }
      catch { return respond({status:'error',database:'unavailable'},503); }
    }
    if(url.pathname === '/api/products' && request.method === 'GET') {
      try { const {results} = await env.DB.prepare('SELECT id,title,category,product_type FROM products WHERE active=1 ORDER BY title LIMIT 100').all(); return respond({products:results}); }
      catch { return respond({error:'catalog_unavailable'},503); }
    }
    if(url.pathname.startsWith('/api/')) return respond({error:'not_implemented',message:'Protected transactions and supplier ordering are disabled until authentication and EYAD contract verification.'},501);
    return env.ASSETS.fetch(request);
  }
};
