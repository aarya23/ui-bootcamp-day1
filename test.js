function Rectangle(length, width) {
	this.length = length;
	this.width = width;
}

Rectangle.prototype.getArea = function() {
	return "Area of rectangle is " + this.length*this.width;
};

function Square(length) {
	Rectangle.call(this,length, length);
//	this.length = length;
//	this.width = length;
}

Square.prototype = function message() {
	return "I am square";
};

Square.prototype = Rectangle.prototype;

// Square.prototype =  Object.create(Rectangle.prototype,  {

// });

var r = new Rectangle(3,4);
console.log(r.getArea());

var s = new Square(4);
console.log(s.getArea());
console.log(s.message());
