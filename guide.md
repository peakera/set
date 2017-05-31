# Scalar Exhibition Template Guide

The _Scalar Exhibition Template_ comes with two brand new page layouts for Scalar: the **scrolling path**, and the **people** layout. To see a live version of the template, visit our [test site](http://digitalscholarship.brynmawr.edu/scalar/scalar-exhibition-template/index). To see the template in action, check out [_The Tale of Genji_](http://digitalscholarship.brynmawr.edu/scalar/tale-of-genji/index).

The _Scalar Exhibition Template_ requires Scalar version 2.1.1 or higher. If you are running an earlier version, you will need to first [update](https://github.com/anvc/scalar/blob/master/UPDATE.txt). 

We hope to eventually release these two additional layouts through the free USC Scalar site, but for those eager to try it out, here's how you can start using the Scalar Exhibition Template immediately. 

This guide presupposes some basic familiarity with [Scalar](http://scalar.usc.edu/). If you're new to Scalar, you can learn more about the scholarly digital publishing platform [here](http://scalar.usc.edu/scalar/). Links within the guide below take you to further instructions from Scalar's [user's guide](http://scalar.usc.edu/works/guide2/index).



## Installing on your existing self-hosted Scalar instance
1. Download this repo.
1. Open system/application/config/config.php and change ```php $config['enable_hooks'] = FALSE; ``` to ```php $config['enable_hooks'] = TRUE;```
1. Open system/applications/config/hooks.php and add the following between the comment blocks:

```php
$hook['post_controller_constructor'] = array(
  'class'    => '',
  'function' => 'add_layout_options',
  'filename' => 'layout_options.php',
  'filepath' => 'hooks',
  'params'   => array()
);
```

1. In system/application/hooks add the layout.js and layout.php files.
1. In your individual book directory, add scroll.css.
_Optional: You can upload the scroll.css file to the book directory using Scalar's upload local media files function._
1. In the Dashboard for your book, select the **Book Properties** tab, ensure you're on the correct book, and add the following in the "Custom JavaScript" field:

```javascript
$(document).ready(function(){
  function loadscripts(filename, filetype) {
    if(filetype=="css") {
      var fileref=document.createElement("link")
      fileref.setAttribute("rel", "stylesheet")
      fileref.setAttribute("type", "text/css")
      fileref.setAttribute("href", filename)
    };
    if (typeof fileref!="undefined")
      document.getElementsByTagName("head")[0].appendChild(fileref)
  };
  loadscripts("http://***URL TO***/scroll.css", "css");
});
```

### Creating a Scrolling Path
1. Navigate to the url of your new book.
1. Add new media files through any of Scalar's [methods of importing media](http://scalar.usc.edu/works/guide2/working-with-media?path=index).
1. Create several new pages and give each a [key image](http://scalar.usc.edu/works/guide2/styling-a-page), which will appear on the scrolling path.
1. Create a scrolling path page by [creating a new page](http://scalar.usc.edu/works/guide2/quickstart-creating-a-page?path=quickstarts) and selecting "Scrolling Path (custom layout)" under the **Layout** tab. Then add the pages that the path contains under the **Relationships** tab. Note: At this time, the *Scalar Exhibition Template* will only work with Scalar pages (not media).

### Creating a People Page
1. To display your own people on the scrolling path, upload individual media files for each person associated with the project. On the upload page, write their names in the title field and their short bios in the description field. 
1. Create a new page.
1. Add each person to the page as an [inline media file](http://scalar.usc.edu/works/guide2/quickstart-adding-inline-media-to-a-page?path=quickstarts). Leave all of the defaults (size: small, align: left) except **caption**, which you should change to "Title and Description."
1. Under the **Layout** tab, select "People (custom layout)." 
1. If you want your folks to appear on your scrolling path page, make sure the page has been included on your scrolling path page.


### Reuse
The _Scalar Exhibition Template_ is freely available for use and reuse under a [GNU General Public License](https://github.com/peakera/set/blob/master/LICENSE). 

#### Credits
The _Scalar Exhibition Template_ was generously funded by [The Association for Computers and the Humanities](http://ach.org/). The template was created by Alicia Peaker (Digital Scholarship Specialist, Bryn Mawr College) and designed by Nathanael Roesch (Ph.D. Candidate in History of Art & Architecture, Bryn Mawr College) in close consultation with Carrie Robbins (Curator, Bryn Mawr College). The project would not have been possible without the remote and in-person support of Craig Dietrich (Information Design Director, Scalar), with additional help provided by Curtis Fletcher (Project Manager, Scalar) Erik Loy (Creative Director, Scalar), and Tim Owens (Co-Founder, Reclaim Hosting).


