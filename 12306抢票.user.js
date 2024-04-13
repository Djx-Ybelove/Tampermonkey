// ==UserScript==
// @name         12306抢票
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  12306抢票脚本
// @author       Djx_Ybelove
// @grant        GM_setValue
// @grant        GM_getValue
// @match        https://kyfw.12306.cn/otn/leftTicket/*
// @match        https://kyfw.12306.cn/otn/confirmPassenger/*
// ==/UserScript==

(function () {
    'use strict';
    if (window.location.href.split("/")[4] === "leftTicket") {
        const div = `<div style = "z-index:9999999999;right: 33px;bottom: 360px;position: fixed;">
        <input id="train_num" type="text" name="tr_num" class="inp-txt inp_selected" style = "display: flex; width:142px;" placeholder="车次(如:G317)">
        <input id="seat_num" type="text" name="st_num" class="inp-txt inp_selected" style = "display: flex; width:142px;" placeholder="座位号(如:F)">
        <button id="confirm" class="btn92s" style="border: none; width:60px;">确定</button>
        <button id="start" class="btn92s" style="border: none; width:70px; margin-left: 17px;">开始抢票</button>
        </div>`;
        var html = document.querySelector("#t-list");
        html.insertAdjacentHTML('beforeend', div);
        var btn_confirm = document.querySelector("#confirm");
        var btn_start = document.querySelector("#start");
        var train_info = document.querySelectorAll("#queryLeftTable tr");
        var i = 0;
        var train_num = document.querySelector("#train_num");
        train_num.addEventListener("input", function () {
            window.tr_num = document.querySelector("#train_num").value;
            // console.log(i);
            let tr = document.querySelectorAll("#queryLeftTable tr")[0];
            tr.setAttribute('style', 'background-color: white;');
            if (i != 0) {
                let tr = document.querySelectorAll("#queryLeftTable tr")[i * 2];
                tr.setAttribute('style', 'background-color: white;');
            }
        })
        var seat_num = document.querySelector("#seat_num");
        seat_num.addEventListener("input", function () {
            var st_num = document.querySelector("#seat_num").value;
            GM_setValue("seat_name", st_num);
        })
        var tr_info = new Array();
        for (let j = 0; j < train_info.length; j++) {
            if (j % 2 == 0) {
                train_info[j].classList.remove("bgc");
            }
            else {
                tr_info.push(train_info[j]);
            }
        }
        btn_confirm.onclick = function () {
            for (i = 0; i <= tr_info.length - 1; i++) {
                if (tr_info[i].getAttribute("datatran") === tr_num) {
                    let tr = document.querySelectorAll("#queryLeftTable tr")[i * 2];
                    tr.setAttribute('style', 'background-color: beige;');
                    break;
                }
            }
        }
        var ticket = document.querySelectorAll("#queryLeftTable tr")[i * 2].querySelectorAll("td")[12].querySelector("a");
        btn_start.addEventListener("click", function () {
            window.setInterval(function () {
                if (window.location.href.split("/")[4] === "confirmPassenger") {
                    console.log(window.location.href);
                    window.clearInterval();
                }
                else {
                    try {
                        ticket.click();
                        console.log("正在尝试抢票!");
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
            }, 500);
        });
    }
    if (window.location.href.split("/")[4] === "confirmPassenger") {
        var seat_dict = { "A": 0, "B": 1, "C": 2, "D": 3, "F": 4 }
        window.onload = function () {
            var passenger = document.querySelector("#normalPassenger_0");
            var clickEvent = new MouseEvent("click");
            passenger.dispatchEvent(clickEvent);
            var sub = document.querySelector("#submitOrder_id");
            sub.click();
            var locate = seat_dict[GM_getValue("seat_name", null)];
            console.log(locate);
            window.setTimeout(function () {
                var seat = document.querySelectorAll(".sel-item");
                for (let k = 0; k < seat.length; k++) {
                    console.log(seat[k].getAttribute("style"));
                    if (seat[k].getAttribute("style") === "display: block;") {
                        console.log(seat[k]);
                        var seat_locate = seat[k].querySelectorAll("ul")[parseInt(locate / 3)].querySelectorAll("li")[locate % 3].querySelector("a");
                        console.log(seat_locate);
                        seat_locate.click();
                        window.setTimeout(function () {
                            var tab = document.querySelector("#qr_submit_id");
                            console.log(tab);
                            tab.click();
                        }, 500);
                        break;
                    }
                    else {
                        console.log("正在匹配目标!");
                    }
                }
            }, 1500);
        }
    }
    // Your code here...
})();