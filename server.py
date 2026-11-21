import http.server
import socketserver
import urllib.parse
import os
import mimetypes

PORT = 3000
DIRECTORY = "public"

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Handle /_next/image?url=...
        if self.path.startswith('/_next/image'):
            parsed = urllib.parse.urlparse(self.path)
            query = urllib.parse.parse_qs(parsed.query)
            if 'url' in query:
                img_url = query['url'][0]
                clean_path = urllib.parse.unquote(img_url).lstrip('/')
                local_path = os.path.join(DIRECTORY, clean_path)
                if os.path.exists(local_path):
                    self.send_response(200)
                    mime_type, _ = mimetypes.guess_type(local_path)
                    if not mime_type:
                        if local_path.endswith('.webp'):
                            mime_type = 'image/webp'
                        elif local_path.endswith('.svg'):
                            mime_type = 'image/svg+xml'
                        else:
                            mime_type = 'application/octet-stream'
                    self.send_header('Content-Type', mime_type)
                    self.send_header('Content-Length', str(os.path.getsize(local_path)))
                    self.send_header('Cache-Control', 'public, max-age=31536000')
                    self.end_headers()
                    with open(local_path, 'rb') as f:
                        self.wfile.write(f.read())
                    return
        
        # Default behavior
        super().do_GET()

    def guess_type(self, path):
        # Ensure woff2 and js and css have correct mime types
        if path.endswith('.woff2'):
            return 'font/woff2'
        if path.endswith('.js'):
            return 'application/javascript'
        if path.endswith('.css'):
            return 'text/css'
        if path.endswith('.svg'):
            return 'image/svg+xml'
        if path.endswith('.webp'):
            return 'image/webp'
        return super().guess_type(path)

# Allow port reuse
socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()
