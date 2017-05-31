$(window).on('load', function() { // Layout options are added via JS so wait until previous JS has finished running

	// Add options to the edit page's Layout pulldown
    var view = $('link#view').attr('href');
    if ('edit' == view) {
        var default_view = $('link#default_view').attr('href');
        var $optgroup = $('optgroup[label="General"]');
        $optgroup.append('<option value="scrolling_path">Scrolling Path (custom layout)</option>');
        $optgroup.append('<option value="people">People (custom layout)</option>');
        if ('scrolling_path' == default_view) $optgroup.find('option[value="scrolling_path"]').prop('selected', 'selected');
        if ('people' == default_view) $optgroup.find('option[value="people"]').prop('selected', 'selected');
    };

});

$(document).ready(function() { 


    $('body').on('pageLoadComplete', function() {
 
        var view = $('link#view').attr('href');
        var default_view = $('link#default_view').attr('href');

        //Ignore on import and upload pages.
        if ('import' == view || 'upload' == view || 'edit' == view) return;

        //If layout is set to 'people,' display media elements inline instead of in left or right slots
        var peopleLayout = function() {   	
            if ('people' != default_view || 'edit' == view) return;
            // Doing it this way because the mediaelements might not have drawn before this is run
            var str = '.body_copy {clear:none !important; max-width:none !important;}'+"\n";
            str += '.mediaelement {margin-right:30px;}'+"\n";
            str += '.mediaObject img {max-height: 200px; object-fit: cover;}'+"\n";
            str += '.paragraph_wrapper {clear:none !important;}'+"\n";
            str += '.slot {margin-right:20px; max-width:none !important; margin-right:40px;}'+"\n";
            var style = $('<style>'+str+'</style>').appendTo('head');
        };
        peopleLayout();
        
        //Appends custom style to head that displays the media elements from a people page
        var str = '.sp-block-people .body_copy {clear:none !important; max-width:none !important;}'+"\n";
        str += '.sp-block-people .mediaelement {margin-right:30px;}'+"\n";
        str += '.sp-block-people .mediaObject img {max-height: 200px; object-fit: cover;}'+"\n";
        str += '.sp-block-people .paragraph_wrapper {clear:none !important;}'+"\n";
        str += '.sp-block-people .slot {margin-right:20px; max-width:none !important; margin-right:40px;}'+"\n";
        var style = $('<style>'+str+'</style>').appendTo('head');

        //Creates scrolling layout
        var scrollingPath = function() {
        	var parent = $('link#parent').attr('href');
        	var sppage = scalarapi.model.getCurrentPageNode();
        	var spslug = sppage.slug

            //Ignore on edit page
            if ('scrolling_path' != default_view || 'edit' == view) return;

            var handleSuccess = function() {
                //Adds an extra class to the container article for custom styling
                $('article').addClass('scrolling_path');  
                //Makes text on page full width
                $('.body_copy').css('max-width', '100%');          
                
                //Displays contents of path page to match rest of scrolling layout
                $("[property='sioc:content']").prepend('<div id="splash"></div>'); 
                var basepage = scalarapi.getNode(spslug);
                //Need to fix so that it is pulling the keyimage after the page updates, not from the original template!
                var basepage_key = (basepage.data['http://scalar.usc.edu/2012/01/scalar-ns#banner']) ? basepage.data['http://scalar.usc.edu/2012/01/scalar-ns#banner'][0].value : '';
                $("#splash").css({
                    "background-image": "url("+parent+basepage_key+")"
                });

                //Find out how long the path is and collect the slugs for each item on the path
                var index = scalarapi.getNode(spslug);
                var pathContents = index.getRelatedNodes("path", "outgoing", "false");
                var loadHTML = function(pathContents) {
                    //Don't do anything if there's no path contents
                    if (!pathContents.length) return;
                    //Retrieve the title and content for each item
                    for (var i = 0; i < pathContents.length; i++) {
                        var title = pathContents[i].current.title;
                        var slug = pathContents[i].slug;
                        var key = (pathContents[i].data['http://scalar.usc.edu/2012/01/scalar-ns#banner']) ? pathContents[i].data['http://scalar.usc.edu/2012/01/scalar-ns#banner'][0].value : '';
                        if (-1==key.indexOf('://')) key = parent+key;
                        var content = (pathContents[i].current.content) ? pathContents[i].current.content : '';
                        var $content = $('<div>'+content+'</div>');
                        
                        // If there is more than one paragraph (<br /><br />) only show the first paragraph
                        if ($content.find('br').length) {
                        	if ($content.find('br:first').next().is('br')) {
                        		content = content.substr(0, content.indexOf('<br'));
                        	}
                        };
                        var default_view = pathContents[i].current.defaultView;
						var media_urls = [];

						if ('people'==default_view) {

							$('<div>'+content+'</div>').find('a').each(function() {
								media_urls.push( $(this).attr('href') );
							});
						};
                        $("[property='sioc:content']").append('<div class="sp-block sp-block-'+default_view+'" id="'+slug+'"><h1><a class="sp-title" href="'+parent+slug+'">' + title + '</a></h1><div class="sp-block__content ' +slug+ '">' +((content.length)?content:'')+ '</div></div>');
                        //Guarentees that all mediaelements will draw regardless of race conditions
                        if ('people' == default_view) {
	                        $('.sp-block').find('a').each(function() {
	                        	try {
	                        		page.addMediaElementsForElement($('#'+slug));
	                        	} catch(e) {}
	                        });


	                        
	                        var str = '.body_copy {clear:none !important; max-width:none !important;}'+"\n";
	                        str += '.mediaelement {margin-right:30px; height:420px;}'+"\n";
	                        str += '.paragraph_wrapper {clear:none !important;}'+"\n";
	                        str += '.slot {margin-right:20px; max-width:none !important; margin-right:40px;}'+"\n";
                        };
                        var set_background = function() {
                        	if('people' == default_view) {
                                $("#"+slug).css({  
                            		"background-color": "#e6e7e8",
                            		"min-height": "550px"
                            	});
                            	$("."+slug).css("min-height", "550px");
                            };


                            if('people' != default_view) {
                            	$("#"+slug).css({
                        		"background-image": 'url("'+((key.length)?key:'')+'")',
                        		"background-size": "cover",
                        		"min-height": "550px"
                        	}).append("<form action='"+parent+slug+"'><button type='submit' class='sp-button'>Explore</button></form>");
                    	    //Adds white background for block text only if there's content on the embedded page
		                        if(content != "") {
		                        	$("."+slug).css("background-color", "#fff");
		                        };
                            }

                        	
                        };
                        set_background();
                        //Allow each area to know how tall it its content is
                        $("#"+slug).append('<div style="visibility:hidden; clear:both; height:1px; overflow:hidden;"></div>');
                    };         
                };	
                loadHTML(pathContents);	
            };

            var handleFailure = function() {
               console.log("This page could not be loaded.");
            };
            
            //Pull in content from any page on this page's path
            scalarapi.setBook(parent.substr(0, parent.length-1));
            scalarapi.loadNode(spslug, true, handleSuccess, handleFailure, 1);
            
        };  //!scrollingPath
        scrollingPath();
            
    });

});