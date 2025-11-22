<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Carbon;

class CacheResponseMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        /** @var \Illuminate\Http\Response $response */
        $response = $next($request);

        // Only process JSON responses
        if (
            $response->isSuccessful() &&
            str_contains($response->headers->get('Content-Type', ''), 'application/json')
        ) {
            $data = $response->getOriginalContent();
            $lastUpdated = null;

            // If paginated
            if ($data instanceof AbstractPaginator) {
                $items = $data->items();
                $lastUpdated = collect($items)
                    ->map(fn($item) => $this->getUpdatedAt($item))
                    ->filter()
                    ->max();
            }
            // If single model
            elseif (is_object($data)) {
                $lastUpdated = $this->getUpdatedAt($data);
            }
            // If array/resource
            elseif (is_array($data) && isset($data['data'])) {
                $lastUpdated = collect($data['data'])
                    ->map(fn($item) => $this->getUpdatedAt($item))
                    ->filter()
                    ->max();
            }

            // Generate ETag
            $etag = md5($response->getContent());
            $response->headers->set('ETag', $etag);
            $response->headers->set('Cache-Control', 'public, max-age=3600');

            if ($lastUpdated) {
                // Ensure $lastUpdated is Carbon instance
                $lastUpdated = $lastUpdated instanceof Carbon ? $lastUpdated : Carbon::parse($lastUpdated);
                $response->headers->set(
                    'Last-Modified',
                    gmdate('D, d M Y H:i:s', $lastUpdated->timestamp) . ' GMT'
                );
            }

            // Check client cache
            $clientEtags = $request->getETags() ?: [];
            $ifModifiedSince = $request->header('If-Modified-Since');

            if (
                in_array($etag, $clientEtags) ||
                ($ifModifiedSince && $lastUpdated && strtotime($ifModifiedSince) >= $lastUpdated->timestamp)
            ) {
                return response()->noContent(304)->withHeaders($response->headers->all());
            }
        }

        return $response;
    }

    /**
     * Safely get updated_at from object or array
     */
    private function getUpdatedAt($item)
    {
        if (is_array($item) && isset($item['updated_at'])) {
            return $item['updated_at'];
        } elseif (is_object($item) && isset($item->updated_at)) {
            return $item->updated_at;
        }

        return null;
    }
}
