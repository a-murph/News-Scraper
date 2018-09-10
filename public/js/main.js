$(function() {
	$("body").on("click", "#form-submit", function(event) {
		event.preventDefault();
		var articleId = $(".article").data("id");
		$.ajax({
			method: "POST",
			url: "/api/" +articleId +"/comments",
			data: {
				author: $("#form-author").val(),
				body: $("#form-body").val()
			}
		}).then(function() {
			location.reload();
		});
	});

	$("body").on("click", ".comment-delete", function(event) {
		var commentId = $(this).data("id");

		$.ajax({
			method: "DELETE",
			url: "/api/comments/" +commentId
		}).then(function() {
			location.reload();
		});
	});
});