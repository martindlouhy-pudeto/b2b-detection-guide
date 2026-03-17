(function () {
  var IPINFO_TOKEN = 'YOUR_IPINFO_TOKEN';
  var GA4_EVENT_NAME = 'visitor_classified';
  var CACHE_KEY = 'pudeto_visitor_type';
  var CACHE_TTL_HOURS = 24;

  var CZ_ISP_KEYWORDS = [
    'O2', 'T-Mobile', 'Vodafone', 'CETIN', 'PODA',
    'UPC', 'Kabel Plus', 'Starnet', 'Selfnet',
    'Nordic Telecom', 'Forpsi', 'vshosting',
    'Active24', 'Wedos', 'broadband', 'residential',
    'telecom', 'internet', 'Cloudflare', 'Amazon',
    'Google LLC', 'Microsoft', 'Akamai', 'Fastly',
    'DigitalOcean', 'OVH', 'Hetzner'
  ];

  function isB2B(org, country) {
    if (!org) return false;
    if (country && country !== 'CZ') return false;
    var orgLower = org.toLowerCase();
    for (var i = 0; i < CZ_ISP_KEYWORDS.length; i++) {
      if (orgLower.indexOf(CZ_ISP_KEYWORDS[i].toLowerCase()) !== -1) return false;
    }
    return true;
  }

  function pushToGA4(visitorType, country) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: GA4_EVENT_NAME,
      visitor_type: visitorType,
      visitor_country: country || 'unknown'
    });
  }

  function loadFromCache() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var cached = JSON.parse(raw);
      if (Date.now() - cached.ts > CACHE_TTL_HOURS * 3600000) {
        sessionStorage.removeItem(CACHE_KEY);
        return null;
      }
      return cached;
    } catch (e) { return null; }
  }

  function saveToCache(visitorType, country) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        ts: Date.now(), visitorType: visitorType, country: country
      }));
    } catch (e) {}
  }

  function run() {
    var cached = loadFromCache();
    if (cached) { pushToGA4(cached.visitorType, cached.country); return; }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://ipinfo.io/json?token=' + IPINFO_TOKEN, true);
    xhr.timeout = 3000;
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4 || xhr.status !== 200) return;
      try {
        var r = JSON.parse(xhr.responseText);
        var org = r.org || '';
        var country = r.country || '';
        var visitorType = isB2B(org, country) ? 'b2b' : 'b2c';
        saveToCache(visitorType, country);
        pushToGA4(visitorType, country);
      } catch (e) {}
    };
    xhr.ontimeout = function () {};
    xhr.onerror = function () {};
    xhr.send();
  }

  if (document.readyState === 'complete') { run(); }
  else { window.addEventListener('load', run); }
})();
