//Learning file where I show some basic JS knowledge as well as use of an arrow function

console.log("hello world");
var nums = [1,2,3,4,5];

function reverse(list){
    var newList = [];
    for(let i=list.length-1; i>=0; i--){
        newList.push(list[i]);
    }

    return newList;
}

var reversedNums = reverse(nums);
reversedNums.forEach(num => console.log(num));


