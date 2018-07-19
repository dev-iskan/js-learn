window.onload = function(e) {

   /* function addEvent(target, type, handler) {
        if (target.addEventListener) {
            target.addEventListener(type, handler, false)
        } else {
            target.attachEvent("on" + type, function(e) {
                return handler.call(target, e);
            });
        }
    }

    function handler(e) {

        e = e || window.event;
        // console.log(e.clientX);
        // console.log(e);
        this.style.backgroundColor = "green";

    }

    function handler2(e) {

        e = e || window.event;
        this.style.backgroundColor = "red";

    }*/
    // addEvent(document.getElementById('one'),'click', handler);
    // addEvent(document.getElementById('one'),'dblclick', handler);
    // addEvent(document.getElementById('one'),'mousemove', handler);
    // addEvent(document.getElementById('one'),'mouseup', handler);
    // addEvent(document.getElementById('one'),'mousedown', handler2);

    // addEvent(document.getElementById('one'),'mouseover', handler);
    // addEvent(document.getElementById('one'),'mouseout', handler2);

    // addEvent(document.getElementById('one'), 'mouseenter', handler);
    // addEvent(document.getElementById('one'), 'mouseleave', handler2);

    function getScroll(w) {
        w = w || window;

        if (w.pageXOffset != null) {
            return { x: w.pageXOffset, y: w.pageYOffset }
        }
    }

    function moveObj(el, event) {
        var scroll = getScroll();

        var startX = event.clientX + scroll.x;
        var startY = event.clientY + scroll.y;

        var elX = el.offsetLeft;
        var elY = el.offsetTop;

        var deltaX = startX - elX;
        var deltaY = startY - elY;

        if (document.addEventListener) {
            document.addEventListener('mousemove', moveHandler, true);
            document.addEventListener('mouseup', upHandler, true);
        }

        if (event.stopPropagation) {
            event.stopPropagation();
        }
        if (event.preventDefault) {
            event.preventDefault();
        }

        function moveHandler(e) {
            var scroll = getScroll();
            el.style.left = (e.clientX + scroll.x - deltaX) + 'px';
            el.style.top = (e.clientY + scroll.x - deltaY) + 'px';

            if (e.stopPropagation) {
                e.stopPropagation();
            }
        }

        function upHandler(e) {
            if (document.removeEventListener) {
                document.removeEventListener("mouseup", upHandler, true);
                document.removeEventListener("mousemove", moveHandler, true);
            }

            if (e.stopPropagation) {
                e.stopPropagation();
            }
        }

    }


}