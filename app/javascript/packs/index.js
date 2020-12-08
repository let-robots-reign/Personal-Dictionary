$(document).ready(function () {

    sidebarLogic();

    const delete_all_caption = 'Выбрано слов: '
    let checked_words = 0

    let word_checkbox = $('.word-checkbox')
    let chosen_words_p = $('#chosen-words-number')
    let chosen_words_text = $('#chosen-words-number span')
    
    $('#global-checkbox').on('click', function () {
        if ($(this).is(':checked')) {
            checked_words = 0
            word_checkbox.prop('checked', true).change()
            chosen_words_text.text(delete_all_caption + checked_words)
            chosen_words_p.css('visibility', 'visible')
        } else {
            word_checkbox.prop('checked', false).change()
            chosen_words_p.css('visibility', 'hidden')
        }
    })

    word_checkbox.change(function (e) {
        if ($(this).is(':checked')) {
            checked_words += 1
        } else {
            checked_words -= 1
        }

        if (checked_words) {
            chosen_words_text.text(delete_all_caption + checked_words)
            chosen_words_p.css('visibility', 'visible')
        } else {
            chosen_words_p.css('visibility', 'hidden')
        }
    })

    // ajax destroy
    $('.delete-word').bind('ajax:success', function () {
        if ($(this).closest('tr').find('.word-checkbox').is(':checked')) {
            checked_words -= 1
            chosen_words_text.text(delete_all_caption + checked_words)
        }
        $(this).closest('tr').fadeOut();
    })

    $('.words').click(function () {
        // TODO: access model fields
        const word = $(this).find('.word').text()
        const translation = $(this).find('.word-translation').text()
        const synonyms = $(this).find('.word-synonyms').text()
        let card_content = `<h3>${word}</h3>
                            <h5><em>(${translation})</em></h5><br/>`
        if (synonyms !== '-') {
            card_content += `Синонимы слова: <em>${synonyms}</em>`
        }

        $('#word-model-body').html(card_content)
    })
})

function sidebarLogic() {
    let nav = $(".nav");
    $(".nav__expand").click(function() {
        nav.toggleClass("nav-closed")
    })
    let nav_list_item = $(".nav__listitem")
    nav_list_item.each(function() {
        $(this).click(function() {
            nav_list_item.each(function() {
                $(this).removeClass("nav__listitem-active")
            })
            $(this).addClass("nav__listitem-active")
        })
    })

}
