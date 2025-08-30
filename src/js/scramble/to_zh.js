"use strict";
var ToZh = function(){
    var CMap = new Map([
        ["B'", "右"],
        ["B", "左"],
        ["L°", "底°"],
        ["M'", "直"],
        ["S'", "歪"],
        ["F'", "提"],
        ["U'", "回"],
        ["u'", "半回"],
        ["b'", "半右"],
        ["R°", "上°"],
        ["R′'", "下′"],
        ["D°", "拨°"],
        ["E'", "平"],
        ["R++", "上--"],
        ["l'", "半顶"],
        ["l", "半底"],
        ["b", "半左"],
        ["L′", "底′"],
        ["D°'", "旋°"],
        ["E", "横"],
        ["S", "正"],
        ["R", "上"],
        ["D'", "旋"],
        ["r'", "半下"],
        ["x'", "拉"],
        ["x", "推"],
        ["z", "顺"],
        ["F", "压"],
        ["U", "勾"],
        ["L'", "顶"],
        ["L", "底"],
        ["r", "半上"],
        ["L′'", "顶′"],
        ["D′", "拨′"],
        ["M", "竖"],
        ["D", "拨"],
        ["R°'", "下°"],
        ["D′'", "旋′"],
        ["y'", "翻"],
        ["y", "转"],
        ["D++", "拨--"],
        ["R'", "下"],
        ["u", "半勾"],
        ["L°'", "顶°"],
        ["R′", "上′"],
        ["z'", "逆"],
        ["R--", "下--"],
        ["D--", "旋--"],
    ]);

    function numToWords(num) {
        if (num == "0" || num.length > 14) {
            return num;
        }
        var units = ["", "十", "百", "千", "", "十", "百", "千", "", "十", "百", "千", "兆", "十"];
        var digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        var result = "";
        var zeroFlag = false;

        if (num.charAt(0) == '-') {
            result = "负";
            num = num.substring(1);
        }

        var numStr = num;
        var zero = "0";
        for (var i = 0; i < numStr.length; i++) {
            var currentDigit = Number(numStr.charAt(i));
            if (currentDigit > 0) {
                if (zeroFlag) {
                    result += digits[0];
                    zeroFlag = false;
                }
                if ((numStr.length == 2 || numStr.length == 6 || numStr.length == 10 || numStr.length == 14) && numStr.charAt(i) == '1') {
                    if (numStr.length - 1 - i == 1 || numStr.length - 1 - i == 5 || numStr.length - 1 - i == 9 || numStr.length - 1 - i == 13) {
                        if (zero != 0) {
                            result += digits[currentDigit] + units[numStr.length - 1 - i]
                        } else {
                            result += units[numStr.length - 1 - i]
                        }
                    }
                } else {
                    result += digits[currentDigit] + units[numStr.length - 1 - i]
                }
            } else {
                zeroFlag = true;
                zero = "零"
            }
            if (numStr.length - 1 - i == 4) {
                result += "万"
            } else if (numStr.length - 1 - i === 8) {
                result += "亿"
            }
        }
        if (result.endsWith("零")) {
            result = result.slice(0, -1)
        }
        result = result.replaceAll("亿万", "亿")
        return result
    }

    function doRepeat(s) {
        //var reg = /\([A-Za-z0-9 ']+\)[[0-9]+]?/g
        var reg = new RegExp("\\([A-Za-z0-9 ']+\\)[[0-9]+]?", "g");
        var ss = s.match(reg);
        var ps = s.split(reg);
        var ns = ""
        for (var i = 0; i < ps.length; i++) {
            if (ss != null && i < ss.length) {
                var _ss = ss[i].split(")")
                var n = Number(_ss[1])
                ns += ps[i]
                for (var j = 0; j < n; j++) {
                    ns += _ss[0] + ")";
                    if (j == 9) {
                        break
                    }
                }
            } else {
                ns += ps[i]
            }
        }
        return ns.replaceAll("(", "").replaceAll(")", "")
    }

    function convert(s) {
        var ss = "";
        var ms = s.split("\n")
        if (ms.length > 1) {
            ss += ms[0].replaceAll(ms[0], CMap.get(ms[0])) + "\n" + ms[1].replaceAll(ms[1], CMap.get(ms[1]));
            return ss
        }
        var ns = s.split(" ")
        for (var i = 0; i < ns.length; i++) {
            ss += ns[i].replaceAll(ns[i], CMap.get(ns[i]))
        }
        return ss
    }

    function doPre(is, isPyram) {
        var s = doRepeat(is)
        if (isPyram) {
            var as = s.replaceAll("TB", "Bw").
            replaceAll("TU", "Uw").replaceAll("TR", "Rw").replaceAll("TL", "Lw").
            replaceAll("MB'", "Bw' B").replaceAll("MB", "Bw B'").
            replaceAll("MU'", "Uw' U").replaceAll("MU", "Uw U'").
            replaceAll("MR'", "Rw' R").replaceAll("MR", "Rw R'").
            replaceAll("ML'", "Lw' L").replaceAll("ML", "Lw L'")
            var reg = new RegExp(`([0-9]+?)?[BRLUbrluy][w]?[']?`, "g")
            var rs = as.match(reg)
            return rs
        } else {
            var as = s.replaceAll("DBL", "L′").replaceAll("DLB", "L′").
            replaceAll("DBR", "R′").replaceAll("DRB", "R′").
            replaceAll("BLD", "L′").replaceAll("LBD", "L′").
            replaceAll("BRD", "R′").replaceAll("RBD", "R′").
            replaceAll("BDL", "L′").replaceAll("LDB", "L′").
            replaceAll("BDR", "R′").replaceAll("RDB", "R′").
            replaceAll("DFL", "D°").replaceAll("DLF", "D°").
            replaceAll("DFR", "D′").replaceAll("DRF", "D′").
            replaceAll("FLD", "D°").replaceAll("LFD", "D°").
            replaceAll("FRD", "D′").replaceAll("RFD", "D′").
            replaceAll("FDL", "D°").replaceAll("LDF", "D°").
            replaceAll("FDR", "D′").replaceAll("RDF", "D′").
            replaceAll("BL", "L°").replaceAll("LB", "L°").
            replaceAll("BR", "R°").replaceAll("RB", "R°").
            replaceAll("f", "Fw").replaceAll("TF", "Fw").
            replaceAll("b", "Bw").replaceAll("TB", "Bw").
            replaceAll("u", "Uw").replaceAll("TU", "Uw").
            replaceAll("d", "Dw").replaceAll("TD", "Dw").
            replaceAll("r", "Rw").replaceAll("TR", "Rw").
            replaceAll("l", "Lw").replaceAll("TL", "Lw").
            replaceAll("F2", "FA").replaceAll("B2", "BA").
            replaceAll("U2", "UA").replaceAll("D2", "DA").
            replaceAll("R2", "RA").replaceAll("L2", "LA").
            replaceAll("E2", "EA").replaceAll("M2", "MA").
            replaceAll("S2", "SA").replaceAll("x2", "xA").
            replaceAll("y2", "yA").replaceAll("z2", "zA").
            replaceAll("'2", "'A").replaceAll("w2", "wA").
            replaceAll("°2", "°A").replaceAll("′2", "′A").
            replaceAll("MF'A", "Fw'AFA").replaceAll("MFA", "FwAF'A").
            replaceAll("MF'", "Fw'F").replaceAll("MF", "FwF'").
            replaceAll("MB'A", "Bw'ABA").replaceAll("MBA", "BwAB'A").
            replaceAll("MB'", "Bw'B").replaceAll("MB", "BwB'").
            replaceAll("MU'A", "Uw'AUA").replaceAll("MUA", "UwAU'A").
            replaceAll("MU'", "Uw'U").replaceAll("MU", "UwU'").
            replaceAll("MD'A", "Dw'ADA").replaceAll("MDA", "DwAD'A").
            replaceAll("MD'", "Dw'D").replaceAll("MD", "DwD'").
            replaceAll("MR'A", "Rw'ARA").replaceAll("MRA", "RwAR'A").
            replaceAll("MR'", "Rw'R").replaceAll("MR", "RwR'").
            replaceAll("ML'A", "Lw'ALA").replaceAll("MLA", "LwAL'A").
            replaceAll("ML'", "Lw'L").replaceAll("ML", "LwL'").
            replaceAll("°w", "w°").replaceAll("′w", "w′").
            replaceAll(" ", "")
            var reg = new RegExp(`([0-9]+?)?[A]?[FBRLUDEMSxyz][w+-]?[°′+-]?[']?[A]?`, "g")
            var rs = as.match(reg)
            return rs
        }
    }

    function convertZhSun(s) {
        var ss = doPre(s, false)
        var na = []
        for (var i = 0; i < ss.length; i++) {
            var reg = new RegExp(`[FBRLUDEMSfbrludxyz]`, "g");
            var rs = ss[i].split(reg);
            var _ss = rs[0];
            if (ss[i].startsWith(rs[0]) && rs[0].trim() != "") {
                var s1 = ss[i].slice(rs[0].length)
                var s2 = s1.replaceAll("w", "")
                if (s2.endsWith("A")) {
                    var ns2 = numToWords(_ss) + convert(s2.slice(0, -1)) + convert(s2.slice(0, -1))
                    na.push(ns2)
                } else {
                    var ns2 = numToWords(_ss) + convert(s2)
                    na.push(ns2)
                }
                continue
            }
            if (ss[i].indexOf("w") > -1) {
                var s2 = ss[i].replaceAll("w", "")
                if (s2.endsWith("A")) {
                    var ns2 = "双" + convert(s2.slice(0, -1)) + convert(s2.slice(0, -1))
                    na.push(ns2)
                } else {
                    var ns2 = "双" + convert(s2)
                    na.push(ns2)
                }
                continue
            }
            if (ss[i].endsWith("A")) {
                var ns2 = convert(ss[i].slice(0, -1)) + convert(ss[i].slice(0, -1))
                na.push(ns2)
            } else {
                var ns2 = convert(ss[i])
                na.push(ns2)
            }
        }
        var regm = new RegExp(`°[上下顶底拨旋]`, "g")
        var regm2 = new RegExp(`′[上下顶底拨旋]`, "g")
        var ms = na.join(" ").replaceAll(regm, "°").replaceAll(regm2, "′")
        return ms
    }

    function convertPyramZhSun(s) {
        var ss = doPre(s, true)
        var na = []
        for (var i = 0; i < ss.length; i++) {
            if (ss[i].endsWith("bw'") || ss[i].endsWith("b'")) {
                na.push(na, "半右")
                continue
            }
            if (ss[i].endsWith("bw") || ss[i].endsWith("b")) {
                na.push(na, "半左")
                continue
            }
            if (ss[i].endsWith("uw'") || ss[i].endsWith("u'")) {
                na.push(na, "半回")
                continue
            }
            if (ss[i].endsWith("uw") || ss[i].endsWith("u")) {
                na.push(na, "半勾")
                continue
            }
            if (ss[i].endsWith("rw'") || ss[i].endsWith("r'")) {
                na.push(na, "半下")
                continue
            }
            if (ss[i].endsWith("rw") || ss[i].endsWith("r")) {
                na.push(na, "半上")
                continue
            }
            if (ss[i].endsWith("lw'") || ss[i].endsWith("l'")) {
                na.push(na, "半顶")
                continue
            }
            if (ss[i].endsWith("lw") || ss[i].endsWith("l")) {
                na.push(na, "半底")
                continue
            }
            var reg2 = new RegExp(`[BRLUbrluy][w]?`, "g")
            var rs = ss[i].split(reg2)
            if (ss[i].startsWith(rs[0]) && rs[0].trim() != "" && rs[0].trim() != "2") {
                var s1 = ss[i].slice(rs[0].length)
                console.log(s1, "dsdf")
                var s2 = s1.replaceAll("w", "")
                var ts = numToWords(rs[0]) + convert(s2)
                na.push(ts)
                continue
            }
            if (ss[i].includes("w")) {
                console.log(ss[i])
                var s1 = ss[i].replaceAll("w", "")
                var ts = "双" + convert(s1)
                na.push(ts)
                continue
            }
            na.push(convert(ss[i]))
        }
        return na.join(" ")
    }
    return {
        convertZhSun,
        convertPyramZhSun
    }
}()