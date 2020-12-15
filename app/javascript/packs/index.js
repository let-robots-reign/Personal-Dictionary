$(document).ready(function () {

    const ENGLISH_LANG_ID = 1
    const SPANISH_LANG_ID = 2
    const FRENCH_LANG_ID = 3

    sidebarLogic();

    const delete_all_caption = 'Выбрано слов: '
    let checked_words = 0

    $('#global-checkbox').on('click', function () {
        if ($(this).is(':checked')) {
            checked_words = 0
            $('.word-checkbox').prop('checked', true).change()
            $('#chosen-words-number span').text(delete_all_caption + checked_words)
            $('#chosen-words-number').css('visibility', 'visible')
        } else {
            $('.word-checkbox').prop('checked', false).change()
            $('#chosen-words-number').css('visibility', 'hidden')
        }
    })

    $('body').on('click', '#delete-all', function (e) {
        let words = []
        $('.word-checkbox:checked').each(function () {
            const referring_word = $(this).closest('tr').find('.word').text()
            console.log(referring_word)
            words.push(referring_word)
        })

        $.ajax({
            url: '/delete_words',
            type: 'DELETE',
            cache: false,
            data: {words: words}
        })

        refreshTable()
        $('#global-checkbox').prop('checked', false).change()
        $('#chosen-words-number').css('visibility', 'hidden')
    })

    $('body').on('change', '.word-checkbox', function (e) {
        if ($(this).is(':checked')) {
            checked_words += 1
        } else {
            checked_words -= 1
        }

        if (checked_words) {
            $('#chosen-words-number span').text(delete_all_caption + checked_words)
            $('#chosen-words-number').css('visibility', 'visible')
        } else {
            $('#chosen-words-number').css('visibility', 'hidden')
        }
    })

    // ajax destroy
    $('.delete-word').bind('ajax:success', function () {
        if ($(this).closest('tr').find('.word-checkbox').is(':checked')) {
            checked_words -= 1
            $('#chosen-words-number span').text(delete_all_caption + checked_words)
        }
        $(this).closest('tr').fadeOut();
    })

    $('body').on('click', '.word-row', function (e) {
        const word = $(this).find('.word').text()
        $.get({
            url: '/word_data',
            data: {word: word},
            cache: false
        }).done(function (word_data) {
            let card_content = `<h3>${word_data.word}</h3>
                                <h5><em>(${word_data.translation})</em></h5><br/>`
            const synonyms = word_data.synonyms
            if (synonyms !== '-') {
                card_content += `Синонимы слова: <em>${synonyms}</em><br/>`
            }
            const example = word_data.example
            if (example !== '-') {
                card_content += `Пример в предложении: <em>${example}</em>`
            }
            $('#word-modal-body').html(card_content)

            const edit_link = `/words/${word_data.id}/edit`
            $('#edit-button').attr('href', edit_link)
        })
    })

    $('#english').click(function (e) {
        e.preventDefault()
        updateLang(ENGLISH_LANG_ID)
    })

    $('#spanish').click(function (e) {
        e.preventDefault()
        updateLang(SPANISH_LANG_ID)
    })

    $('#french').click(function (e) {
        e.preventDefault()
        updateLang(FRENCH_LANG_ID)
    })
})

function sidebarLogic() {
    let nav = $('.nav');
    $('.nav__expand').click(function () {
        nav.toggleClass('nav-closed')
    })
    let nav_list_item = $('.nav__listitem')
    nav_list_item.each(function () {
        $(this).click(function () {
            nav_list_item.each(function () {
                $(this).removeClass('nav__listitem-active')
            })
            $(this).addClass('nav__listitem-active')
        })
    })
}

function updateLang(langId) {
    $.when(
        $.get({
            url: '/update_language',
            cache: false,
            data: {current_language: langId}
        })
    ).then(refreshTable())
}

function refreshTable() {
    setTimeout(
        function () {
            $.get({
                url: '/words.json',
                cache: false
            }).done(function (data) {
                $('#words-table').empty()
                for (let i = 1; i <= data.length; ++i) {
                    const row = data[i - 1]
                    const id = row['id']
                    const word = row['word']
                    const translation = row['translation']
                    const show_path = row['url'].replace(/\.[^/.]+$/, '')
                    const edit_path = show_path + '/edit'

                    $('#words-table').append(
                        `<tr class='word-row'>
                          <td>
                            <div class='custom-control custom-checkbox'>
                              <input type='checkbox' class='custom-control-input word-checkbox' id='checkbox-${id}'>
                              <label class='custom-control-label' for='checkbox-${id}'></label>
                            </div>
                          </td>
                          <td class='word-index'>${i}</td>
                          <td class='word'>${word}</td>
                          <td class='word-translation'>${translation}</td>
                          <td>
                            <i class='fas fa-eye icon-2x mr-1 show-word' data-toggle='modal' data-target='#modal-long'></i>
                            <span> | </span>
                            <a href=${edit_path} class='edit-word'>
                              <i class='fas fa-pencil-alt icon-2x ml-1 mr-1'></i>
                            </a>
                            <span> | </span>
                            
                            <a data-confirm='Are you sure?' class='delete-word' data-remote='true' rel='nofollow' data-method='delete' href=${show_path}>
                              <i class='far fa-trash-alt icon-2x ml-1'></i>
                            </a>
                          </td>
                        </tr>`
                    )
                }
            })
        }, 100)
}
