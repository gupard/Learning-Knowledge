/*
*基于Object的实例创建自定义对象，并为它添加属性和方法：
*/
var person=new Object();
person.name="Nicholas";
person.age=29;
person.job="Software Engineer";
person.sayName=function(){
    console.log(this.name)
}

/* 使用对象字面量创建对象，
*/
var person={
    name:"Nicholas",
    age:29,
    job:"Software Engineer",
    sayName:function(){
        console.log(this.name)
    }
}

/* ECMAScript中有两种属性：数据属性和访问器属性
数据属性：[[Configurable]],[[Enumberable]],[[Writable]],[[Value]]
如要修改数据属性的默认属性，则必须要用Object.defineProperty()方法，方法接受三个参数，'属性所在的对象','属性的名字','一个描述符对象(configurable,enumerable,writable,value)'
 */
//////////////////////////数据属性
var person={};
Object.defineProperty(person,"name",{
    writable:false,
    value:'Nicholas'
})
console.log(person.name);//'Nicholas'
person.name='Greg';
console.log(person.name);//'Nicholas'

//适用于不可配置属性，如
var person={}
Object.defineProperty(person,'name',{
    configurable:false,
    value:'Nicholas'
})
console.log(person.name); //'Nicholas'
delete person.name;
console.log(person.name); //'Nicholas'

//注意如果把属性的configurable配置为false,则不能再把它变为true,调用Object.defineProperty(),修改除writable之外的属性，都会导致错误
var person={}
Object.defineProperty(person,'name',{
    configurable:true,//错误所在。。。
    value:'Nicholas'
})
console.log(person.name); //'Nicholas'
delete person.name;
console.log(person.name); //'Nicholas'

//在调用Object.defineProperty()方法创建一个新的属性时，configurable,enumerable,writable的默认值都是false


//////////////////////访问器属性
/* 访问器属性也有4个特性:[[configurable]],[[enumerable]],[[Get]],[[Set]]
访问器属性也必须使用Object.defineProperty()来定义，常用在改变一个属性的同时，另一个属性的值也发生变化 */
var book={
    _year:2004,
    edition:1
}
Object.defineProperty(book,'year',{
    get:function(){
        return this._year;
    },
    set:function(newValue){
        if(newValue>2004){
            this._year=newValue;
            this.edition+=newValue-2004;
        }
    }
})
book.year=2006;
console.log(book.year)
console.log(book._year+":"+book.edition)

//可以通过Object.defineProperties()为对象一次创建多个属性，接受两个对象参数，第一个参数是属性所对应的对象，第二个参数是所有属性
//通过Object.getOwnPropertyDescriptor()方法获取对象的给定属性的描述符
var book={}
Object.defineProperties(book,{
    _year:{
        writable:true,
        value:2007
    },
    edition:{
        writable:true,
        value:2
    },
    year:{
        get:function(){
            return this._year
        },
        set:function(newValue){
            if(newValue>2007){
                this._year=newValue;
                this.edition+=this._year-2007;
            }
        }
    }
})
book.year=3998;
console.log(book._year+":"+book.year+":"+book.edition)
var desc=Object.getOwnPropertyDescriptor(book,'_year')
console.log(desc.value)
console.log(desc.configurable)
console.log(typeof desc.get)

var desc=Object.getOwnPropertyDescriptor(book,'year')
console.log(desc.value)
console.log(desc.enumerable)
console.log(typeof desc.get)