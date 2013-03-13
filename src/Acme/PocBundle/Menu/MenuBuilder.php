<?php

namespace Acme\PocBundle\Menu;

use Knp\Menu\FactoryInterface;

use Symfony\Component\HttpFoundation\Request;

class MenuBuilder
{
    private $factory;

    /**
     * @param \Knp\Menu\FactoryInterface $factory
     */
    public function __construct(FactoryInterface $factory)
    {
        $this->factory = $factory;
    }

    public function createMainMenu(Request $request)
    {
        $menu = $this->factory->createItem('root');

        $menu->addChild('home', array(
            'route' => 'acme_poc_home',
            'label' => 'Home',
            'attributes' => array(
                'id' => 'menu-home'
            )
        ));

        $menu->addChild('profile', array(
            'route' => 'acme_poc_profile',
            'label' => 'Profile settings',
            'attributes' => array(
                'id' => 'menu-profile'
            )
        ));

        $menu->addChild('photos', array(
            'route' => 'acme_poc_photos',
            'label' => 'Photos',
            'attributes' => array(
                'id' => 'menu-photos'
            )
        ));

        return $menu;
    }
}