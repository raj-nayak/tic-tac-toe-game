let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#msg");
let msg_container = document.querySelector(".msg-container");
let reset_btn = document.querySelector("#reset_game_btn");
let new_btn = document.querySelector("#new-game-button");
let popup = document.querySelector("#popup");
let yes_btn = document.querySelector("#yes-btn");
let no_btn = document.querySelector("#no-btn");

let turnO = true;
let count = 0;
let win_patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let is_winner = check_winner();
        if (count === 9 && !is_winner) {
            game_draw();
        }
    });
});

const check_winner = () => {
    for (let pattern of win_patterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            show_winner(pos1, pattern);
            return true;
        }
    }
    return false;
};

const show_winner = (winner, pattern) => {
    msg.innerText = `Congratulations, The Winner is ${winner}`;
    msg_container.classList.remove("hide");

    pattern.forEach(index => {
        boxes[index].style.backgroundColor = "#32CD32"; 
        boxes[index].style.boxShadow = "0 0 15px 5px #32CD32"; 
    });

    disable_boxes();
};

const game_draw = () => {
    msg.innerText = "This Game is a Draw";
    msg_container.classList.remove("hide");
    disable_boxes();
};

const disable_boxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const reset_game = () => {
    popup.classList.remove("hide");
};

const confirm_reset = () => {
    turnO = true;
    count = 0;
    enable_boxes();
    msg_container.classList.add("hide");
    popup.classList.add("hide");
};

const cancel_reset = () => {
    popup.classList.add("hide");
};

const enable_boxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#1c2826";
        box.style.boxShadow = "0 0 1rem rgba(0,0,0,0.3)";
    });
};

new_btn.addEventListener("click", confirm_reset);
reset_btn.addEventListener("click", reset_game);
yes_btn.addEventListener("click", confirm_reset);
no_btn.addEventListener("click", cancel_reset);
