$(document).ready(function () {
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

    word_checkbox.change(function () {
        if ($(this).is(':checked')) {
            checked_words += 1
            console.log('Checkbox is checked..')
        } else {
            checked_words -= 1
            console.log('Checkbox is not checked..')
        }

        if (checked_words) {
            chosen_words_text.text(delete_all_caption + checked_words)
            chosen_words_p.css('visibility', 'visible')
        } else {
            chosen_words_p.css('visibility', 'hidden')
        }
    })

    // ajax destroy
    $('.delete-word').bind('ajax:success', function() {
        if ($(this).closest('tr').find('.word-checkbox').is(':checked')) {
            checked_words -= 1
            chosen_words_text.text(delete_all_caption + checked_words)
        }
        $(this).closest('tr').fadeOut();
    })
})