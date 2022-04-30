class list{
    constructor(){
        //调用其他方法，给属性赋值
        this.getData();
    }
    //获取数据
    async getData() {

        let { data, status } = await axios.get('http://localhost:8888/goods/list?current=1')
        // console.log(data, status);

        // 判断返回值数据，追加数据
        if(status==200){
            let html = '';
            data.list.forEach(goods => {
                console.log(goods);
                html +=`<li>
                <div class="i-pic limit">
                    <img src="${goods.img_big_logo}" />
                    <p class="title fl">${goods.title}</p>
                    <p class="price fl">
                        <b>¥</b>
                        <strong>${goods.current_price}</strong>
                    </p>
                    <p class="number fl">
                        销量<span>${goods.goods_number}</span>
                    </p>
                </div>
            </li>`;
            });
            this.$('.boxes').innerHTML = html;
        }
    }
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}

new list