'use strict';
var compares = {};
(function () {

    var container_title = document.querySelector("#container>.title");
    container_title.textContent = "Upgrade Calc";


    let demo=document.createElement("input");
    demo.type = "button";
    demo.value = "Demo Page File";
    demo.style.marginLeft="10px";
    demo.classList.add("hidden");
    demo.setAttribute("onclick", "download_file('./DemoPage.txt')");
    document.querySelector("#container>.title").appendChild(demo);

    var container = document.getElementById("material");

    var title_div = document.createElement("div");
    title_div.classList.add("title_block");

    var temp = document.createElement("div");
    title_div.classList.add("title");
    temp.textContent = "Material";
    title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "import(Material)";
    temp.setAttribute("onclick", "import_material_data()");
    title_div.appendChild(temp);

    // var temp = document.createElement("input");
    // temp.type = "button";
    // temp.value = "export";
    // temp.setAttribute("onclick", "export_material_data()");
    // title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "import_page";
    temp.setAttribute("onclick", "import_page()");
    title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "export_page";
    temp.setAttribute("onclick", "export_page()");
    title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "p*";
    temp.setAttribute("onclick", "p_point_set()");
    title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "clear";
    temp.setAttribute("onclick", "clear_material_data(this)");
    title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "reset";
    temp.setAttribute("onclick", "fill_material_data(this)");
    title_div.appendChild(temp);

    // var temp = document.createElement("input");
    // temp.type = "button";
    // temp.value = "default";
    // temp.setAttribute("onclick", "fill_material_data()");
    // title_div.appendChild(temp);

    // var temp = document.createElement("input");
    // temp.type="button";
    // temp.value="apply";
    // temp.setAttribute("onclick","apply_material_data()");
    // title_div.appendChild(temp);


    container.appendChild(title_div);

    for (var temp of material_list_map.keys()) {
        var items_div = document.createElement("div");
        items_div.id = temp;
        items_div.classList.add("material_list");
        var title = document.createElement("div");
        title.textContent = material_list_title_map.get(temp);
        title.classList.add("title");
        items_div.appendChild(title);
        container.appendChild(items_div);
        for (var item of material_list_map.get(temp)) {
            var item_div = document.createElement("div");
            item_div.id = item;
            var item_text = document.createElement("div");
            item_text.classList.add("text");
            item_text.textContent = item;
            var item_value = document.createElement("input");
            item_value.classList.add("value");
            item_value.textContent = "";
            item_div.classList.add("material_item");
            item_div.appendChild(item_text);
            item_div.appendChild(item_value);
            items_div.appendChild(item_div);
        }
    }

    var footer = document.createElement("div");
    footer.classList.add("footer");
    container.appendChild(footer);
    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "apply";
    temp.setAttribute("onclick", "apply_material_data(this)");
    footer.appendChild(temp);
    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "apply & refreshAll";
    temp.setAttribute("onclick", "apply_material_data(this); refresh_all(this);");
    temp.style.marginRight = "5px";
    footer.appendChild(temp);
    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "reset";
    temp.setAttribute("onclick", "fill_material_data(this)");
    temp.style.marginRight = "5px";
    footer.appendChild(temp);
    var footer = document.createElement("div");
    footer.classList.add("footer");
    footer.style.margin = "0 10px";
    var temp = document.createElement("div");
    // temp.textContent=new moment().format("HH:mm:ss");
    temp.id = "operation_time";
    temp.textContent = "--:--:--";
    footer.appendChild(temp);
    var temp = document.createElement("div");
    temp.id = "operation_tip";
    temp.textContent = "no operation : ";
    temp.style.marginRight = "2px";
    footer.appendChild(temp);
    container.appendChild(footer);





    var container = document.getElementById("compare_area");
    var title_div = document.createElement("div");
    title_div.classList.add("title_block");

    var temp = document.createElement("div");
    title_div.classList.add("title");
    temp.textContent = "Compare area";
    title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "new compare";
    temp.setAttribute("onclick", "new_compare()");
    title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "import(compares)";
    temp.setAttribute("onclick", "import_file('compare_area')");
    title_div.appendChild(temp);

    // var temp = document.createElement("input");
    // temp.type = "button";
    // temp.value = "export";
    // temp.setAttribute("onclick", "export_compare()");
    // title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "remove_all";
    temp.setAttribute("onclick", "clear_compare()");
    title_div.appendChild(temp);

    container.appendChild(title_div);


    // new_compare();
    fill_material_data();
    apply_material_data({ value: "initial" });


    // materialInfoDropInit();
    fileDropInit();
    testHoverInit3();
    testNameEditableInit();
    conservationCalcFunctionInit();
})();
// function materialInfoDropInit(){
//     var container = document.getElementById("material");
//     // drop file to import
//     $(container).on(
//         'dragover',
//         function (e) {
//             e.preventDefault();
//             e.stopPropagation();
//         }
//     )
//     $(container).on(
//         'dragenter',
//         function (e) {
//             e.preventDefault();
//             e.stopPropagation();
//         }
//     )
//     $(container).on(
//         'drop',
//         function (e) {
//             if (e.originalEvent.dataTransfer) {
//                 if (e.originalEvent.dataTransfer.files.length) {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     /*UPLOAD FILES HERE*/
//                     upload(e.originalEvent.dataTransfer.files);
//                 }
//             }
//         }
//     );
// }
function fileDropInit() {
    // drop file to import
    // https://stackoverflow.com/questions/19841859/full-page-drag-and-drop-files-website
    // https://stackoverflow.com/questions/18588835/allow-a-div-to-cover-the-whole-page-instead-of-the-area-within-the-container
    let selector = "#material, #compare_area, .compare, *:not(#material):not(#compare_area):not(.compare)";
    $(document).on(
        'dragover', selector,
        function (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    )
    $(document).on(
        'dragenter', selector,
        function (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    )
    $(document).on(
        'drop', selector,
        function (e) {
            if (e.originalEvent.dataTransfer) {
                if (e.originalEvent.dataTransfer.files.length) {
                    e.preventDefault();
                    e.stopPropagation();
                    /*UPLOAD FILES HERE*/
                    console.log(this);
                    let target;
                    if((target=this.closest("[id^=compare]"))!=null){
                        upload(e.originalEvent.dataTransfer.files, target);
                    }else if((target=this.closest("[id^=material]"))!=null){
                        upload(e.originalEvent.dataTransfer.files, target);
                    }else{
                        upload(e.originalEvent.dataTransfer.files, {id:""});
                    }
                }
            }
        }
    );
}
function testHoverInit3() {
    $(document)
        .on('mouseenter', ".test_result > div > div", function () {
            var t = parseInt($(this).index()) + 1;
            $(this).parents('.test_result').find('div:first-child > div:nth-child(' + t + ') > div:not(:first-child)').removeClass('hidden');
        })
        .on('mouseleave', ".test_result > div > div", function () {
            var t = parseInt($(this).index()) + 1;
            $(this).parents('.test_result').find('div:first-child > div:nth-child(' + t + ') > div:not(:first-child)').addClass('hidden');
        });
}
function testNameEditableInit() {
    // $(".test_name_row .test_name").keyup(function(e){
    //     console.log(`${e.keyCode}, ${e.ctrlKey}, ${e.altKey}`);
    //   });
    // $(document).on("keypress keyup keydown", ".test_name_row .test_name", function (e) {
    //     // console.log(e);
    //     console.log(`${e.type}, ${e.keyCode}, ${e.ctrlKey}, ${e.altKey}`);
    //     // e.preventDefault();
    // });

    // ignore specific key(input), keydown keypress keyup
    // https://stackoverflow.com/questions/17807300/jquery-keypress-event-ignore-arrow-keys
    // https://stackoverflow.com/questions/23801855/javascript-prevent-enterkey-from-adding-new-line
    // blur when press esc
    // https://stackoverflow.com/questions/22732478/programmatic-way-to-cancel-editing-mode-when-using-contenteditable
    // blur with jquery
    // https://stackoverflow.com/questions/9577971/focus-and-blur-jquery-events-not-bubbling
    let old_value=undefined;
    let editable_target=".test_name_row .test_name, .compare .title_block>.title";
    $(document).on("click", editable_target, function (e){
        this.contentEditable=true;
        this.focus();
    });
    $(document).on("keydown focus blur", editable_target, function (e) {
        // console.log(e);
        console.log(`${e.type}, ${e.keyCode}, ${e.ctrlKey}, ${e.altKey}`);
        if(e.type=="focusin"){
            old_value=e.target.textContent;
            console.log(old_value);
        }else if(e.type=="keydown"){
            if(e.keyCode==13){
                e.target.blur();
                e.preventDefault(); 
            }else if(e.keyCode==27){
                // console.log(e);
                e.target.textContent=old_value;
                e.target.blur();
                e.preventDefault(); 
            }else if(e.keyCode==9){
                let temp=$(editable_target);
                let offset=e.shiftKey==false?1:-1;
                let next_target = temp[(temp.length+temp.index(e.target)+offset)%temp.length];
                next_target.contentEditable=true;
                next_target.focus();
                e.preventDefault(); 
            }
        }else if(e.type=="focusout"){
            let compare = e.target.closest(".compare");
            let compare_instance = compares[compare.rand];
            if($(e.target).hasClass("title")==false){
                // console.log(e.target);
                let t = parseInt($(e.target.parentElement).index()) -1;
                let estimate = compare_instance.tests[t].estimate;
                estimate.renameTestName(e.target.textContent);
                console.log(estimate.itemName);
            }
            e.target.scrollLeft=0;
            e.target.contentEditable=false;
            e.target.title=e.target.textContent;
            // compare_instance.refreshTest(test_index);
            }
        // e.preventDefault();
    });
}

function conservationCalcFunctionInit(){
    let floatPanel=document.createElement("div");
    floatPanel.style.zIndex=5;
    floatPanel.style.border="1px solid block";
    floatPanel.style.position="absolute";
    floatPanel.textContent="AAAAAAAABB";
    let target=".test_name_row .result_row:not(:first-child)";
    $(document).on("click", target, function (e){
        console.log(e);
    });
}