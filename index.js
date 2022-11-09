function buildElement(name_tag, innerHTML, str_class, str_style, element_appended) {
    let element = document.createElement(name_tag);
    if (innerHTML) element.innerHTML = innerHTML;
    if (str_class) element.classList = str_class;
    if (str_style) element.setAttribute('style', str_style);
    if (element) element_appended.appendChild(element);
    return element;
}

var input = document.getElementById('input');
var data = [];
var questions = [];
input.addEventListener('change', function () {
    readXlsxFile(input.files[0]).then(function (rows) {
        // `rows` is an array of rows
        // each row being an array of cells.
        // データをObject型で保存する。最初の行は項目名なので無視
        let count = 0;
        for (let row of rows) {
            if (count >= 5) {
                data.push({
                    [rows[4][0]]: row[0],
                    [rows[4][1]]: row[1],
                    [rows[4][2]]: row[2],
                    [rows[4][3]]: row[3],
                    [rows[5][3]]: row[4],
                    [rows[6][3]]: row[5],
                });
            }
            count++;
        }

        // 質問3つを配列に保存
        questions.push(rows[0][2]);
        questions.push(rows[1][2]);
        questions.push(rows[2][2]);
        document.querySelector('#q1_title').innerText = questions[0];
        document.querySelector('#q2_title').innerText = questions[1];
        document.querySelector('#q3_title').innerText = questions[2];

        document.querySelector('#loaded_result').innerHTML = `データの読み込みが完了しました。<br>読み込んだレコード数：${data.length}`;
        console.log(data);

    })
})


function onSearchKeyChanged(dom) {
    for (let i = 1; i <= 3; i++) {
        document.querySelector(`#q${i}_answers`).innerHTML = '';
    }
    let results = data.filter(function (e) {
        return e['授業コード'] === dom.value;
    })

    if (results.length > 0) {
        for (let result of results) {
            let q_number = result['問№'];
            buildElement('li', result['自由記述（原文）'], '', '', document.querySelector(`#q${q_number}_answers`));
        }
        document.querySelector('#classcode').innerText = results[0]['授業コード'];
        document.querySelector('#profname').innerText = results[0]['主担当教員名'];
    }
    else {
        alert('ERROR: 指定した授業コードがデータには存在しません。')
    }

}

function onInputTitle(dom) {
    document.querySelector('#title').innerHTML = dom.value;
    console.log(dom.value);
}