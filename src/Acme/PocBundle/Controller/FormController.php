<?php

namespace Acme\PocBundle\Controller;

use Acme\PocBundle\Model\Photo;
use FOS\RestBundle\Controller\FOSRestController as Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;

class FormController extends Controller
{
    public function validateAction()
    {
        $request = $this->getRequest();
        $field = $request->query->get('field');
        $value = $request->query->get('value');
        
        $form = $this->getPhotoForm();
        
        $validator = $this->get('validator');
        
        if($form->has($field)) {
            if($form->get($field)->getConfig()->getMapped()) {
                $errors = $validator->validatePropertyValue($form->getConfig()->getDataClass(), $field, $value);
            }
            else {
                $constraints = $form->get($field)->getConfig()->getOption('constraints');
                $errors = $validator->validateValue($value, $constraints);
            }
            
            if(count($errors) === 0) {
                return new Response(json_encode(array(
                    'status' => 'success',
                    'message' => 'No error',
                )));
            }
            else {
                return new Response(json_encode(array(
                    'status' => 'error',
                    'message' => $errors[0]->getMessageTemplate(),
                )));
            }
        }
    }
    
    protected function getPhotoForm(Photo $photo = null)
    {
        if(null === $photo) {
            $photo = new Photo();
        }
        
        return $this->createFormBuilder($photo)
            ->add('title', 'text')
            ->add('url', 'text')
            ->add('email', 'text', array(
                'mapped' => false,
                'constraints' => array(
                    new Email(array('message' => 'Invalid email address')),
                    new Length(array('min' => 5)),
                )))
            ->getForm();
    }
    
    public function indexAction()
    {
        $photo = new Photo();
        $form = $this->getPhotoForm($photo);
        
        $request = $this->get('request');
        
        if ($request->getMethod() == 'POST') {
            $form->bind($request);

            if ($form->isValid()) {
                return $this->redirect($this->generateUrl('acme_poc_form'));
            }
        }
        
        return $this->render('AcmePocBundle:Form:index.html.twig', array( 'form' => $form->createView() ));

        $view = $this->view(array('form' => $form->createView()), 200)
            ->setTemplate('AcmePocBundle:Form:index.html.twig')
        ;

        return $this->handleView($view);
    }
    
    public function analyzeAction()
    {
        $view = $this->view(array(), 200)
            ->setTemplate('AcmePocBundle:Form:analyze.html.twig')
        ;

        return $this->handleView($view);
    }
}
