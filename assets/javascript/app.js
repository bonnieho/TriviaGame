//This ia a UT-Austin Coding Bootcamp class project game created in Javascript
// Author: Bonnie L. Hoffman - bonnieho@rice.edu

// This game is a simple trivia-based game implementing a timer to count down time remaining to answer multiple-choice trivia questions.


// NOTES

	
    // create a trivia form with multiple choice or true/false options (your choice).

    // show only one question until the player answers it or their time runs out. 

        // If the player selects the correct answer, show a screen congratulating them for choosing the right option. 

        // After a few seconds, display the next question -- do this without user input.

    //The scenario is similar for wrong answers and time-outs.

       // If the player runs out of time, tell the player that time's up and display the correct answer. 

       // Wait a few seconds, then show the next question.
       
       // If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. 

       // Wait a few seconds, then show the next question.


    // The player will have a limited amount of time to finish the quiz.

    // The game ends when the time runs out. 

    // On the final screen, show the number of 
    		// correct answers
    		// incorrect answers
    		// an option to restart the game (without reloading the page).

    // Don't let the player pick more than one answer per question.


    // include a countdown timer.




// ==========================  STARTING the good stuff...    ================================



// all contained within document ready function to allow all scripts to run ONLY after the document is loaded completely

$(document).ready(function(){


	// =============================================================
	// SECTION - global variables

	var quizContainer = document.getElementById('quiz');
	var resultsContainer = document.getElementById('results');
	var submitButton = document.getElementById('submit');
	
	//  +++++++++   setting up the questions - I would like to experiment with pulling these from nodes in an xml file  ++++++++++++++

	var myQuestions = [
		{
			question: "The capital of Portugal is",
			answers: {
				a: 'Porto',
				b: 'Lisbon',
				c: 'Entebbe'
			},
			correctAnswer: 'b'
		},
		{
			question: "How many square feet are in one acre?",
			answers: {
				a: '26.1',
				b: '5,280',
				c: '43,560'
			},
			correctAnswer: 'c'
		}
	];



	// =============================================================
	// SECTION - functions
		

	//  +++++++++   Simple countdown timer for individual questions ++++++++++++++


	setTimeout(timeUp, 1000 * 10);


	//  after 10 seconds, execute the timeUp function

	function timeUp() {

  		// in the element with an id of time-left add an h2 saying Time's Up!
  		// console log done
		console.log("done");
		$("#time-left").append("<h2>Time's Up!</h2>");
		console.log("time is up");
	}



	//  +++++++++   Generating the quiz  ++++++++++++++


	function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

		//  +++++++++   displaying questions with inline radio buttons  ++++++++++++++

		function showQuestions(questions, quizContainer){
			// we'll need a place to store the output and the answer choices
			var output = [];
			var answers;

			// for each question...
			for(var i=0; i<questions.length; i++){

				// first reset the list of answers
				answers = [];

				// for each available answer to this question...
					for(letter in questions[i].answers){

					// ...add an html radio button
						answers.push(
							'<label class="radio-inline">'+ '<input type="radio" name="question'+i+'" value="'+letter+'">'+ letter + ': '+ questions[i].answers[letter]+ '</label>'
						);
					}

				// add this question and its answers to the output
				output.push(
					'<div class="question">' + questions[i].question + '</div>'+ '<div class="answers">' + answers.join('') + '</div>'
				);
			//END iteration of answers array members	
			}

			// finally combine our output list into one string of html and put it on the page
			quizContainer.innerHTML = output.join('');
		}

			


		function showResults(questions, quizContainer, resultsContainer){
			// gather answer containers from our quiz
			var answerContainers = quizContainer.querySelectorAll('.answers');
			
			// keep track of user's answers
			var userAnswer = '';
			var numCorrect = 0;
			
			// for each question...
			for(var i=0; i<questions.length; i++){

				// find selected answer
				userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
				
				// if answer is CORRECT
				if(userAnswer===questions[i].correctAnswer){
					// add to the number of correct answers
					numCorrect++;
					
					// color the answers green
					answerContainers[i].style.color = 'lightgreen';
				}

				// if answer is WRONG (or BLANK in the case of input text)
				else{
					// color the answers red
					answerContainers[i].style.color = 'red';
				}
			}

			// show number of correct answers out of total
			resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
		}

		// show the questions
		showQuestions(questions, quizContainer);

		// when user clicks submit, show results
		submitButton.onclick = function(){
			showResults(questions, quizContainer, resultsContainer);
		}
		

	// END generateQuiz
	}


		


// =================================================================




		
	// =============================================================
	// SECTION - main processes

		// this initiates the game the first time - SAVE this so I can post instructions BEFORE the first question displays
		// launchGame();

		generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);






// END document.ready	

}); 



