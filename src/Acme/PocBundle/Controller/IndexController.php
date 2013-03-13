<?php

namespace Acme\PocBundle\Controller;

use Acme\PocBundle\Model\Photo;
use Doctrine\Common\Collections\ArrayCollection;
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

    public function photosAction()
    {
        $photos = new ArrayCollection();
        $photos->add(new Photo('My photo', 'http://farm1.cosplay-it.com/photos/3/90879_511d2797368e9_l.jpg'));
        $photos->add(new Photo('My photo', 'http://farm1.cosplay-it.com/photos/0/12527_4ce7bf6422d59_l.jpg'));
        $photos->add(new Photo('My photo', 'http://farm1.cosplay-it.com/photos/0/24551_4dbc82544608f_l.jpg'));
        $photos->add(new Photo('My photo', 'http://farm1.cosplay-it.com/photos/2/72404_4ffab3a39f2a4_l.jpg'));
        $photos->add(new Photo('My photo', 'http://farm1.cosplay-it.com/photos/0/8138_4c8fc1c388487_l.jpg'));
        $photos->add(new Photo('My photo', 'http://farm1.cosplay-it.com/photos/3/91519_5134bca6b7387_l.jpg'));
        $photos->add(new Photo('My photo', 'http://farm1.cosplay-it.com/photos/2/85073_50a0ed9e235a6_l.jpg'));
        $photos->add(new Photo('My photo', 'http://farm1.cosplay-it.com/photos/0/18973_4d6e3b06033a9_l.jpg'));
        $photos->add(new Photo('My photo', 'http://farm1.cosplay-it.com/photos/2/84254_5097dcacce590_l.jpg'));
        $photos->add(new Photo('My photo', 'http://farm1.cosplay-it.com/photos/0/9856_4cb5924930a1d_l.jpg'));
        $photos->add(new Photo('My photo', 'http://farm1.cosplay-it.com/photos/0/8071_4c8e80b16db97_l.jpg'));

        $view = $this->view(array('photos' => $photos), 200)
            ->setTemplate('AcmePocBundle:Index:photos.html.twig')
        ;

        return $this->handleView($view);
    }
}
