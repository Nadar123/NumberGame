
/*
   var remember = 0;
    console.log('choose a natural number');
    prompt('tell me when you are done');
    console.log('plz multiply the number you choose by three');
    prompt('press enter when you are done');
    var result = prompt('Is the result is an even number ?');
    if (result != 'y'){
        console.log('Pls add one to your number'); 
        prompt('press enter when you are done');
        remember = 1;

    }
    console.log('Plz divide your number by two');
    prompt('press enter when you are done');

    console.log('plz multiply the result by three');
    prompt('press enter when you are done');
    var result = prompt('Is the result is an even number ?');
    if (result != 'y'){
        console.log('Pls add one to your number'); 
        prompt('press enter when you are done');
        remember += 2;

    }
    console.log('Plz divide your number by two');
    prompt('press enter when you are done');
    var numberOfNine = prompt('How many times the number nine is in the number you have got ?');
    var x = numberOfNine * 4 + remember;

    console.log('The Original number you have choosing is ' + x );

*/

		function asking (letters, onDone){
			var words = document.querySelector('.words');
			words.innerHTML ='';
			var audio = new Audio('sound/click.mp3');
			audio.play()
			var i = 0;
			function writeLetter (){
				words.innerHTML += letters.charAt(i);
				i++;
				
				if(i < letters.length){
					window.setTimeout(writeLetter, 100);
				}
				else{
					audio.pause();
					audio.currentTime = 0;
					if(onDone)
						onDone();
				}
			
			
			}
		
			writeLetter();
			
		}
		var lastButton = document.querySelector('#lastButton');
		var selectBox = document.querySelector('#numOfNine');
		selectBox.addEventListener('change', function(event){
			
			if(event.target.value !== ""){
				lastButton.style.visibility = 'visible';
				lastButton.addEventListener('click', function(){
					lastButton.style.visibility = 'hidden';		
					moveToState(states[10]);
					
				});
			}else{
				lastButton.style.visibility = 'hidden';		
			}
			
			
		});
		
var btnDiv = document.querySelector('.btnDiv');
var remember = 0;

function ask(){
	var state=this;
    asking(this.s, function(){
		
		
		for(var i = 0; i < state.options.length; i++){
			if(state.options[i].drawExtraButtons){
				drawExtraButtons();
			}
			else{
				
			
				var btn=document.createElement('button');
				btn.innerHTML=state.options[i].input;

				btn.classList.add('btn');
				btn.classList.add('btn-outline-dark');
				btn.option=state.options[i];

				btn.addEventListener('click', function(event){
					moveToState(event.target.option.state);
				});
				btnDiv.appendChild(btn);
			}
		}
	});
	
}
	function moveToState(state){
		btnDiv.innerHTML='';
		currentState = state;
		if(currentState.toDo)
			currentState.toDo();

		currentState.display();
	}

    var states = [
        {s:'Pls choose a natural number ',display: ask},
        {s:'plz multiply the number you choose by three',display: ask},
        {s:'Is the result is an even number ?', display: ask},
        {s:'Pls add one to your number', display: ask, toDo: function(){ remember+= 1; }},
        {s:'Plz divide your number by two', display: ask},
        {s:'plz multiply the result by three', display: ask},
        {s:'Is the result is an even number ?', display: ask},
        {s:'Pls add one to your number', display: ask, toDo: function(){ remember += 2; }},
        {s:'Plz divide your number by two', display: ask},
        {s:'How many times the number nine is in the number you have got ?', display: ask},
        {display: function(){ 
            var x = document.querySelector('#numOfNine').value * 4 + remember;
            asking('The Original number you have choosing is '+ x);
			btnDiv.innerHTML = '';
			document.querySelector('.custom-select').style.visibility = 'hidden'
        }}];

        function checkInput(input){
            return this.input === input;
			
        }

		function drawExtraButtons(){
			document.querySelector('#numOfNine').style.visibility = 'visible'
		}

        states[0].options = [{input:'done',state:states[1],inputchecker:checkInput}];
        states[1].options = [{input:'done',state:states[2],inputchecker:checkInput}];
        states[2].options = [{input:'yes', state:states[4],inputchecker:checkInput},{input:'no',state:states[3],inputchecker:checkInput}];
        states[3].options = [{input:'done', state:states[4],inputchecker:checkInput}];
        states[4].options = [{input:'done',state:states[5],inputchecker:checkInput}];
        states[5].options = [{input:'done',state:states[6],inputchecker:checkInput}];
        states[6].options = [{input:'yes', state:states[8],inputchecker:checkInput},{input:'no',state:states[7],inputchecker:checkInput}];
        states[7].options = [{input:'done',state:states[8],inputchecker:checkInput,}];
        states[8].options = [{input:'done',state:states[9],inputchecker:checkInput}];
        states[9].options = [{state:states[10],drawExtraButtons:drawExtraButtons}];

        var currentState = states[0];
		currentState.display();

//        	while (currentState!= null){
//            var input = currentState.display(input);
//            if(currentState.options != null){
//                currentState.options.forEach(function(element) {
//                    if(element.inputchecker(input)){
//                        currentState = element.state;
//                        if (currentState.toDo!=null)
//                            currentState.toDo();
//                    }
//                }, this);
//            } else
//                currentState = null;
//        }
            
