//get the heading Element
const headingEl = document.querySelector("#headingTotal");

//get the reference of desc element
const inputDescEl = document.querySelector("#inputDesc");

//get the rederence of inputAmount
const inputElement = document.querySelector("#inputAmount");

//ref to table
const expenseTableEl = document.querySelector("#expenseTable");


let totalExpense = 0;

//all expenses at one place

const allExpenses = [];

function addExpenseToTotal(){

    const expenseItem = {};


    //read value from inputAmount
    const textAmount = inputElement.value;

    //read val from inputDesc
    const textDesc = inputDescEl.value;
    // console.log({textAmount, textDesc});
    
    //convert it to number
    const expense = parseInt(textAmount, 10);
    // console.log({expense});

    //put it in object
    expenseItem.desc = textDesc;
    expenseItem.amount = expense;
    expenseItem.moment = new Date();
    // console.log(expenseItem)
    allExpenses.push(expenseItem);

    // console.clear();
    // console.table(allExpenses);

    //add value to total expense
    totalExpense = totalExpense + expense;
    // console.log({totalExpense});

    //set the heading element to totalExpense
    const someText = `Total: ${totalExpense}`
    headingEl.textContent = someText;

    renderList(allExpenses);
}


// Listen to click event
const element = document.querySelector("#btnAddExpense");
element.addEventListener("click", addExpenseToTotal, false);

// Controller functions

function getDateString(moment){
    return moment.toLocaleDateString('en-US',
                            {year: 'numeric',
                            month:'long', 
                            day: 'numeric'
    }) 
                        
}


//delete item

function deleteItem(dateValue){
    const newArr = [];

    for(let i=0; i < allExpenses.length; i++){
        if(allExpenses[i].moment.valueOf() !== dateValue){
            newArr.push(allExpenses[i]);
        }
        // console.log(allExpenses[i].moment.valueOf());
        // console.log(newArr);
        renderList(newArr);
    }
}

//view layer 

//render
function renderList(arrOfList){
    const allExpenseHTML = arrOfList.map(expense => createListItem(expense));
    const joinedAllExpenseHTML = allExpenseHTML.join("")
        // console.log({joinedAllExpenseHTML});

    expenseTableEl.innerHTML = joinedAllExpenseHTML;
}

function createListItem({desc, amount, moment}) {
    return `
        <li class="list-group-item d-flex justify-content-between">
                    <div class="d-flex flex-column">
                        ${desc}
                        <small class="text-muted">${(getDateString(moment))}</small>
                    </div>
                    <div>
                        <span class="px-5">
                            ${amount}
                        </span>
                        <button 
                            type="button" 
                            onclick = "deleteItem(${moment.valueOf()})"
                            class="btn btn-outline-danger btn-sm">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </li>
        `
}
