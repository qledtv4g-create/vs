import type { IncomingMessage, ServerResponse } from 'node:http';
import { createApiApp } from '../server.ts';

const app = createApiApp();

export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.url) {
    const parsed = new URL(req.url, 'http://localhost');
    const rewrittenPath = parsed.searchParams.get('__vercel_path');
    if (rewrittenPath !== null) {
      parsed.searchParams.delete('__vercel_path');
      const qs = parsed.searchParams.toString();
      const normalized = `/api/${rewrittenPath.replace(/^\/+/, '')}`;
      req.url = qs ? `${normalized}?${qs}` : normalized;
    }
  }
  return app(req as never, res as never);
}
