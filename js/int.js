class Enlarges {
    // 书写我们的属性
    constructor(option) {
        // 获取元素
        this.ele = document.querySelector(option)
        this.show = this.ele.querySelector('.show')
        this.mask = this.ele.querySelector('.mask')
        this.list = this.ele.querySelector('.list')
        this.enlarge = this.ele.querySelector('.enlarge')
        this.picture = this.enlarge.firstElementChild
        // 获取尺寸
        // 获取show盒子的尺寸
        this.show_w = this.show.clientWidth
        this.show_h = this.show.clientHeight
        // console.log(this.show_w, this.show_h);
        // 获取mask盒子的尺寸
        this.mask_w = parseInt(window.getComputedStyle(this.mask).width)
        this.mask_h = parseInt(window.getComputedStyle(this.mask).height)
        // console.log(this.mask_w, this.mask_h);
        // 获取enlarge盒子中的图片的尺寸
        this.picture_w = parseInt(window.getComputedStyle(this.picture).width)
        this.picture_h = parseInt(window.getComputedStyle(this.picture).height)
        // console.log(this.picture_w, this.picture_h);

        // 方法调用
        this.setSize()
        this.overOut()
        this.clickChange()
        this.move()
    }


    // 书写我们的方法
    // 计算尺寸
    setSize() {
        console.log('计算尺寸');
        /* 
            计算公式
            mask 宽度                   x
        ---------------  =  ------------------------
            show 宽度           picture(图片) 宽度
        */
        // 计算尺寸
        let enlarge_w = this.mask_w * this.picture_w / this.show_w
        let enlarge_h = this.mask_h * this.picture_h / this.show_h
        // console.log(enlarge_w, enlarge_h);
        // 赋值给 enlarge 盒子
        this.enlarge.style.width = enlarge_w + 'px'
        this.enlarge.style.height = enlarge_h + 'px'
    }
    // 移入移出
    overOut() {
        console.log('移入移出');
        // 给show盒子绑定移入和移出事件
        this.show.addEventListener('mouseover', () => {
            this.mask.style.display = 'block'
            this.enlarge.style.display = 'block'
        })

        this.show.addEventListener('mouseout', () => {
            this.mask.style.display = 'none'
            this.enlarge.style.display = 'none'
        })


    }
    // 点击切换
    clickChange() {
        console.log('点击切换');
        // 给list添加点击事件
        this.list.addEventListener('click', e => {
            // 事件对象兼容
            e = e || window.event
            // 目标元素
            let target = e.target || e.srcElement

            for (let i = 0; i < this.list.children.length; i++) {
                // 删除类名
                this.list.children[i].classList.remove('active')
            }
            // 对应的添加上类名
            target.classList.add('active')

            // 切换图片
            // 获取图片的地址
            const showSrc = target.dataset.show
            const bgSrc = target.dataset.bg

            // 显示到对应的位置上
            this.show.firstElementChild.src = showSrc
            this.picture.src = bgSrc

        })

    }
    // 移动联动
    move() {
        console.log('移动联动');
        //给show盒子添加鼠标移动事件
        this.show.addEventListener('mousemove', e => {
            // 事件对象兼容
            e = e || window.event
            // 获取对应的坐标点 使用offset 一组 相对于自己元素的左上角的
            let x = e.offsetX - this.mask_w / 2
            let y = e.offsetY - this.mask_h / 2

            // 限定边界范围
            if (x < 0) x = 0
            if (y < 0) y = 0
            if (x >= this.show_w - this.mask_w) x = this.show_w - this.mask_w
            if (y >= this.show_h - this.mask_h) y = this.show_h - this.mask_h

            // 赋值给元素 mask
            this.mask.style.left = x + 'px'
            this.mask.style.top = y + 'px'

            // 让大图跟随移动
            /* 
                计算移动的比例

                  mask盒子移动的距离          mask盒子的宽度
                ----------------------  =  ---------------------
                   图片移动的距离 (x)         enlarge 盒子的宽度
            */
            const pictureLeft = x * this.mask_w * this.picture_w / this.show_w / this.mask_w
            const pictureTop = y * this.mask_h * this.picture_h / this.show_h / this.mask_h
            // console.log(pictureLeft);

            // 赋值给大图
            this.picture.style.left = -pictureLeft + 'px'
            this.picture.style.top = -pictureTop + 'px'

        })

    }
}
