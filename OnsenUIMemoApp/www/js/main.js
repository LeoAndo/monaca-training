// This is a JavaScript file

const KEY_MEMO = "memoList"; // localStorage用のキー

ons.ready(function () {
    console.log("Onsen UI is ready.");
});

document.addEventListener('show', function (e) {
    if (e.target.id = "home") { // HOMEページの場合.
        console.log("HOMEページ show!");
        getItems();
    } else if (e.target.id = "add") { // Addページの場合.
        console.log("Addページ show!");
    }
});

function getItems() {
    var output = '';
    var list = document.getElementById('memoList');
    var memoList = JSON.parse(localStorage.getItem(KEY_MEMO)); // convert Json Object -> Array.
    if (memoList == null) {
        return;
    }
    for (var i = 0; i < memoList.length; i++) {
        console.log(memoList[i]);
        output += `<ons-list-item>${memoList[i]}<div class="right"> <ons-button onclick="deleteItem(${i});">  <ons-icon icon="trash"></ons-icon></ons-button> </div></ons-list-item>`;
    }
    console.log(output);
    list.innerHTML = output;
}

function addItem() {
    var value = document.getElementById('item').value;
    if(value.length == 0) {
        ons.notification.alert({
            message: "no data. Please input text."
        });
        return;
    }
    var memoList = JSON.parse(localStorage.getItem(KEY_MEMO));
    if (memoList == null) {
        memoList = [];
    }
    memoList.push(value);
    localStorage.setItem(KEY_MEMO, JSON.stringify(memoList));

    document.getElementById('item').value = "";
}

function deleteItem(index) {
    ons.notification.confirm({
        message: 'Are you sure you want to delete it?',
        callback: function (answer) { // 0: Cancel, 1: OK
            console.log(answer);
            if (answer == 1) { // OKボタン押下時
                // アイテム削除処理を実行する.
                var memoList = JSON.parse(localStorage.getItem(KEY_MEMO));
                if (memoList == null) return;
                memoList.splice(index, 1); // 配列のindexの要素を削除する.
                localStorage.setItem("memoList", JSON.stringify(memoList));
                getItems();
            }
        }
    });
}

function pushPage(rute) {
    document.querySelector("#navigator").pushPage(rute);
}