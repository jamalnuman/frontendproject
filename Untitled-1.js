const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty') //this will place all the divs with the class of empty into a "NodeList" and not 
//an array 

//adding listeners to the class of 'fill'
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

//looping through the empties and calling the drag events. 

for(const empty of empties){ //remember empties is a NodeList and we can loop over it. the first parameter in the following code block
    //is an action and the second parameter is the function that will be called when the specific action is performed. 
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}





//drag functions

function dragStart(){
   this.className += ' hold' //using the 'className' property to add a class of 'hold' to 'fill'..remember function fires cause of the 
   //event listener on the 'fill' property
   setTimeout(() => this.className = 'invisible', 0); //without the 'set timeout' method, once you click on the picture to drag, it will 
   //disappear and this is due to the invisible class. important to note that syntax here will replace one class for another and not add 
   //on as seen on line 12. setTimeout() takes two parameters and the second parameter is the time delay that will determine when the 
   //first parameter is executed. 
}

function dragEnd(){
    this.className = 'fill' //this will allow the picture to go back to the square that it was taken from when released. without this method
    //the picture will disappear when released because of 'setTimeout(() => this.className = 'invisible', 0)'
    
}

function dragOver(e){
    e.preventDefault() //the drop function will not log, unless this is inserted. DONT KNOW WHY. 
}

function dragEnter(e){
    e.preventDefault();
    this.className += ' hovered' //this will provide the dashed background to the boxes once the picture enters the additional boxes

}

function dragLeave(){
    this.className = 'empty' //this will remove the class of 'hovered' (dashed background) and apply the empty class..Again, notice
    //the syntax, this is replacing and not appending the empty class.
}

function dragDrop(){
    this.className = 'empty'
    this.append(fill)//this method will take the class of 'fill' and append it to the box that holds the picture. 
}