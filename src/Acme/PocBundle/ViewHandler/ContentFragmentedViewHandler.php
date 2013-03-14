<?php

namespace Acme\PocBundle\ViewHandler;

use FOS\Rest\Util\Codes;
use FOS\RestBundle\View\View;
use FOS\RestBundle\View\ViewHandlerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ContentFragmentedViewHandler
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
        $response = array(
            'fragments' => array(),
            'templates' => array(),
        );

        $compileBlock = function($name, $data, $blocks) use ($template) {
            return trim($template->renderBlock($name, $data, $blocks));
        };

        foreach($blocks as $name => $block) {
//            TODO: ideally, exposed blocks should be configured by the developer, something like:
//            acme_yui_app:
//                exposed_blocks:
//                    root: ['title'],
//                    fragments: ['sidebar', 'main'],
//                    templates: ['templates']
//
//            With some default behaviour, (i.e 'title' and 'fragments' being mandatory)

            if (in_array($name, array('templates', 'javascripts', 'stylesheets'))) {
                continue;
            }

            if ('title' == $name) {
                $response['title'] = $compileBlock($name, $view->getData(), $blocks);

                continue;
            }

            if (false !== strpos($name, 'template_')) {
                $templateName = substr($name, -(strlen($name) - strlen('template_')));
                $response['templates'][$templateName] = $compileBlock($name, $view->getData(), $blocks);

                continue;
            }

            $response['fragments'][$name] = $compileBlock($name, $view->getData(), $blocks);
        }

        $view->setHeader('content-type', 'application/json');

        return new Response(json_encode($response), Codes::HTTP_OK, $view->getHeaders());
    }
}