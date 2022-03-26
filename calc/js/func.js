'use strict';
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function download_file(url) {
    fetch(url).then(res => res.text()).then(text => {
        download(url.split('/').pop(), text);
    });
}


function import_file(import_type) {
    // alert("import_material_data");

    // 生活記事簿: 使用FileReader讀取file資料 - javascript
    // http://hklifenote.blogspot.com/2016/08/filereaderfile-javascript.html
    let input=document.createElement("input");
    input.type="file";
    input.style.display="none";
    document.body.appendChild(input);

    //監控#fileUploader的值變化
    input.addEventListener("change", function(event) {
        if (this.files.length > 0) {
            //有選取file時，使用fileReader讀取file資料
            //readAsDataURL可以將讀取到的file資料轉成
            //data:......的URL型式
            if(import_type=="material_only"){
                upload(this.files, {id:"material_only"});
            }else if(import_type=="page"){
                upload(this.files, {id:""});
            }else if(import_type=="compare_area"){
                upload(this.files, {id:"compare_area_only"});
            }else if(import_type.indexOf("compare_")>=0){
                let target_id=import_type;
                target_id+="_only";
                // let target=document.getElementById(target_id);
                upload(this.files, {id:target_id});
            }else{
                operation_cb({value:"unknow import type"});
            }
        }else{
            //沒有選取file時，例如選擇取消，
        }
        input.parentElement.removeChild(input);
    }, false);
    

    input.click();
}
function import_material_data(){
    // alert("import_material_data");
    import_file("material_only")
}
function upload(files, target) {
    // alert('Upload ' + files.length + ' File(s).');

    var reader = new FileReader();
    reader.onload = function () {
        let data;
        try {
            data = JSON.parse(reader.result);
        } catch (e) {
            alert("file parse error");
            return;
        }

        import_process(data, target);
    };
    reader.readAsText(files[0]);
    // console.log(files[0]);

    function import_process(data_in_object, target) {
        // console.log(target);
        let data = data_in_object;
        if(data.dataType != "composite" && target.id.indexOf("_only")>=0){
            target.id=target.id.slice(0, target.id.indexOf("_only"));
        }

        if (data.dataType == "material") {
            if (target.id == "material" || target.id == "composite") {
                // when use old export pageinfo, set initial value for yther & zther.
                for(let i=4;i<=7;i++){
                    data.A[i]=data.A[i]==undefined?0:data.A[i];
                    data.B[i]=data.B[i]==undefined?0:data.B[i];
                }

                A = data.A;
                B = data.B;
                C = data.C;
                TA = data.TA;
                TB = data.TB;

                apply_material_data();
                operation_cb({ value: `import file(${files[0].name}) & apply` });
            } else {
                console.log("Ignore, import file's format is not accept.");
                operation_cb({ value: `import file(${files[0].name}) fails, please drop me into Material block.` });
                // operation_cb({ value: `import file(${files[0].name}) fails(data type error)` });
            }
        } else if (data.dataType == "compare") {
            if (target.id == "compare_area" || target.id == "composite") {
                for (let compare of data.compare_data) {
                    import_compare(compare);
                }
            } else if ((target.id.indexOf("compare_") >= 0)) {
                for (let compare of data.compare_data) {
                    import_compare(compare, compares[document.getElementById(target.id).rand]);
                }
            } else {
                console.log("Ignore, import file's format is not accept.");
                console.log(target.id);
                operation_cb({ value: `import file(${files[0].name}) fails, please drop me into compare_area or inner-compare.` });
            }
        } else if (data.dataType == "composite") {
            if(target.id=="material_only"){
                for (let element of data.array) {
                    if(element.dataType=="material"){
                        import_process(element, target);
                    }
                }
            }else if(target.id.indexOf("compare_")>=0 && target.id.indexOf("_only")>=0){
                for (let element of data.array) {
                    if(element.dataType=="compare"){
                        import_process(element, target);
                    }
                }
            }else{
                clear_compare();
                // maybe can optional import for each element in data.array, but now excute as "clear page and import all element sequencely".
                for (let element of data.array) {
                    import_process(element, { id: "composite" });
                }
            }
        } else {
            console.log("Ignore, import file's format is not accept.");
            operation_cb({ value: `import file(${files[0].name}) fails, unknow format.` });
        }
    }
}
function export_material_data(just_return_content) {
    // alert("export_material_data");
    let material_data = {};
    material_data.dataType = "material";
    material_data.A = A;
    material_data.B = B;
    material_data.C = C;
    material_data.TA = TA;
    material_data.TB = TB;
    if (just_return_content) {
        return material_data;
    } else {
        let filename = `Material info[${new moment().format("YYYY-MM-DD")}]`;
        let content = JSON.stringify(material_data, null, 4);
        download(filename, content);
    }
}

function import_page() {
    import_file("page");
}

function export_page() {
    // alert("export_material_data");
    let page_data = {};
    page_data.dataType = "composite";
    page_data.array = [];
    page_data.array.push(export_material_data(true));
    page_data.array.push(export_compare(undefined, true));
    let filename = `Page info[${new moment().format("YYYY-MM-DD")}]`;
    let content = JSON.stringify(page_data, null, 4);
    download(filename, content);
}

function input_calc(string, not_alert) {
    // console.log(string);
    if (string != "" && /^[0-9+\-/*.()]*$/g.test(string) == true) {   // .test(null) result "false"
        try {
            let value = eval(string);
            if (isFinite(value)) {
                return value;
            } else {
                throw `invalid input => skip`;
            }
        } catch (err) {
            // throw err;
            throw `invalid input => skip`;
        }
    } else {
        if (string != null && string != "") {
            not_alert?0:alert("invalid input");
            throw `invalid input => skip`;
        } else if (string == "") {
            throw `empty input => skip`;
        } else if (string == null) {
            throw `cancel input => skip`;
        } else {
            throw `unknow condition => skip`;
        }
        // throw `invalid input, input = ${string}  =>  skip`;
    }
}
function p_point_set() {
    // alert("p_point_set");
    try {
        let p = input_calc(prompt("p_point_set"));
        console.log(p);
        if (isNaN(p) == false) {
            back_up();
            apply_material_data({ value: "middle operation" }, true);
            // A[1] = Math.round(5.5 * p * 100) / 100;
            // A[2] = Math.round(7 * p * 100) / 100;
            // B[1] = Math.round(6 * p * 100) / 100;
            // B[2] = Math.round(7 * p * 100) / 100;
            // C[0] = Math.round(29 * p * 100) / 100;
            A[1] = `5.5*${p}`;
            A[2] = `7*${p}`;
            B[1] = `6*${p}`;
            B[2] = `7*${p}`;
            C[0] = `29*${p}`;
            fill_material_data(undefined, true);
            recover();
        }
    } catch (err) {
        console.log(err);
        alert("setting fails");
    }
}
function yther_set(){
    // alert("yther_set");
    try {
        let p = input_calc(prompt("yther_set, input dust price:"));
        console.log(p);
        if (isNaN(p) == false) {
            back_up();
            apply_material_data({ value: "middle operation" }, true);
            try{
                let zeny=[1,2,5,5];
                let dust=[1,2,3,3];

                for(let i=0;i<4;i++){
                    A[i+4]=`${input_calc(A[i], true)}+${dust[i]}*${p}+${zeny[i]}`;
                    B[i+4]=`${input_calc(B[i], true)}+${dust[i]}*${p}+${zeny[i]}`;
                }
                fill_material_data(undefined, true);
            }catch(err){
                console.log("exist invalid reference source, in yther_set.");
                alert("setting fails, exist invalid reference source..")
            }
            recover();
        }
    } catch (err) {
        console.log(err);
        alert("setting fails");
    }
}
function clear_material_data(ev) {
    // alert("clear_material_data");
    var values = document.querySelectorAll(".material_list .value");
    for (var temp of values) {
        temp.value = "";
    }
    operation_cb(ev);
}
function fill_material_data(ev, not_checking) {
    // alert("default_material_data");
    rebind_material_data();
    if(not_checking != true){
        fix_material_data();
    }
    var lists = document.querySelectorAll(".material_list");

    for (var temp of lists) {
        let offset = 0;
        if (temp.id == "TA" || temp.id == "TB") {
            offset += 5;
        }

        var data = material_data_map.get(temp.id);
        var inputs = temp.querySelectorAll("input");
        for (var i = 0; i < inputs.length; i++) {
            if (data[i + offset] != undefined) {
                var value = "" + data[i + offset];
                // var value = value.indexOf(".") < 0 ? value : value.slice(0, value.indexOf(".") + 3);
                inputs[i].value = value;
            } else {
                var value = "";
                inputs[i].value = value;
            }
        }
    }
    if (not_checking == undefined) {
        tip_material_data();
        operation_cb(ev);
    }
}
function rebind_material_data() {
    material_data_map.set("A", A);
    material_data_map.set("B", B);
    material_data_map.set("C", C);
    material_data_map.set("TA", TA);
    material_data_map.set("TB", TB);
    for (let [key, value] of material_data_map.entries()) {
        if(material_data_map_skip_workaround.get(key)==undefined){
            let temp = [...value];
            memset(temp, NaN, temp.length);
            material_data_map_skip_workaround.set(key, temp);
        }
    }
}

function fix_material_data() {
    for (let values of material_data_map.values()) {
        // console.log(values)
        values.forEach(function (value, index, array) {
            if (value != undefined) {
                value = Math.round(value * 100) / 100;
                array[index] = value;
                // console.log(value);
            }
        });
    }
}

function tip_material_data() {
    var lists = document.querySelectorAll(".material_list");
    for (var temp of lists) {
        if (temp.id == "TA" || temp.id == "TB") {
            var data = material_data_map.get(temp.id);
            var inputs = temp.querySelectorAll("input");
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].value == "undefined" || inputs[i].value == "") {
                    inputs[i].style.backgroundColor = "#CCCCCC";
                    // inputs[i].setAttribute("disabled", "true");
                } else if (inputs[i].value == "NaN") {
                    inputs[i].style.backgroundColor = "#EC9192";
                }
                else {
                    inputs[i].style.backgroundColor = "";
                }
            }
        } else {
            var data = material_data_map.get(temp.id);
            var inputs = temp.querySelectorAll("input");
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].value == "undefined" || inputs[i].value == "") {
                    // inputs[i].style.backgroundColor = "#CCCCCC";
                    inputs[i].style.backgroundColor = "#EC9192";
                    // inputs[i].setAttribute("disabled", "true");
                } else if (inputs[i].value == "NaN") {
                    inputs[i].style.backgroundColor = "#EC9192";
                }
                else {
                    inputs[i].style.backgroundColor = "";
                }
            }
        }
    }
}
// How do I empty an array in JavaScript? - Stack Overflow
// https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
function back_up() {
    for (let key of material_data_map_skip_workaround.keys()) {
        let A = material_data_map.get(key);
        let B = material_data_map_skip_workaround.get(key);
        let temp = A.slice();
        B.splice(0, B.length, ...temp);
    }
}
function recover() {
    for (let key of material_data_map_skip_workaround.keys()) {
        let A = material_data_map.get(key);
        let B = material_data_map_skip_workaround.get(key);
        let temp = B.slice();
        A.splice(0, A.length, ...temp);
    }
}
// javascript - How to get hex color value rather than RGB value? - Stack Overflow
// https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
function check_meterial_data_valid_otherwise_swap_to_workaround_data() {
    let skip_flag = false;
    const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
    for (let temp of document.querySelectorAll("#material .material_list input")) {
        if (temp.style.backgroundColor != "") {
            if (rgb2hex(temp.style.backgroundColor) == "#EC9192".toLowerCase()) {
                skip_flag = true;
                break;
            }
        }
    }
    return skip_flag;
}

function apply_material_data(ev, not_checking) {
    // alert("apply_material_data");
    back_up();
    for (let key of material_list_map.keys()) {
        let offset = 0;
        if (key == "TA" || key == "TB") {
            offset += 5;
        }
        let inputs = document.querySelectorAll(`#${key} input`);
        inputs.forEach(function (input, index) {
            let value;
            if (not_checking != undefined) {
                value = input.value;
                if (input.value == "") {
                    value = undefined;
                }
            } else {
                try {
                    value = input_calc(input.value);
                } catch (err) {
                    console.log(err);
                    value = undefined;
                }
            }

            material_data_map.get(key)[index + offset] = value;
            // if (input.value == "") {
            //     material_data_map.get(key)[index + offset] = undefined;
            // } else if (input.value != "") {
            //     material_data_map.get(key)[index + offset] = parseFloat(input.value);
            // }
        });
    }
    if (not_checking == undefined) {
        fill_material_data();
        if (check_meterial_data_valid_otherwise_swap_to_workaround_data() == false) {
            operation_cb(ev);
        } else {
            operation_cb({ value: "apply fail, miss some necessary data" });
            recover();
        }
    } else {
        fill_material_data(undefined, true);
    }
    
}

function refresh_all(ev) {
    for (let temp of Object.values(compares)) {
        temp.refresh_all_test();
    }
    operation_cb(ev);
    if (check_meterial_data_valid_otherwise_swap_to_workaround_data() == false) {
        operation_cb(ev);
    } else {
        operation_cb({ value: "apply fail, miss some necessary data" });
    }
}
function operation_cb(ev) {
    if (ev) {
        document.getElementById("operation_time").textContent = new moment().format("HH:mm:ss");
        document.getElementById("operation_tip").textContent = `${ev.value} : `;
    }
}
function new_compare(insertAtIndex) {
    // alert("new_compare");
    var compare = document.createElement("div");
    compare.classList.add("compare");
    while (compare.id == "") {
        var rand = Math.round(Math.random() * 1000000);
        if (document.querySelector(`compare_${rand}`) == null) {
            compare.id = `compare_${rand}`;
            compare.rand = rand;
            compare.setAttribute("rand", rand);
        }
    }
    compares[rand] = new Compare_UI(compare);

    var title_div = document.createElement("div");
    title_div.classList.add("title_block");
    compare.appendChild(title_div);

    var title = document.createElement("div");
    title.classList.add("title");
    title.textContent = "new compare";
    title.title = "new compare";
    title_div.appendChild(title);

    var blank = document.createElement("div");
    blank.classList.add("blank");
    title_div.appendChild(blank);


    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "edit";
    temp.setAttribute("onclick", "edit_compare(this)");
    title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "copy";
    temp.setAttribute("onclick", "copy_compare(this)");
    title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "refresh";
    temp.setAttribute("onclick", "compares[this.closest('.compare').rand].refresh_all_test()");
    title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "import(Test)";
    temp.setAttribute("onclick", "append_compare(this)");
    title_div.appendChild(temp);

    // var temp = document.createElement("input");
    // temp.type = "button";
    // temp.value = "export";
    // temp.setAttribute("onclick", "export_compare(this)");
    // title_div.appendChild(temp);

    var temp = document.createElement("input");
    temp.type = "button";
    temp.value = "delete";
    temp.setAttribute("onclick", "delete_compare(this)");
    title_div.appendChild(temp);


    var content_block = document.createElement("div");
    content_block.classList.add("content_block");
    compare.appendChild(content_block);

    var path_add = document.createElement("div");
    path_add.classList.add("path_add");

    // var temp = document.createElement("div");
    // temp.classList.add("title_block");
    var text = document.createElement("div");
    text.classList.add("title");
    text.textContent = "Add Test";
    // temp.appendChild(text);
    path_add.appendChild(text);
    var temp = document.createElement("div");
    temp.classList.add("name");
    var text = document.createElement("div");
    text.classList.add("text");
    text.textContent = "test name";
    temp.appendChild(text);
    var input = document.createElement("input");
    input.classList.add("input");
    temp.appendChild(input);
    path_add.appendChild(temp);

    var temp = document.createElement("div");
    temp.classList.add("price");
    var text = document.createElement("div");
    text.classList.add("text");
    text.textContent = "item price";
    temp.appendChild(text);
    var input = document.createElement("input");
    input.classList.add("input");
    temp.appendChild(input);
    path_add.appendChild(temp);

    var temp = document.createElement("div");
    temp.classList.add("kind");
    var text = document.createElement("div");
    text.classList.add("text");
    text.textContent = "item kind";
    temp.appendChild(text);
    // var kind = ["A3", "A4", "B", "SA", "SB"];
    var kind = ["A3", "A4", "B", "SA", "SB", "A5", "B2"];
    for (var k of kind) {
        var grid = document.createElement("label");
        grid.classList.add("grid");
        grid.classList.add("item_kind");
        grid.textContent = k;
        temp.appendChild(grid);

        var input = document.createElement("input");
        input.type = "radio";

        input.name = `item_kind_${compare.rand}`;
        input.id = `item_kind_${k}_${compare.rand}`;
        input.value = `${k}`;
        input.classList.add("step");
        input.classList.add(`item_kind`);
        input.classList.add(`item_kind_${compare.rand}`);
        input.classList.add(k);

        input.style.display = "none";

        grid.setAttribute("for", input.id);
        temp.insertBefore(input, grid);
        if (kind.indexOf(k) == 0) {
            input.checked = true;
        }
    }
    path_add.appendChild(temp);

    // tab page
    var tab = document.createElement("div");
    tab.classList.add("tab");
    var tab_link = document.createElement("button");
    tab_link.classList.add("tablinks");
    tab_link.setAttribute("onclick", "openTab(this)");
    tab_link.textContent = "string";
    tab.appendChild(tab_link);
    var tab_link = document.createElement("button");
    tab_link.style.display = "none";  // not implement, so hide
    tab_link.classList.add("tablinks");
    tab_link.setAttribute("onclick", "openTab(this)");
    tab_link.textContent = "UI";
    tab.appendChild(tab_link);
    path_add.appendChild(tab);

    let default_tape_page = tab.children[0];

    // step area(details)
    // tab page1
    var details = document.createElement("div");
    details.classList.add("details");
    details.classList.add("tabcontent");
    details.style.display = "none";


    var step_container = details;
    path_add.appendChild(details);

    var temp = document.createElement("div");
    temp.classList.add("string_from");
    var text = document.createElement("div");
    text.classList.add("text");
    text.textContent = "from";
    temp.appendChild(text);
    var input = document.createElement("select");
    input.classList.add("input");
    input.style.alignContent = "right";
    temp.appendChild(input);
    for (let i = 0; i <= 20; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        input.appendChild(option);
    }
    details.appendChild(temp);


    var temp = document.createElement("div");
    temp.classList.add("string_optimal");
    var text = document.createElement("div");
    text.classList.add("text");
    text.textContent = "optimal";
    temp.appendChild(text);
    var radio = document.createElement("input");
    radio.setAttribute("checked", "");
    radio.type = "radio";
    radio.name = `step_${compare.rand}`;
    // radio.style.display="float";
    // radio.style.left="18%";
    temp.appendChild(radio);
    // var text = document.createElement("div");
    // // text.classList.add("text");
    // text.textContent = "optimal";
    // text.style.padding="0 2px 0 0";
    // temp.appendChild(text);
    var input = document.createElement("input");
    input.classList.add("input");
    input.classList.add("step_optimal");
    input.style.minWidth = "68%";
    input.type = "number";
    input.style.textAlign = "right";
    input.min = "1";
    input.max = "20";
    input.value = "14";
    temp.appendChild(input);
    // var input = document.createElement("select");
    // input.classList.add("input");
    // input.style.minWidth="70%";
    // temp.appendChild(input);
    // for(let i=1;i<=20;i++){
    //     let option=document.createElement("option");
    //     option.value=i;
    //     option.textContent=i;
    //     input.appendChild(option);
    // }
    details.appendChild(temp);

    var temp = document.createElement("div");
    temp.classList.add("string_step");
    var text = document.createElement("div");
    text.classList.add("text");
    text.textContent = "step";
    temp.appendChild(text);
    var radio = document.createElement("input");
    // radio.setAttribute("checked","");
    radio.type = "radio";
    radio.name = `step_${compare.rand}`;
    // radio.style.display="float";
    // radio.style.left="18%";
    temp.appendChild(radio);
    var input = document.createElement("input");
    input.classList.add("input");
    input.classList.add("step_string");
    input.style.minWidth = "68%";
    temp.appendChild(input);
    details.appendChild(temp);

    var temp = document.createElement("div");
    // var text = document.createElement("div");
    // text.classList.add("text");
    // text.style.minWidth = "80%";
    // text.textContent = "";
    // temp.appendChild(text);
    var add = document.createElement("input");
    add.classList.add("input");
    add.type = "button";
    add.value = "add";
    add.setAttribute("onclick", "addTest(this)");
    add.style.marginLeft = "70%";
    temp.appendChild(add);
    details.appendChild(temp);

    // tab page2
    var details = document.createElement("div");
    details.classList.add("details");
    details.classList.add("tabcontent");
    details.style.display = "none";


    var step_container = details;
    path_add.appendChild(details);

    // var step_container=path_add;

    var temp = document.createElement("div");
    temp.classList.add("grid_row");
    var title = ["from", "N", "H", "X", "P", "T", "off", "auto"];
    for (var t of title) {
        var grid = document.createElement("div");
        grid.classList.add("grid");
        grid.classList.add("title");
        grid.classList.add(t);
        grid.textContent = t;
        temp.appendChild(grid);
    }
    step_container.appendChild(temp);

    for (var i = 0; i <= 20; i++) {
        var temp = document.createElement("div");
        temp.classList.add("grid_row");
        temp.classList.add("grid_row" + i);

        var content = [`+${i}`, "", "", "", "", "", "", ""];
        var content = [`+${i}`, `+${i}`, `+${i}`, `+${i}`, `+${i}`, `+${i}`, `+${i}`, `+${i}`];
        for (var k = 0; k < content.length; k++) {
            var t = content[k];
            var grid = document.createElement("label");
            grid.classList.add("grid");
            grid.classList.add(title[k]);
            grid.textContent = t;
            temp.appendChild(grid);

            if (title[k] == "from" || title[k] == "auto") {
                var input = document.createElement("input");
                if (title[k] == "from") {
                    input.type = "radio";
                }
                else if (title[k] == "auto") {
                    input.type = "checkbox";
                }
                input.name = `${title[k]}_${compare.rand}`;
                input.id = `${t}_${title[k]}_${compare.rand}`;
                input.value = `${t}`;
                input.classList.add(`${title[k]}`);
                input.classList.add(t);
                input.classList.add(`${compare.rand}`);

                input.style.display = "none";
                input.onclick = grid_onclick;

                grid.setAttribute("for", input.id);
                temp.insertBefore(input, grid);
            } else {
                var input = document.createElement("input");
                input.type = "radio";

                input.name = `${t}_step_${compare.rand}`;
                input.id = `${t}_step_${title[k]}_${compare.rand}`;
                input.value = `${t}`;
                input.classList.add("step");
                input.classList.add(`${title[k]}`);
                input.classList.add(t);
                input.classList.add(`${compare.rand}`);

                input.style.display = "none";
                input.onclick = grid_onclick;

                grid.setAttribute("for", input.id);
                temp.insertBefore(input, grid);
            }
        }
        step_container.appendChild(temp);
    }

    var temp = document.createElement("div");
    temp.style.display = "flex";
    temp.style.alignItems = "center";
    temp.classList.add("preview_path");
    var text = document.createElement("div");
    text.classList.add("text");
    text.textContent = "preview";
    text.style.fontSize = "12px";
    text.style.flex = "0 1 0";
    text.style.margin = "2px";
    temp.appendChild(text);
    var path = document.createElement("input");
    path.classList.add("path");
    path.style.textAlign = "left";
    path.style.margin = "2px";
    path.style.width = "20px";
    path.style.flex = "1 1 0";
    temp.appendChild(path);
    var add = document.createElement("input");
    add.type = "button";
    add.classList.add("add");
    add.style.flex = "0 1 0";
    add.style.margin = "2px";
    add.value = "add";
    add.setAttribute("onclick", "addTest(this)");
    temp.appendChild(add);
    step_container.appendChild(temp);
    // tab page2 end


    content_block.appendChild(path_add);

    // test area
    var test_area = document.createElement("div");
    test_area.classList.add("test_area");
    var text = document.createElement("div");
    text.classList.add("title");
    text.textContent = "Test Results";
    text.style.minWidth = "100%";
    var text2 = document.createElement("div");
    text2.classList.add("test_num");
    text2.style.display = "inline";
    text2.textContent = "0";
    text.appendChild(text2);
    test_area.appendChild(text);
    var test_result = document.createElement("div");
    test_result.classList.add("test_result");
    test_area.appendChild(test_result);
    content_block.appendChild(test_area);



    if (insertAtIndex) {
        let before = $(".compare")[insertAtIndex];
        document.getElementById("compare_area").insertBefore(compare, before);
    } else {
        document.getElementById("compare_area").appendChild(compare);
    }

    openTab(default_tape_page);

    return compares[compare.rand];
}
function grid_onclick() {
    if (this.classList.contains("off")) {
        // alert("grid_onclick");
    }
}
function import_compare(data, target_compare) {
    // alert("import_compare");
    // console.log("123");
    if(data==undefined){
        return;
    }

    let compare = target_compare != undefined ? target_compare : new_compare();
    if (data.compare_name) {
        compare.element.querySelector(".title").textContent = data.compare_name;
        compare.element.querySelector(".title").title = data.compare_name;
    }
    if (data.tests) {
        data = data.tests;
    }
    for (let test of data) {
        let estimate = new Estimate(test.item, test.level_start);
        if (test.step.indexOf("(opt") >= 0) {
            let level = parseInt(test.step.substr(test.step.indexOf("(opt") + 5));
            estimate.findOptimalWay(level);
        } else {
            estimate.addTest(test.step);
        }
        compare.addTest(new Test(estimate));
    }
}
function append_compare(ev) {
    // alert("append_compare");
    let target=ev.closest("[id^=compare]");
    import_file(target.id);
}
function export_compare(ev, just_return_content) {
    // alert("export_compare");
    let compares_data = [];

    let compare = ev == undefined ? undefined : ev.closest(".compare");
    let to_export = []; // compare object
    if (compare != undefined) {
        to_export.push(compares[compare.rand]);
    } else if (compare == undefined) {
        for (let temp of Object.values(compares)) {
            to_export.push(temp);
        }
    }

    for (let compare_object of to_export) {
        let compare_inner = [];
        for (let test of compare_object.tests) {
            let estimate = test.estimate;
            let item = new Item(estimate.itemName, estimate.price, estimate.sort);
            let level_start = estimate.level_start;
            let step = estimate.head[0].step;
            compare_inner.push({ item: item, level_start: level_start, step: step });
        }
        let compare_index = $(".compare").index(compare_object.element);
        // compares_data[compare_index] = (compare_inner);
        compares_data[compare_index] = { compare_name: compare_object.element.querySelector(".title").textContent, tests: compare_inner };
    }

    compares_data = compares_data.filter(function (data) {
        return data != undefined;
    });

    // console.log(compares_data);

    let export_data = {};
    export_data.dataType = "compare";
    export_data.compare_data = compares_data;
    if (just_return_content) {
        return export_data;
    } else {
        let filename = `Compare info[${new moment().format("YYYY-MM-DD")}]`;
        let content = JSON.stringify(export_data, null, 4);
        download(filename, content);
    }
}
function clear_compare() {
    // alert("clear_compare");
    for (let temp of Object.values(compares)) {
        temp.element.remove();
        delete compares[temp.element.rand];
        // console.log(temp.element.rand);
    }
}
function delete_compare(ev) {
    // alert("delete_compare");
    let compare = ev.closest(".compare");
    compare.remove();
    // compare.parentElement.removeChild(compare);
    delete compares[compare.rand];
    // console.log(compares);
}

// javascript - How to select all text in contenteditable div? - Stack Overflow
// https://stackoverflow.com/questions/12243898/how-to-select-all-text-in-contenteditable-div
jQuery.fn.selectText = function () {
    var doc = document;
    var element = this[0];
    console.log(this, element);
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range)
    }
};

function edit_compare(ev) {
    let compare = ev.closest(".compare");
    let title = compare.querySelector(".title");
    title.contentEditable = true;
    title.focus();
    $(title).selectText();
}
function copy_compare(ev) {
    let compare = ev.closest(".compare");
    let compare_object = compares[compare.rand];
    let current_index = $(".compare").index(compare_object.element);
    let temp = new_compare(current_index + 1);
    let compare_data = export_compare(ev, true).compare_data[0];
    import_compare(compare_data, temp);
}
function addTest(button) {
    // alert("addTest");
    // let step = document.querySelector("input.add").parentNode.children[1].value;
    if (button.closest(".compare").querySelector(".active").textContent == "string") {
        let step;
        let compare = compares[button.closest(".compare").rand];

        // console.log(compare.element.rand);
        let item_name = compare.element.querySelector(".name .input").value;
        let item_price;
        if (compare.element.querySelector(".price .input").value == "") {
            item_price = 0;
        } else if (compare.element.querySelector(".price .input").value != "") {
            try {
                item_price = input_calc(compare.element.querySelector(".price .input").value);
            } catch (err) {
                console.log(err);
                return;
            }
        }
        item_price = isNaN(parseFloat(item_price)) ? 0 : parseFloat(item_price);
        let item_kind = compare.element.querySelector(".kind .item_kind:checked").value;
        let item_from = compare.element.querySelector(".string_from .input").value;
        item_from = isNaN(parseInt(item_from)) ? 0 : parseInt(item_from);
        let item = new Item(item_name, item_price, item_kind);
        let estimate = new Estimate(item, item_from);

        let opt = true;
        for (var temp of document.getElementsByName(`step_${compare.element.rand}`)) {
            if (temp.checked == true) {
                if (opt == true) {
                    step = temp.nextSibling.value;
                    // console.log(`opt ${step}`);
                    if(item_kind=="SA" || item_kind=="SB"){
                        if(step>10){
                            step=10;
                        }
                    }
                    estimate.findOptimalWay(step);
                } else if (opt == false) {
                    step = temp.nextSibling.value;
                    estimate.addTest(step);
                }
                break;
            }
            opt = false;
        }

        compare.addTest(new Test(estimate));

    } else if (button.closest(".tablinks.active").textContent == "UI") {

        let step = button.closest(".preview_path").children[1].value;
        let compare = compares[button.closest(".compare").rand];
        let test_block = document.createElement("div");
        test_block.step = step;
        compare.tests.push(new Test_UI(test_block));
        console.log(step);
    }
}
function refresh_info() {

}




// step tab page
function openTab(tab_link) {
    let compare = tab_link.closest(".compare");
    let i, tabcontent, tablinks;
    tabcontent = compare.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = compare.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    let tab_index = Array.prototype.indexOf.call(tab_link.closest(".tab").children, tab_link);
    let tabcontents = tab_link.closest(".path_add").querySelectorAll(".tabcontent");
    if (tab_index <= tabcontents.length) {
        tabcontents[tab_index].style.display = "inline-flex";
    }
    tab_link.classList.toggle("active");
    // console.log(tab_link.closest(".path_add"));

}

// log rate table accroding sort(A3, A4, B, SA, SB)
function get_rate(sort){
    let print;
    let kinds;
    if(sort=="A5"||sort=="B2"){
        print="level".alignLeft(10) + ["","Y", "Z", "P"].join(" ".repeat(5));
        kinds=["Y", "Z", "P"];
    }else{
        print="level".alignLeft(10) + ["","N", "H", "X", "P", "T"].join(" ".repeat(5));
        kinds=["N", "H", "X", "P", "T"];
    }
    console.log(print);
    for(let i=1;i<=20;i++){
        let print="";
        let level=`+${i}`.alignLeft(10);
        print+=level;
        for(let kind of kinds){
            let e=new Estimate(new Item("", "", sort));
            let rate=`${e.mpOnce(kind, i)}%`.alignRight(6);
            print+=rate;
        }
        console.log(print);
    }
}
