<?php

namespace Acme\PocBundle\Model;

use Symfony\Component\Validator\Constraints as Assert;

class Photo
{
    private $title;
    private $url;

    public function __construct($title = '', $url = '')
    {
        $this->title = $title;
        $this->url = $url;
    }

    /**
     * @Assert\NotBlank()
     */
    public function getTitle()
    {
        return $this->title;
    }
    
    public function setTitle($title)
    {
        $this->title = $title;
        
        return $this;
    }

    /**
     * @Assert\NotBlank()
     * @Assert\Url()
     */
    public function getUrl()
    {
        return $this->url;
    }
    
    public function setUrl($url)
    {
        $this->url = $url;
        
        return $this;
    }
}