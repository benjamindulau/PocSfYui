<?php

namespace Acme\PocBundle\ViewHandler;

use FOS\Rest\Util\Codes;
use FOS\RestBundle\View\View;
use FOS\RestBundle\View\ViewHandlerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class JsonViewHandler
{
    protected $twig;

    public function __construct(\Twig_Environment $twig)
    {
        $this->twig = $twig;
    }

    public function createResponse(ViewHandlerInterface $handler, View $view, Request $request)
    {
        $template = $view->getTemplate();
        if (!$template instanceof \Twig_Template) {
            $template = $this->twig->loadTemplate($template);
        }

        $blocks = $template->getBlocks();
        $response = array();

        foreach($blocks as $name => $block) {
            $html = $template->renderBlock($name, $view->getData(), $blocks);
            $response[$name] = $html;
        }

        return new Response(json_encode($response), Codes::HTTP_OK, $view->getHeaders());
    }
}