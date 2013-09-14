(function($) {
	/**
	 * List of default settings
	 * @type {Object}
	 */
	var settings = {
		/**
		 * Loader color
		 * @type {String}
		 */
		stroke: "#F00",
		/**
		 * Loader width
		 * @type {String|Number}
		 */
		strokeWidth: "20%",
		/**
		 * One cycle duration (ms)
		 * @type {Number}
		 */
		duration: 7000,
		/**
		 * Start animation automatically on page load
		 * @type {Boolean}
		 */
		autostart: true,
		/**
		 * Angle of rotation per step (degrees)
		 * @type {Number}
		 */
		angleStep: 5
	};

	/**
	 * Additional function for creating element from svg-namesapce
	 * @param {String} tag Tag name
	 * @param {Object} params List of tag attribute
	 * @returns element
	 */
	function createSVGElement(tag, params) {
		var ns = "http://www.w3.org/2000/svg";
		var elem =  document.createElementNS(ns, tag);

		for (i in params) {
			elem.setAttribute(i, params[i]);
		}

		return elem;
	};
	
	/**
	 * Loader class
	 * @param {DOMElement} cont Loader container (parent DOM-element)
	 * @param {Object} s User settings
	 */
	function CircleLoader(cont, s) {
		/**
		 * Link to itself
		 * Needed for private methods
		 * @type {Object}
		 */
		var self = this;
		/**
		 * Canvas size
		 * @type {Number}
		 */
		var canvasSize = Math.min($(cont).width(), $(cont).height());
		/**
		 * Loader settings
		 * @ptype {Object}
		 */
		var settings = s;
		/* Calculating the percent value */
		if (typeof settings.strokeWidth === "string") {
			if (settings.strokeWidth.search(/\%$/ig) !== -1) {
				settings.strokeWidth = Math.round(parseInt(settings.strokeWidth) / 100 * canvasSize);
			} else {
				settings.strokeWidth = parseInt(settings.strokeWidth);
			}
		}
		/**
		 * Start position
		 * @type {Object}
		 */
		var start = {
			/**
			 * X-coordinate
			 * @type {Number}
			 */
			x: canvasSize / 2,
			/**
			 * Y-coordinate
			 * @type {Number}
			 */
			y: settings.strokeWidth / 2
		};
		/**
		 * Direct value of arc angle in degrees
		 * @type {Number}
		 */
		var angle = 1;
		/**
		 * Calculating loader radius
		 * @type {Number}
		 */
		var radius = Math.round((canvasSize - settings.strokeWidth) / 2);
		/**
		 * Arc svg-element
		 * @ptype {DOMElement}
		 */
		var arc = createSVGElement("path", {
			fill: "none",
			stroke: settings.stroke,
			"stroke-width": settings.strokeWidth
		});
		/**
		 * Animation timer
		 * @type {Number}
		 */
		var timer = 0;
		/**
		 * Delay between animation frames
		 * @type {Number}
		 */
		var timerDelay = Math.round(settings.angleStep / 360 * settings.duration);
		/**
		 * Animation in progress flag
		 * @type {Boolean}
		 */
		var isAnimated = false;

		/**
		 * Method for creating animation
		 */
		function Animate() {
			angle = (angle + settings.angleStep) % 360;
			var more180 = (angle > 180);
			var rad = ((more180 ? angle % 180 : angle) / 180 * Math.PI);
			var delta = {
				x: (more180 ? -1 : 1) * radius * Math.sin(rad),
				y: radius * (1 + (more180 ? 1 : -1) * Math.cos(rad))
			};
	
			arc.setAttribute("d", "M" + start.x + "," + start.y + "a" + radius + "," + radius + ",0," + (more180 ? 1 : 0) + ",1," + delta.x + "," + delta.y);
			
			if (timer === 0) {
				timer = setInterval(Animate, timerDelay);
			}
		};
		/**
		 * Start animation
		 */
		this.Start = function() {
			timer = setInterval(Animate, timerDelay);
		};
		/**
		 * Stop animation
		 */
		this.Stop = function() {
			clearInterval(timer);
			arc.setAttribute("d", "M" + start.x + "," + start.y);
			angle = 1;
		};
		/**
		 * Make a pause
		 */
		this.Pause = function() {
			clearInterval(timer);
		};

		cont.appendChild(createSVGElement("svg", {
			height: canvasSize,
			style: "overflow: hidden; position: relative;",
			version: "1.1",
			width: canvasSize,
			xmlns: "http://www.w3.org/2000/svg"
		}));		
		$("svg", cont)[0].appendChild(arc);
		if (settings.autostart === true) {
			Animate();
		}
	};
	
	$.fn.circleLoader = function(s) {
		$.extend(settings, s);

		return this.map(function() {
			return new CircleLoader(this, settings);
		});
	};
})(jQuery);
