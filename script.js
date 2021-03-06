const ITEMS = [
    {
        question: "What title is credited as Mario's first appearance in a video game?",
        answer:[
            "Mario Brothers",
            "Super Mario Brothers",
            "Donkey Kong",
            "Wrecking Crew"
        ],
        correct: "Donkey Kong"
    },
    
    {
        question: "In the arcade title Donkey Kong, what was the name originally given to the character who would becomen known as Mario?",
        answer:[
            "Jumpman",
            "The plumber",
            "Al",
            "The carpenter"
        ],
        correct: "Jumpman"
    },

    {
        question: "Who played the two leads, Mario and Luigi, respectively in the 1993 feature film, Super Mario Bros?",
        answer:[
            "Robert Deniro and Joe Pesci",
            "Chris Farley and David Spade",
            "Bob Hoskins and John Leguizamo",
            "Marlon Brando and Kenneth Branagh"
        ],
        correct: "Bob Hoskins and John Leguizamo"
    },

    {
        question: "Which of the following is not a real Mario themed game?",
        answer:[
            "Mario Paint",
            "Hotel Mario",
            "Mario Superstar Baseball",
            "Mario's Super Karaoke"
        ],
        correct: "Mario's Super Karaoke"
    },

    {
        question: "How long was the longest gap between releases in the Super Mario line of games",
        answer:[
            "9 months",
            "4 years",
            "2 years",
            "6 years"
        ],
        correct: "6 years"
    },

    {
        question: "What role did Koji Kondo play in the creation of Super Mario Bros 1,2, and 3?",
        answer:[
            "Composer",
            "Director",
            "Lead programmer",
            "Art director"
        ],
        correct: "Composer"
    },

    {
        question: "What is the name of the game that was reskinned to create a US and PAL region release under the name Super Mario Brothers 2?",
        answer:[
            "Yume Kōjō: Doki Doki Panic",
            "Sansara Naga",
            "Moon Crystal",
            "Dezaemon"
        ],
        correct: "Yume Kōjō: Doki Doki Panic"
    },
    
    {
        question: "Before adopting the damsel-kidnapping-gorilla motif, what intellectual propery was Donkey Kong, the original Mario game, supposed to be based off of?",
        answer:[
            "James Bond",
            "Popeye",
            "Indiana Jones",
            "Dick Tracy"
        ],
        correct: "Popeye"
    },

    {
        question: "Where did the name Mario come from?",
        answer:[
            "Author of the Godfather novels, Mario Puzo",
            "A memorable aquaintance Shigeru Miyamoto made on a flight to the United States",
            "Nintendo of America's office landlord",
            "Formula one driver, Mario Andretti"
        ],
        correct: "Nintendo of America's office landlord"
    },

    {
        question: "How many seasons did the 1989 Super Mario Bros. Super Show television series run for?",
        answer:[
            "3 seasons",
            "4 seasons",
            "1 season",
            "2 seasons"
        ],
        correct: "1 season"
    },

    {
        question:"What inspired the localized names of the koopalings in Super Mario Bros. 3?",
        answer:[
            "The works of T.S. Elliot",
            "Characters from Victorian era plays",
            "Characters from the world war II prisoner of war film, The Great Escape",
            "Famous musicians"
        ],
        correct: "Famous musicians"
    },

    {
        question: "What is the best selling Mario game?",
        answer:[
            "Super Mario Odyssey",
            "Mario Kart Wii",
            "Super Mario Bros.",
            "Super Mario World"
        ],
        correct: "Super Mario Bros."
    }
];

let score = 0;
let questionIndex = 0;
const endQuiz = 12;
let questionNumber = 1;

function renderQuestion(){
    $("#mario-main").replaceWith('<img id="mario-main" src="img/mario-jump.png">');
    let question = ITEMS[questionIndex];
    $(".next-question").html(`<form>
    <h2>#${questionNumber} ${question.question}</h2>
        <div class="align">
            <input name="response" type="radio" value="${question.answer[0]}" required>
                <label for="1">${question.answer[0]}</label><br>
            <input name="response" type="radio" value="${question.answer[1]}">
                <label for="2">${question.answer[1]}</label><br>
            <input name="response" type="radio" value="${question.answer[2]}">
                <label for="3">${question.answer[2]}</label><br>
            <input name="response" type="radio" value="${question.answer[3]}">
                <label for="4">${question.answer[3]}</label><br>
        </div>
        <button type="submit" class="extra-top-margin complete">Submit</button>        
</form>`)
}

function renderFeedback(answer){    
    let question = ITEMS[questionIndex];
    let feedback;
    if(answer === question.correct){
        $("#mario-main").replaceWith('<img id="mario-main" src="img/mushroom.png" alt="mushroom">');
        feedback = "That's Right!";
        handleIncreaseScore();
        renderScore();
    }
    else{
        $("#mario-main").replaceWith('<img id="mario-main" src="img/poison.png" alt="poison mushroom">');
        renderScore();
        feedback = `No Way! The correct answer is: <p>${question.correct}</p>`;
    }
    $(".next-question").html(`<form>
    <h2>${feedback}</h2>
    <button class="continue">Continue</button>
    </form>`);
}

function handleStart(){
    $("#start-btn").click(function(event){
    renderQuestion();
    });
}

function handleSubmit(){
    $(".next-question").on("submit", "form", function(event){
        event.preventDefault();
        let submit = $(event.currentTarget);
        let answer = $("input[name='response']:checked").val();
        renderFeedback(answer);
    });
    
}

function handleResponse(){

}

function handleIncreaseScore(){
    score ++;
}

function handleContinue(){
    $(".next-question").on("click", ".continue", function(event){
        questionIndex ++;
        questionNumber ++;
        if(questionIndex < endQuiz){
            renderQuestion();
        }
        else{
            renderScorePage();
        }
    });
}

function renderScore(){
    $("#score-keeper").html(`<h3>Score: ${score}/${endQuiz}</h3>`)
}

function renderScorePage(){
    $("#mario-main").replaceWith('<img id="mario-main" src="img/star.png" alt="star">')
    let scoreResponse;
    if(score === 12){
        scoreResponse = "You are a super player!"
    }
    else if(score > 6){
        scoreResponse = "You know your Mario."
    }
    else{
        scoreResponse = "Oh well, I bet you spend your time better than I do."
    }
    $(".next-question").html(`<h2>SCORE: ${score}/${endQuiz}</h2>
    <h3>${scoreResponse}</h3>
    <button id="retake">Try again</button>`)
    $("#score-keeper").remove();
}

function handleRetake(){
    $(".next-question").on("click", "#retake", function(event){
        score = 0;
        questionIndex = 0;
        questionNumber = 1;
        renderQuestion();
    });
}

function renderStart(){
    $("h1").html(`<h1>Mario Quiz</h1>
    <div class="next-question">
      <button id="start-btn">Start</button>
    </div>
    <div id="score-keeper"></div> `)
    $("h2").remove();
}

function handleQuiz(){
    handleStart();
    handleSubmit();
    handleResponse();
    handleContinue();
    handleRetake();
}

$(handleQuiz);