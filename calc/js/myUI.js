'use strict';

class Material_UI {
    constructor(element) {
        this.element = element;
    }
}

class Test {
    constructor(estimate) {
        this.estimate = estimate;
        this.results = [];
        this.re_calc();
    }

    // public
    re_calc() {
        this.estimate.refresh();
        this.estimate.calc();   // calc_core function
        this.fill_results();    // copy calc_core results to the instance's variable(Test.results).
    }

    // private
    fill_results() {
        this.results = [];
        for (let i = 0; i <= this.estimate.head[0].level_end; i++) {
            // let temp = document.createElement("div");
            // temp.classList.add("one-result");
            let value;
            if (this.estimate.head[0].result[i] != undefined) {
                value = parseInt(this.estimate.head[0].result[i]);
            } else if (this.estimate.head[0].result[i] == undefined) {
                value = undefined;
            }
            // temp.textContent = value;
            // this.element.appendChild(temp);
            this.results.push(value);
        }
    }
}

class Compare_UI {
    constructor(element) {
        this.element = element;
        this.tests = [];
    }

    addTest(test) {
        this.tests.push(test);
        this.log_result_to_ui();
    }

    refresh_all_test() {
        for (let temp of this.tests) {
            temp.re_calc();
        }
        this.log_result_to_ui();
    }

    refreshTest(test_index) {
        this.tests[test_index].re_calc();
        this.log_result_to_ui();
    }

    removeTest(test_index) {
        // alert("removeTest");
        // console.log(ev.target);
        this.tests.splice(test_index, 1);
        this.log_result_to_ui();
    }
    log_result_to_ui() {
        // before here, all test has set estimate object and calc(fill_result)

        // update test num
        this.element.querySelector(".test_num").textContent = this.tests.length;

        // remove all rows in test_result block
        let test_result_block = this.element.querySelector(".test_result");
        while (test_result_block.firstChild) {
            test_result_block.removeChild(test_result_block.firstChild);
        }

        // generate rows according tests
        if (this.tests.length == 0) {
            // do nothing

        } else if (this.tests.length != 0) {
            // get max level_end in tests
            let max_level_end = -1;
            for (let test of this.tests) {
                if (test.estimate.head[0].level_end > max_level_end) {
                    max_level_end = test.estimate.head[0].level_end;
                }
            }

            // then create and append rows
            let temp = document.createElement("div");
            temp.classList.add("test_name_row");
            test_result_block.appendChild(temp);
            // temp = document.createElement("div");
            // temp.classList.add("item_price_row");
            // test_result_block.appendChild(temp);
            temp = document.createElement("div");
            temp.classList.add("item_kind_row");
            test_result_block.appendChild(temp);
            temp = document.createElement("div");
            temp.classList.add("test_step_row");
            test_result_block.appendChild(temp);

            for (let i = 0; i <= max_level_end; i++) {
                let row = document.createElement("div");
                row.classList.add("result_row");
                row.style.textAlign = "right";
                test_result_block.appendChild(row);
            }

            // set all rows in display:inline-flex
            for (let row of test_result_block.children) {
                row.style.display = "inline-flex";
                row.style.alignContent = "flex-start";
            }

            // create and append empty grid
            let test_num = this.tests.length;
            for (let row of test_result_block.children) {
                for (let i = 0; i < test_num; i++) {
                    let temp = document.createElement("div");
                    temp.style.width = "100px";
                    // temp.style.overflow="hidden"

                    if ($(row).hasClass("test_name_row")) {
                        // two div in the grid.  first element is text, sencond element is close button.
                        let temp2 = document.createElement("div");
                        // temp2.contentEditable = true;
                        temp2.classList.add("test_name");
                        temp2.onblur = function scrollBack(el) {
                            el.scrollLeft = 0;
                        };
                        temp.appendChild(temp2);
                        temp2 = document.createElement("div");
                        temp2.classList.add("hidden");
                        temp2.onclick = MouseOperation.remove_test;
                        temp.appendChild(temp2);
                        temp2 = document.createElement("div");
                        temp2.classList.add("hidden");
                        temp2.onclick = MouseOperation.refresh_test;
                        temp.appendChild(temp2);

                    }
                    row.appendChild(temp);
                }
            }


            // set grid'textContent
            for (let i = 0; i < this.tests.length; i++) {
                let test = this.tests[i];
                // console.log(test_result_block.querySelector(".test_name_row"));
                test_result_block.querySelector(".test_name_row").children[i].children[0].textContent = test.estimate.itemName;
                test_result_block.querySelector(".test_name_row").children[i].children[0].title = test.estimate.itemName;
                test_result_block.querySelector(".test_name_row").children[i].children[1].textContent = "\u2716";
                test_result_block.querySelector(".test_name_row").children[i].children[2].textContent = "\u27f3";
                // test_result_block.querySelector(".test_name_row").children[i].textContent = test.estimate.itemName != "" ? test.estimate.itemName : "　";
                // test_result_block.querySelector(".item_price_row").children[i].textContent = test.estimate.price;
                test_result_block.querySelector(".item_kind_row").children[i].textContent = test.estimate.sort;
                test_result_block.querySelector(".test_step_row").children[i].textContent = test.estimate.head[0].step;
                // test_result_block.querySelector(".test_step_row").children[i].textContent = test.estimate.head[0].step != "" ? test.estimate.head[0].step : "　";
                for (let k = 0; k < test.results.length; k++) {
                    let result = test.results[k];
                    if (result == undefined) {
                        // if let result=undefined, will get empty block.  in flex display?, the block can get height.
                        // result="undefined";
                        // result="-";
                    }
                    test_result_block.querySelectorAll(".result_row")[k].children[i].textContent = result;
                }
                // if (this.element.querySelector(".test_name") == undefined) {
                //         for (let temp of this.element.children) {
                //             temp.style.alignSelf = "flex-start";
                //             temp.style.wordBreak = "break-word";
                //         }
                //     }
                // this.element.querySelector(".test_name").textContent = this.estimate.itemName != "" ? this.estimate.itemName : "　";
                // this.element.querySelector(".item_price").textContent = this.estimate.price;
                // this.element.querySelector(".item_kind").textContent = this.estimate.sort;
                // this.element.querySelector(".test_step").textContent = this.estimate.head[0].step != "" ? this.estimate.head[0].step : "　";
            }



            // row title(first column)
            let title_width = "80px";
            temp = document.createElement("div");
            temp.style.width = title_width;
            temp.textContent = "test name";
            let row = test_result_block.querySelector(".test_name_row");
            row.insertBefore(temp, row.firstChild);

            temp = document.createElement("div");
            temp.style.width = title_width;
            temp.textContent = "item kind";
            row = test_result_block.querySelector(".item_kind_row");
            row.insertBefore(temp, row.firstChild);

            temp = document.createElement("div");
            temp.style.width = title_width;
            temp.textContent = "step";
            row = test_result_block.querySelector(".test_step_row");
            row.insertBefore(temp, row.firstChild);


            let level_count = 0;
            for (let row of test_result_block.querySelectorAll(".result_row")) {
                temp = document.createElement("div");
                temp.style.width = title_width;
                temp.textContent = `level ${level_count}`;
                temp.style.textAlign = "left";
                level_count++;
                row.insertBefore(temp, row.firstChild);
            }

            // function testHoverInit() {
            //     $('.result_row div').hover(function () {
            //         var t = parseInt($(this).index()) + 1;
            //         $(this).parents('.test_result').find('div > div:nth-child(' + t + ')').addClass('highlighted');
            //         $(this).removeClass('highlighted');
            //     },
            //         function () {
            //             var t = parseInt($(this).index()) + 1;
            //             $(this).parents('.test_result').find('div > div:nth-child(' + t + ')').removeClass('highlighted');
            //         });
            // }
            function testHoverInit2() {  // this can get effect with future adding element
                $('.test_result > div > div').hover(function () {
                    var t = parseInt($(this).index()) + 1;
                    $(this).parents('.test_result').find('div:first-child > div:nth-child(' + t + ') > div:not(:first-child)').removeClass('hidden');
                    // $(this).parents('.test_result').find('div:first-child > div:nth-child(' + t + ') > div:nth-child(2)').removeClass('hidden');
                    // $(this).parents('.test_result').find('div:first-child > div:nth-child(' + t + ') > div:nth-child(2)').addClass('visible');
                },
                    function () {
                        var t = parseInt($(this).index()) + 1;
                        $(this).parents('.test_result').find('div:first-child > div:nth-child(' + t + ') > div:not(:first-child)').addClass('hidden');
                        // $(this).parents('.test_result').find('div:first-child > div:nth-child(' + t + ') > div:nth-child(2)').removeClass('hidden');
                        // $(this).parents('.test_result').find('div:first-child > div:nth-child(' + t + ') > div:nth-child(2)').removeClass('visible');
                    });
            }
            // function contentEditable() {
            //     $('.test_name_row > div:not(:first-child) > div:first-child').click(function () {
            //         this.contentEditable=true;
            //     });
            // }
            // contentEditable();
        }
    }

    copy(){
        
    }
}
class MouseOperation {
    static refresh_test = function (ev) {
        let compare = ev.target.closest(".compare");
        let test_index = $(compare.querySelectorAll(".test_name_row > div:not(:first-child)")).index(ev.target.parentElement);
        let compare_instance = compares[compare.rand];
        compare_instance.refreshTest(test_index);
    }
    static remove_test = function (ev) {
        let compare = ev.target.closest(".compare");
        let test_index = $(compare.querySelectorAll(".test_name_row > div:not(:first-child)")).index(ev.target.parentElement);
        let compare_instance = compares[compare.rand];
        compare_instance.removeTest(test_index);
    }
}