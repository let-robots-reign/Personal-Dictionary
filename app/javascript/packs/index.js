$(document).ready(function () {

    const ENGLISH_LANG_ID = 1
    const SPANISH_LANG_ID = 2
    const FRENCH_LANG_ID = 3

    sidebarLogic();

    const delete_all_caption = 'Выбрано слов: '
    let checked_words = 0

    let word_checkbox = $('.word-checkbox')
    let chosen_words_p = $('#chosen-words-number')
    let chosen_words_text = $('#chosen-words-number span')

    // TODO: delete all
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

    // TODO: add edit link
    $('.word-row').click(function () {
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

    $("#english").click(function (e) {
        e.preventDefault()
        updateLang(ENGLISH_LANG_ID)
    })

    $("#spanish").click(function (e) {
        e.preventDefault()
        updateLang(SPANISH_LANG_ID)
    })

    $("#french").click(function (e) {
        e.preventDefault()
        updateLang(FRENCH_LANG_ID)
    })
})

function sidebarLogic() {
    let nav = $(".nav");
    $(".nav__expand").click(function () {
        nav.toggleClass("nav-closed")
    })
    let nav_list_item = $(".nav__listitem")
    nav_list_item.each(function () {
        $(this).click(function () {
            nav_list_item.each(function () {
                $(this).removeClass("nav__listitem-active")
            })
            $(this).addClass("nav__listitem-active")
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
                $("#words-table").empty()
                for (let i = 1; i <= data.length; ++i) {
                    const row = data[i - 1]
                    const id = row["id"]
                    const word = row["word"]
                    const translation = row["translation"]
                    const show_path = row["url"].replace(/\.[^/.]+$/, "")
                    const edit_path = show_path + '/edit'

                    $("#words-table").append(
                        `<tr class='word-row'>
                          <td>
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input word-checkbox" id="checkbox-${id}">
                              <label class="custom-control-label" for="checkbox-${id}"></label>
                            </div>
                          </td>
                          <td class="word-index">${i}</td>
                          <td class="word">${word}</td>
                          <td class="word-translation">${translation}</td>
                          <td>
                            <i class="fas fa-eye icon-2x mr-1 show-word" data-toggle="modal" data-target="#modal-long"></i>
                            <span> | </span>
                            <a href=${edit_path} class="edit-word">
                              <i class="fas fa-pencil-alt icon-2x ml-1 mr-1"></i>
                            </a>
                            <span> | </span>
                            
                            <a data-confirm="Are you sure?" class="delete-word" data-remote="true" rel="nofollow" data-method="delete" href=${show_path}>
                              <i class="far fa-trash-alt icon-2x ml-1"></i>
                            </a>
                          </td>
                        </tr>`
                    )
                }
            })
        }, 50)
}
