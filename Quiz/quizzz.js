

// we’ll need a way to build a quiz, show results, and put it all together. We can start by laying out our functions, 

function buildQuiz(questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            // for each available answer...
            for(letter in questions[i].answers){

                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ':'
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

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
            
            // ifs answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'green';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        // show number of correct answers out of total

        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
        

    }

    // show questions right away
    buildQuiz(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}

//select these HTML elements and store references to them in variables 
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');



var myQuestions = [

    {
        
        question: "1.What is part of a database that holds only one type of information?",
        answers:{   

        a:'Report',
        b:'field',
        c:'record',
        },
        correctAnswer: 'b'
    },
    {
        question: "2.Which of the following operating systems is produced by IBM?",
        answers:{
        a:'OS-2',
        b:'Windows',
        c:'DOS'
        },
        correctAnswer: 'a'
    },
    
    {
        question: ".MOV' extension refers usually to what kind of file?",
        answers:{
        a:'Image file',
        b:'Animation/movie file',
        c:'Audio file'
        },
        correctAnswer: 'b'
    },
    {
        question: "3.Who invented Java?",
        answers: {
            a: 'Charles Babbage',
            b: 'James A Gosling',
            c: 'Tim Burners Lee'
        },
        correctAnswer: 'b'
    },
    {
        question: "5.What is the extension of PDF?",
        answers: {
            a: 'Portable desktop format',
            b: 'Portable document format',
            c: 'Portable desktop file'
        },
        correctAnswer: 'b'
    }
];



generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

