;(function($) {
	$.fn.extend({

		"marquee": function(options) {

			/*
			 * 定义默认参数
			 */			
			options = $.extend({
				speed: 30, //定义字幕滚动的速度
				containerWidth: '500px' //定义marquee的宽度,默认为500px，此宽度一定要小于ulWidth*2的宽度，不然包含块已可以容纳所有滚动元素的，不再需要滚动.此宽度也不能大于ulWidth,不然scrollLeft还没大于或等于ulWidth时，就已经滚动到了尽头，卡在那里了
			}, options);

			/*
			 * 动态生成所需的DOM和定义css
			 */
			$(this).css({
				width: options.containerWidth,
				'overflow': 'hidden'
			}); 
			var liOuterWidth = $('li', this).outerWidth(true); 
			var ulWidth = liOuterWidth * $('li', this).length;
			$('ul', this).css({
				width: ulWidth,
				padding: 0,
				margin: 0,
				float: 'left'
			});		
			$('ul', this).clone().appendTo(this);	
			$('ul', this).wrapAll('<div style="width:' + ulWidth*2 + 'px">');

			/*
			 * 滚动效果生成代码
			 */
			var self = this;
			var myMar = setInterval(startMar, options.speed);
			this.mouseenter(function() {
				clearInterval(myMar);
			});
			this.mouseleave(function() {
				myMar = setInterval(startMar, options.speed);
			});			
			function startMar() {
				if( self.scrollLeft() >= ulWidth ) {
					self.scrollLeft(0);
				}else {
					self[0].scrollLeft++;
				}
			}			
		}
	});
})(jQuery);