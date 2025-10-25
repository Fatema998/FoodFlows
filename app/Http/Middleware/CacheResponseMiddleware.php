<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Pagination\AbstractPaginator;

class CacheResponseMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        /** @var \Illuminate\Http\Response $response */
        $response = $next($request);

        // শুধু JSON response এর জন্য কাজ করবে
        if (
            $response->isSuccessful() &&
            str_contains($response->headers->get('Content-Type', ''), 'application/json')
        ) {
            $data = $response->getOriginalContent();
            $lastUpdated = null;

            // Pagination হলে
            if ($data instanceof AbstractPaginator) {
                $items = $data->items();
                $lastUpdated = collect($items)
                    ->filter(fn($item) => isset($item->updated_at))
                    ->max(fn($item) => $item->updated_at);
            }
            // Model হলে
            elseif (is_object($data) && isset($data->updated_at)) {
                $lastUpdated = $data->updated_at;
            }
            // Resource / array response হলে
            elseif (is_array($data) && isset($data['data'])) {
                $lastUpdated = collect($data['data'])
                    ->filter(fn($item) => isset($item['updated_at']))
                    ->max(fn($item) => $item['updated_at']);
            }

            // ETag generate
            $etag = md5($response->getContent());

            $response->headers->set('ETag', $etag);
            $response->headers->set('Cache-Control', 'public, max-age=3600');

            if ($lastUpdated) {
                $response->headers->set(
                    'Last-Modified',
                    gmdate('D, d M Y H:i:s', strtotime($lastUpdated)) . ' GMT'
                );
            }

            // Client cached হলে 304 Not Modified পাঠানো
            if (
                ($request->getETags() && in_array($etag, $request->getETags())) ||
                ($request->headers->has('If-Modified-Since')
                    && $lastUpdated
                    && strtotime($request->header('If-Modified-Since')) >= strtotime($lastUpdated))
            ) {
                return response()->noContent(304)->withHeaders($response->headers->all());
            }
        }

        return $response;
    }
}
