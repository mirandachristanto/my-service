var DEBUG = false;

var DIRECTION_LEFT = 1
var DIRECTION_UP = 2
var DIRECTION_RIGHT = 3
var DIRECTION_DOWN = 4

var focused_position_on_row = 0;

function logging(data){
	if(DEBUG)console.log(data)
}

function child_focus(item, direction) {
	var child_focusable = item.children(".focusable")
	if(item.parent().hasClass("grid"))
		return $(child_focusable[focused_position_on_row < child_focusable.length?focused_position_on_row:child_focusable.length-1])
		
	var selected_child = item.children(".selected.focusable")
	if(selected_child.length>0)return selected_child
	
	var children = item.children()
	logging("children")
	logging(children)
	for (var i = 0; i < children.length; i++) {
		var element = $(children[i]);
		logging("child")
		logging(element)
		if (element.hasClass("focusable")) {
			return element
		} else {
			var focusable = child_focus(element, direction)
			if (focusable) {
				return focusable
			}
		}
	}
	return null
}

function horizontal(focused, direction) {
	logging("focused horizontal")
	logging(focused)
	if (focused.is("body")) return null
	var next_focused = direction == 1 ? focused.next() : focused.prev()
	logging("next_focused horizontal")
	logging(next_focused)
	if (next_focused.length == 0) return horizontal(focused.parent(), direction)
	else {
		if (next_focused.hasClass("focusable")) return next_focused
		else {
			if (next_focused.hasClass("horizontal")) return horizontal(next_focused.parent(), direction)
			return child_focus(next_focused, direction);
		}
	}
}
function vertical(focused, direction) {
	logging("focused vertical")
	logging(focused)
	if (focused.is("body")) return null
	if (!focused.hasClass("horizontal")) return vertical(focused.parent(), direction)
	var next_focused = direction == 1 ? focused.next() : focused.prev()
	if (next_focused.hasClass("focused")) return vertical(next_focused, direction)
	logging("next_focused vertical")
	logging(next_focused)
	if (next_focused.length == 0) return vertical(focused.parent(), direction)
	else {
		if (next_focused.hasClass("focusable")) return next_focused
		else {
			return child_focus(next_focused, direction);
		}
	}
}
document.addEventListener("keydown", function (event) {
	var code
	var focused = $(".focused.focusable")
	if (event.key !== undefined) {
		code = event.key
	} else if (event.keyIdentifier !== undefined) {
		code = event.keyIdentifier
	} else if (event.keyCode !== undefined) {
		code = event.keyCode
	}
	var next_focus;
	var direction;
	switch (code) {
		case 13:
		case "Enter":
			focused.click()
			return
		case 8:
		case "Backspace":
		case 27:
		case "Escape":
			if (typeof home_page !== 'undefined' && home_page == true) {
				return
			}
			window.history.back()
			return
		case 37:
		case "Left":
		case "ArrowLeft":
			direction = DIRECTION_LEFT
			logging("Left")
			next_focus = horizontal(focused, -1)
			break;
		case 38:
		case "Up":
		case "ArrowUp":
			direction = DIRECTION_UP
			focused_position_on_row = focused.parent().children().index(focused)
			logging(focused.scrollTop())
			if(focused.hasClass("scrollable") && focused.scrollTop() != 0){
				focused.scrollTop(focused.scrollTop()-50)
				$(document).trigger("focusChanged")
				return
			}
			logging("Up")
			next_focus = vertical(focused, -1)
			break;
		case 39:
		case "Right":
		case "ArrowRight":
			direction = DIRECTION_RIGHT
			logging("Right")
			next_focus = horizontal(focused, 1)
			break;
		case 40:
		case "Down":
		case "ArrowDown":
			direction = DIRECTION_DOWN
			logging(focused.scrollTop(), focused[0].scrollHeight)
			focused_position_on_row = focused.parent().children().index(focused)
			if(focused.hasClass("scrollable") && focused.scrollTop() < focused[0].scrollHeight){
				focused.scrollTop(focused.scrollTop()+50)
				$(document).trigger("focusChanged")
				return
			}
			logging("Down")
			next_focus = vertical(focused, 1)
			break;
		default: return;
	}
	if (next_focus && next_focus.length != 0) {
		$(".focused").removeClass("focused")
		next_focus.addClass("focused")
		next_focus[0].scrollIntoView()
		
		var parent = next_focus.parent()
		do {
			if (parent.hasClass("vertical") || parent.hasClass("horizontal")) parent.addClass("focused")
			parent = parent.parent()
		} while (!parent.is("body"))
		parent = next_focus.parent()
		do {
			parent.children().removeClass("selected")
			if(parent.hasClass("horizontal")){
				break;
			}
			parent = parent.parent()
		} while (!parent.is("body"))
		next_focus.addClass("selected")
		parent = next_focus.parent()
		var next_focus_position = parent.children().index(next_focus)
		do {
			if(parent.hasClass("horizontal") && parent.hasClass("scrollable")){
				var next_focus_value = next_focus.width() * next_focus_position
				parent.scrollLeft(next_focus_value)
				logging(parent.scrollLeft())
				break;
			}
			parent = parent.parent()
		} while (!parent.is("body"))
		$(document).trigger("focusChanged")
	}
}, false)