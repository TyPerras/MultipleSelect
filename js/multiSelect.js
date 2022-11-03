$(document).ready(function() {

	/////////////////////////////////////////////////////////////
	// RENAME BUTTON AND FEEDBACK DIV COLLAPSE IDS AND CLASSES //
	/////////////////////////////////////////////////////////////

	// Find and replace all of the collapse component attribute names so that each multi-select activity has unique independent names
	const multipleSelectActivityCollapseBtns = document.getElementsByClassName("btn-submitMultipleSelectActivity");
	const multipleSelectActivityCollapseFeedbackContainer = document.getElementsByClassName("feedbackDiv-MultipleSelectActivity");

	let i, len;
	for (i = 0, len = multipleSelectActivityCollapseBtns.length; i < len; i++) {
		multipleSelectActivityCollapseBtns[i].setAttribute('data-target', '#multipleSelectCollapse' + i);
		multipleSelectActivityCollapseBtns[i].setAttribute('aria-controls', 'multipleSelectCollapse' + i);
		multipleSelectActivityCollapseFeedbackContainer[i].setAttribute('id', 'multipleSelectCollapse' + i);
	}



	//////////////////////////////////////
	// MULTIPLE CHOICE CHECKBOX OPTIONS //
	//////////////////////////////////////

	// This Click Event is not only applied to the <li> item, it is also applied to all of the children nested inside of the <li> (<label>, <input>, <span>, <div>)
	// Pressing the Enter Key (or Spacebar) in screen readers whilst focused on a checkbox is treated in the same way as a click event
	$('li.checkboxContainer').click(function(event) {

		// Ignore click events for <div>, <span>, <label> since those click events will ALSO target <input>

		if ($(event.target).is('li')) {

			// console.log("<li> selected");
			// the <li> is selected
			const selectedMultipleChoiceOptionEvent = event.target;
			// <li> element children
			const selectedListItemChildren = selectedMultipleChoiceOptionEvent.children;
			// <label> element
			const selectedLabelElement = selectedListItemChildren[0];
			// <label> element children
			const selectedLabelItemChildren = selectedLabelElement.children;
			// <input> element
			const selectedInputElement = selectedLabelItemChildren[0];

			// Toggle input check boxes based on their current state
			if (selectedInputElement.checked === false) {
				selectedInputElement.checked = true;
				selectedMultipleChoiceOptionEvent.classList.add('selected');
			} else if (selectedInputElement.checked === true) {
				selectedInputElement.checked = false;
				selectedMultipleChoiceOptionEvent.classList.remove('selected');
			}

		} else if ($(event.target).is('input')) {

			// console.log("<input> selected");
			// <input> element
			const selectedInputElement = event.target;
			// <label> element
			const selectedLabelElement = selectedInputElement.parentElement;
			// <li> element
			const selectedLiElement = selectedLabelElement.parentElement;

			// Check boxes are already toggled because of the default function of an input element selection
			// Add the list item style class for checked or unchecked
			if (selectedInputElement.checked === true) {
				selectedLiElement.classList.add('selected');
			} else if (selectedInputElement.checked === false) {
				selectedLiElement.classList.remove('selected');
			}

		}

	});



	///////////////////////////////////
	// MULTI-SELECT CHECK ANSWER BTN //
	///////////////////////////////////

	// Check Answer Button Click Event
	$('button.btn-submitMultipleSelectActivity').click(function(event) {
		
		const MCSubmitBtn = event.target;
		// <section> (current MC section)
		const MCSection = MCSubmitBtn.parentElement;
		// <section> children
		const MCSectionChildren = MCSection.children;

		// <form> element
		const MCSectionFORM = MCSectionChildren[1];
		// <form> children
		const MCFormChildren = MCSectionFORM.children;
		// <ol> element
		const MCSectionOL = MCFormChildren[0];
		// <ol> children
		const MCSectionOLChildren = MCSectionOL.children;

		// <button> element
		const MCSectionSubmitBtn = MCSectionChildren[2];
		// <button> innerHTML toggle
		if (MCSectionSubmitBtn.innerHTML === "Check Answer") {
			MCSectionSubmitBtn.innerHTML = "Hide Feedback";
		} else if (MCSectionSubmitBtn.innerHTML === "Hide Feedback") {
			MCSectionSubmitBtn.innerHTML = "Check Answer";
		}

		// <div> Feedback 'collapse' div
		const MCSectionFeedbackArea = MCSectionChildren[3];

		// <div> Feedback Children
		const MCSectionFeedbackAreaChildren = MCSectionFeedbackArea.children;
		// <div> correctFeedback
		const correctFeedbackDivContainer = MCSectionFeedbackAreaChildren[0];
		// <div> incorrectFeedback
		const incorrectFeedbackDivContainer = MCSectionFeedbackAreaChildren[1];

		// Check to see if the 'd-none' class is being used to hide either of the feedback options
		const correctFeedbackHidden = correctFeedbackDivContainer.classList.contains('d-none');
		const incorrectFeedbackHidden = incorrectFeedbackDivContainer.classList.contains('d-none');

		// <div> incorrectFeedbackDivContainer Children
		const incorrectFeedbackDivContainerChildren = incorrectFeedbackDivContainer.children;
		// <span> incorrectFeedback feedbackTextContent
		const incorrectFeedbackTextContent = incorrectFeedbackDivContainerChildren[0];

		// Check to see if correct or incorrect feedback is currently being shown
		const checkAnswerFeedbackState = MCSectionFeedbackArea.classList.contains('show');

		// If feedback isn't already visible. 
		if (!checkAnswerFeedbackState) {

			// Correct Answer Key Array
			const correctAnswerKeyArray = new Array();
			// User Input Answer Key Array
			const submittedAnswerArray = new Array();

			totalAvailableCorrectAnswersNum = 0;
			totalSelectedCorrectAnswersNum = 0;

			let i, len;
			// Number of available options is determined by the MCSectionOLChildren.length. This is the number of <li> items inside of the <ol> question
			for (i = 0, len = MCSectionOLChildren.length; i < len; i++) {
				// <li> element
				var MCSectionLiElement = MCSectionOLChildren[i];
				// <li> children
				var MCSectionLiChildren = MCSectionLiElement.children;
				// <label> element
				var MCSectionLabelElement = MCSectionLiChildren[0];
				// <label> children
				var MCSectionLabelChildren = MCSectionLabelElement.children;
				// <span> feedback element (correct or incorrect text and icon)
				var MCSectionSpanFeedbackElement = MCSectionLiChildren[1];
				// <input> element
				var MCSectionInputElement = MCSectionLabelChildren[0];

				// Store correct answer true/false input values in array. This will be used to compare with user answer selections
				correctAnswerKeyArray[i] = MCSectionInputElement.value;

				// Store submitted answer true/false input values in array. Need to store these are strings to match correctAnswerArray
				submittedAnswerArray[i] = "" + MCSectionInputElement.checked + "";

				if (MCSectionInputElement.value === "true") {
					totalAvailableCorrectAnswersNum++;
					// console.log("totalAvailableCorrectAnswersNum: " + totalAvailableCorrectAnswersNum);
				}

				// If checkbox is checked (selected), add the correct or incorrect style feedback classes
				if (submittedAnswerArray[i] === "true") {
					if ((submittedAnswerArray[i]) === (correctAnswerKeyArray[i])) {
						totalSelectedCorrectAnswersNum++;
						MCSectionLiElement.classList.add('correct');
						MCSectionSpanFeedbackElement.innerHTML = '<i class="fas fa-check"></i> Correct';
						// console.log(submittedAnswerArray[i]);
					} else {
						MCSectionLiElement.classList.add('incorrect');
						MCSectionSpanFeedbackElement.innerHTML = '<i class="fas fa-times"></i> Incorrect';
						// console.log(submittedAnswerArray[i]);
					}
				}

			}

			// console.log(correctAnswerKeyArray);
			// console.log(submittedAnswerArray);

			// Check to see if the answer key array matches the submitted answer array
			const answerSubmission = JSON.stringify(correctAnswerKeyArray)==JSON.stringify(submittedAnswerArray);
			// console.log(answerSubmission);

			// Check to see if correct or incorrect feedback is currently being displayed
			// const checkAnswerBtnState = MCSectionSubmitBtn.classList.contains('collapsed');
			// console.log("checkAnswerBtnState: " + checkAnswerBtnState);

			if (answerSubmission) {
				if (correctFeedbackHidden) {
					correctFeedbackDivContainer.classList.remove('d-none');
				}
				if (!incorrectFeedbackHidden) {
					incorrectFeedbackDivContainer.classList.add('d-none');
				}
			} else {
				
				// Pluralization "answers are / answer is"
				if (totalSelectedCorrectAnswersNum > 1 || totalSelectedCorrectAnswersNum < 1) {
					var plualContextTextSubmission = "selections are";
				} else if (totalSelectedCorrectAnswersNum === 1) {
					var plualContextTextSubmission = "selection is";
				}

				// Pluralization "are / is" and "answers / answer"
				if (totalAvailableCorrectAnswersNum > 1 || totalAvailableCorrectAnswersNum < 1) {
					var plualContextTextAnswers = "are";
					var plualContextTextAnswersOrAnswer = "answers";
				} else if (totalAvailableCorrectAnswersNum === 1) {
					var plualContextTextAnswers = "is";
					var plualContextTextAnswersOrAnswer = "answer";
				}

				// Edit the incorrect feedback title to display a fraction of how many answers the student got correct vs. how many correct answers there are in total.
				// incorrectFeedbackTextContent.innerHTML = "<strong>" + totalSelectedCorrectAnswersNum +  " </strong> of the <strong>" + totalAvailableCorrectAnswersNum + "</strong> selected answers are correct" + "</strong>";
				incorrectFeedbackTextContent.innerHTML = "<strong>" + totalSelectedCorrectAnswersNum +  "</strong> " + plualContextTextSubmission + " correct. There " + plualContextTextAnswers + "<strong> " + totalAvailableCorrectAnswersNum + "</strong> correct " + plualContextTextAnswersOrAnswer + " in total." + "</strong>";

				// console.log("totalSelectedCorrectAnswersNum: " + totalSelectedCorrectAnswersNum + " totalAvailableCorrectAnswersNum: " + totalAvailableCorrectAnswersNum);

				// Only show incorrect feedback <div> if the submitted answers are LESS than the total number of correct answers
				if (totalSelectedCorrectAnswersNum < totalAvailableCorrectAnswersNum) {
					if (incorrectFeedbackHidden) {
						incorrectFeedbackDivContainer.classList.remove('d-none');
					}
					if (!correctFeedbackHidden) {
						correctFeedbackDivContainer.classList.add('d-none');
					}
				// else if all of the correct answers are selected, but other (incorrect) answers are also selected 
				} else {
					if (!incorrectFeedbackHidden) {
						incorrectFeedbackDivContainer.classList.add('d-none');
					}
					if (!correctFeedbackHidden) {
						correctFeedbackDivContainer.classList.add('d-none');
					}
				}
			}

		// If feedback is already being displayed, don't show more feedback. Instead, let it collapse first.
		// ("Hide Feedback" button)
		} else {
			// un-highlight any <li> feedback styles (.correct and .incorrect classes)
			// remove the 'correct' or 'incorrect' text in the <li> items

			let i, len;
			for (i = 0, len = MCSectionOLChildren.length; i < len; i++) {
				// <li> element
				var MCSectionLiElement = MCSectionOLChildren[i];
				// <li> children
				var MCSectionLiChildren = MCSectionLiElement.children;
				// <span> feedback element (correct or incorrect text and icon)
				var MCSectionSpanFeedbackElement = MCSectionLiChildren[1];

				const correctListItemHighlight = MCSectionLiElement.classList.contains('correct');
				const incorrectListItemHighlight = MCSectionLiElement.classList.contains('incorrect');

				if (correctListItemHighlight) {
					MCSectionLiElement.classList.remove('correct');
					MCSectionSpanFeedbackElement.innerHTML = '';
				} else if (incorrectListItemHighlight) {
					MCSectionLiElement.classList.remove('incorrect');
					MCSectionSpanFeedbackElement.innerHTML = '';
				}

			}

		}

	});

});


