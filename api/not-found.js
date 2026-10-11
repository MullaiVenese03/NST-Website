/**
 * Vercel Serverless Function to serve a genuine HTTP 404 response
 * for non-existent legacy or crawler paths (e.g. /cgi-bin/) instead
 * of falling through to the SPA index.html with HTTP 200 (Soft 404).
 */
export default function handler(req, res) {
  res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.status(404).end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 Not Found | NebulaSafeTech</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0b1120;
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 24px;
      text-align: center;
    }
    .box {
      max-width: 480px;
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 40px 24px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    }
    h1 { font-size: 4rem; margin: 0 0 8px; color: #38bdf8; font-weight: 800; }
    h2 { font-size: 1.5rem; margin: 0 0 16px; font-weight: 600; }
    p { color: #94a3b8; font-size: 1rem; line-height: 1.5; margin: 0 0 24px; }
    a {
      display: inline-block;
      background: #015aaa;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.2s;
    }
    a:hover { background: #014380; }
  </style>
</head>
<body>
  <div class="box">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The requested URL was not found on NebulaSafeTech. Please check the address or return to our homepage.</p>
    <a href="/">Return to Homepage</a>
  </div>
</body>
</html>`);
}
