POC With Symfony 2 and YUI3 Y.App Framework
===========================================

The purpose of this bundle is to provide a Proof Of Concept about a way to implement MVC on the client side by using
Y.App great framework from YUI.

The goal is to use progressive enhancement by mixing two approaches.

1 - Re-using "block" oriented structure provided by Twig engine (server side)

That means that we always construct HTML on the server side for the first request, then Y.App plugs on the result and take over.

When navigating between pages, Y.App receives an JSON version of the page elements, so called `fragments`, that need to be updated.
Y.App refreshes its views with these fragments.

To achieve this, we use the View component from the FOSRestBundle.
We've implemented a custom View handler which takes the Twig template, extracts blocks from it and constructs a JSON response with HTML fragments.

On the Y.App side, we used a custom IO class for loading content which receives these fragments and treats them.
It also checks if "templates" are given by the server and compiles them for later use.

2 - After the first page load, any feature accessible on the same page will be entirely handled by Y.App.


Example
-------

Take a regular page layout, with these elements:

 - Header
 - Sidebar
 - Main content
 - Footer

Y.App knows about this structure through well constructed `View` (fragments: header, footer, sidebar, main column) and `Composite View` (page) classes.

Now, say we load the `home` page for the first time:
When doing so, the page will entirely be rendered by the server. Y.App knows that and reconnect its views with each pre-rendered content element.

Now, say we navigate to the `photos` page:
This time the browser won't reload, the request will be performed by Y.App (through routing), which will receive a JSON version of the resulting html, something like the following:

```JSON
{
    "title": "MyAwesomeWebsite - Photos", // page <title>
    "fragments": {
        "sidebar": "<h2>Sidebar Menu<\/h2><!-- etc.... -->", // ..... maybe an updated menu for active page
        "main": "<h2>Photos<\/h2><div id=\"photo-list-container\"><ul id=\"photo-list\"><!-- photo items.... --></ul></div>",
    },
    "templates": {
        "photo_item_tpl": "<li data-id=\"{{index}}\"><img src=\"{{url}}\" alt=\"{{title}}\" \/><\/li>" // template used later by Y.App for adding new photos
    }
}
```

Y.App will update each page `fragment` by using this server response.
It will also detects that `templates` were sent to it by the server and will `compiles` them for later use.

Now, we hit the "Add photo" button on the photos page:
This will be handled the "normal" way client side, by using the full Model/View stack, and Y.App will update its views in real time.