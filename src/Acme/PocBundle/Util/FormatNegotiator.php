<?php

namespace Acme\PocBundle\Util;

use FOS\Rest\Util\FormatNegotiator as BaseFormatNegotiator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\AcceptHeader;

class FormatNegotiator extends BaseFormatNegotiator
{
    /**
     * Detect the request format based on the priorities and the Accept header
     *
     * Note: Request "_format" parameter is considered the preferred Accept header
     *
     * @param   Request     $request          The request
     * @param   array       $priorities       Ordered array of formats (highest priority first)
     * @param   Boolean     $preferExtension  If to consider the extension last or first
     *
     * @return  void|string                 The format string
     */
    public function getBestFormat(Request $request, array $priorities, $preferExtension = false)
    {
        // BC - Maintain this while 2.0 and 2.1 dont reach their end of life
        // Note: Request::splitHttpAcceptHeader is deprecated since version 2.2, to be removed in 2.3.
        if (class_exists('Symfony\Component\HttpFoundation\AcceptHeader')) {
            $mimetypes = array();
            foreach (AcceptHeader::fromString($request->headers->get('Accept'))->all() as $item) {
                $mimetypes[$item->getValue()] = $item->getQuality();
            }
        } else {
            $mimetypes = $request->splitHttpAcceptHeader($request->headers->get('Accept'));
        }

        if ($request->headers->has('X-PJAX')) {
            $mimetypes = array('application/x-pjax' => 1);
        }

        $extension = $request->get('_format');
        if (null !== $extension && $request->getMimeType($extension)) {
            $mimetypes[$request->getMimeType($extension)] = $preferExtension
                ? reset($mimetypes)+1
                : end($mimetypes)-1;
            arsort($mimetypes);
        }

        if (empty($mimetypes)) {
            return null;
        }

        $catchAllEnabled = in_array('*/*', $priorities);
        return $this->getFormatByPriorities($request, $mimetypes, $priorities, $catchAllEnabled);
    }


}
