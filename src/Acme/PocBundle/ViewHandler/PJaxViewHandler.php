<?php

namespace Acme\PocBundle\ViewHandler;

use FOS\Rest\Util\Codes;
use FOS\RestBundle\View\View;
use FOS\RestBundle\View\ViewHandlerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PJaxViewHandler
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
            if (in_array($name, array('templates', 'javascripts', 'stylesheets'))) {
                continue;
            }

            if (false !== strpos($name, 'template_')) {
                if (!isset($response['templates'])) {
                    $response['templates'] = array();
                }

                $templateName = substr($name, -(strlen($name) - strlen('template_')));
                $response['templates'][$templateName] = trim($template->renderBlock($name, $view->getData(), $blocks));

                continue;
            }

            $response[$name] = trim($template->renderBlock($name, $view->getData(), $blocks));
        }

        $view->setHeader('content-type', 'application/json');

        return new Response(json_encode($response), Codes::HTTP_OK, $view->getHeaders());
    }
}