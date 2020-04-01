var current = -1;
var questions = [
    { "text": "Ребус первый", "img": "img\\quest1.jpg", "answer": "Gato Negro", "hint": "Любимое винишко" },
    { "text": "Ребус второй", "img": "img\\quest2.jpg", "answer": "Лидские кеды с двумя полосками", "hint": "Любимая обувь" },
    { "text": "Ребус третий", "img": "img\\quest3.jpg", "answer": "Принц-Полукровка", "hint": "Любимая часть Гарри Поттера" },
    { "text": "Ребус четвертый", "img": "img\\quest4.jpg", "answer": "Барабаны", "hint": "Инструмент, на котором играла Маракуйя Жировна" },
    { "text": "Ребус пятый", "img": "img\\quest5.jpg", "answer": "Вангует на говне", "hint": "Как Маракуйя Жировна предсказывает будущее" },
    { "text": "Фразишки от Маришки", "img": "img\\q1.jpg", "answer": "всовавших"},
    { "text": "Фразишки от Маришки", "img": "img\\q2.jpg", "answer": "картоха"},
    { "text": "Фразишки от Маришки", "img": "img\\q3.jpg", "answer": "кисель"},
    { "text": "Фразишки от Маришки", "img": "img\\q4.jpg", "answer": "во-первых"},
    { "text": "Фразишки от Маришки", "img": "img\\q5.jpg", "answer": "пианино"},
]

var congrats = `
<div class="background">
    <div id="congrats" class="start-container">
        <div class="centered">
            <div class="rainbow">
                <span class="text">С днем рождения!</span>
            </div>
            <div>
                <img src="img\\final.jpg" style="max-height: 300px"></img>
            </div>
        </div>	
    </div>
</div>
`;

function getTemplate(index) {
	var hintButton = "";
	if (questions[index].hint) {
		hintButton = `<button id="hint${index}" class="button-hint">
						<div style="width: 150px; display: flex; justify-content: center; align-items: center;"> 
							<div class="padded-img"><img src="img\\hint.png" style="height: 48px"></img></div>
							<div>Подсказка</div>
						</div>
					</button>`;
	}
	return `
		<div class="background" id="question${index}">
			<div class="container">
				<div class="centered">
					<div class="blues">
						<span class="text">${questions[index].text}</text>
					</div>
					<div>
						<img class="img-border" src="${questions[index].img}" style="max-width: 80%; max-height: 300px"></img>
					</div>
					<div>
						<span class="superhero">
							<span class="text">Ответ:</span>
						</span>
						<input type="text" id="answer${index}">
					</div>
					<div>
						<button id="submit${index}" class="button-next">
							<div style="width: 150px; display: flex; justify-content: center; align-items: center;"> 
								<div class="padded-img"><img src="img\\start.png" style="height: 48px"></img></div>
								<div>Дальше</div>
							</div>
						</button>
						
						${hintButton}
					</div>
				</div>
			</div>
		</div>`;
}

function appendQuestion() {
    var template = getTemplate(current);
    $("body").append(template);
}

function nextQuestion(prevButtonSelector, prevHintButtonSelector) {
    $(prevButtonSelector).prop("disabled", true);
    
    if (prevHintButtonSelector) {
        $(prevHintButtonSelector).prop("disabled", true);
    }

    current++;
    
    if (current >= questions.length) {
        $("body").append(congrats);
        $('html, body').animate({ scrollTop: $("#congrats").offset().top }, 600);
        return;
    }

    appendQuestion();
    var question = $("#question" + current);
    var destination = question.offset().top;
    $('html, body').animate({ scrollTop: destination }, 600);

    $(`#hint${current}`).on("click", function(e) {
        $("#popup_content").html(questions[current].hint);
        $("#parent_popup_click1").css("display", "block");
    });

	var buttonSelector = `#submit${current}`;
    $(buttonSelector).on("click", function(e) {
        var answer = $(`#answer${current}`).val().toLowerCase();
		var expectedAnswer = questions[current].answer.toLowerCase();
        if (answer == expectedAnswer) {
            nextQuestion(buttonSelector, `#hint${current}`);
        } else {
            $("#popup_content").html("Смешной рот, но попробуй еще раз");
            $("#parent_popup_click1").css("display", "block");
        }
    });
}

$("#begin").on("click", function () {
    nextQuestion("#begin");
})
