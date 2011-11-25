/**
 * CoolTags by Sanjeev Shrestha 
 * Tag Element
 * @date 25 Nov 2011
 * @author Sanjeev Shrestha
 */
/**
 * @Usage
 * $(document).ready(function() {$("#tags").cooltags(options);});
 */

(function($) {

	// Attach this new method to jQuery
	$.fn
			.extend({

				cooltags : function(options) {

					var defaults = {
						container : 'tags_container',
						input : 'tag_input',
						autocompleteurl : 'autcomplete.json',
						elm : 'li',
						tagclass : 'cooltag',
						elmname : 'tags',
						autocomplete:false,
						fill : new Array()
					};

					var me = $(this);

					var options = $.extend(defaults, options);

					var tagmethods = {

						addToList : function(tag) {
							var o = options;

							currenttag = $('<' + o.elm + ' class="'
									+ o.tagclass + '">');

							currenttagtext = '<span>' + tag + '</span>';
							currenttagtext += '<input name="' + o.elmname
									+ '[]" value="' + tag
									+ '" type="hidden" />';
							currenttagtext += '<a href="javascript:void(1);" class="deletecooltag" title="Please click here to delete this tag."></a>';
							currenttag.append(currenttagtext);
							$('a.deletecooltag', currenttag).click(function(e) {
								$(this).parent().remove();

							});

							$('.' + o.container, me).append(currenttag);

						},
						clearInput : function() {
							$('.' + options.input, me).val('');

						}
					};

					// Fill the default value

					if (options.fill.length > 0) {
						$.each(options.fill, function(index, value) {

							tagmethods.addToList(value);
						});
					}

					
					if(options.autocomplete)
						{
							acoptions = {
								serviceUrl : options.autocompleteurl
							};

							ac = $('.' + options.input, me).autocomplete(acoptions);
						}

					return this.each(function() {

						var o = options;

						$('.' + o.input, me).keydown(
								function(event) {

									if (event.keyCode == 13) {

										tagmethods
												.addToList($('.' + o.input, me)
														.attr('value'));
										tagmethods.clearInput();

									}
								});

					});

				}
			});

})(jQuery);