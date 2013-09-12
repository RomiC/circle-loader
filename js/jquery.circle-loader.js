(function($) {
    var settings = {
        stroke: "#F00",
        strokeWidth: "20%",
        duration: 7000,
        angleStep: 2
    };

    function createSVGElement(tag, params) {
        var ns = "http://www.w3.org/2000/svg";
        var elem =  document.createElementNS(ns, tag);

        for (i in params) {
            elem.setAttribute(i, params[i]);
        }

        return elem;
    };
    
    /**
     * Загрузчик
     * @param {DOMElement} cont Контейнер загрузчика
     */
    function CircleLoader(cont, s) {
        var self = this;
        var canvasSize = Math.min($(cont).width(), $(cont).height());
        var settings = s;
        if (typeof settings.strokeWidth === "string") {
            if (settings.strokeWidth.search(/\%$/ig) !== -1) {
                settings.strokeWidth = Math.round(parseInt(settings.strokeWidth) / 100 * canvasSize);
            } else {
                settings.strokeWidth = parseInt(settings.strokeWidth);
            }
        }

        var start = {
            x: canvasSize / 2,
            y: settings.strokeWidth / 2
        };
        var angle = 1;
        var radius = Math.round((canvasSize - settings.strokeWidth) / 2);
        
        var arc = createSVGElement("path", {
            fill: "none",
            stroke: settings.stroke,
            "stroke-width": settings.strokeWidth
        });
        var timer = 0;
        var timerDelay = Math.round(5 / 360 * settings.duration);
        
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
        this.Start = function() {
            timer = setInterval(Animate, timerDelay);
        };
        this.Stop = function() {
            clearInterval(timer);
            arc.removeAttribute("d");
            angle = 1;
        };
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
        Animate();
    };
    
    $.fn.circleLoader = function(s) {
        $.extend(settings, s);

        return this.map(function() {
            return new CircleLoader(this, settings);
        });
    };
})(jQuery);