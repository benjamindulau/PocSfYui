<?php

namespace Acme\PocBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController as Controller;

class IndexController extends Controller
{
    public function indexAction()
    {
        $view = $this->view(array(), 200)
            ->setTemplate('AcmePocBundle:Index:index.html.twig')
        ;

        return $this->handleView($view);
    }

    public function profileAction()
    {
        $view = $this->view(array(), 200)
            ->setTemplate('AcmePocBundle:Index:profile.html.twig')
        ;

        return $this->handleView($view);
    }
}
