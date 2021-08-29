'use strict';

// // test command
// e=new Estimate(new Item("AAAA", 123, "A4"));
// e.findOptimalWay(20);
// e.findOptimalWay(12);
// e.addTest("N12345678 X9A");
// e.calc();
// e;
// e.show();
// e.show();
// e.changeItem(new Item("BBBB", 7135, "A4"), 9);
// e.addTest("N12345678 P9A", Estimate.ONCE);
// e.show();e.show();

String.prototype.alignLeft = function (length) {
    if (this.length >= length) {
        return String(this);
    } else {
        let paddingValue = " ".repeat(length);
        return String(this + paddingValue).slice(0, length);
    }
};
String.prototype.alignRight = function (length) {
    if (this.length >= length) {
        return String(this);
    } else {
        let paddingValue = " ".repeat(length);
        return String(paddingValue + this).slice(-length);
    }
};
class MagicEx {
    static normalMagic = [3, 10, 20, 40, 50];
    static pollutedMagic = [1, 2, 4, 7, 10];
    constructor(normalMagicFee, pollutedMagicFee) {
        this.normalMagicFee = normalMagicFee;
        this.pollutedMagicFee = pollutedMagicFee;
    }

    mm(i) {
        return this.normalMagicFee * MagicEx.normalMagic[i - 1] + this.pollutedMagicFee * MagicEx.pollutedMagic[i - 1];
    }
    mp(i) {
        return 100 - i * 10;
    }

    calc_costom_fee(str) {  // old
        let array = [];

        for (let s of str) {
            if (array[s] == undefined) {
                array[s] = 1;
            } else if (array[s] >= "1" && array[s] <= "9") {
                array[s]++;
            }
        }
        for (let i = 0; i < array.length; i++) {
            if (array[i] == undefined) {
                array[i] = 0;
            }
        }
        for (let i = 1; i < array.length; i++) {
            array[array.length - i - 1] += array[array.length - i];
        }
        let sum = 0, normal_num = 0, polluted_num = 0;
        for (let i = 0; i < array.length - 1; i++) {
            // console.log(`A:${sum}`);
            sum += this.normalMagicFee * MagicEx.normalMagic[i] * array[i];
            normal_num += MagicEx.normalMagic[i] * array[i];
            // console.log(`B:${sum}`);
            sum += this.pollutedMagicFee * MagicEx.pollutedMagic[i] * array[i];
            polluted_num += MagicEx.pollutedMagic[i] * array[i];
            // console.log(`C:${sum}`);
        }
        console.log(normal_num, polluted_num);
        console.log(sum, array);
    }
    // my("2434333324");

    static fee_table(normalMagicFee = 5, pollutedMagicFee = 80) {
        let acc1 = 0, acc2 = 0;
        let gap = 15;

        console.log({ normalMagicFee, pollutedMagicFee });
        console.log("".alignRight(10) + "once".alignRight(gap) + "one-end".alignRight(gap) + "acc".alignRight(gap) + "acc-fee".alignRight(gap));
        let normalMagic = this.normalMagic;
        let pollutedMagic = this.pollutedMagic

        for (let i = 0; i < 5; i++) {
            let mp = 1 - 0.1 * (i + 1);
            let once = `${normalMagic[i]}/${pollutedMagic[i]}`;
            let one_end = `${(normalMagic[i] / mp).toFixed(2)}/${(pollutedMagic[i] / mp).toFixed(2)}`;
            acc1 += normalMagic[i] / mp;
            acc2 += pollutedMagic[i] / mp;
            let acc = `${acc1.toFixed(2)}/${acc2.toFixed(2)}`;
            let acc_fee = `${(acc1 * normalMagicFee + acc2 * pollutedMagicFee).toFixed(2)}`;
            console.log(`level ${i + 1}`.alignLeft(10) + once.alignRight(gap) + one_end.alignRight(gap) + acc.alignRight(gap) + acc_fee.alignRight(gap));
        }
        console.log("-".repeat(40));
    }

    static calc_costom_fee_new(array_or_str, normalMagicFee = 5, pollutedMagicFee = 80) {  // old
        let array = [];
        if (array_or_str instanceof Array) {
            array = array_or_str;
        } else if (typeof (array_or_str) == "string") {
            // arrays - Call forEach on a string in JavaScript - Stack Overflow
            // https://stackoverflow.com/questions/57644418/call-foreach-on-a-string-in-javascript
            [...array_or_str].forEach(function (value, index) {
                if (isNaN(parseInt(value)) == false) {
                    array[index] = parseInt(value);
                } else {
                    array[index] = 0;
                }
            })
        }
        let sum = 0, normal_num = 0, polluted_num = 0;
        for (let i = 0; i < array.length && i <= 4; i++) {
            // console.log(`A:${sum}`);
            sum += normalMagicFee * MagicEx.normalMagic[i] * array[i];
            normal_num += MagicEx.normalMagic[i] * array[i];
            // console.log(`B:${sum}`);
            sum += pollutedMagicFee * MagicEx.pollutedMagic[i] * array[i];
            polluted_num += MagicEx.pollutedMagic[i] * array[i];
            // console.log(`C:${sum}`);
        }
        console.log(normal_num, polluted_num);
        console.log(sum, array);
    }
}

class pair {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
}


var material_listA = ["大神", "濃縮神*", "高濃縮神*", "鈽鐳"];
var material_listB = ["大鋁", "濃縮鋁*", "高濃縮鋁*", "鈣"];
var material_listC = ["鐵祝*", "祝武", "祝防", "神乎"];
var material_listTA = ["+5", "+6", "+7", "+8", "+9", "+10", "+11", "+12", "+13", "+14"];   //+5~+9 weapon    ticket fee (T icket) 
var material_listTB = ["+5", "+6", "+7", "+8", "+9", "+10", "+11", "+12", "+13", "+14"]; //+5~+9 equipment ticket fee 
var material_list_map = new Map();
material_list_map.set("A", material_listA);
material_list_map.set("B", material_listB);
material_list_map.set("C", material_listC);
material_list_map.set("TA", material_listTA);
material_list_map.set("TB", material_listTB);
var material_list_title_map = new Map();
material_list_title_map.set("A", "武器");
material_list_title_map.set("B", "防具");
material_list_title_map.set("C", "防爆");
material_list_title_map.set("TA", "武券");
material_list_title_map.set("TB", "防券");



// var A = [6, 28 * 5.5, 28 * 6.9, 200];        // weapon    upgrade fee
// var B = [10, 28 * 6, 28 * 6.9, 200];      // equipment upgrade fee
// var C = [28 * 29, 3700, 5400, 9000];  // smith,weapon,equipment,god blessing fee

// material fee (P point, T bee)
var p_point_rate = 30;
var t_rate = 35;
var A = [5.12222, p_point_rate * 5.5, p_point_rate * 6.9, 200];        // weapon    upgrade fee
var B = [9, p_point_rate * 6, p_point_rate * 6.9, 200];      // equipment upgrade fee
var C = [p_point_rate * 29, 3000, t_rate * 115, t_rate * 300];  // smith,weapon,equipment,god blessing fee

var TA = [, , , , , 1500, 17000, 17000, 19000, , , , , ,];   //+5~+9 weapon    ticket fee (T icket) 
var TB = [, , , , , 3000, 45000, 45000, , , , , , ,]; //+5~+9 equipment ticket fee 

var material_data_map = new Map();
var material_data_map_skip_workaround = new Map();

var smithNum = [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 4];     // needed nim of smith blessing for trying certain upgrade
var whiteSmithRateInc = 10; //default use, (unsafe upgrade, normal) success rate +10%

// success rate
//  weapon LV.3
var RA3 = [[100, 100, 100, 100, 100, 60, 50, 20, 20, 19, 18, 18, 18, 18, 18, 17, 17, 17, 15, 15],//nh1~8 (N ormal)
[100, 100, 100, 100, 100, 90, 80, 40, 40, 30, 18, 18, 18, 18, 18, 17, 17, 17, 15, 15],//h1~8; (H igh)
[0, 0, 0, 0, 0, 0, 80, 40, 40, 30, 18, 18, 18, 18, 18, 17, 17, 17, 15, 15]];  //p7~20;  (P revent)
//  weapon LV.4
var RA4 = [[100, 100, 100, 100, 60, 40, 40, 20, 20, 9, 8, 8, 8, 8, 8, 7, 7, 7, 5, 5],//nh1~7 (N ormal)
[100, 100, 100, 100, 90, 70, 70, 40, 40, 20, 8, 8, 8, 8, 8, 7, 7, 7, 5, 5],//h1~7; (H igh)
[0, 0, 0, 0, 0, 0, 70, 40, 40, 20, 8, 8, 8, 8, 8, 7, 7, 7, 5, 5]];  //p7~20;  (P revent)

//  equipment
var RB = [[100, 100, 100, 100, 60, 40, 40, 20, 20, 9, 8, 8, 8, 8, 8, 7, 7, 7, 5, 5],//nh1~7 (N ormal)
[100, 100, 100, 100, 90, 70, 70, 40, 40, 20, 8, 8, 8, 8, 8, 7, 7, 7, 5, 5],//h1~7; (H igh)
[0, 0, 0, 0, 0, 0, 70, 40, 40, 20, 8, 8, 8, 8, 8, 7, 7, 7, 5, 5]];  //p7~20;  (P revent)


function memset(array, val, size) {
    for (var i = 0; i < size; ++i) {
        array[i] = val;
    }
}

function alloc(size, val) {
    let re = new Array(size);
    memset(re, val == undefined ? 0 : val, size);
    return re;
}

class Item {
    constructor(itemName, price, sort) {
        this.itemName = itemName;
        this.price = price;
        this.sort = sort;
    }
};


var newEnum = (descriptions) => {
    const result = {};
    Object.keys(descriptions).forEach((description) => {
        result[result[description] = descriptions[description]] = description;
    });
    return Object.freeze(result);
};

// for method "show()"
var ShowInfo = newEnum({
    ExpectedTotalFee: 1,
    OnceRate: 2, OneToEndRate: 3,
    OnceMFee: 4, OneToEndMFee: 5, ExpectedMFee: 6,
    OnceItemFee: 7, OneToEndItemFee: 8, ExpectedItemFee: 9,
    VerificationExpectedTotalFee: 10,
    AllInfo: 11, None: 12,
    Material: 13, AllInfoExtend: 14,
});

// for method "showMaterial()", used to control which kind of material to print.  so before call showMaterial(), need to find out the List of MaterialInfo
var MaterialInfo = newEnum({
    ITEM: 1,  // if use "Item" will conflict with "class Item"
    Normal: 2, High: 3, Xtra: 4, XtraHigh: 5,
    SmithBless: 6, OldBless: 7, GodBless: 8,
    Ticket: 9,
    cItemFee: 10, cMFee: 11, cTotalFee: 12,
}); //check

class Estimate {
    static Test = class {
        static Result = class {
            constructor() {
                this.nItem = 0;
                this.nMaterial = alloc(4);  // N H X X(11up)
                this.nBless = alloc(3);     // smith,weapon/equipment,god blessing
                this.nTicket = alloc(21);   //+1~+13 ticket fee (T icket) 
            }

            clone() {
                let re = new Estimate.Test.Result();
                re.nItem = this.nItem;
                re.nMaterial = this.nMaterial.slice();
                re.nBless = this.nBless.slice();
                re.nTicket = this.nTicket.slice();
                return re;
            }

            add_result(r2) {
                let re = this.clone();
                re.nItem += r2.nItem;
                for (let i = 0; i < this.nMaterial.length; i++) {
                    re.nMaterial[i] += r2.nMaterial[i];
                }
                for (let i = 0; i < this.nBless.length; i++) {
                    re.nBless[i] += r2.nBless[i];
                }
                for (let i = 0; i < this.nTicket.length; i++) {
                    re.nTicket[i] += r2.nTicket[i];
                }

                return re;
            }

            mul(value) {
                let re = this.clone();
                re.nItem *= value;
                for (let i = 0; i < this.nMaterial.length; i++) {
                    re.nMaterial[i] *= value;
                }
                for (let i = 0; i < this.nBless.length; i++) {
                    re.nBless[i] *= value;
                }
                for (let i = 0; i < this.nTicket.length; i++) {
                    re.nTicket[i] *= value;
                }

                return re;
            }

            div(value) {
                let re = this.clone();
                re.nItem /= value;
                for (let i = 0; i < this.nMaterial.length; i++) {
                    re.nMaterial[i] /= value;
                }
                for (let i = 0; i < this.nBless.length; i++) {
                    re.nBless[i] /= value;
                }
                for (let i = 0; i < this.nTicket.length; i++) {
                    re.nTicket[i] /= value;
                }

                return re;
            }

            checkTotal(itemPrice, sort) {
                return this.checkItemFee(itemPrice) + this.checkMFee(sort);
            }
    
            checkItemFee(itemPrice) {
                return this.nItem * itemPrice;
            }
    
            checkMFee(sort) {
                let re = 0;
                if (sort=="A3" || sort=="A4" || sort=="SA") {
                    re += this.nMaterial[0] * A[0];
                    re += this.nMaterial[1] * A[1];
                    re += this.nMaterial[2] * A[2];
                    re += this.nMaterial[3] * A[3];
                    re += this.nBless[0] * C[0];
                    re += this.nBless[1] * C[1];
                    re += this.nBless[2] * C[3];
                    for (let i = 0; i < 21; i++) {
                        if (this.nTicket[i] != 0) {
                            re += this.nTicket[i] * TA[i];
                        }
                    }
                }
                else if (sort=="B" || sort=="SB") {
                    re += this.nMaterial[0] * B[0];
                    re += this.nMaterial[1] * B[1];
                    re += this.nMaterial[2] * B[2];
                    re += this.nMaterial[3] * B[3];
                    re += this.nBless[0] * C[0];
                    re += this.nBless[1] * C[2];
                    re += this.nBless[2] * C[3];
                    for (let i = 0; i < 21; i++) {
                        if (this.nTicket[i] != 0) {
                            re += this.nTicket[i] * TB[i];
                        }
                    }
                } else {
                    console.log("has wrong sort in checkMFee");
                }
                return re;
            }
        }


        constructor(step, once = false) {  //class Test
            this.step = step;
            this.once = once == true ? true : false;
            this.next = null;
            this.level_end = 0;

            this.result = alloc(21);
            memset(this.result, undefined, this.result.length);
            this.onceRate = alloc(21);
            this.oneToEndRate = alloc(21);
            this.onceMFee = alloc(21);
            this.oneToEndMFee = alloc(21);
            this.expectedMFee = alloc(21);
            this.onceItemFee = alloc(21);
            this.oneToEndItemFee = alloc(21);
            this.expectedItemFee = alloc(21);
            this.verificationExpectedTotalFee = alloc(21);
            this.resultExtend = [];
            for (let i = 0; i < 21; i++) {
                this.resultExtend.push(new Estimate.Test.Result());
            }
        }
    }

    // class Estimate
    static ONCE = true;

    // for some Test added by "addTest()" to perform specific require in "show()"
    // item base price, sort = A3,A4 or B
    constructor(item, level_start = 0) {
        this.itemName = item.itemName;
        this.price = item.price;
        this.sort = item.sort;
        this.level_start = level_start;
        this.head = new Array();
    }

    changeItem(item, level_start = 0) {
        this.itemName = item.itemName;
        this.price = item.price;
        this.sort = item.sort;
        this.level_start = level_start;
        let tempT = this.head.slice(0);
        this.head = new Array();
        for (let temp of tempT) {
            let find = "(opt";
            if (temp.step.indexOf(find) >= 0) {                                      // check Test is auto find optimal or not
                let level = parseInt(temp.step.substr(temp.step.indexOf(find) + 5));
                this.findOptimalWay(level);
            } else {
                if (temp.step.indexOf("[") >= 0) {
                    let step;
                    step = temp.step.substr(temp.step, temp.step.indexOf("["));
                    step += temp.step.substr(temp.step.indexOf("]") + 1);

                    this.addTest(step, temp.once);
                } else {
                    this.addTest(temp.step, temp.once);
                }
            }
        }
    }

    // web version adding
    // refresh, call changeItem with original item to refresh the optimal way step
    refresh() {
        this.changeItem(new Item(this.itemName, this.price, this.sort), this.level_start);
    }

    // web version adding
    renameTestName(newName) {
        this.itemName = newName;
    }

    // ex:T5N678H9ABCDEFG
    addTest(step, once = false) {

        //process for checking pre stage exist or not. (should exist)
        let process = step.lastIndexOf(this.decimalToHexChar(this.level_start + 1));
        if (process >= 0) {
            while (this.isKindOrNot(step[process]) == false && process>=0) { // avoid infinite loop
                process--;
            }

            if (step[process] == 'X') {
                let fix = step;
                let s = this.preProcessForSpecificConditionX(fix, step.lastIndexOf(this.decimalToHexChar(this.level_start + 1)));

                // for (let i = 0; i < s.size(); i++) {
                //     console.out(s[i]);
                // }
                let min = Number.MAX_VALUE;
                for (let i = 0; i < s.length; i++) {
                    let buf = s[i];
                    let temp = this.operate(this.price, 'X', this.level_start + 1, buf);
                    if (temp < min) {
                        min = temp;
                        fix = s[i];
                    }
                }
                step = fix;
            }
        }
        //process for checking pre stage exist or not. (should exist)

        this.head.push(new Estimate.Test(step, once));
    }

    findOptimalWay(goalLevel) {
        this.calcOptimalWay(goalLevel);
    }


    deleteLastTest() {
        return this.head.pop();
    }

    deleteOptimalWay(level) {
        let index = 0;
        while (index < this.head.length) {
            let temp = this.head[index];
            if (temp.indexOf(`(opt ${level})`) >= 0) {
                this.head.slice(index, 1);
            } else {
                index++;
            }
        }
    }

    clearTest() {
        this.head.splice(0);
    }

    decimalToHexChar(value) {
        if (value >= 0 && value <= 9)
            return String.fromCharCode(value + '0'.charCodeAt(0));
        else if (value >= 10 && value <= 15)
            return String.fromCharCode((value - 10) + 'A'.charCodeAt(0));
        else if (value >= 16 && value <= 20)
            return String.fromCharCode((value - 16) + 'a'.charCodeAt(0));
        else {
            console.log("unexpected input in decimalToHexChar\n");
            return -1;
        }
    }

    isHexCharOrNot(hex) {
        if (hex >= '0' && hex <= '9')
            return true;
        else if (hex >= 'A' && hex <= 'F')
            return true;
        else if (hex >= 'a' && hex <= 'e')
            return true;
        else {
            return false;
        }
    }
    hexCharToDecimal(hex, print = true) {
        if (hex >= '0' && hex <= '9')
            return hex.charCodeAt(0) - '0'.charCodeAt(0);
        else if (hex >= 'A' && hex <= 'F')
            return (hex.charCodeAt(0) - 'A'.charCodeAt(0)) + 10;
        else if (hex >= 'a' && hex <= 'e')
            return (hex.charCodeAt(0) - 'a'.charCodeAt(0)) + 16;
        else {
            if (print)
                console.log("unexpected input in hexCharToDecimal\n");
            return -1;
        }
    }

    isKindOrNot(ch) {
        // N H P T S X
        switch (ch) {
            case 'N':
            case 'H':
            case 'P':
            case 'T':
            case 'S':
            case 'X':
                return true;
            default:
                return false;
        }
    }

    preProcessForSpecificConditionX(step, hstep, recursive = false) {
        if(hstep==-1){
            return;
        }

        let level = this.hexCharToDecimal(step[hstep + recursive]);  // must >=8

        let kind = ['N', 'H', 'X', 'P'];
        if (this.sort=="SA" || this.sort=="SB") {
            kind.pop();
        }
        let front, temp;
        let min = Number.MAX_VALUE;
        let re = [];    // store return step string

        front = step.substr(0, hstep);
        for (let i = 0; i < kind.length; i++) {
            if (kind[i] != 'X') {
                if (kind[i] == 'P' && (level - 1) > 14) {
                    continue;
                } else if ((kind[i] == 'N' || kind[i] == 'H') && (level - 1) > 10) {
                    continue;
                }
                temp = `${front}[${kind[i]}${this.decimalToHexChar(level - 1)}]${step.substr(hstep)}`;
                //printf("in: %s[%c%c]%s\n",front,kind[i],decimalToHexChar(level-1),hstep);
                re.push(temp);
            }
            else if (kind[i] == 'X' && (level - 1) >= 8) {
                temp = `${front}[${kind[i]}${this.decimalToHexChar(level - 1)}]${step.substr(hstep)}`;
                //printf("in: %s[%c%c]%s\n",front,kind[i],decimalToHexChar(level-1),hstep);

                //cout<<"in2: "<<&temp[hstep-step]<<endl;
                let get = this.preProcessForSpecificConditionX(temp, hstep + 1, true);
                re = re.concat(get);
            }
        }
        return re;
    }


    // private:
    calc() {
        for (let tempT of this.head) {
            let level_start = this.level_start;
            tempT.result[level_start] = this.price;
            tempT.resultExtend[level_start].nItem = 1; // extend version5_0
            let step = tempT.step;
            let process = 0;  // index of step
            let kind;
            let level;
            let oper = false;

            // process [] : ex: X[[H7]X8]9, extract "X" from "X9" and process from "9"
            if (step.indexOf("[") >= 0) {
                process = step.lastIndexOf('[');
                while (this.isKindOrNot(step[process]) == false)
                    process--;
                kind = step[process];
                process = step.lastIndexOf(']') + 1;
            }
            // process []

            while (process < step.length && step[process] != '(') {
                if (this.isHexCharOrNot(step[process])) {
                    level = this.hexCharToDecimal(step[process]);
                    oper = true;
                    process++;
                }
                else if (this.isKindOrNot(step[process])) {
                    kind = step[process];
                    process++;
                }
                else if (step[process] == ' ') {
                    process++;
                }
                else {
                    console.log(`has wrong input`);
                    break;
                }

                if (oper && level > level_start) {
                    oper = false;
                    tempT.level_end = level;

                    // shadow sort
                    if (this.sort == "SA" || this.sort == "SB") {
                        if (level > 10) {
                            continue;
                        }
                    }

                    let temp;
                    let tempExtend;  // extend version5_0
                    if (kind == 'T') {
                        temp = tempT.result[level_start];
                        tempExtend = tempT.resultExtend[level_start].clone();  // extend version5_0
                    }
                    else {
                        temp = tempT.result[level - 1];
                        tempExtend = tempT.resultExtend[level - 1].clone();  // extend version5_0
                    }

                    temp = this.operate(temp, kind, level, tempT.step);
                    tempT.result[level] = temp;
                    tempExtend = this.operateExtend(tempExtend, kind, level, tempT.step);  // extend version5_0
                    tempT.resultExtend[level] = tempExtend;   // extend version5_0

                    //other info check

                    temp = kind != 'T' ? tempT.result[level - 1] : tempT.result[level_start];

                    tempT.onceRate[level] = this.mpOnce(kind, level);
                    tempT.oneToEndRate[level] = this.mpOneEnd(kind, level, tempT.step);
                    tempT.onceMFee[level] = this.mmOnce(kind, level);
                    tempT.oneToEndMFee[level] = this.mmOneEnd(kind, level, tempT.step);
                    tempT.expectedMFee[level] = this.mmOneEnd(kind, level, tempT.step) / (this.mpOneEnd(kind, level, tempT.step) / 100);

                    tempT.onceItemFee[level] = temp;
                    tempT.oneToEndItemFee[level] = temp;
                    tempT.expectedItemFee[level] = temp / (this.mpOneEnd(kind, level, tempT.step) / 100);
                    tempT.verificationExpectedTotalFee[level] = tempT.expectedMFee[level] + tempT.expectedItemFee[level];
                }
            }
        }
    }

    calcOptimalWay(goalLevel)  //top to 15
    {
        if (goalLevel > 20) {
            console.log("for case of \"goalLevel>20\" doesn't be implement.");
            return;
        }

        let tempT = new Estimate.Test("");
        let level_start = this.level_start;
        tempT.result[level_start] = this.price;
        let lastKind = 0;

        for (let i = level_start + 1; i <= goalLevel; i++) {

            if (this.sort == "SA" || this.sort == "SB") {
                if (i > 10) {
                    break;
                }
            }

            let min = Number.MAX_VALUE;
            let level = i;
            let kind;
            let finalKind;
            let current = tempT.result[level - 1];
            let temp;

            if (i <= 10) {
                kind = 'N';
                temp = this.operate(current, kind, level);
                if (temp < min) {
                    min = temp;
                    finalKind = kind;
                }

                kind = 'H';
                temp = this.operate(current, kind, level);
                if (temp < min) {
                    min = temp;
                    finalKind = kind;
                }
            }

            if (i >= 7 && i <= 14) {
                if (this.sort != "SA" && this.sort != "SB") {
                    kind = 'P';
                    temp = this.operate(current, kind, level);
                    if (temp < min) {
                        min = temp;
                        finalKind = kind;
                    }
                }
            }

            let fix;
            if (i >= 8) {
                kind = 'X';
                //process for checking pre stage exist or not
                fix = `X${this.decimalToHexChar(level)}`;
                if (level_start + 1 == level) {
                    let s = this.preProcessForSpecificConditionX(fix, fix.lastIndexOf(this.decimalToHexChar(level)));
                    // console.log(s);
                    // for (let i = 0; i < s.length; i++)
                    //     console.log(`in calcOptimalWay : ${s[i]}`);
                    let minLocal = Number.MAX_VALUE;
                    for (let i = 0; i < s.length; i++) {
                        let temp2 = this.operate(this.price, 'X', level_start + 1, s[i]);
                        if (temp2 < minLocal) {
                            minLocal = temp2;
                            fix = s[i];
                        }
                    }
                    // console.log("minLocal : " + minLocal);
                    if (minLocal < min) {
                        min = minLocal;
                        finalKind = kind;
                    }
                    //process for checking pre stage exist or not
                } else {
                    temp = this.operate(current, kind, level, tempT.step);
                    if (temp < min) {
                        min = temp;
                        finalKind = kind;
                    }
                }

            }

            if (i >= 8 && i <= 10) {
                kind = 'S';
                temp = this.operate(current, kind, level);
                if (temp < min) {
                    min = temp;
                    finalKind = kind;
                }
            }

            if (i >= 5 && i <= 14 && this.mmOnce('T', level) != undefined) {
                if (this.sort != "SA" && this.sort != "SB") {
                    kind = 'T';
                    temp = this.operate(tempT.result[level_start], kind, level);
                    if (temp < min) {
                        min = temp;
                        finalKind = kind;
                    }
                }
            }

            tempT.result[level] = min;
            if (finalKind == 'T')
                tempT.step = `T${level}`;
            else if (finalKind == 'X' && level_start + 1 == level) {
                tempT.step = fix;
            }
            else {
                if (lastKind == 0 || (lastKind != finalKind)) {
                    if (tempT.step.length != 0) {
                        tempT.step = tempT.step.concat(" ");
                    }
                    tempT.step = tempT.step.concat(`${finalKind}`);
                }
                tempT.step = tempT.step.concat(`${this.decimalToHexChar(level)}`);
            }
            lastKind = finalKind;
        }
        tempT.step = tempT.step.concat(`(opt ${goalLevel})`);
        this.head.push(tempT);
    }

    mmOnce(kind, level = 0) {
        let sort = this.sort;
        if (sort == "A3" || sort == "A4" || sort == "SA") {
            switch (kind) {
                case 'N': return A[0];
                case 'H': return A[1];
                case 'P':
                    if (level == 7)
                        return C[1];
                    else if (level > 7 && level <= 13) {
                        if (level <= 10) {
                            if (A[1] + C[0] * smithNum[level - 1] < C[1])
                                return A[1] + C[0] * smithNum[level - 1];
                            else
                                return C[1];
                        }
                        else if (level > 10 && level < 13) {
                            if (A[3] + C[0] * smithNum[level - 1] < C[1])
                                return A[3] + C[0] * smithNum[level - 1];
                            else
                                return C[1];
                        }
                        else if (level == 13) {
                            let min = C[1];
                            min = min < A[3] + C[3] ? min : A[3] + C[3];
                            return min;
                        }
                        else {
                            console.log("has wrong kind in mmOnce");
                            return NaN;
                        }
                    }
                    else if (level == 14) {
                        return A[3] + C[3] * 2;
                    }
                    else {
                        console.log("has wrong kind in mmOnce");
                    }
                    return NaN;
                case 'T': return TA[level];
                case 'S': return level <= 10 ? A[2] : A[3];
                case 'X': return level <= 10 ? A[2] : A[3];
                default:
                    console.log("has wrong kind in mmOnce");
                    return NaN;
            }
        }
        else if (sort == "B" || sort == "SB") {
            switch (kind) {
                case 'N': return B[0];
                case 'H': return B[1];
                case 'P':
                    if (level == 7)
                        return C[2];
                    else if (level > 7 && level <= 13) {
                        if (level <= 10) {
                            if (B[1] + C[0] * smithNum[level - 1] < C[2])
                                return B[1] + C[0] * smithNum[level - 1];
                            else
                                return C[2];
                        }
                        else if (level > 10 && level < 13) {
                            if (B[3] + C[0] * smithNum[level - 1] < C[2])
                                return B[3] + C[0] * smithNum[level - 1];
                            else
                                return C[2];
                        }
                        else if (level == 13) {
                            let min = C[2];
                            min = min < B[3] + C[3] ? min : B[3] + C[3];
                            return min;
                        }
                        else {
                            console.log("has wrong kind in mmOnce");
                            return NaN;
                        }
                    }
                    else if (level == 14) {
                        return B[3] + C[3] * 2;
                    }
                    else {
                        console.log("has wrong kind in mmOnce");
                    }
                    return NaN;
                case 'T': return TB[level];
                case 'S': return level <= 10 ? B[2] : B[3];
                case 'X': return level <= 10 ? B[2] : B[3];
                default:
                    console.log("has wrong kind in mmOnce");
                    return NaN;
            }
        } else {
            console.log("has wrong sort in mmOnce");
            return NaN;
        }
    }

    mmOnceExtend(kind, level = 0) {
        let re = new Estimate.Test.Result();
        let sort = this.sort;
        if (sort == "A3" || sort == "A4" || sort == "SA") {
            switch (kind) {
                case 'N': re.nMaterial[0]++; break;
                case 'H': re.nMaterial[1]++; break;
                case 'P':
                    if (level == 7) {
                        re.nBless[1]++;
                        break;
                    }
                    else if (level > 7 && level <= 13) {
                        if (level <= 10) {
                            if (A[1] + C[0] * smithNum[level - 1] < C[1]) {
                                re.nMaterial[1]++;
                                re.nBless[0] += smithNum[level - 1];
                                break;
                            }
                            else {
                                re.nBless[1]++;
                                break;
                            }
                        }
                        else if (level > 10 && level < 13) {
                            if (A[3] + C[0] * smithNum[level - 1] < C[1]) {
                                re.nMaterial[3]++;
                                re.nBless[0] += smithNum[level - 1];
                                break;
                            }
                            else {
                                re.nBless[1]++;
                                break;
                            }
                        }
                        else if (level == 13) {
                            if (C[1] < A[3] + C[3]) {
                                re.nBless[1]++;
                                break;
                            } else if (C[1] >= A[3] + C[3]) {
                                re.nMaterial[3]++;
                                re.nBless[2]++;
                                break;
                            }
                        }
                    }
                    else if (level == 14) {
                        re.nMaterial[3]++;
                        re.nBless[2] += 2;
                        break;
                    }
                    else {
                        console.log("has wrong kind in mmOnceExtend");
                        break;
                    }
                case 'T': re.nTicket[level]++; break;
                case 'S': level <= 10 ? re.nMaterial[2]++ : re.nMaterial[3]++; break;
                case 'X': level <= 10 ? re.nMaterial[2]++ : re.nMaterial[3]++; break;
                default:
                    console.log("has wrong kind in mmOnceExtend");
                    break;
            }
            return re;
        }
        else if (sort == "B" || sort == "SB") {
            switch (kind) {
                case 'N': re.nMaterial[0]++; break;
                case 'H': re.nMaterial[1]++; break;
                case 'P':
                    if (level == 7) {
                        re.nBless[1]++;
                        break;
                    }
                    else if (level > 7 && level <= 13) {
                        if (level <= 10) {
                            if (B[1] + C[0] * smithNum[level - 1] < C[2]) {
                                re.nMaterial[1]++;
                                re.nBless[0] += smithNum[level - 1];
                                break;
                            }
                            else {
                                re.nBless[1]++;
                                break;
                            }
                        }
                        else if (level > 10 && level < 13) {
                            if (B[3] + C[0] * smithNum[level - 1] < C[2]) {
                                re.nMaterial[3]++;
                                re.nBless[0] += smithNum[level - 1];
                                break;
                            }
                            else {
                                re.nBless[1]++;
                                break;
                            }
                        }
                        else if (level == 13) {
                            if (C[2] < B[3] + C[3]) {
                                re.nBless[1]++;
                                break;
                            } else if (C[2] >= B[3] + C[3]) {
                                    re.nMaterial[3]++;
                                    re.nBless[2]++;
                            }
                        }
                    }
                    else if (level == 14) {
                        re.nMaterial[3]++;
                        re.nBless[2] += 2;
                        break;
                    }
                    else {
                        cout << "has wrong kind in mmOnceExtend" << endl;
                        break;
                    }
                case 'T': re.nTicket[level]++; break;
                case 'S': level <= 10 ? re.nMaterial[2]++ : re.nMaterial[3]++; break;
                case 'X': level <= 10 ? re.nMaterial[2]++ : re.nMaterial[3]++; break;
                default:
                    cout << "has wrong kind in mmOnceExtend" << endl;
                    break;
            }
            return re;
        } else {
            cout << "has wrong sort in mmOnceExtend" << endl;
            return re;
        }
    }

    mpOnce(kind, level) {
        let sort = this.sort;
        if (sort == "A3") {
            switch (kind) {
                case 'N': return RA3[0][level - 1] <= 90 ? (level <= 10 ? RA3[0][level - 1] + whiteSmithRateInc : RA3[0][level - 1]) : 100;
                case 'H': return RA3[1][level - 1];
                case 'P': return RA3[2][level - 1];
                case 'T': return 100;
                case 'S': return RA3[1][level - 1];
                case 'X': return RA3[1][level - 1];
                default:
                    console.log("has wrong in mpOnce");
                    return NaN;
            }
        }
        else if (sort == "A4" || sort =="SA") {
            switch (kind) {
                case 'N': if(sort =="SA") return RA4[0][level - 1];
                case 'N': return RA4[0][level - 1] <= 90 ? (level <= 10 ? RA4[0][level - 1] + whiteSmithRateInc : RA4[0][level - 1]) : 100;
                case 'H': return RA4[1][level - 1];
                case 'P': return RA4[2][level - 1];
                case 'T': return 100;
                case 'S': return RA4[1][level - 1];
                case 'X': return RA4[1][level - 1];
                default:
                    console.log("has wrong in mpOnce");
                    return NaN;
            }
        }
        else if (sort == "B" || sort =="SB") {
            switch (kind) {
                case 'N': return RB[0][level - 1];
                case 'H': return RB[1][level - 1];
                case 'P': return RB[2][level - 1];
                case 'T': return 100;
                case 'S': return RB[1][level - 1];
                case 'X': return RB[1][level - 1];
                default:
                    console.log("has wrong in mpOnce");
                    return NaN;
            }
        }
        else {
            console.log("has wrong in mpOnce");
        }
    }

    mmOneEnd(kind, level, step = undefined) {
        let sort = this.sort;
        if (sort == "A3" || sort == "A4" || sort == "B" || sort =="SA" || sort =="SB") {
            switch (kind) {
                case 'N': return this.mmOnce(kind, level);
                case 'H': return this.mmOnce(kind, level);
                case 'P': if (level >= 7)
                    return this.mmOnce(kind, level) / (this.mpOnce(kind, level) / 100);
                else {
                    console.log("has wrong kind in mmOneEnd");

                }
                    return NaN;
                case 'T': return this.mmOnce(kind, level);
                case 'S': return this.mms(level);
                case 'X': return this.mms(level, kind, step);
                default:
                    console.log("has wrong kind in mmOneEnd");
                    return NaN;
            }
        } else {
            console.log("has wrong sort");
        }
    }

    mmOneEndExtend(kind, level, step = undefined) {
        let sort = this.sort;
        if (sort == "A3" || sort == "A4" || sort == "B" || sort =="SA" || sort =="SB") {
            switch (kind) {
                case 'N': return this.mmOnceExtend(kind, level);
                case 'H': return this.mmOnceExtend(kind, level);
                case 'P': if (level >= 7)
                    return this.mmOnceExtend(kind, level).div(this.mpOnce(kind, level) / 100);
                else {
                    console.log("has wrong kind in mmOneEndExtend");
                    break;
                }
                case 'T': return this.mmOnceExtend(kind, level);
                case 'S': return this.mmsExtend(level);
                case 'X': return this.mmsExtend(level, kind, step);
                default:
                    console.log("has wrong kind in mmOneEndExtend");
                    break;
            }
        } else {
            console.log("has wrong sort in mmOneEndExtend");
        }
        let error = new Estimate.Test.Result();
        return error;
    }

    mpOneEnd(kind, level, step = undefined) {
        let sort = this.sort;
        if (sort == "A3" || sort == "A4" || sort == "B" || sort =="SA" || sort =="SB") {
            switch (kind) {
                case 'N': return this.mpOnce(kind, level);
                case 'H': return this.mpOnce(kind, level);
                case 'P': return 100;
                case 'T': return 100;
                case 'S': return this.mps(level);
                case 'X': return this.mps(level, kind, step);
                default:
                    console.log("has wrong in mpOneEnd");
                    return 0;
            }
        }
        else {
            console.log("has wrong in mpOneEnd");
        }
    }

    mps(level, kind = 'S', step = undefined) {
        if (level <= 7) { //goal level must >=8
            console.log("has wrong in mps");
            console.log(`level=${level}   kind=${kind}    step=${step}\n`);
            return NaN;
        }

        let downLevel = level - 1;  // the goal level after down-level
        let mpDownLevel;
        let mpOrigin = this.mpOnce('S', level);

        if (kind == 'X') {
            let downLevelKind = step.lastIndexOf(this.decimalToHexChar(downLevel));
            let count_guahow = 0;
            while (this.isKindOrNot(step[downLevelKind]) == false || count_guahow != 0) {
                if (this.isKindOrNot(step[downLevelKind]) == false && step[downLevelKind] == ']') {
                    count_guahow++;
                }
                else if (count_guahow != 0) {
                    if (step[downLevelKind] == '[')
                        count_guahow--;
                }
                downLevelKind--;
                if(downLevelKind<0){
                    return NaN;
                }
            }

            mpDownLevel = this.mpOneEnd(step[downLevelKind], downLevel, step);
        }
        else if (kind == 'S') {
            if (downLevel == 7) {
                mpDownLevel = this.mpOneEnd('H', downLevel);
            }
            else if (downLevel >= 8) {
                mpDownLevel = this.mpOneEnd('S', downLevel);
            }
        }

        let mpos = mpOrigin / 100;
        let mpof = 1 - mpOrigin / 100;
        let mpd = mpDownLevel / 100;

        return mpos / (1 - mpof * mpd) * 100;
    }

    mms(level, kind = 'S', step = undefined) {
        if (level <= 7) { //goal level must >=8
            console.log("has wrong in mms");
            console.log(`level=${level}   kind=${kind}    step=${step}\n`);
            return NaN;
        }

        let downLevel = level - 1;  // the goal level after down-level
        let mpDownLevel;
        let mpOrigin = this.mpOnce('S', level);

        let mmDownLevel;
        let mmOrigin = this.mmOnce('S');

        if (kind == 'X') {
            let downLevelKind = step.lastIndexOf(this.decimalToHexChar(downLevel));
            let count_guahow = 0;
            while (this.isKindOrNot(step[downLevelKind]) == false || count_guahow != 0) {
                if (this.isKindOrNot(step[downLevelKind]) == false && step[downLevelKind] == ']') {
                    count_guahow++;
                }
                else if (count_guahow != 0) {
                    if (step[downLevelKind] == '[')
                        count_guahow--;
                }
                downLevelKind--;
                if(downLevelKind<0){
                    return NaN;
                }
            }

            mpDownLevel = this.mpOneEnd(step[downLevelKind], downLevel, step);
            mmDownLevel = this.mmOneEnd(step[downLevelKind], downLevel, step);
        }
        else if (kind == 'S') {
            if (downLevel == 7) {
                mpDownLevel = this.mpOneEnd('H', downLevel);
                mmDownLevel = this.mmOneEnd('H', downLevel);
            }
            else if (downLevel >= 8) {
                mpDownLevel = this.mpOneEnd('S', downLevel);
                mmDownLevel = this.mmOneEnd('S', downLevel);
            }
        }

        let mpos = mpOrigin / 100;
        let mpof = 1 - mpOrigin / 100;
        let mpd = mpDownLevel / 100;


        return mmOrigin * (1 / (1 - mpof * mpd)) + mmDownLevel * (mpof / (1 - mpof * mpd));
    }
    mmsExtend(level, kind = 'S', step = undefined) {
        if (level <= 7) { //goal level must >=8
            console.log("has wrong in mms");
            console.log(`level=${level}   kind=${kind}    step=${step}\n`);
            let error = new Estimate.Test.Result();
            return error;
        }

        let downLevel = level - 1;  // the goal level after down-level
        let mpDownLevel;
        let mpOrigin = this.mpOnce('S', level);

        let mmDownLevel = new Estimate.Test.Result();
        let mmOrigin = this.mmOnceExtend('S');

        if (kind == 'X') {
            let downLevelKind = step.lastIndexOf(this.decimalToHexChar(downLevel));
            let count_guahow = 0;
            while (this.isKindOrNot(step[downLevelKind]) == false || count_guahow != 0) {
                if (this.isKindOrNot(step[downLevelKind]) == false && step[downLevelKind] == ']') {
                    count_guahow++;
                }
                else if (count_guahow != 0) {
                    if (step[downLevelKind] == '[')
                        count_guahow--;
                }
                downLevelKind--;
                if(downLevelKind<0){
                    let error = new Estimate.Test.Result();
                    return error;
                }
            }

            mpDownLevel = this.mpOneEnd(step[downLevelKind], downLevel, step);
            mmDownLevel = this.mmOneEndExtend(step[downLevelKind], downLevel, step);
        }
        else if (kind == 'S') {
            if (downLevel == 7) {
                mpDownLevel = this.mpOneEnd('H', downLevel);
                mmDownLevel = this.mmOneEndExtend('H', downLevel);
            }
            else if (downLevel >= 8) {
                mpDownLevel = this.mpOneEnd('S', downLevel);
                mmDownLevel = this.mmOneEndExtend('S', downLevel);
            }
        }

        let mpos = mpOrigin / 100;
        let mpof = 1 - mpOrigin / 100;
        let mpd = mpDownLevel / 100;


        return mmOrigin.mul(1 / (1 - mpof * mpd)).add_result(mmDownLevel.mul(mpof / (1 - mpof * mpd)));
    }

    // public:
    operate(current, kind, level, step = undefined) {
        let mm = this.mmOneEnd(kind, level, step);
        let mp = this.mpOneEnd(kind, level, step);
        return this.operate_general(current, mm, mp);
    }

    operate_general(current, mm, mp) {
        return (current + mm) / (mp / 100);
    }

    operateExtend(current, kind, level, step = undefined) { // current is the instance of class Result
        let mm = this.mmOneEndExtend(kind, level, step);
        let mp = this.mpOneEnd(kind, level, step);
        return this.operateExtend_general(current, mm, mp);
    }

    operateExtend_general(current, mm, mp) {
        return (current.add_result(mm)).div(mp / 100);
    }




    show(info = ShowInfo.ExpectedTotalFee) {
        this.calc();
        if (this.itemName != undefined)
            console.log("item name".alignLeft(12) + this.itemName);
        console.log("sort".alignLeft(12) + this.sort);
        console.log("price".alignLeft(12) + this.price);
        // console.log(`${"cost".alignLeft(12) + this.mmOnce('N')}/${this.mmOnce('H')}/${this.mmOnce('P', 8) - this.mmOnce('H', 8)}/${this.mmOnce('P', 7)}`);
        // console.log(`${"ticket 5up".alignLeft(12) + this.mmOnce('T', 5)}/${this.mmOnce('T', 6)}/${this.mmOnce('T', 7)}/${this.mmOnce('T', 8)}`);
        console.log("");

        let head = this.head;

        let n = 0;
        for (let temp of head) {
            let padding = " ".repeat(10);
            for (let i = 0; i < n; i++)
                padding += " ".repeat(10);
            console.log(`${padding}${temp.step}`);
            n++;
        }

        for (let i = 0; i <= 20; i++) {
            let print = false;
            let optimal = head[0];
            for (let temp of head) {
                if (temp.level_end >= i) {
                    print = true;
                }

                if (temp.result[i] < optimal.result[i] && temp.result[i] != 0 || optimal.result[i] == 0 || optimal.level_end < i) {
                    optimal = temp;
                }
            }

            if (print && info != ShowInfo.AllInfo && info != ShowInfo.AllInfoExtend && info != ShowInfo.Material) {
                print = false;
                let print_content = `level ${i}`.alignLeft(10);

                for (let temp of head) {
                    if (temp.level_end >= i) {
                        print_content += " "+this.showRequire(info, temp, optimal, i).alignRight(9);
                    }
                    else {
                        print_content += " "+this.showRequire(ShowInfo.None, temp, optimal, i).alignRight(9);
                    }
                }
                console.log(print_content);
            } else if (print && (info == ShowInfo.AllInfo || info == ShowInfo.AllInfoExtend || info == ShowInfo.Material)) {
                print = false;
                let print_content = `level ${i}`.alignLeft(10);
                print_content += ".".repeat(30);
                console.log(print_content);

                // print AllInfo or part of AllInfoExtend.  ps. AllInfoExtend including AllInfo & MaterialInfo
                if (info == ShowInfo.AllInfo || info == ShowInfo.AllInfoExtend) {
                    let list = [
                        ShowInfo.ExpectedTotalFee, ShowInfo.VerificationExpectedTotalFee,
                        ShowInfo.OnceRate, ShowInfo.OneToEndRate,
                        ShowInfo.OnceMFee, ShowInfo.OneToEndMFee, ShowInfo.ExpectedMFee,
                        ShowInfo.OnceItemFee, ShowInfo.OneToEndItemFee, ShowInfo.ExpectedItemFee
                    ];

                    let title = ["ept Total", "veriTotal", "once Rate", "O-E Rate", "once MFee", "O-E MFee", "ept MFee", "once item", "O-E item", "ept item"];

                    // let save = temp;
                    for (let li = 0; li < list.length; li++) {
                        let print_content = ` ${title[li].alignLeft(9)}`;
                        for (let temp of head) {
                            if (temp.level_end >= i) {
                                print_content += " "+this.showRequire(list[li], temp, optimal, i).alignRight(9);
                            }
                            else {
                                print_content += " "+this.showRequire(ShowInfo.None, temp, optimal, i).alignRight(9);
                            }
                        }
                        console.log(print_content);

                        if (li == 0)  // print an empty line to separate next part info
                            console.log("");
                    }
                } else if (info == ShowInfo.Material) {  // default to print expect total info when required info is "Material"
                    let print_content = ` ${"ept Total".alignLeft(9)}`;
                    for (let temp of head) {
                        if (temp.level_end >= i) {
                            print_content += " "+this.showRequire(ShowInfo.ExpectedTotalFee, temp, optimal, i).alignRight(9);
                        }
                        else {
                            print_content += " "+this.showRequire(ShowInfo.None, temp, optimal, i).alignRight(9);
                        }
                    }
                    console.log(print_content);
                }

                // material info
                if (info == ShowInfo.AllInfoExtend || info == ShowInfo.Material) {
                    let list = [];
                    let title = {};
                    title[MaterialInfo.ITEM] = "ITEM";
                    title[MaterialInfo.Normal] = "Normal";
                    title[MaterialInfo.High] = "High";
                    title[MaterialInfo.Xtra] = "Xtra";
                    title[MaterialInfo.XtraHigh] = "XtraHigh";
                    title[MaterialInfo.SmithBless] = "SmithBles";
                    title[MaterialInfo.OldBless] = "OldBless";
                    title[MaterialInfo.GodBless] = "GodBless";
                    title[MaterialInfo.Ticket] = "Ticket";
                    title[MaterialInfo.cItemFee] = "cItemFee";
                    title[MaterialInfo.cMFee] = "cMFee";
                    title[MaterialInfo.cTotalFee] = "cTotalFee";

                    list.push(MaterialInfo.ITEM);
                    for (let temp of head) {
                        if (temp.resultExtend[i].nMaterial[0] != 0) list.push(MaterialInfo.Normal);
                        if (temp.resultExtend[i].nMaterial[1] != 0) list.push(MaterialInfo.High);
                        if (temp.resultExtend[i].nMaterial[2] != 0) list.push(MaterialInfo.Xtra);
                        if (temp.resultExtend[i].nMaterial[3] != 0) list.push(MaterialInfo.XtraHigh);
                        if (temp.resultExtend[i].nBless[0] != 0) list.push(MaterialInfo.SmithBless);
                        if (temp.resultExtend[i].nBless[1] != 0) list.push(MaterialInfo.OldBless);
                        if (temp.resultExtend[i].nBless[2] != 0) list.push(MaterialInfo.GodBless);
                        if (list.indexOf(MaterialInfo.Ticket) < 0) {
                            for (let i = 0; i < 21; i++) {
                                if (temp.resultExtend[i].nTicket[i] != 0) {
                                    list.push(MaterialInfo.Ticket);
                                    break;
                                }
                            }
                        }
                    }

                    list.sort((a, b) => a - b);
                    function onlyUnique(value, index, self) {
                        return self.indexOf(value) === index;
                    }
                    list = list.filter(onlyUnique);

                    // part for check--------------
                    // if no need to check, can comment it
                    list.push(MaterialInfo.cItemFee);
                    if (list.length != 2) {  // not only ITEM & cItemFee
                        list.push(MaterialInfo.cMFee);
                        list.push(MaterialInfo.cTotalFee);
                    }
                    list.sort((a, b) => a - b);
                    // part for check--end------------

                    for (let li of list) {
                        if (li == MaterialInfo.ITEM) {
                            console.log(" Material");
                        }
                        if (li == MaterialInfo.cItemFee) {
                            console.log(" check fee");
                        }
                        let print_content = ` ${title[li].alignLeft(9)}`;
                        for (let temp of this.head) {
                            if (temp.level_end >= i) {
                                print_content += " "+this.showMaterial_part(li, temp, i).alignRight(9);
                            }
                            else {
                                print_content += " "+this.showRequire(ShowInfo.None, temp, optimal, i).alignRight(10);
                            }
                        }
                        console.log(print_content);
                    }
                }
            }
        }

        // for once case
        this.head = this.head.filter(test => test.once == false);
        console.log("-".repeat(40));
    }

    // private:
    showRequire(require, tempT, optimalT, i) {
        let print_content="";
        let temp = tempT;
        let optimal = optimalT;
        switch (require) {
            case ShowInfo.ExpectedTotalFee:
                if (optimal != undefined && (temp == optimal || temp.result[i] == optimal.result[i])) {
                    if(temp.result[i]!=undefined && isNaN(temp.result[i])==false){
                        print_content = `=>${temp.result[i].toFixed(0)}`;
                    }
                }
                else {
                    if(temp.result[i]!=undefined && isNaN(temp.result[i])==false){
                        print_content = `${temp.result[i].toFixed(0)}`;
                    }
                }
                break;
            case ShowInfo.OnceRate:
                print_content = `${temp.onceRate[i].toFixed(2)}%`;
                break;
            case ShowInfo.OneToEndRate:
                print_content = `${temp.oneToEndRate[i].toFixed(2)}%`;
                break;
            case ShowInfo.OnceMFee:
                print_content = `${temp.onceMFee[i].toFixed(0)}`;
                break;
            case ShowInfo.OneToEndMFee:
                print_content = `${temp.oneToEndMFee[i].toFixed(0)}`;
                break;
            case ShowInfo.ExpectedMFee:
                print_content = `${temp.expectedMFee[i].toFixed(0)}`;
                break;
            case ShowInfo.OnceItemFee:
                print_content = `${temp.onceItemFee[i].toFixed(0)}`;
                break;
            case ShowInfo.OneToEndItemFee:
                print_content = `${temp.oneToEndItemFee[i].toFixed(0)}`;
                break;
            case ShowInfo.ExpectedItemFee:
                print_content = `${temp.expectedItemFee[i].toFixed(0)}`;
                break;
            case ShowInfo.VerificationExpectedTotalFee:
                print_content = `${temp.verificationExpectedTotalFee[i].toFixed(0)}`;
                break;
            case ShowInfo.None:
                print_content = "";
                break;
        }
        return print_content;
    }    

    showMaterial(step){
        if(step.indexOf("(opt")>=0){
            let find = step.indexOf("(opt");
            let level = parseInt(step.substr(find + 5));
            this.findOptimalWay(level);
        }else{
            this.addTest(step);
        }
        this.calc();

        if (this.itemName != undefined)
            console.log(`${"item name".alignLeft(12)}${this.itemName.alignRight(12)}`);
        console.log(`${"sort".alignLeft(12)}${this.sort.alignRight(12)}`);
        console.log(`${"price".alignLeft(12)}${this.price.toFixed(0).alignRight(12)}`);
        console.log(`${"step".alignLeft(12)}${step.alignRight(12)}`);
        console.log();


        let basic=[];
        basic.push(ShowInfo.ExpectedTotalFee);
        let list=[];
        let title=[];
        title[MaterialInfo.ITEM] = "ITEM";
        title[MaterialInfo.Normal] = "Normal";
        title[MaterialInfo.High] = "High";
        title[MaterialInfo.Xtra] = "Xtra";
        title[MaterialInfo.XtraHigh] = "XtraHigh";
        title[MaterialInfo.SmithBless] = "SmithBles";
        title[MaterialInfo.OldBless] = "OldBless";
        title[MaterialInfo.GodBless] = "GodBless";
        title[MaterialInfo.Ticket] = "Ticket";

        title[MaterialInfo.ITEM] = "ITEM";
        title[MaterialInfo.Normal] = ["A3", "A4", "SA"].indexOf(this.sort)>=0 ? "大神" : "大鋁";
        title[MaterialInfo.High] = ["A3", "A4", "SA"].indexOf(this.sort)>=0 ? "濃縮神" : "濃縮鋁";
        title[MaterialInfo.Xtra] = ["A3", "A4", "SA"].indexOf(this.sort)>=0 ? "高濃縮神" : "高濃縮鋁";
        title[MaterialInfo.XtraHigh] = ["A3", "A4", "SA"].indexOf(this.sort)>=0 ? "鈽鐳" : "鈣";
        title[MaterialInfo.SmithBless] = "鐵祝";
        title[MaterialInfo.OldBless] = ["A3", "A4", "SA"].indexOf(this.sort)>=0 ? "祝武" : "祝防";
        title[MaterialInfo.GodBless] = "神乎";
        title[MaterialInfo.Ticket] = ["A3", "A4", "SA"].indexOf(this.sort)>=0 ? "武券" : "防券";

        let temp=this.head[this.head.length-1];
        list.push(MaterialInfo.ITEM);
        for (let i = 0; i <= temp.level_end; i++) {
            if (temp.resultExtend[i].nMaterial[0] != 0) list.push(MaterialInfo.Normal);
            if (temp.resultExtend[i].nMaterial[1] != 0) list.push(MaterialInfo.High);
            if (temp.resultExtend[i].nMaterial[2] != 0) list.push(MaterialInfo.Xtra);
            if (temp.resultExtend[i].nMaterial[3] != 0) list.push(MaterialInfo.XtraHigh);
            if (temp.resultExtend[i].nBless[0] != 0) list.push(MaterialInfo.SmithBless);
            if (temp.resultExtend[i].nBless[1] != 0) list.push(MaterialInfo.OldBless);
            if (temp.resultExtend[i].nBless[2] != 0) list.push(MaterialInfo.GodBless);
            if (list.indexOf(MaterialInfo.Ticket) == -1) {
                for (let k = 0; k < 21; k++) {
                    if (temp.resultExtend[i].nTicket[k] != 0) {
                        list.push(MaterialInfo.Ticket);
                        break;
                    }
                }
            }
        }
        // console.log(list);

        list.sort((a, b) => a - b);
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        list = list.filter(onlyUnique);

        // show, if the kind of info to print is too much, divide they into N parts.
        let max_hold = 7;
        let remaind = max_hold;
        let print_content="";
        print_content+=`${"".alignLeft(9)} ${"ept Total".alignRight(10)}`;
        remaind--;

        while (list.length!=0) {
            let list_part=[];
            if (list.length > remaind) {
                list_part = list.splice(0, remaind);
            }
            else {
                list_part = list.splice(0, list.length);
            }

            if (remaind == 7) {
                console.log();
                print_content="";
                print_content+=`${"".alignLeft(9)} `;
            }
            for (let li = 0; li < list_part.length; li++) {
                let temp=title[list_part[li]];
                let width=10;
                for(let ch of temp){
                    if(ch.match(/[\u4e00-\u9fa5]/g)){
                        width--;
                    }
                }
                print_content+=`${title[list_part[li]].alignRight(width)}`
            }
            console.log(print_content);
            console.log();
            for (let i = 0; i <= temp.level_end; i++) {
                print_content=`level ${i}`.alignLeft(9)+" ";
                print_content+=this.showMaterialInRow(basic, list_part, temp, i);
                console.log(print_content);
            }
            basic=[];
            remaind = max_hold;
        }
        this.deleteLastTest();
        console.log(".".repeat(30));
    }

    showMaterial_part(toShow, temp, i){
        let print_content="";
        let resultExtend = temp.resultExtend[i];
        switch (toShow) {
            case MaterialInfo.ITEM:
                if (resultExtend.nItem != 0)
                    print_content=`${resultExtend.nItem.toFixed(2)}`;
                break;
            case MaterialInfo.Normal:
                if (resultExtend.nMaterial[0] != 0)
                    print_content=`${resultExtend.nMaterial[0].toFixed(2)}`;
                break;
            case MaterialInfo.High:
                if (resultExtend.nMaterial[1] != 0)
                    print_content=`${resultExtend.nMaterial[1].toFixed(2)}`;
                break;
            case MaterialInfo.Xtra:
                if (resultExtend.nMaterial[2] != 0)
                    print_content=`${resultExtend.nMaterial[2].toFixed(2)}`;
                break;
            case MaterialInfo.XtraHigh:
                if (resultExtend.nMaterial[3] != 0)
                    print_content=`${resultExtend.nMaterial[3].toFixed(2)}`;
                break;
            case MaterialInfo.SmithBless:
                if (resultExtend.nBless[0] != 0)
                    print_content=`${resultExtend.nBless[0].toFixed(2)}`;
                break;
            case MaterialInfo.OldBless:
                if (resultExtend.nBless[1] != 0)
                    print_content=`${resultExtend.nBless[1].toFixed(2)}`;
                break;
            case MaterialInfo.GodBless:
                if (resultExtend.nBless[2] != 0)
                    print_content=`${resultExtend.nBless[2].toFixed(2)}`;
                break;
            case MaterialInfo.Ticket:
                for (var i = 0; i < 21; i++) {
                    if (resultExtend.nTicket[i] != 0) {
                        print_content=`(+${i})${resultExtend.nTicket[i].toFixed(2)}`;
                        break;
                    }
                }
                break;
            case MaterialInfo.cItemFee:
                print_content=`${resultExtend.checkItemFee(this.price).toFixed(0)}`;
                break;
            case MaterialInfo.cMFee:
                print_content=`${resultExtend.checkMFee(this.sort).toFixed(0)}`;
                break;
            case MaterialInfo.cTotalFee:
                print_content=`${resultExtend.checkTotal(this.price, this.sort).toFixed(0)}`;
                break;
            default:
                break;
        }
        return print_content;
    }

    // basic function component, to show info according to a combine consisting of certain Test & certain level.
    showMaterialInRow(toShow1, toShow2, temp, level){
        let print_content="";
        for(let i = 0; i<toShow1.length; i++){
            print_content+=" "+this.showRequire(toShow1[i], temp, undefined, level).alignRight(9);
        }
        for (let i = 0; i < toShow2.length; i++) {
            print_content+=" "+this.showMaterial_part(toShow2[i], temp, level).alignRight(9);
        }
        return print_content;
    }
    
    getCost(level) {
        this.findOptimalWay(level);
        let re = this.head[this.head.length - 1].result[level];
        this.head.pop();
        return re;
    }

    getOptimalWay(level, label = true) {
        this.findOptimalWay(level);
        if (label == false) {
            let step = this.head[this.head.length - 1].step;
            step = step.slice(0, step.indexOf("(opt"));
            this.head[this.head.length - 1].step = step;
        }
        let re = this.head[this.head.length - 1].step;
        this.head.pop();
        return re;
    }

    static produceCombineEx_re_combine = [];
    static produceCombineEx(top, remainOrigin, remain, recursive = false, store = undefined, previous = 0) {
        let re = this.produceCombineEx_re_combine;

        if (recursive == false) {
            re.splice(0, re.length);
        }

        for (var i = previous; i <= top; i++) {
            if (remain == remainOrigin) {
                let store = [];
                store.push(i);
                this.produceCombineEx(top, remainOrigin, remain - 1, true, store.slice(), i);
            } else if (remain != remainOrigin && remain > 0) {
                let temp = store.slice();
                temp.push(i);
                this.produceCombineEx(top, remainOrigin, remain - 1, true, temp, i);
            } else if (remain == 0) {
                // console.log(store);
                re.push(store);
                return;
            } else {
                console.log("should not happen");
            }
        }
        return re;
    }

    static myCompare(n1, n2) {
        if (n1.second >= n2.second)
            return -1;
    }
    static myCompare2(n1, n2) {
        if (n1.second <= n2.second)
            return -1;
    }

    static calcCombineEx(item, combines, top, ex) {
        let array_store_combine_and_totalFee = [];
        // vector < pair < vector < this.>, this.> > re;
        for (var i = 0; i < combines.length; i++) {
            let E = new Estimate(item, 0);
            let combine = combines[i];
            let level = 0;
            let index = 0;
            let temp = E.getCost(0);
            while (index != combine.length) {
                let next = combine[index++];
                if (next == level) {
                    temp = E.operate_general(temp, ex.mm(index), ex.mp(index));
                    E.changeItem(new Item("", temp, item.sort), level);
                } else {
                    temp = E.getCost(next);
                    let level = next;
                    temp = E.operate_general(temp, ex.mm(index), ex.mp(index));
                    E.changeItem(new Item("", temp, item.sort), level);
                }
            }

            if (level != top) {
                temp = E.getCost(top);
            }

            array_store_combine_and_totalFee.push(new pair(combine, temp));
        }
        return array_store_combine_and_totalFee;
    }
    static combineExVisible(item, combine, top, normalMagicFee, pollutedMagicFee) {
        let level = 0;
        let index = 0;
        let temp = item.price;
        let E = new Estimate(item, 0);
        let magicEx = new MagicEx(normalMagicFee, pollutedMagicFee);
        console.log(`+${top} ${item.itemName} ex1~${combine.length} produce map`)
        console.log(`magic ${normalMagicFee}/${pollutedMagicFee}\n`);

        console.log(`${"OPER".alignLeft(10)}${"cost".alignRight(10)}     ${"way".alignRight(20)}`);

        console.log(`${"level 0".alignLeft(10)}${E.getCost(0).toFixed(0).alignRight(10)}`);
        while (index != combine.length) {
            let next = combine[index++];
            if (next == level) {
                temp = E.operate_general(temp, magicEx.mm(index), magicEx.mp(index));
                E.changeItem(new Item("", temp, item.sort), level);
                console.log(`${("Ex " + index).alignLeft(10)}${String(temp.toFixed(0)).alignRight(10)}`);
            } else {
                temp = E.getCost(next);
                console.log(`${("level " + next).alignLeft(10)}${String(temp.toFixed(0)).alignRight(10)}     ${E.getOptimalWay(next, false).alignLeft(20)}`);

                level = next;
                temp = E.operate_general(temp, magicEx.mm(index), magicEx.mp(index));
                E.changeItem(new Item("", temp, item.sort), level);
                console.log(`${("Ex " + index).alignLeft(10)}${String(temp.toFixed(0)).alignRight(10)}`);
            }
        }

        if (level != top) {
            temp = E.getCost(top);
            console.log(`${("level " + top).alignLeft(10)}${String(temp.toFixed(0)).alignRight(10)}     ${E.getOptimalWay(top, false).alignLeft(20)}`);
        }
        console.log("-".repeat(40));
        // Table:: ShoesAppendEx((let)normalMagicFee, (let)pollutedMagicFee, (let)item -> price);
    }
    static combineExVisible2(item, combines, top, normalMagicFee, pollutedMagicFee) {
        let magicEx = new MagicEx(normalMagicFee, pollutedMagicFee);
        let re = { title: "", result: [] };
        re.title += `+${top} ${item.itemName} ex1~${combines[0].length} produce map`;
        re.title += `\nmagic ${normalMagicFee}/${pollutedMagicFee}`;
        re.title += `\n${"OPER".alignLeft(10)}${"cost".alignRight(10)}     ${"way".alignRight(20)}`;
        let E = new Estimate(item, 0);
        re.title += `\n${"level 0".alignLeft(10)}${E.getCost(0).toFixed(0).alignRight(10)}`;
        for (let combine of combines) {
            let level = 0;
            let index = 0;
            let temp = item.price;
            E = new Estimate(item, 0);

            let result = { first: undefined, second: undefined, oper: [] };
            result.first = combine.first.toString();
            result.second = combine.second;

            while (index != combine.first.length) {
                let next = combine.first[index++];
                if (next == level) {
                    temp = E.operate_general(temp, magicEx.mm(index), magicEx.mp(index));
                    E.changeItem(new Item("", temp, item.sort), level);
                    result.oper.push(`${("Ex " + index).alignLeft(10)}${String(temp.toFixed(0)).alignRight(10)}`);
                } else {
                    temp = E.getCost(next);
                    result.oper.push(`${("level " + next).alignLeft(10)}${String(temp.toFixed(0)).alignRight(10)}     ${E.getOptimalWay(next, false).alignLeft(20)}`);

                    level = next;
                    temp = E.operate_general(temp, magicEx.mm(index), magicEx.mp(index));
                    E.changeItem(new Item("", temp, item.sort), level);
                    result.oper.push(`${("Ex " + index).alignLeft(10)}${String(temp.toFixed(0)).alignRight(10)}`);
                }
            }

            if (level != top) {
                temp = E.getCost(top);
                result.oper.push(`${("level " + top).alignLeft(10)}${String(temp.toFixed(0)).alignRight(10)}     ${E.getOptimalWay(top, false).alignLeft(20)}`);
            }
            re.result.push(result);
        }
        console.log(re);
        return re;
    }
    static H_combine(a, b) {
        let ca = a + b - 1;
        let cb = b;
        let ans = 1;
        while (cb != 0) {
            ans *= (ca-- / cb--);
        }
        return ans;
    }
    static showOptimalCombineEx(item, top, exLevel, normalMagicFee, pollutedMagicFee) {
        let itemStore = item;
        let get = Estimate.produceCombineEx(top, exLevel, exLevel);
        let temp = new MagicEx(normalMagicFee, pollutedMagicFee);
        let get2 = Estimate.calcCombineEx(item, get, top, temp);
        get2.sort(Estimate.myCompare2);
        console.log(`0~${top} get ${exLevel}       combines.length=${get.length}     =H(${top + 1},${exLevel})=${Estimate.H_combine(top + 1, exLevel)}`)

        Estimate.combineExVisible(itemStore, get2[0].first, top, normalMagicFee, pollutedMagicFee);
        Estimate.combineExVisible2(itemStore, get2, top, normalMagicFee, pollutedMagicFee);
    }
}

(function () {
    rebind_material_data();
})();
