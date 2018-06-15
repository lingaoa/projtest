;
(function() {
    function Scale() {
        this.wrap = document.querySelector('.shoppic');
        this.spic = document.querySelector('#spic');
        this.bpic = document.querySelector('#bpic');
        this.sf = document.querySelector('#sf');
        this.bf = document.querySelector('#bf');
        this.listul = document.querySelector('#ulist ul');
        this.listli = document.querySelectorAll('#ulist li');
    }
    Scale.prototype.init = function() {
        var that = this;
        this.spic.onmouseover = function() {
            that.mouseover();
            document.onmousemove = function(ev) {
                var ev = ev || window.event;
                that.mousemove(ev);
            }
        };

        document.onmouseout = function() {
            that.mouseout();
        };

        for (var i = 0; i < this.listli.length; i++) {
            this.listli[i].onclick = function() {
                that.tabswitch(this); //this:当前点击的li元素
            }
        }
        //给ul赋值宽度


        //给箭头添加事件

    }

    Scale.prototype.mouseover = function() {
        this.sf.style.visibility = 'visible';
        this.bf.style.visibility = 'visible';
        this.sf.style.width = this.spic.offsetWidth * this.bf.offsetWidth / this.bpic.offsetWidth + 'px';
        this.sf.style.height = this.spic.offsetHeight * this.bf.offsetHeight / this.bpic.offsetHeight + 'px';
        this.scale = this.bf.offsetWidth / this.sf.offsetWidth; //求比例
    };

    Scale.prototype.mouseout = function() {
        this.sf.style.visibility = 'hidden';
        this.bf.style.visibility = 'hidden';
    };
    Scale.prototype.mousemove = function(ev) {
    	var s=document.documentElement.scrollTop || document.body.scrollTop;
        var l = ev.clientX - this.wrap.offsetLeft - this.sf.offsetWidth / 2;
        var t = ev.clientY - this.wrap.offsetTop - this.sf.offsetHeight / 2+s;
        if (l <= 0) {
            l = 0;
        } else if (l >= this.spic.offsetWidth - this.sf.offsetWidth) {
            l = this.spic.offsetWidth - this.sf.offsetWidth - 2;
        }

        if (t <= 0) {
            t = 0;
        } else if (t >= this.spic.offsetHeight - this.sf.offsetHeight) {
            t = this.spic.offsetHeight - this.sf.offsetHeight - 2;
        }
        this.sf.style.left = l + 'px';
        this.sf.style.top = t + 'px';
        this.bpic.style.left = -this.scale * l + 'px';
        this.bpic.style.top = -this.scale * t + 'px';
    };
    //点击li切换图片
    Scale.prototype.tabswitch = function(_this) {
        var pic = _this.getElementsByTagName('img')[0].src; //当前点击的li下面的图片
        this.spic.getElementsByTagName('img')[0].src = pic;
        this.bpic.src = pic;
    }
    new Scale().init();

})();