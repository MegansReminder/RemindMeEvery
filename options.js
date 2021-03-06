$(document).ready(function() {
    loadReminders();

    $("#remindme").click(function() {
	saveReminders();
    });

    $("#add").click(function() {
	addReminder(1, "get off Chrome and back to work!");
    });

    $(document).on("click", "input.delete", function() {
	$(this).parent("div.reminder").remove();
    });

    function loadReminders() {
	var reminders = JSON.parse(localStorage.reminders);
	for(var i = 0; i < reminders.length; i++) {
	    addReminder(reminders[i].frequency, reminders[i].text);
	}
    }

    function addReminder(frequency, text) {
	var div = $("<div>").addClass("reminder");
	div.append($("<span>").text("Remind me every "));
	div.append(getDropdown());
	div.append($("<span>").text(" minute(s) to "));
	div.append($("<input>").attr("type", "text")
	    .attr("name", "reminder").addClass("textbox"));
	div.append($("<input>").attr("type", "button")
	    .addClass("delete").val("Remove"));

	div.children("select").val(frequency);
	div.children("input.textbox").val(text);	    

	$("#reminders").append(div);
    }

    function saveReminders() {
	var reminders = new Array();
	$("div.reminder").each(function() {
	    var reminder = 
		{frequency: $(this).children("select").val(),
		text: $(this).children("input.textbox").val()};
	    reminders.push(reminder);
	});
	localStorage.reminders = JSON.stringify(reminders);
	chrome.runtime.sendMessage("update");
    }

    function getDropdown() {
	var dropdown = $("<select>").attr("name", "frequency");
	dropdown.append($("<option>").val(1).text(1));
	dropdown.append($("<option>").val(2).text(2));
	dropdown.append($("<option>").val(3).text(3));
	dropdown.append($("<option>").val(4).text(4));
	dropdown.append($("<option>").val(5).text(5));
	dropdown.append($("<option>").val(10).text(10));
	dropdown.append($("<option>").val(15).text(15));
	dropdown.append($("<option>").val(20).text(20));
	dropdown.append($("<option>").val(25).text(25));
	dropdown.append($("<option>").val(30).text(30));
	dropdown.append($("<option>").val(60).text(60));
	return dropdown;
    }
});

